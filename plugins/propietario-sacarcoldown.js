


let handler = async (m, { conn, command }) => {
        conn.reply(m.chat, `*ÉXITO*`, m)
        global.db.data.users[m.sender].lastrob = 100
        global.db.data.users[m.sender].lastmiming = 100
        global.db.data.users[m.sender].lastwork = 100
        global.db.data.users[m.sender].lastmonthly = 100
        global.db.data.users[m.sender].lastweekly = 100
        global.db.data.users[m.sender].lastclaim = 100
        global.db.data.users[m.sender].lasthourly = 100
        global.db.data.users[m.sender].lastadventure = 100
        global.db.data.users[m.sender].lastberburu = 100
        global.db.data.users[m.sender].lastcofre = 100
        global.db.data.users[m.sender].lastdiamantes = 100
        global.db.data.users[m.sender].lastcoins = 100
        global.db.data.users[m.sender].donantetime = 100
        let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
        conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });

}
handler.help = ['cheat']
handler.tags = ['owner']
handler.command = /^coldown0$/i
handler.rowner = true

//handler.money = 0

export default handler
