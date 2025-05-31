export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    let delet = m.key.participant;
    let bang = m.key.id;

    // Simple regex para detectar cualquier enlace
    const linkRegex = /https?:\/\/[^\s]+/i;
    const isLink = linkRegex.test(m.text);

    if (chat.antiLink2 && isLink && !isAdmin) {
        if (!isBotAdmin) {
            console.log("ANTILINK2 EJECUTADO. BOT NO ES ADMIN.");  
            return !0; 
        }
        
        // Verificamos si el participante es EXTBot
        let participantJid = m.key.participant;
        let isExtBot = participantJid === global.conn.user.jid;

        if (isExtBot) {
            console.log("ANTILINK EJECUTADO. EL BOT ES UN EXTBOT");
            return !0;  // Si es un EXTBot, no eliminamos
        }

        // Si el usuario no es EXTBot, procedemos a eliminarlo
        await m.reply(`*🛡️➭⛔ Enlace detectado. Removiendo vagabundo...*`);
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }});

    }

    return !0;
}
