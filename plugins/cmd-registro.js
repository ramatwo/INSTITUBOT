export async function run({ m, args, numero, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `📝 *Registro de cuenta*\n\n` +
      `Uso: *${prefix}registro [usuario] [PIN]*\n` +
      `• El usuario debe ser una sola palabra sin espacios\n` +
      `• El PIN debe tener exactamente 4 dígitos numéricos\n\n` +
      `Ejemplo: _${prefix}registro JuanPerez 1234_`,
      m
    )
  }

  const nombreUsuario = args[0]
  const pin = args[1]

  if (!/^[a-zA-Z0-9_\-]{3,20}$/.test(nombreUsuario)) {
    return conn.reply(m.chat,
      `❌ Nombre de usuario inválido.\n` +
      `• Solo letras, números, _ y -\n` +
      `• Entre 3 y 20 caracteres`,
      m
    )
  }

  if (!/^\d{4}$/.test(String(pin))) {
    return conn.reply(m.chat, global.MSG?.pinInvalido || '❌ El PIN debe tener exactamente 4 dígitos numéricos.', m)
  }

  const resultado = await db.registrarUsuario(numero, nombreUsuario, pin)
  await conn.reply(m.chat, resultado.msg, m)
}
