// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-programar.js — Comando .programar [DD/MM] [texto]
// ─────────────────────────────────────────────────────────────────────────────

export async function run({ m, args, numero, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `📅 *Programar comunicado*\n\n` +
      `Uso: *${prefix}programar [DD/MM] [texto]*\n\n` +
      `Ejemplo:\n_${prefix}programar 25/05 🎉 El 25 de mayo no habrá clases._\n\n` +
      `• Formato de fecha: DD/MM (año actual)`,
      m
    )
  }

  const fechaStr  = args[0]
  const contenido = args.slice(1).join(' ').trim()

  if (!contenido) {
    return conn.reply(m.chat, '❌ Escribí el contenido del comunicado después de la fecha.', m)
  }

  // Validar formato DD/MM
  const matchFecha = fechaStr.match(/^(\d{1,2})\/(\d{1,2})$/)
  if (!matchFecha) {
    return conn.reply(m.chat, `❌ Formato de fecha inválido. Usá *DD/MM*. Ejemplo: *25/05*`, m)
  }

  const dia = parseInt(matchFecha[1], 10)
  const mes = parseInt(matchFecha[2], 10)

  // Año actual en Argentina
  const ahoraAR  = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Buenos_Aires' }))
  const anioAR   = ahoraAR.getFullYear()
  const fechaObj = new Date(anioAR, mes - 1, dia)

  // Validar fecha real
  if (
    fechaObj.getDate() !== dia ||
    fechaObj.getMonth() !== mes - 1 ||
    mes < 1 || mes > 12 || dia < 1 || dia > 31
  ) {
    return conn.reply(m.chat, `❌ La fecha *${fechaStr}* no es válida.`, m)
  }

  // Verificar que no sea pasada
  const hoyAR = new Date(ahoraAR)
  hoyAR.setHours(0, 0, 0, 0)
  fechaObj.setHours(0, 0, 0, 0)

  if (fechaObj < hoyAR) {
    return conn.reply(m.chat, `❌ La fecha *${fechaStr}* ya pasó. Elegí una fecha futura o de hoy.`, m)
  }

  const mm         = String(mes).padStart(2, '0')
  const dd         = String(dia).padStart(2, '0')
  const fechaEnvio = `${anioAR}-${mm}-${dd}`

  const resultado = await db.crearAnuncio(contenido, fechaEnvio, numero)

  await conn.reply(m.chat,
    `✅ *Comunicado programado*\n\n` +
    `🆔 ID: *${resultado.id}*\n` +
    `📅 Fecha: *${dd}/${mm}/${anioAR}*\n` +
    `📝 Contenido:\n_${contenido}_\n\n` +
    `Se publicará a las *${global.cronHora || '00:00'} hs* (AR).\n` +
    `Podés modificarlo con *${prefix}editar ${resultado.id} [texto]* o borrarlo con *${prefix}borrar ${resultado.id}*.`,
    m
  )
}
