/*let pajak = 0;
let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net', '5491132690592@s.whatsapp.net'];

let handler = async (m, { conn, text }) => {
    // Verificar si el remitente del mensaje es el usuario autorizado
    if (!allowedNumbers.includes(m.sender)) {
        return conn.reply(m.chat, 'Debés ser parte de la AFIP para poder penalizar.', m);
    }

    if (global.conn.user.jid !== conn.user.jid) {
        console.log("Comando de penalizar interceptado.");
    }

    let who;
    let match = text.match(/\d{9,15}/); // Buscar número de teléfono en el texto
    if (match) {
        who = match[0] + '@s.whatsapp.net'; // Convertir a JID
    } else if (m.isGroup && m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Usar mención si no hay número
    } else {
        throw `Debés etiquetar a un usuario o proporcionar un número de teléfono.`;
    }

    if (!(who in global.db.data.users)) {
        throw `El usuario ${who} no está registrado en la base de datos.`;
    }

    // Eliminar número o mención del texto para obtener la cantidad
    let txt = text.replace(/\d{9,15}/, '').replace('@' + who.split`@`[0], '').trim();
    if (!txt) throw `Ingresá la cantidad.`;
    if (isNaN(txt)) throw `Solo números.`;

    let xp = parseInt(txt);
    let exp = xp;
    let pjk = Math.ceil(xp * pajak);
    exp -= pjk;

    // Penalizar al usuario
    let users = global.db.data.users;
    users[who].exp -= xp;

    // Añadir XP a la caja de ahorros
    global.db.data.users['5491159909622@s.whatsapp.net'].money += xp;

    // Notificar al remitente
    conn.reply(m.chat, `Usuario penalizado: ${who}\nCantidad: ${xp} EXP.`, m);

    // Notificar al administrador principal
    let avisodeuso = `NUEVO USUARIO PENALIZADO\n- Usuario: ${who}\n- Penalización: ${xp} EXP`;
    conn.sendMessage('5491162480909@s.whatsapp.net', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['penalizar <@user o número de teléfono>'];
handler.tags = ['exp'];
handler.command = ['penalizarexp'];
handler.group = true;

export default handler;
*/