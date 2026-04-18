// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-setcron.js — Comando .setcron [HH:MM]
// ─────────────────────────────────────────────────────────────────────────────

import { reiniciarCron } from '../lib/cron.js'

export async function run({ m, args, conn, db }) {
  const prefix = global.prefix || '.'

  if (args.length < 1) {
    return conn.reply(m.chat,
      `⏰ *Configurar hora de envío automático*\n\n` +
      `Uso: *${prefix}setcron [HH:MM]*\n\n` +
      `Ejemplo: _${prefix}setcron 07:30_\n\n` +
      `• Formato 24 horas (HH:MM)\n` +
      `• Zona horaria: Argentina (ART)`,
      m
    )
  }

  const horaStr = args[0].trim()
  const match = horaStr.match(/^(\d{1,2}):(\d{2})$/)

  if (!match) {
    return conn.reply(m.chat, `❌ Formato inválido. Usá HH:MM (ej: 08:00).`, m)
  }

  const hora = parseInt(match[1], 10)
  const minuto = parseInt(match[2], 10)

  if (hora < 0 || hora > 23 || minuto < 0 || minuto > 59) {
    return conn.reply(m.chat, `❌ Hora o minutos fuera de rango.`, m)
  }

  const horaFormateada = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`

  await reiniciarCron(conn, horaFormateada)
  await conn.reply(m.chat, `✅ Hora de envío automático actualizada a las *${horaFormateada} hs*.`, m)
}
