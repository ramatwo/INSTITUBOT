//let { MessageType } = require('@adiwajshing/baileys')
//import MessageType from '@adiwajshing/baileys'
//SOLO USA SI ERES EL/LA PROPIETARIO(A) DEL BOT PARA TENER TODO ILIMITADO O USA EL COMANDO PREMIUM Jajaj
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
        conn.reply(m.chat, `*ÉXITO*`, m)
        global.db.data.users[m.sender].money = 9999999
        global.db.data.users[m.sender].diamante = 9999999
        //global.db.data.users[m.sender].level = Infinity
        
}
handler.help = ['cheat']
handler.tags = ['owner']
handler.command = /^(ilimitado|infiniy)$/i
handler.rowner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
//handler.money = 0

export default handler
