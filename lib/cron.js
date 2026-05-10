
import cron from 'node-cron'
import chalk from 'chalk'
import { getDB } from './database.js'

function fechaHoyAR() {
  const ahora = new Date()
  const opts = { timeZone: 'America/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }
  const str = new Intl.DateTimeFormat('es-AR', opts).format(ahora)
  const [dia, mes, anio] = str.split('/')
  return `${anio}-${mes}-${dia}`
}

function parsearHora(horaStr) {
  const [h, m] = (horaStr || '00:00').split(':')
  return { hora: parseInt(h || '0', 10), minuto: parseInt(m || '0', 10) }
}

async function ejecutarEnvioDiario(conn) {
  const db = getDB()
  const hoy = fechaHoyAR()
  const anuncios = await db.getAnunciosPorFecha(hoy)

  if (anuncios.length === 0) return

  const channelId = global.channelId
  if (!channelId) return

  for (const anuncio of anuncios) {
    try {
      const textoFinal = "*📣 • ANUNCIO OFICIAL*\n\nEstimadas familias, se les informa que " + anuncio.contenido
      const sent = await conn.sendMessage(channelId, { text: textoFinal })
      await db.marcarEnviado(anuncio._id, sent.key)
      await new Promise(r => setTimeout(r, 1500))
    } catch (err) {
      console.error(chalk.red(`[CRON] Error:`), err.message)
    }
  }
}

export async function iniciarCron(conn) {
  const db = getDB()
  const horaGuardada = (await db.getConfig('cronHora')) || global.cronHora || '00:00'
  const { hora, minuto } = parsearHora(horaGuardada)
  const expresion = `${minuto} ${hora} * * *`

  if (!cron.validate(expresion)) {
    _lanzarCron(conn, '0 0 * * *')
    return
  }

  _lanzarCron(conn, expresion)
  console.log(chalk.cyan(`[SISTEMA] activo — envío automático a las ${String(hora).padStart(2,'0')}:${String(minuto).padStart(2,'0')}`))
}

let tareaActual = null

function _lanzarCron(conn, expresion) {
  if (tareaActual) {
    tareaActual.stop()
  }
  tareaActual = cron.schedule(expresion, () => {
    ejecutarEnvioDiario(conn).catch(err =>
      console.error(chalk.red('[❌] error en cron:'), err)
    )
  }, { timezone: 'America/Buenos_Aires' })
}

export async function reiniciarCron(conn, nuevaHora) {
  const db = getDB()
  await db.setConfig('cronHora', nuevaHora)
  global.cronHora = nuevaHora
  await iniciarCron(conn)
}

export { ejecutarEnvioDiario, fechaHoyAR }
