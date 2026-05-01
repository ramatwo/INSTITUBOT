export async function run({ m, args, numero, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `🔐 *Iniciar sesión*\n\n` +
      `Uso: *${prefix}login [usuario] [PIN]*\n\n` +
      `Si no tenés cuenta, registrate con:\n*${prefix}registro [usuario] [PIN]*`,
      m
    )
  }

  const nombreUsuario = args[0]
  const pin = args[1]

  const resultado = await db.loginUsuario(numero, nombreUsuario, pin)
  await conn.reply(m.chat, resultado.msg, m)
}
