import hispamemes from 'hispamemes'
let handler = async (m, {usedPrefix, command, conn}) => {
    if (global.conn.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, {text: `*USE ESTE COMANDO EN EL BOT PRINCIPAL* \n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}*`}, { quoted: m }) 
        }
const url = await hispamemes.meme()  
conn.sendFile(m.chat, url, 'error.jpg', `😂😂😂`, m)}
//conn.sendButton(m.chat, `_${command}_`.trim(), author, url, [['𝙎𝙄𝙂𝙐𝙄𝙀𝙉𝙏𝙀 | 𝙉𝙀𝙓𝙏 🆕', `/${command}`]], m)}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme|momo|memes)$/i
export default handler
