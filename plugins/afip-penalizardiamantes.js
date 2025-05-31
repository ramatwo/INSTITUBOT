/*let pajak = 0;
let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net'];

let handler = async (m, { conn, text }) => {
    // Verificar si el remitente está autorizado
    if (!allowedNumbers.includes(m.sender)) {
        return conn.reply(m.chat, 'Debés ser parte de la AFIP para poder penalizar.', m);
    }

    let who;
    // Capturar número o mención
    let match = text.match(/\d{9,15}/); // Buscar un número en el texto
    if (match) {
        who = match[0].replace(/\D/g, ''); // Quitar caracteres no numéricos
        who = who.startsWith('549') ? who : '549' + who; // Asegurar el prefijo
        who += '@s.whatsapp.net'; // Convertir a JID
    } else if (m.isGroup && m.mentionedJid.length > 0) {
        who = m.mentionedJid[0]; // Usar mención
    } else {
        throw `Debés etiquetar a un usuario o proporcionar un número de teléfono.`;
    }

    // Validar si el usuario existe en la base de datos
    if (!(who in global.db.data.users)) {
        throw `El usuario ${who} no está registrado en la base de datos.`;
    }

    // Capturar la cantidad a penalizar
    let txt = text.replace(/\d{9,15}/, '').trim(); // Eliminar el número para obtener el valor
    if (!txt) throw `Ingresá la cantidad.`;
    if (isNaN(txt)) throw `Solo números.`;

    let xp = parseInt(txt);
    let exp = xp;
    let pjk = Math.ceil(xp * pajak);
    exp -= pjk;

    // Penalizar al usuario
    let users = global.db.data.users;
    users[who].diamante -= xp;

    // Notificar al remitente
    conn.reply(m.chat, `Usuario penalizado: ${who}\nCantidad: ${xp} diamantes.`, m);

    // Notificar al administrador principal
    let avisodeuso = `NUEVO USUARIO PENALIZADO\n- Usuario: ${who}\n- Penalización: ${xp} diamantes`;
    conn.sendMessage('5491162480909@s.whatsapp.net', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['penalizar <@user o número de teléfono>'];
handler.tags = ['exp'];
handler.command = ['penalizardiamantes'];
handler.group = true;

export default handler;
*/