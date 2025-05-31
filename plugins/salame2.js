// plugins/salame2.js

import pkg from '@whiskeysockets/baileys'
const { proto } = pkg

let handler = async (m, { conn }) => {
  // 1) JID EXACTO de tu canal (tal como lo confirmó WhatsApp):
  const channelJid = '120363401736886654@newsletter'

  // 2) Construcción del mensaje “raw” en formato protobuf:
  const msg = { conversation: 'Enviando salame al canal: @120363401736886654' }
  const plaintext = proto.Message.encode(msg).finish()
  const plaintextNode = {
    tag: 'plaintext',
    attrs: {},
    content: plaintext
  }

  // 3) Empaquetamos todo en el nodo <message to="...@newsletter" type="text">
  const node = {
    tag: 'message',
    attrs: { to: channelJid, type: 'text' },
    content: [plaintextNode]
  }

  // 4) Enviar con conn.query para no “normalizar” el @newsletter a chat individual
  try {
    await conn.query(node)
    // Opcional: notificar al usuario que ejecutó el comando
    await conn.sendMessage(m.chat, { text: '✅ Mensaje enviado al canal.' })
  } catch (err) {
    console.error('Error al enviar al canal:', err)
    await conn.sendMessage(m.chat, { text: '❌ No se pudo enviar al canal.' })
  }
}

handler.help = ['salamecanal']
handler.tags = ['xp']
handler.command = ['salamin']
export default handler
