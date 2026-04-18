// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-lista.js — Comando .lista
// ─────────────────────────────────────────────────────────────────────────────

export async function run({ m, db, conn }) {
  const pendientes = await db.listarPendientes()

  if (pendientes.length === 0) {
    return conn.reply(m.chat,
      `📋 *Lista de comunicados pendientes*\n\n` +
      `✅ No hay comunicados programados actualmente.`,
      m
    )
  }

  // Agrupar por fecha
  const grupos = {}
  for (const a of pendientes) {
    if (!grupos[a.fecha_envio]) grupos[a.fecha_envio] = []
    grupos[a.fecha_envio].push(a)
  }

  let texto = `📋 *Comunicados Pendientes* (${pendientes.length})\n`
  texto += `━━━━━━━━━━━━━━━━━━━━━━━\n`

  for (const [fecha, anuncios] of Object.entries(grupos)) {
    const [anio, mes, dia] = fecha.split('-')
    texto += `\n📅 *${dia}/${mes}/${anio}*\n`
    for (const a of anuncios) {
      const shortId = a._id.substring(0, 8)  // Primeros 8 chars del ID NeDB
      const preview = a.contenido.length > 75
        ? a.contenido.substring(0, 75) + '...'
        : a.contenido
      texto += `  ┣ ID: \`${shortId}\`\n  ┃  _${preview}_\n`
    }
  }

  texto += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`
  texto += `Usá el ID completo en *.editar* o *.borrar*.\n`
  texto += `💡 Tip: Podés copiar el ID tocándolo.`

  await conn.reply(m.chat, texto.trim(), m)
}
