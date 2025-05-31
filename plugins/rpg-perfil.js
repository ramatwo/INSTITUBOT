import { createHash } from 'crypto'; 
import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn, text }) => {
    let fkontak = {
        "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    };

    let who;

    // Validar si se proporcionó un número de teléfono
    if (text) {
        who = parsePhoneNumber(text);
    } else if (m.isGroup && (m.mentionedJid && m.mentionedJid[0])) {
        who = m.mentionedJid[0];
    } else {
        who = m.sender;
    }

    if (!(who in global.db.data.users)) {
        throw `*⫹⫺ ➭⛔ El usuario no está registrado en la base de datos.*`;
    }

    let user = global.db.data.users[who];
    let { name, registered, regTime, age, premium, birthday } = user;
    let username = conn.getName(who);
    let sn = createHash('md5').update(who).digest('hex');

    // Función para formatear la fecha
    const formatDate = (date) => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        let d = new Date(date);
        let dayName = days[d.getDay()];
        let day = String(d.getDate()).padStart(2, '0');
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${dayName} ${day}/${month}/${year}`;
    };

    let formattedRegTime = registered ? formatDate(regTime) : 'N/A';

    let str = `
👤 *Usuario*: ${name || username || 'No registrado'}
📍 *Número*: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
${registered ? `🧮 *Edad*: ${age || 'N/A'}` : ''}
🎂 *Cumpleaños*: ${birthday || 'No registrado'}
💾 *Registrado*: ${registered ? '✅' : '❎'}
🔖 *Premium*: ${premium ? '✅' : '❌'}
🔗 *SN*: *${sn}*
📆 *Fecha de registro*: ${formattedRegTime}
🏆 *Victorias*: ${user.victorias || 0}
🩼 *Derrotas*: ${user.derrotas || 0}
⚖️ *WinRate*: ${((user.victorias / (user.victorias + user.derrotas)) * 100).toFixed(2) || 0}%
`.trim();

    conn.sendFile(m.chat, archivo, 'perfil.jpg', str, fkontak, false, {
        contextInfo: { mentionedJid: [who] }
    });
};

handler.help = ['perfil [número de teléfono]'];
handler.tags = ['xp'];
handler.command = /^perfil|profile?$/i;
handler.register = true;
export default handler;

// Función para procesar el número de teléfono
function parsePhoneNumber(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '') + '@s.whatsapp.net';
}