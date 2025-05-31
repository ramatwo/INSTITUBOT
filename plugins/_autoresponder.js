let handler = m => m

handler.all = async function (m, { conn }) {
  let chat = global.db.data.chats[m.chat]
  
  /*if (m.mentionedJid.includes(this.user.jid) && m.isGroup && !chat.isBanned) {

    this.reply(m.chat, 'porno gay', null, { contextInfo: { mentionedJid: [this.user.jid] }})
  }*/
  
  // Asegúrate de que el número de teléfono esté en el formato correcto
  /*if (m.mentionedJid.includes('5491151244787@s.whatsapp.net')) {

    this.reply(m.chat, 'ese es mi creador 😛😛', m, { mentions: { mentionedJid: [m.sender] }})
  }*/

  return !0
}

export default handler

