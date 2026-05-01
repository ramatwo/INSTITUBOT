
export async function run({ m, args, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `✏️ *Editar comunicado*\n\n` +
      `Uso: *${prefix}editar [ID] [nuevo texto]*\n\n` +
      `Ejemplo:\n_${prefix}editar abc12345 Reunión pospuesta para el viernes._\n\n` +
      `Usá *${prefix}lista* para ver los IDs disponibles.`,
      m
    )
  }

  const id = args[0]
  const nuevoContenido = args.slice(1).join(' ').trim()

  if (!nuevoContenido) {
    return conn.reply(m.chat, `❌ El nuevo contenido no puede estar vacío.`, m)
  }

  const anuncio = await db.getAnuncio(id)
  const anteriorPreview = anuncio?.contenido
    ? (anuncio.contenido.length > 60 ? anuncio.contenido.substring(0, 60) + '...' : anuncio.contenido)
    : null

  const resultado = await db.editarAnuncio(id, nuevoContenido)

  if (!resultado.ok) {
    return conn.reply(m.chat, resultado.msg, m)
  }

  await conn.reply(m.chat,
    `✅ *Comunicado editado*\n\n` +
    (anteriorPreview ? `📌 Anterior:\n~_${anteriorPreview}_~\n\n` : '') +
    `📝 Nuevo:\n_${nuevoContenido}_`,
    m
  )
}
