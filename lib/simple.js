// ─────────────────────────────────────────────────────────────────────────────
// lib/simple.js — Wrapper ligero de Baileys para InstituBot
// Extiende el socket con métodos de conveniencia
// ─────────────────────────────────────────────────────────────────────────────

import { fileURLToPath } from 'url'
import path from 'path'
import chalk from 'chalk'
import store from './store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const baileys = await import('@whiskeysockets/baileys')
const {
  default: _makeWaSocket,
  proto,
  downloadContentFromMessage,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateWAMessageFromContent,
  extractMessageContent,
  jidNormalizedUser
} = baileys

// ─────────────────────────────────────────────────────────────────────────────
// protoType — Agregar helpers al proto de Baileys
// ─────────────────────────────────────────────────────────────────────────────
export function protoType() {
  proto.Message.prototype.getDevice = function () {
    const id = this?.deviceSentMessage?.message
    return id ? 'multi' : 'single'
  }

  // String helper: decodear JID
  String.prototype.decodeJid = function () {
    const jid = this.toString()
    if (!jid || !jid.includes(':')) return jid
    const decoded = jidDecode(jid)
    return (decoded?.user && decoded?.server && decoded.user + '@' + decoded.server) || jid
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// serialize — Serializar mensajes de Baileys al formato simplificado
// ─────────────────────────────────────────────────────────────────────────────
export function serialize() {
  const M = proto.WebMessageInfo

  M.prototype.getQuotedObj = async function () {
    if (!this.msg?.contextInfo?.stanzaId) return null
    const jid = this.key?.remoteJid
    const msg = store.loadMessage(jid, this.msg.contextInfo.stanzaId)
    return msg ? smsg(null, msg, true) : null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// smsg — Enriquecer el objeto de mensaje con campos de conveniencia
// ─────────────────────────────────────────────────────────────────────────────
export function smsg(conn, m, hasParent) {
  if (!m) return m

  let M = proto.WebMessageInfo
  if (m.key) {
    m.id = m.key.id
    m.isBaileys = m.id?.startsWith('BAE5') && m.id?.length === 16
    m.chat = m.key.remoteJid?.decodeJid?.() || m.key.remoteJid
    m.isGroup = m.chat?.endsWith('@g.us')
    m.sender = m.isGroup
      ? m.key?.participant?.decodeJid?.() || m.key?.participant
      : m.key?.fromMe
        ? conn?.user?.id?.decodeJid?.() || conn?.user?.id
        : m.chat
    m.fromMe = m.key?.fromMe
  }

  if (m.message) {
    let mtype = Object.keys(m.message)
    m.mtype = !mtype[0] || mtype[0] === 'senderKeyDistributionMessage'
      ? mtype[1]
      : mtype[0]

    // Compatibilidad con viewOnce y ephemeral
    if (m.mtype === 'viewOnceMessage' || m.mtype === 'ephemeralMessage') {
      m.msg = extractMessageContent(m.message[m.mtype].message)
      m.mtype = Object.keys(m.msg)[0]
    } else {
      m.msg = m.message[m.mtype]
    }

    // Texto del mensaje
    if (m.mtype === 'conversation') {
      m.text = m.msg
    } else if (m.mtype === 'extendedTextMessage') {
      m.text = m.msg?.text
    } else if (m.mtype === 'imageMessage' || m.mtype === 'videoMessage') {
      m.text = m.msg?.caption || ''
    } else {
      m.text = ''
    }

    if (!m.text) m.text = ''
  }

  m.reply = (text, chatId = m.chat, options = {}) => {
    if (!conn) return
    return conn.reply(chatId, text, m, options)
  }

  return m
}

// ─────────────────────────────────────────────────────────────────────────────
// makeWASocket — Crear socket extendido con métodos de conveniencia
// ─────────────────────────────────────────────────────────────────────────────
export function makeWASocket(connectionOptions, options = {}) {
  let conn = _makeWaSocket(connectionOptions)

  // Delay mínimo entre envíos para evitar 429
  const lastSend = { time: 0 }
  const MIN_DELAY = 500

  const originalSend = conn.sendMessage.bind(conn)

  return Object.defineProperties(conn, {
    chats: {
      value: { ...(options.chats || {}) },
      writable: true
    },

    decodeJid: {
      value(jid) {
        if (!jid || typeof jid !== 'string') return jid || null
        return jid.decodeJid()
      }
    },

    // ── sendMessage con delay ──────────────────────────────────────────────
    sendMessage: {
      value: async function (jid, content, opts = {}) {
        const now = Date.now()
        const diff = now - lastSend.time
        if (diff < MIN_DELAY) await new Promise(r => setTimeout(r, MIN_DELAY - diff))
        lastSend.time = Date.now()
        return originalSend(jid, content, opts)
      },
      writable: true,
      enumerable: true,
      configurable: true
    },

    // ── reply ──────────────────────────────────────────────────────────────
    reply: {
      value: async function (jid, text = '', quoted, options = {}) {
        return conn.sendMessage(jid, { text: String(text), ...options }, { quoted, ...options })
      },
      enumerable: true
    },

    // ── sendText ──────────────────────────────────────────────────────────
    sendText: {
      value: async function (jid, text = '', options = {}) {
        return conn.sendMessage(jid, { text: String(text), ...options }, options)
      },
      enumerable: true
    },

    // ── publishToChannel ───────────────────────────────────────────────────
    // Publica un mensaje en un Canal de WhatsApp (newsletter)
    publishToChannel: {
      value: async function (channelId, text) {
        if (!channelId || !channelId.includes('@newsletter')) {
          throw new Error('channelId inválido. Debe terminar en @newsletter')
        }
        return conn.sendMessage(channelId, { text: String(text) })
      },
      enumerable: true
    },

    // ── parseMention ───────────────────────────────────────────────────────
    parseMention: {
      value: function (text) {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
      },
      enumerable: true
    },

    // ── getName ────────────────────────────────────────────────────────────
    getName: {
      value: function (jid) {
        const id = jid?.split('@')[0] || jid
        return id
      },
      enumerable: true
    }
  })
}
