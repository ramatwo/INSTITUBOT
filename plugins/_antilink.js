let handler = m => m;
let lastMessageTime = 0; // Variable global para almacenar el tiempo del último mensaje enviado

handler.before = async function (m, { isAdmin, isBotAdmin, conn, isROwner }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;
    //if (isROwner) return !0

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    let delet = m.key.participant;
    let bang = m.key.id;

    // Expresión regular para detectar enlaces de grupos y canales de WhatsApp
    let linkRegex = /(chat\.whatsapp\.com\/[0-9A-Za-z]{20,24})|(whatsapp\.com\/channel\/[0-9A-Za-z]+)/i;
    const isLink = linkRegex.exec(m.text);

    if (chat.antiLink && isLink && !isAdmin) {
        if (!isBotAdmin) {
            console.log("ANTILINK EJECUTADO. BOT NO ES ADMIN.");
            return !0;
        }

        // Excluir el enlace del grupo actual
        const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
        if (m.text.includes(linkThisGroup)) return !0;

        // Verificar si han pasado al menos 5 segundos desde el último mensaje
        const now = Date.now();
        if (now - lastMessageTime >= 5000) {
            await m.reply(`*🛡️➭⛔ Enlace detectado.* Removiendo vagabundo...`);
            lastMessageTime = now; // Actualizar el tiempo del último mensaje enviado
        }

        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }

    return !0;
};

export default handler;