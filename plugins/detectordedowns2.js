/*
let handler = async (m, { conn, text, command, usedPrefix }) => {
    try {
        // Agregamos la detección de la palabra "down"
        if (text.toLowerCase().includes('down')) {
            let name = await conn.getName(m.sender);
            let userData = global.db.data.users[m.sender];

            userData.warn = (userData.warn || 0) + 1;

            await conn.reply(m.chat, `⚠️ *@${m.sender.split`@`[0]}* has utilizado la palabra prohibida "down". Advertencia ${userData.warn}/3`, null, { mentions: [m.sender] });

            if (userData.warn >= 3) {
                userData.warn = 0;
                await conn.reply(m.chat, `🚫 *@${m.sender.split`@`[0]}* ha sido advertido tres veces y ha sido baneado.`, false, { mentions: [m.sender] });
                userData.banned = true;
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
            return;
        }

        // Resto del código original de advertencias
        let fkontak = { "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, "participant": "0@s.whatsapp.net" }
        let lenGB = lenguajeGB.lenguaje() == 'en' ? usedPrefix + 'on antitoxic' : usedPrefix + 'on antitoxic';
        if (!db.data.chats[m.chat].antitoxic && m.isGroup) return conn.reply(m.chat, lenguajeGB.smsAdveu1() + lenGB, fkontak, m);

        let who;
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
        else who = m.chat;

        let name = await conn.getName(m.sender);
        let user = global.db.data.users[who];
        if (!who) return conn.reply(m.chat, lenguajeGB.smsMalused3() + `*${usedPrefix}down @${name} ${lenguajeGB['smsAdveu2']()}*`, fkontak, m);
        let txt = text.replace('@' + who.split`@`[0], '').trim();
        if (!txt) return conn.reply(m.chat, lenguajeGB.smsAdveu3() + `*${usedPrefix}down @${name} ${lenguajeGB['smsAdveu2']()}*`, fkontak, m);

        user.warn += 1;
        await m.reply(
            `${
                user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
            } ${lenguajeGB['smsAdveu4']()}\n\n🫵 *${text}*\n\n*${lenguajeGB['smsAdveu5']()}*\n⚠️ *${user.warn}/3*`,
            null,
            { mentions: [who] }
        );

        if (user.warn >= 3) {
            user.warn = 0;
            await m.reply(`${lenguajeGB['smsAdveu7']()}\n*@${who.split`@`[0]}* ${lenguajeGB['smsAdveu8']()}`, false, { mentions: [who] });
            user.banned = true;
            await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
        }
    } catch (e) {
        console.log(e);
    }
};

handler.group = true;
handler.register = true;

export default handler;
*/