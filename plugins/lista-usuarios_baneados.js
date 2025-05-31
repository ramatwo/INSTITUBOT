let handler = async (m, { conn, isOwner }) => {
let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
let caption = `
*╭•·–| ⫹⫺ ➭⛔ USUARIOS BANEADOS ⫹⫺ ➭⛔ |–·•*
│ *Total : ${users.length} personas* ${users ? '\n' + users.map(([jid], i) => `
│
│ *${i + 1}.* ${conn.getName(jid) == undefined ? '*Sin Usuarios Baneados*' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*`.trim()

await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })}

handler.command = /^listabanuser|banlist|listausuarios|listbanuser|listabaneados|listban$/i
handler.register = true
export default handler
