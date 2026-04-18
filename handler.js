// ─────────────────────────────────────────────────────────────────────────────
// handler.js — Procesador central de mensajes entrantes
// ─────────────────────────────────────────────────────────────────────────────

import chalk from 'chalk'
import { smsg } from './lib/simple.js'
import { getDB } from './lib/database.js'

// Importar todos los plugins
import * as pluginMenu      from './plugins/cmd-menu.js'
import * as pluginRegistro  from './plugins/cmd-registro.js'
import * as pluginLogin     from './plugins/cmd-login.js'
import * as pluginLogout    from './plugins/cmd-logout.js'
import * as pluginEnviar    from './plugins/cmd-enviar.js'
import * as pluginProgramar from './plugins/cmd-programar.js'
import * as pluginLista     from './plugins/cmd-lista.js'
import * as pluginEditar    from './plugins/cmd-editar.js'
import * as pluginBorrar    from './plugins/cmd-borrar.js'
import * as pluginSetrango  from './plugins/cmd-setrango.js'
import * as pluginSetcron   from './plugins/cmd-setcron.js'

// Mapa de comandos → plugins
const COMANDOS = {
  'menu':      pluginMenu,
  'registro':  pluginRegistro,
  'login':     pluginLogin,
  'logout':    pluginLogout,
  'enviar':    pluginEnviar,
  'programar': pluginProgramar,
  'lista':     pluginLista,
  'editar':    pluginEditar,
  'borrar':    pluginBorrar,
  'setrango':  pluginSetrango,
  'setcron':   pluginSetcron,
}

// Comandos disponibles sin sesión
const CMDS_SIN_SESION = new Set(['registro', 'menu'])

// Comandos que requieren estar logueado (no basta con estar registrado)  
const CMDS_REQUIEREN_LOGIN = new Set(['logout', 'enviar', 'programar', 'lista', 'editar', 'borrar', 'setrango', 'setcron'])

// Comandos exclusivos de admins/owners
const CMDS_ADMIN = new Set(['enviar', 'programar', 'lista', 'editar', 'borrar', 'setrango', 'setcron'])

// Anti-duplicado de mensajes
const procesados = new Set()

/**
 * Handler principal
 * @this {import('@whiskeysockets/baileys').WASocket}
 */
export async function handler(chatUpdate) {
  if (!chatUpdate?.messages) return

  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m?.key) return

  // Anti-duplicado
  const msgId = m.key?.id
  if (msgId && procesados.has(msgId)) return
  if (msgId) {
    procesados.add(msgId)
    setTimeout(() => procesados.delete(msgId), 60_000)
  }

  // Serializar mensaje
  m = smsg(this, m)
  if (!m) return

  // Solo textos
  if (!m.text || typeof m.text !== 'string') return

  // Ignorar grupos (bot solo responde en privado)
  if (m.isGroup) return

  // Ignorar mensajes propios
  if (m.fromMe) return

  // Detectar prefijo
  const prefijo = global.prefix || '.'
  if (!m.text.startsWith(prefijo)) return

  // Parsear comando y args
  const sinPrefijo = m.text.slice(prefijo.length).trim()
  const partes     = sinPrefijo.split(/\s+/)
  const cmdRaw     = partes[0]?.toLowerCase() || ''
  const args       = partes.slice(1)
  const textoCompleto = args.join(' ')

  if (!cmdRaw) return

  const numero = m.sender?.split('@')[0]
  if (!numero) return

  // Log
  console.log(chalk.gray(`[📨] ${numero}: ${prefijo}${cmdRaw} ${textoCompleto.substring(0, 60)}`))

  // Buscar plugin
  const plugin = COMANDOS[cmdRaw]
  if (!plugin) {
    await this.reply(m.chat,
      `❓ Comando desconocido: *${prefijo}${cmdRaw}*\nUsá *${prefijo}menu* para ver los comandos disponibles.`,
      m
    )
    return
  }

  // ── Obtener datos del usuario ─────────────────────────────────────────────
  const db = getDB()
  const userData = await db.getUsuario(numero).catch(() => null)

  // ── Verificar si es owner ─────────────────────────────────────────────────
  const esOwner = (global.owner || []).some(([n]) =>
    String(n).replace(/\D/g, '') === String(numero).replace(/\D/g, '')
  )

  const logeado = userData?.loggedIn === 1
  const rango   = esOwner ? 'owner' : (userData?.rango || 'usuario')
  const esAdmin = rango === 'admin' || rango === 'owner'

  // ── Controles de acceso ───────────────────────────────────────────────────

  // ¿Necesita sesión?
  if (!CMDS_SIN_SESION.has(cmdRaw) && !logeado && !esOwner) {
    await this.reply(m.chat, global.MSG?.noSesion ||
      `❌ Necesitás iniciar sesión.\nUsá *.registro [usuario] [PIN]* o *.login [usuario] [PIN]*`, m)
    return
  }

  // ¿Necesita login activo?
  if (CMDS_REQUIEREN_LOGIN.has(cmdRaw) && !logeado && !esOwner) {
    await this.reply(m.chat,
      `❌ Necesitás estar logueado para usar este comando.\nUsá *.login [usuario] [PIN]*`, m)
    return
  }

  // ¿Necesita ser admin?
  if (CMDS_ADMIN.has(cmdRaw) && !esAdmin) {
    await this.reply(m.chat, global.MSG?.noAdmin ||
      '⛔ No tenés permisos para usar este comando. Solo los administradores pueden hacerlo.', m)
    return
  }

  // ── Ejecutar plugin ───────────────────────────────────────────────────────
  try {
    await plugin.run.call(this, {
      m,
      args,
      textoCompleto,
      numero,
      userData,
      rango,
      esAdmin,
      esOwner,
      db,
      conn: this
    })
  } catch (e) {
    console.error(chalk.red(`[❌] Error en ${prefijo}${cmdRaw}:`), e)
    await this.reply(m.chat,
      `❌ Error interno al ejecutar el comando.\n\`\`\`${e.message}\`\`\``, m
    ).catch(() => {})
  }
}
