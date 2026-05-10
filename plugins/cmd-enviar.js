
import { fechaHoyAR } from '../lib/cron.js'
 
export async function run({ m, textoCompleto, userData, conn, db, numero }) {
  const prefix = global.prefix || '.'
 
  if (!textoCompleto.trim()) {
    return conn.reply(m.chat,
      `📣 *Enviar comunicado*\n\n` +
      `Uso: *${prefix}enviar [texto del aviso]*\n\n` +
      `Ejemplo:\n_${prefix}enviar 🏫 Mañana no habrá clases por jornada docente._`,
      m
    )
  }
 
  const channelId = global.channelId
  if (!channelId) {
    return conn.reply(m.chat,
      `⚠️ El ID del canal de WhatsApp no está configurado.\n` +
      `Editá *config.js* y asignale el valor a *global.channelId*`,
      m
    )
  }
 
  try {
    const texto = textoCompleto.trim()
    const textoFinal = "*📣 • ANUNCIO OFICIAL*\n\nEstimadas familias, se les informa que " + texto
    const sent = await conn.sendMessage(channelId, { text: textoFinal })
    
    //guardar en db
    const hoy = fechaHoyAR()
    const resultado = await db.crearAnuncio(texto, hoy, numero, 'enviado', sent.key)
 
    await conn.reply(m.chat,
      `[✅] *Publicado*\n\n` +
      `🆔 ID: *${resultado.id}*\n` +
      `📝 Contenido:\n_${texto}_\n\n` +
      `Podés borrarlo del canal usando *${prefix}borrar ${resultado.id}*`,
      m
    )
  } catch (e) {
    console.error('[❌] Error al publicar en canal:', e.message)
    await conn.reply(m.chat,
      `[❌] No se pudo publicar el comunicado en el canal.\n` +
      `⚠️ Verificá que:\n• El ID del canal sea correcto\n• El bot sea administrador del canal\n\n` +
      `❌ Error: \`${e.message}\``,
      m
    )
  }
}
