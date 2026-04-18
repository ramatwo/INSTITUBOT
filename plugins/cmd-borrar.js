// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-borrar.js — Comando .borrar [id]
// ─────────────────────────────────────────────────────────────────────────────

export async function run({ m, args, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 1) {
    return conn.reply(m.chat,
      `🗑️ *Borrar comunicado*\n\n` +
      `Uso: *${prefix}borrar [ID]*\n\n` +
      `Ejemplo: _${prefix}borrar abc12345_\n\n` +
      `Usá *${prefix}lista* para ver los IDs disponibles.`,
      m
    )
  }

  const id = args[0]

  // Obtener preview antes de borrar
  const anuncio = await db.getAnuncio(id)
  const preview = anuncio?.contenido
    ? (anuncio.contenido.length > 80 ? anuncio.contenido.substring(0, 80) + '...' : anuncio.contenido)
    : null

  const resultado = await db.borrarAnuncio(id)

  if (!resultado.ok) {
    return conn.reply(m.chat, resultado.msg, m)
  }

  await conn.reply(m.chat,
    `🗑️ *Comunicado eliminado*\n` +
    (preview ? `\n📝 Contenido eliminado:\n~_${preview}_~` : ''),
    m
  )
}
