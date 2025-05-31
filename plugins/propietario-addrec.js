//let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net', '5491132690592@s.whatsapp.net', '56965538527@s.whatsapp.net'];

let handler = async (m, { conn, args, command }) => {
    // Verificar si el remitente está autorizado
    /*
    if (!allowedNumbers.includes(m.sender)) {
        return conn.reply(m.chat, 'Debés ser parte de la AFIP para poder añadir recursos.', m);
    }
*/
    // Validar argumentos
    if (args.length < 3) {
        throw `Uso incorrecto. El formato es:\n.addr {tipo} {cantidad} {usuario}`;
    }

    let tipo = args[0].toLowerCase();
    let cantidad = parseInt(args[1]);
    if (isNaN(cantidad)) throw `El uso correcto es *.addr {tipo} {cantidad} {usuario}*`;
    if (!['exp', 'money', 'diamante', 'tokens', 'oro'].includes(tipo)) {
        throw `El tipo debe ser uno de los siguientes: exp, money, diamante, tokens, oro.`;
    }

    // Capturar usuario
    let who;
    let match = args[2].match(/\d{9,15}/); // Buscar número de teléfono
    if (match) {
        who = match[0].replace(/\D/g, ''); // Quitar caracteres no numéricos
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

    // Penalizar al usuario según el tipo
    let users = global.db.data.users;
    if (tipo === 'exp') {
        users[who].exp += cantidad;
    } else if (tipo === 'money') {
        users[who].money += cantidad;
    } else if (tipo === 'diamante') {
        users[who].diamante += cantidad;
    } else if (tipo === 'tokens') {
        users[who].token += cantidad;
    } else if (tipo === 'oro') {
        users[who].oro += cantidad;
    }

    // Notificar al remitente
    conn.reply(m.chat, `*✅ USUARIO ACTUALIZADO ✅*\n\n*👤 Usuario:* ${who}\n*📡 Tipo:* ${tipo}\n*📈 Cantidad:* ${cantidad}`, m);

    // Notificar al administrador principal
    let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}\n\n ⁉️ *INFORMACIÓN:*\n *👤 Usuario:* ${who}\n *📡 Tipo:* ${tipo}\n *📈 Cantidad:* ${cantidad}`;
    conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['addr {tipo} {cantidad} {usuario}'];
handler.tags = ['exp'];
handler.command = ['addr'];
handler.group = true;
handler.rowner = true
export default handler