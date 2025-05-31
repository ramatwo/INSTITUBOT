let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr, reason;
    try {
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '')
        }

        if (m.quoted) {
            user = m.quoted.sender;
            reason = text || 'Sin motivo especificado.';
        } else {
            if (isNaN(text)) {
                number = text.split`@`[1];
            } else if (!isNaN(text)) {
                number = text;
            }

            user = conn.user.jid.split`@`[0] + '@s.whatsapp.net';

            if (!text && !m.quoted) return conn.reply(m.chat, 'Debes mencionar al usuario o proporcionar un motivo.', null, { mentions: [user] });

            reason = m.text.slice(command.length).trim() || 'Sin motivo especificado.';
        }

        bot = conn.user.jid.split`@`[0];
        bant = lenguajeGB.smsPropban1(usedPrefix, command, bot);

        number = user.split('@')[0];

        if (user === conn.user.jid) return conn.reply(m.chat, 'Tenés q responder el mensaje del usuario', null, { mentions: [user] });

        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0];
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net';
                await conn.reply(m.chat, lenguajeGB.smsPropban3(ownerNumber), null, { mentions: [aa] });
                return;
            }
        }

        users = global.db.data.users;
        if (users[user].banned === true) conn.reply(m.chat, lenguajeGB.smsPropban4(number), null, { mentions: [user] });

        users[user].banned = true;
        users[user].BannedReason = reason;
        usr = m.sender.split('@')[0];
        const { key } = await conn.sendMessage(m.chat, {text: "*↺ CARGANDO...*"}, {quoted: fkontak});

        await new Promise(resolve => setTimeout(resolve, 2000));
        await conn.sendMessage(m.chat, {text: "*✅ Usuario baneado del sistema.*", edit: key});
        //let msj1 = "```⫹⫺ ➭⛔ ∫ Enviando solicitud de bloqueo a la base de datos```";
        //let msj2 = "```⫹⫺ ➭✅ ∫ Solicitud recibida y aceptada...```";
        //let msj3 = "```👤➭⛔ ∫ Usuario baneado correctamente.```";

       // await conn.reply(m.chat, msj1, null, { mentions: [user] });
        //await conn.reply(m.chat, msj2, null, { mentions: [user] });
       // await conn.reply(m.chat, msj3, null, { mentions: [user] });

        // Enviar mensaje al grupo "Baneos" directamente usando la ID
        let grupoBaneosId = '120363242415086957@g.us';
        await conn.sendMessage(grupoBaneosId, { text: `*⛔  ∫ Nuevo usuario baneado:* +${number}\n*‼️  ∫ Motivo:* _${reason}_` }, { quoted: m });


        await conn.reply(user, lenguajeGB.smsPropban6(number, usr, reason), null, { mentions: [user, m.sender] });
    } catch (e) {
        console.log(e);
    }
}

handler.command = /^banuser|publicbanuser|pbbanuser$/i
handler.rowner = true
export default handler
