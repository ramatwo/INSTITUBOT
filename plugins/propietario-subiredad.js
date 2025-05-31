import { createHash } from 'crypto'; 
import PhoneNumber from 'awesome-phonenumber';

let handler = async (m, { conn, text, command }) => {
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
    let ageMatch = user.age.match(/^(\d{1,2})/);
    if (ageMatch) {
        let currentAge = parseInt(ageMatch[1]);
        let newAge = currentAge + 1;
        user.age = user.age.replace(/^(\d{1,2})/, newAge);
    }
    let str = `edad subida con exito`.trim();
    let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
    conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
    conn.sendFile(m.chat, archivo, 'perfil.jpg', str, fkontak, false, {
        contextInfo: { mentionedJid: [who] }
    });
};

handler.help = ['perfil [número de teléfono]'];
handler.tags = ['xp'];
handler.command = /^subiredad?$/i;
handler.register = true;
handler.rowner = true;
export default handler;

// Función para procesar el número de teléfono
function parsePhoneNumber(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '') + '@s.whatsapp.net';
}
