let handler = async (m, { conn, text, command, usedPrefix }) => {
if (!text) throw `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘽𝘼𝙉𝙀𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} @tag*\n\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙏𝙊 𝙐𝙉𝘽𝘼𝙉\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} @tag*`
let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
if (!who) throw `${mg}𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝙀 𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙋𝘼𝙍𝘼 𝘿𝙀𝙎𝘽𝘼𝙉𝙀𝘼𝙍\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} @tag*\n\n𝙏𝘼𝙂 𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙏𝙊 𝙐𝙉𝘽𝘼𝙉\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} @tag*`
const { key } = await conn.sendMessage(m.chat, {text: "*↺ CARGANDO...*"}, {quoted: fkontak});
let users = global.db.data.users
users[who].banned = false
users[who].antispam == 0
await new Promise(resolve => setTimeout(resolve, 2000));
await conn.sendMessage(m.chat, {text: "*✅ Usuario desbaneado del sistema.*", edit: key});
let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
}
handler.help = ['unbanuser']
handler.tags = ['owner']
handler.command = /^unbanuser$/i
handler.rowner = true
export default handler
