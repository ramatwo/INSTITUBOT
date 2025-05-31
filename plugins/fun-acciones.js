let cooldowns = {} // Almacenar el tiempo de espera por chat

let handler = async (m, { conn, groupMetadata, text, command }) => {
    let id = m.chat

    if (id in cooldowns) {
        const timeLeft = (cooldowns[id] - Date.now()) / 1000
        if (timeLeft > 0) {
           
            return
        }
    }

    if (!m.mentionedJid[0] && !m.quoted) throw '⫹⫺ ➭⛔ ∫ Respondé el mensaje de alguien para hacerle alguna acción.'
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let participants = groupMetadata.participants
    conn.reply(m.chat, `Le acabás de ${command} ${text} a *@${user.split('@')[0]}* 😳`, null, { mentions: [user] })

    // Establecer el tiempo de espera de 5 segundos
    cooldowns[id] = Date.now() + 10000
}

handler.help = ['acciones']
handler.tags = ['acciones']
handler.command = /^(regalar|dar|enviar|meter|follar|chupar)$/
handler.group = true
handler.register = true 
export default handler
