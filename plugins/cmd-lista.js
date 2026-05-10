
export async function run({ m, db, conn }) {
  const pendientes = await db.listarPendientes()
  const enviados = await db.listarEnviados(5)

  if (pendientes.length === 0 && enviados.length === 0) {
    return conn.reply(m.chat,
      `📋 *Lista de comunicados*\n\n` +
      `✅ No hay comunicados registrados actualmente.`,
      m
    )
  }

  let texto = `📋 *Lista de Comunicados*\n`
  texto += `━━━━━━━━━━━━━━━━━━━━━━━\n`

  if (pendientes.length > 0) {
    texto += `\n⏳ *PENDIENTES (${pendientes.length})*\n`
    const grupos = {}
    for (const a of pendientes) {
      if (!grupos[a.fecha_envio]) grupos[a.fecha_envio] = []
      grupos[a.fecha_envio].push(a)
    }

    for (const [fecha, anuncios] of Object.entries(grupos)) {
      const [anio, mes, dia] = fecha.split('-')
      texto += `\n📅 *${dia}/${mes}/${anio}*\n`
      for (const a of anuncios) {
        const preview = a.contenido.length > 60
          ? a.contenido.substring(0, 60) + '...'
          : a.contenido
        texto += `  ┣ ID: \`${a._id}\`\n  ┃  _${preview}_\n`
      }
    }
  }

  if (enviados.length > 0) {
    texto += `\n\n✅ *ÚLTIMOS ENVIADOS*\n`
    for (const a of enviados) {
      const preview = a.contenido.length > 60
        ? a.contenido.substring(0, 60) + '...'
        : a.contenido
      texto += `  ┣ ID: \`${a._id}\`\n  ┃  _${preview}_\n`
    }
  }

  texto += `\n━━━━━━━━━━━━━━━━━━━━━━━\n`
  texto += `Usá el ID completo en *.editar* o *.borrar*.\n`
  texto += `💡 Tip: Podés borrar uno ya enviado para quitarlo del canal.`

  await conn.reply(m.chat, texto.trim(), m)
}
