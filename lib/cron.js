// ─────────────────────────────────────────────────────────────────────────────
// lib/cron.js — Cron job diario para envío automático de comunicados
// ─────────────────────────────────────────────────────────────────────────────

import cron from 'node-cron'
import chalk from 'chalk'
import { getDB } from './database.js'

/**
 * Convierte YYYY-MM-DD al texto "hoy" en la zona horaria de Argentina
 */
function fechaHoyAR() {
  const ahora = new Date()
  const opciones = { timeZone: 'America/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }
  const [dia, mes, anio] = new Intl.DateTimeFormat('es-AR', opciones)
    .format(ahora)
    .split('/')
  return `${anio}-${mes}-${dia}`
}

/**
 * Parsear la hora configurada "HH:MM" → { hora, minuto }
 */
function parsearHora(horaStr) {
  const partes = (horaStr || '00:00').split(':')
  const hora = parseInt(partes[0] || '0', 10)
  const minuto = parseInt(partes[1] || '0', 10)
  return { hora, minuto }
}

/**
 * Ejecutar el envío de anuncios del día
 * @param {import('@whiskeysockets/baileys').WASocket} conn - Conexión Baileys
 */
async function ejecutarEnvioDiario(conn) {
  const db = getDB()
  const hoy = fechaHoyAR()
  const anuncios = db.getAnunciosPorFecha(hoy)

  if (anuncios.length === 0) {
    console.log(chalk.gray(`[📅] Cron ejecutado — No hay anuncios pendientes para hoy (${hoy})`))
    return
  }

  const channelId = global.channelId
  if (!channelId) {
    console.log(chalk.yellow(`[⚠️] Cron: Hay ${anuncios.length} anuncio(s) para hoy pero el ID del canal no está configurado.`))
    return
  }

  console.log(chalk.cyan(`[📣] Cron: Enviando ${anuncios.length} anuncio(s) al canal...`))

  for (const anuncio of anuncios) {
    try {
      await conn.sendMessage(channelId, { text: anuncio.contenido })
      db.marcarEnviado(anuncio.id)
      console.log(chalk.green(`[✅] Anuncio #${anuncio.id} enviado correctamente.`))

      // Esperar 1.5 segundos entre envíos para no saturar
      await new Promise(r => setTimeout(r, 1500))
    } catch (err) {
      console.error(chalk.red(`[❌] Error enviando anuncio #${anuncio.id}:`), err.message)
    }
  }
}

/**
 * Iniciar el cron job
 * @param {import('@whiskeysockets/baileys').WASocket} conn
 */
export function iniciarCron(conn) {
  // Leer hora desde db config (si fue cambiada con .setcron) o global
  const db = getDB()
  const horaGuardada = db.getConfig('cronHora') || global.cronHora || '00:00'
  const { hora, minuto } = parsearHora(horaGuardada)

  // Expresión cron: "minuto hora * * *"
  const expresion = `${minuto} ${hora} * * *`

  // Validar que la expresión sea válida
  if (!cron.validate(expresion)) {
    console.error(chalk.red(`[❌] Expresión cron inválida: "${expresion}". Se usará 00:00 por defecto.`))
    iniciarCronConExpresion(conn, '0 0 * * *')
    return
  }

  iniciarCronConExpresion(conn, expresion)
  console.log(chalk.cyan(`[⏰] Cron iniciado — Envío automático programado para las ${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')} (AR)`))
}

let tareaActual = null

function iniciarCronConExpresion(conn, expresion) {
  // Destruir tarea anterior si existe (para poder reconfigurar con .setcron)
  if (tareaActual) {
    tareaActual.stop()
    tareaActual.destroy()
  }

  tareaActual = cron.schedule(expresion, () => {
    ejecutarEnvioDiario(conn).catch(err => {
      console.error(chalk.red('[❌] Error en cron diario:'), err)
    })
  }, {
    timezone: 'America/Buenos_Aires'
  })
}

/**
 * Reiniciar el cron con una nueva hora (llamado desde .setcron)
 * @param {import('@whiskeysockets/baileys').WASocket} conn
 * @param {string} nuevaHora - Formato HH:MM
 */
export function reiniciarCron(conn, nuevaHora) {
  const db = getDB()
  db.setConfig('cronHora', nuevaHora)
  global.cronHora = nuevaHora
  iniciarCron(conn)
}

export { ejecutarEnvioDiario, fechaHoyAR }
