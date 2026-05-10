// ─────────────────────────────────────────────────────────────────────────────
// lib/cron.js — Cron job diario para envío automático de comunicados
// ─────────────────────────────────────────────────────────────────────────────

import cron from 'node-cron'
import chalk from 'chalk'
import { getDB } from './database.js'

/**
 * Fecha de hoy en Argentina → formato YYYY-MM-DD
 */
function fechaHoyAR() {
  const ahora = new Date()
  const opts = { timeZone: 'America/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }
  const str = new Intl.DateTimeFormat('es-AR', opts).format(ahora) // DD/MM/YYYY
  const [dia, mes, anio] = str.split('/')
  return `${anio}-${mes}-${dia}`
}

/**
 * Parsear "HH:MM" → { hora, minuto }
 */
function parsearHora(horaStr) {
  const [h, m] = (horaStr || '00:00').split(':')
  return { hora: parseInt(h || '0', 10), minuto: parseInt(m || '0', 10) }
}

/**
 * Ejecutar el envío de anuncios del día
 */
async function ejecutarEnvioDiario(conn) {
  const db = getDB()
  const hoy = fechaHoyAR()
  const anuncios = await db.getAnunciosPorFecha(hoy)

  if (anuncios.length === 0) {
    console.log(chalk.gray(`[CRON] Sin anuncios para hoy (${hoy})`))
    return
  }

  const channelId = global.channelId
  if (!channelId) {
    console.log(chalk.yellow(`[CRON] Error: channelId no configurado.`))
    return
  }

  console.log(chalk.cyan(`[CRON] Enviando ${anuncios.length} anuncio(s) al canal...`))

  for (const anuncio of anuncios) {
    try {
      const textoFinal = "*📣 • ANUNCIO OFICIAL*\n\nEstimadas familias, se les informa que " + anuncio.contenido
      const sent = await conn.sendMessage(channelId, { text: textoFinal })
      await db.marcarEnviado(anuncio._id, sent.key)
      console.log(chalk.green(`[CRON] Anuncio enviado.`))
      // Pausa entre envíos
      await new Promise(r => setTimeout(r, 1500))
    } catch (err) {
      console.error(chalk.red(`[CRON] Error en anuncio:`), err.message)
    }
  }
}

/**
 * Iniciar el cron job
 */
export async function iniciarCron(conn) {
  const db = getDB()
  const horaGuardada = (await db.getConfig('cronHora')) || global.cronHora || '00:00'
  const { hora, minuto } = parsearHora(horaGuardada)
  const expresion = `${minuto} ${hora} * * *`

  if (!cron.validate(expresion)) {
    console.error(chalk.red(`[❌] Expresión cron inválida: "${expresion}". Usando 00:00.`))
    _lanzarCron(conn, '0 0 * * *')
    return
  }

  _lanzarCron(conn, expresion)
  console.log(chalk.cyan(`[SISTEMA] activo — Envío automático a las ${String(hora).padStart(2,'0')}:${String(minuto).padStart(2,'0')}`))
}

let tareaActual = null

function _lanzarCron(conn, expresion) {
  if (tareaActual) {
    tareaActual.stop()
    tareaActual.destroy()
  }
  tareaActual = cron.schedule(expresion, () => {
    ejecutarEnvioDiario(conn).catch(err =>
      console.error(chalk.red('[❌] Error en cron:'), err)
    )
  }, { timezone: 'America/Buenos_Aires' })
}

/**
 * Reiniciar cron con nueva hora (llamado desde .setcron)
 */
export async function reiniciarCron(conn, nuevaHora) {
  const db = getDB()
  await db.setConfig('cronHora', nuevaHora)
  global.cronHora = nuevaHora
  await iniciarCron(conn)
}

export { ejecutarEnvioDiario, fechaHoyAR }
