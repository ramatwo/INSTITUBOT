
export async function run({ m, args, db, conn }) {
  const prefix = global.prefix || '.'

  if (args.length < 1) {
    return conn.reply(m.chat,
      `[🗑️] *Borrar comunicado*\n\n` +
      `Uso: *${prefix}borrar [ID]*\n\n` +
      `Ejemplo: _${prefix}borrar T27B_\n\n` +
      `Usá *${prefix}lista* para ver los IDs disponibles.`,
      m
    )
  }

  const id = args[0]


  const anuncio = await db.getAnuncio(id)
  const preview = anuncio?.contenido
    ? (anuncio.contenido.length > 80 ? anuncio.contenido.substring(0, 80) + '...' : anuncio.contenido)
    : null

  const resultado = await db.borrarAnuncio(id)
 
  if (!resultado.ok) {
    return conn.reply(m.chat, resultado.msg, m)
  }
 
  // Si ya fue enviado, intentar borrarlo del canal de WhatsApp
  if (resultado.fueEnviado && resultado.msgKey) {
    try {
      const channelId = global.channelId
      // Reconstruimos la key para asegurar que tenga los campos necesarios
      const key = {
        remoteJid: resultado.msgKey.remoteJid || channelId,
        id: resultado.msgKey.id,
        fromMe: true
      }

      if (key.remoteJid && key.id) {
        // En grupos estándar, el borrado es directo con sendMessage({ delete: key })
        await conn.sendMessage(key.remoteJid, { delete: key })
      } else {
        console.warn('[⚠️] No se pudo reconstruir la llave del mensaje para borrarlo.')
      }
    } catch (e) {
      console.error('[❌] Error al intentar borrar mensaje del canal:', e.message)
    }
  }
 
  await conn.reply(m.chat,
    `[🗑️] *Comunicado eliminado*\n` +
    (resultado.fueEnviado ? `_(También se intentó eliminar del canal)_` : '') +
    (preview ? `\n\n📝 Contenido eliminado:\n~_${preview}_~` : ''),
    m
  )
}
