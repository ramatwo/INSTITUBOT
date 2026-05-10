
export async function run({ m, args, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 2) {
    return conn.reply(m.chat,
      `✏️ *Editar comunicado*\n\n` +
      `Uso: *${prefix}editar [ID] [nuevo texto]*\n\n` +
      `Ejemplo:\n_${prefix}editar T27B Reunión pospuesta para el viernes._\n\n` +
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

  //editar en whatsapp si ya se envio
  if (resultado.fueEnviado && resultado.msgKey) {
    try {
      const textoEditado = "*📣 • ANUNCIO OFICIAL (Editado)*\n\nEstimadas familias, se les informa que " + nuevoContenido
      await conn.sendMessage(resultado.msgKey.remoteJid, { 
        text: textoEditado, 
        edit: resultado.msgKey 
      })
    } catch (e) {
      console.error('[❌] Error al intentar editar mensaje en WhatsApp:', e.message)
    }
  }
 
  await conn.reply(m.chat,
    `✅ *Comunicado editado*\n` +
    (resultado.fueEnviado ? `_(También se actualizó en WhatsApp)_` : '') +
    `\n` +
    (anteriorPreview ? `📌 Anterior:\n~_${anteriorPreview}_~\n\n` : '') +
    `📝 Nuevo:\n_${nuevoContenido}_`,
    m
  )
}
