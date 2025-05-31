import { setCooldown, isCooldownActive } from '../lib/coldowntag.js';

let handler = async (m, { conn, text, participants, isOwner, isAdmin }) => {
    const id = m.chat;
    const cooldownTime = 4 * 60 * 60 * 1000; // 4 horas en milisegundos

    const timeLeft = isCooldownActive(id);
    if (timeLeft) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        conn.reply(
            m.chat,
            `⛔ Este comando está en cooldown. Esperá ${hours} horas, ${minutes} minutos y ${seconds} segundos antes de volver a usarlo.`,
            m
        );
        return;
    }

    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        throw false;
    }

    try {
        let users = participants.map((u) => conn.decodeJid(u.id));
        let q = m.quoted ? m.quoted : m || m.text || m.sender;
        let c = m.quoted ? await m.getQuotedObj() : m.msg || m.text || m.sender;
        let msg = conn.cMod(
            m.chat,
            generateWAMessageFromContent(
                m.chat,
                {
                    [m.quoted ? q.mtype : "extendedTextMessage"]: m.quoted
                        ? c.message[q.mtype]
                        : { text: "" || c },
                },
                { quoted: m, userJid: conn.user.id }
            ),
            text || q.text,
            conn.user.jid,
            { mentions: users }
        );
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

        setCooldown(id, cooldownTime); // Establecer el cooldown compartido
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, `❌ Hubo un error al ejecutar el comando.`, m);
    }
};

handler.command = /^(hidetag|notificar|notify)$/i;
handler.group = true;
handler.admin = true;
handler.register = true;
handler.owner = true;
export default handler;