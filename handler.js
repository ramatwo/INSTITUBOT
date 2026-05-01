
import chalk from 'chalk'
import { smsg } from './lib/simple.js'
import { getDB } from './lib/database.js'

import * as pluginMenu from './plugins/cmd-menu.js'
import * as pluginRegistro from './plugins/cmd-registro.js'
import * as pluginLogin from './plugins/cmd-login.js'
import * as pluginLogout from './plugins/cmd-logout.js'
import * as pluginEnviar from './plugins/cmd-enviar.js'
import * as pluginProgramar from './plugins/cmd-programar.js'
import * as pluginLista from './plugins/cmd-lista.js'
import * as pluginEditar from './plugins/cmd-editar.js'
import * as pluginBorrar from './plugins/cmd-borrar.js'
import * as pluginSetrango from './plugins/cmd-setrango.js'
import * as pluginSetcron from './plugins/cmd-setcron.js'

const COMANDOS = {
  'menu': pluginMenu,
  'registro': pluginRegistro,
  'login': pluginLogin,
  'logout': pluginLogout,
  'enviar': pluginEnviar,
  'programar': pluginProgramar,
  'lista': pluginLista,
  'editar': pluginEditar,
  'borrar': pluginBorrar,
  'setrango': pluginSetrango,
  'setcron': pluginSetcron,
}

const CMDS_SIN_SESION = new Set(['registro', 'menu', 'login'])
const CMDS_REQUIEREN_LOGIN = new Set(['logout', 'enviar', 'programar', 'lista', 'editar', 'borrar', 'setrango', 'setcron'])
const CMDS_ADMIN = new Set(['enviar', 'programar', 'lista', 'editar', 'borrar', 'setrango', 'setcron'])

const procesados = new Set()

/**
 * Handler principal
 * @this {import('@whiskeysockets/baileys').WASocket}
 */
export async function handler(chatUpdate) {
  if (!chatUpdate?.messages) return

  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m?.key) return

  const msgId = m.key?.id
  if (msgId && procesados.has(msgId)) return
  if (msgId) {
    procesados.add(msgId)
    setTimeout(() => procesados.delete(msgId), 60_000)
  }

  m = smsg(this, m)
  if (!m) return

  const numero = m.sender?.split('@')[0]
  if (!numero) return

  if (!m.text || typeof m.text !== 'string') return

  const prefijo = global.prefix || '.'
  const esComando = m.text.startsWith(prefijo)

  if (m.fromMe && !esComando) return

  if (!esComando) return

  const sinPrefijo = m.text.slice(prefijo.length).trim()
  const partes = sinPrefijo.split(/\s+/)
  const cmdRaw = partes[0]?.toLowerCase() || ''
  const args = partes.slice(1)
  const textoCompleto = args.join(' ')

  if (!cmdRaw) return

  console.log(chalk.cyan(`[MSG] ${numero}: ${prefijo}${cmdRaw}`))

  const plugin = COMANDOS[cmdRaw]
  if (!plugin) {
    await this.reply(m.chat,
      `❓ Comando desconocido: *${prefijo}${cmdRaw}*\nUsá *${prefijo}menu* para ver los comandos disponibles.`,
      m
    )
    return
  }

  const db = getDB()
  const userData = await db.getUsuario(numero).catch(() => null)

  const esOwner = (global.owner || []).some(([n]) =>
    String(n).replace(/\D/g, '') === String(numero).replace(/\D/g, '')
  )

  const logeado = userData?.loggedIn === 1
  const rango = esOwner ? 'owner' : (userData?.rango || 'usuario')
  const esAdmin = rango === 'admin' || rango === 'owner'

  if (!CMDS_SIN_SESION.has(cmdRaw) && !logeado && !esOwner) {
    await this.reply(m.chat, global.MSG?.noSesion ||
      `❌ Necesitás iniciar sesión.\nUsá *.registro [usuario] [PIN]* o *.login [usuario] [PIN]*`, m)
    return
  }

  if (CMDS_REQUIEREN_LOGIN.has(cmdRaw) && !logeado && !esOwner) {
    await this.reply(m.chat,
      `❌ Necesitás estar logueado para usar este comando.\nUsá *.login [usuario] [PIN]*`, m)
    return
  }

  if (CMDS_ADMIN.has(cmdRaw) && !esAdmin) {
    await this.reply(m.chat, global.MSG?.noAdmin ||
      '⛔ No tenés permisos para usar este comando. Solo los administradores pueden hacerlo.', m)
    return
  }

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
    console.error(chalk.red(`[ERROR] en ${cmdRaw}:`), e.message)
    await this.reply(m.chat,
      `❌ Error interno al ejecutar el comando.\n\`\`\`${e.message}\`\`\``, m
    ).catch(() => { })
  }
}
