import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

import './config.js'

import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import fs from 'fs'
import readline from 'readline'
import chalk from 'chalk'
import pino from 'pino'
import Pino from 'pino'
import { Boom } from '@hapi/boom'
import NodeCache from 'node-cache'
import qrcode from 'qrcode-terminal'
import yargs from 'yargs'

import { makeWASocket, protoType, serialize, smsg } from './lib/simple.js'
import store from './lib/store.js'
import { getDB } from './lib/database.js'
import { iniciarCron } from './lib/cron.js'
import { handler } from './handler.js'

const baileys = await import('@whiskeysockets/baileys')
const {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  jidNormalizedUser,
  PHONENUMBER_MCC
} = baileys

const __dirname = path.dirname(fileURLToPath(import.meta.url))

protoType()
serialize()

global.db = getDB()

global.opts = yargs(process.argv.slice(2)).exitProcess(false).parse()
const methodCodeQR = process.argv.includes('qr')
const methodCode = process.argv.includes('code') || !!global.botNumberCode

if (!fs.existsSync(global.authFile)) fs.mkdirSync(global.authFile, { recursive: true })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
})

const question = (texto) => new Promise(resolve => rl.question(texto, ans => resolve(ans.trim())))

const noiseStrings = ['Closing stale open', 'Closing open session', 'Failed to decrypt', 'Session error', 'Closing session']
  ;['log', 'warn', 'error'].forEach(method => {
    const orig = console[method]
    console[method] = function (...args) {
      if (args.some(a => typeof a === 'string' && noiseStrings.some(n => a.includes(n)))) return
      orig.apply(console, args)
    }
  })

let reconnectAttempts = 0
const MAX_RECONNECT = 10
async function iniciarBot() {
  const { state, saveCreds } = await useMultiFileAuthState(global.authFile)
  const { version } = await fetchLatestBaileysVersion()
  const msgRetryCache = new NodeCache({ stdTTL: 0, checkperiod: 0 })
  let opcion
  const credsExisten = fs.existsSync(join(global.authFile, 'creds.json'))

  if (!credsExisten && !methodCodeQR && !methodCode) {
    const lineM = '─'.repeat(30)
    console.log(chalk.cyan(`\n┌${lineM}┐`))
    console.log(chalk.cyan('│') + chalk.bold('  Método de conexion del bot') + chalk.cyan('       │'))
    console.log(chalk.cyan('│') + chalk.green('  1. Código QR ') + chalk.cyan('                       │'))
    console.log(chalk.cyan('│') + chalk.yellow('  2. Código de emparejamiento') + ' │')
    console.log(chalk.cyan(`└${lineM}┘`))

    do {
      opcion = await question(chalk.bold.magenta('\n Elegí una opción (1 o 2): '))
      if (!/^[12]$/.test(opcion)) console.log(chalk.red('  ❌ Opción inválida. Escribí 1 o 2.'))
    } while (!/^[12]$/.test(opcion))
  }

  global.conn = makeWASocket({
    logger: pino({ level: 'silent' }),
    browser: ['Ubuntu', 'Chrome', '120.0.0'],
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: 'fatal' }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: false,
    syncFullHistory: false,
    getMessage: async (key) => {
      try {
        const jid = jidNormalizedUser(key.remoteJid)
        const msg = store.loadMessage(jid, key.id)
        return msg?.message || ''
      } catch {
        return ''
      }
    },
    msgRetryCounterCache: msgRetryCache,
    defaultQueryTimeoutMs: undefined,
    keepAliveIntervalMs: 30000,
    maxIdleTimeMs: 60000
  })

  store.bind(global.conn.ev)

  if (!credsExisten && (opcion === '2' || methodCode)) {
    if (!global.conn.authState.creds.registered) {
      let numBot = global.botNumberCode || ''

      if (!numBot) {
        numBot = await question(chalk.cyan('\n Ingresá el número del bot (con código de país y todo junto. ej: +5491167416972): '))
        numBot = numBot.replace(/\D/g, '')
      } else {
        numBot = numBot.replace(/\D/g, '')
      }

      setTimeout(async () => {
        try {
          let codigo = await global.conn.requestPairingCode(numBot)
          codigo = codigo?.match(/.{1,4}/g)?.join('-') || codigo
          console.log(chalk.bold.bgMagenta('\n 🔑 CÓDIGO DE EMPAREJAMIENTO: ') + chalk.bold.white(` ${codigo} \n`))
        } catch (e) {
          console.error(chalk.red('[ERROR] No se pudo mandar el codigo de emparejamiento:'), e.message)
        }
      }, 3000)
    }
  }

  global.conn.ev.on('creds.update', saveCreds)
  global.conn.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update

    if (qr && (opcion === '1' || methodCodeQR || !opcion)) {
      console.log(chalk.cyan('\nEscaneá este QR con tu WhatsApp:\n'))
      qrcode.generate(qr, { small: true })
    }

    if (connection === 'open') {
      reconnectAttempts = 0
      const usuario = global.conn.user
      console.log(chalk.green(`[CONECTADO] Bot: ${usuario?.name || usuario?.id}`))

      iniciarCron(global.conn)

      console.log(chalk.cyan(`[SISTEMA] Listo para recibir comandos\n`))
    }

    if (connection === 'close') {
      const razon = new Boom(lastDisconnect?.error)?.output?.statusCode
      const esCierre = razon === DisconnectReason.loggedOut || razon === 401

      if (esCierre) {
        console.log(chalk.red('[ERROR] Sesion terminada. Eliminando credenciales...'))
        try { fs.rmSync(global.authFile, { recursive: true }) } catch (_) { }
        process.exit(0)
      }

      if (reconnectAttempts < MAX_RECONNECT) {
        reconnectAttempts++
        const delay = Math.min(5000 * reconnectAttempts, 60000)
        console.log(chalk.yellow(`[RECONECTANDO] Intento ${reconnectAttempts}/${MAX_RECONNECT} en ${delay / 1000}s...`))
        setTimeout(iniciarBot, delay)
      } else {
        console.error(chalk.red(`[ERROR] Limite de reconexiones alcanzado. Deteniendo.`))
        process.exit(1)
      }
    }
  })

  global.conn.ev.on('messages.upsert', async (chatUpdate) => {
    try {
      await handler.call(global.conn, chatUpdate)
    } catch (e) {
      console.error(chalk.red('[❌] Error en handler:'), e)
    }
  })
}

process.on('SIGINT', async () => {
  console.log(chalk.yellow('\n[⏹️] Cerrando InstituBot...'))
  try { global.db?.close() } catch (_) { }
  process.exit(0)
})

process.on('SIGTERM', async () => {
  try { global.db?.close() } catch (_) { }
  process.exit(0)
})

process.on('uncaughtException', (err) => {
  console.error(chalk.red('[❌] Error no capturado:'), err)
})

process.on('unhandledRejection', (reason) => {
  const isConnClose = String(reason).includes('Connection Closed')
  if (!isConnClose) console.error(chalk.red('[❌] Promesa rechazada:'), reason)
})

iniciarBot()
