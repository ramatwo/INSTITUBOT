let handler = async (m, { conn, text, command }) => {
    let id = text ? text : m.chat  
    let chat = global.db.data.chats[m.chat]
    chat.welcome = false
    await conn.reply(id, `*${wm} 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊*`) 
    await conn.groupLeave(id)
    let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
    conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
    try {  
    chat.welcome = false
    } catch (e) {
    await m.reply(`${fg}`) 
    return console.log(e)
    }}
    handler.command = /^(salir|leavegc|salirdelgrupo|leave)$/i
    handler.group = true
    handler.rowner = true
    export default handler