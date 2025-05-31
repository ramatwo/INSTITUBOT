import { setCooldown, isCooldownActive } from '../lib/coldowntag.js';

let handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
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

    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let pesan = args.join` `;
    let oi = `*➭* Mensaje: ${pesan}`;
    let teks = `╭━〔 *🚨🚨INVOCANDO A TODOS🚨🚨* 〕━⬣\n\n${oi}\n\n${readMore}`;
    for (let mem of participants) {
        teks += `┃⊹ @${mem.id.split('@')[0]}\n`;
    }
    teks += `┃\n`;
    teks += `╰━━━━━[ *${wm}* ]━━━━━⬣`;
    conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) });

    setCooldown(id, cooldownTime); // Establecer el cooldown compartido
};

handler.command = /^(tagall|invocar|invocacion|todos|invocación)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.register = true;
handler.owner = true;
export default handler;