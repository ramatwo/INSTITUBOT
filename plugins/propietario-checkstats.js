import { createHash } from 'crypto'; 
import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

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

    let pp = 'https://i.imgur.com/ZjvbaOA.jpg'; // Imagen por defecto si no hay foto de perfil disponible
    let who;
m.react('⌛️')
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

    try {
        pp = await conn.profilePictureUrl(who, 'image'); // Usar profilePictureUrl
    } catch (e) {
        console.error('Error al obtener la foto de perfil:', e);
    }

    let user = global.db.data.users[who];
    let { name, registered, regTime, age, premium } = user;
    let username = conn.getName(who);
    let sn = createHash('md5').update(who).digest('hex');

    // Obtener grupos en común
    let groupsInCommon = [];
    try {
        const groups = Object.keys(conn.chats).filter(jid => jid.endsWith('@g.us')); // Obtener todos los grupos
        for (let gid of groups) {
            const participants = (await conn.groupMetadata(gid)).participants || [];
            if (participants.some(p => p.id === who)) {
                groupsInCommon.push((await conn.groupMetadata(gid)).subject);
            }
        }
    } catch (e) {
        console.error('Error al obtener grupos en común:', e);
    }

    // Obtener descripción del usuario
    let description = '';
    try {
        description = (await conn.fetchStatus(who))?.status || 'Sin descripción disponible';
    } catch (e) {
        console.error('Error al obtener la descripción del usuario:', e);
        description = 'Sin descripción disponible';
    }

    const cartera = {
        economia: {
            exp: true,
            diamante: true,
            money: true,
            oro: true,
        },
    };
    const recursos = Object.keys(cartera.economia)
        .map(v => user[v] && `*${global.rpgshop.emoticon(v)} ⇢ ${user[v].toFixed(1).replace('.', ',')}*`)
        .filter(v => v)
        .join('\n')
        .trim();

            let bitlyResponse = await fetch('https://api-ssl.bitly.com/v4/shorten', {
                method: 'POST',
                headers: {
                    'Authorization': '109ebd91de889f935447c6bfd097ab5cd010e2a5',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "long_url": pp, "domain": "bit.ly" })
            });
            let bitlyJson = await bitlyResponse.json();
        
            //let hasil = `*✅ ∫ Link acortado exitosamente:*\n*https://${bitlyJson.id}*`.trim();
            m.react('✅')
    let str = `
*『 INFORMACION DEL USUARIO 』*
👤 *Usuario*: ${name || username || 'No registrado'}
📍 *Número*: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
${registered ? `🧮 *Edad*: ${age || 'N/A'}
💾 *Registrado*: ${registered ? '✅' : '❎'}
🔖 *Premium*: ${premium ? '✅' : '❌'}
🔗 *SN*: *${sn}*
📆 *Fecha de registro*:\n${registered ? new Date(regTime) : 'N/A'}

*『 ESTADO RPG 』*
${recursos}` : ''}

*『 INFORMACION PERSONAL 』*
🖼️ *Foto de perfil*: https://${bitlyJson.id}
📋 *Grupos en común*: ${groupsInCommon.length > 0 ? groupsInCommon.join(', ') : 'Ninguno (probablemente)'}
📝 *Descripción del usuario*: ${description}

*『 ESTADO DEL USUARIO 』*
🚫 *Baneado*: ${user.banned ? '✅' : '❌'}
${user.banned && user.BannedReason ? `📝 *Motivo del baneo*: ${user.BannedReason}` : ''}
`.trim();

    conn.sendFile(m.chat, pp, 'perfil.jpg', str, fkontak, false, {
        contextInfo: { mentionedJid: [who] }
    });
};

handler.help = ['CHECKSTATS [número de teléfono]'];
handler.tags = ['xp'];
handler.command = /^checkstats?$/i;
handler.register = true;
handler.rowner = true
export default handler;

// Función para procesar el número de teléfono
function parsePhoneNumber(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '') + '@s.whatsapp.net';
}
