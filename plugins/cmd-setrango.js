export async function run({ m, args, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `🎖️ *Cambiar rango de usuario*\n\n` +
      `Uso: *${prefix}setrango [número] [rango]*\n\n` +
      `Rangos disponibles:\n` +
      `• *usuario* — Solo puede ver el menú\n` +
      `• *admin* — Puede gestionar comunicados\n\n` +
      `Ejemplo: _${prefix}setrango 5491100000000 admin_`,
      m
    )
  }

  const numeroTarget = args[0].replace(/\D/g, '')
  const nuevoRango = args[1].toLowerCase().trim()

  if (!numeroTarget || numeroTarget.length < 8) {
    return conn.reply(m.chat, `❌ Número inválido. Ingresá el número completo con código de país.`, m)
  }

  const resultado = await db.setRango(numeroTarget, nuevoRango)
  await conn.reply(m.chat, resultado.msg, m)
}
