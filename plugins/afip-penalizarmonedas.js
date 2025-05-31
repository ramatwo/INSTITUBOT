/*let pajak = 0
let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net']

let handler = async (m, { conn, text }) => {
    // Verificar si el remitente del mensaje es el usuario autorizado
    if (!allowedNumbers.includes(m.sender)) {
        return conn.reply(m.chat, 'Debés ser parte de la afip para poder penalizar', m)
    }

    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat

    if (!who) throw `Tenés que etiquetar a un usuario`
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `Ingresá la cantidad`
    if (isNaN(txt)) throw `Solo números`
    let xp = parseInt(txt)
    let exp = xp
    let pjk = Math.ceil(xp * pajak)
    exp -= pjk
    let users = global.db.data.users
    users[who].money -= xp

    conn.reply(m.chat, "Usuario penalizado.", m)
    let avisodeuso = "NUEVO USUARIO PENALIZADO MONEY"
    conn.sendMessage('5491162480909@s.whatsapp.net', {text: avisodeuso, mentions: [m.sender], },{ quoted: m })
}

handler.help = ['penalizar <@user>']
handler.tags = ['exp']
handler.command = ['penalizarmoney'] 
handler.group = true

export default handler
*/