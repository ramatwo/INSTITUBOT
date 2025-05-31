//ban grupos
let handler = async (m, { conn }) => {
  if (!(m.chat in global.db.data.chats)) return m.reply('*Este chat no está registrado en la base de datos!*')
  let chat = global.db.data.chats[m.chat]
  if (!chat.isBanned) return m.reply('*Este chat no está baneado *')
  chat.isBanned = false
  m.reply(`Listo.`)
}
handler.command = /^unbanchat$/i
handler.rowner = true
export default handler
