let handler = async (m, { conn, isOwner }) => {
let vip = global.db.data.users[m.sender].premium
let prem = Object.entries(global.db.data.users).filter(user => user[1].premium)
let caption = `🎟️ *USUARIOS VIP*
*╭•·–––––––––––––––––––·•*
│ *Total : ${prem.length} Usuarios* ${prem ? '\n' + prem.map(([jid], i) => `
│ *${i + 1}.* ${conn.getName(jid) == undefined ? 'Sin Usuarios' : conn.getName(jid)}
│ ${isOwner ? '@' + jid.split`@`[0] : jid}\n│ - - - - - - - - -`.trim()).join('\n') : ''}
*╰•·–––––––––––––––––––·•*\n\n🎟️ *¿Vos sos vip?:* ⇢ ${vip ? '✅' : '❌'}`
await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })

}
handler.command = /^(listapremium|premiumlist)$/i
handler.register = true
export default handler
