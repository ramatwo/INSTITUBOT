
let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        let fkontak = {
            "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

        let menu = `*tocá en leer más 👇👇*
${readMore}
*╭━〔 INFORMACIÓN DE SODICA〕⬣*
┃ℹ️➺ _${usedPrefix}grupos_
┃ℹ️➺ _${usedPrefix}activo_
┃ℹ️➺ _${usedPrefix}ping_
*╰━━━━━━━━━━━━⬣*`;

        await conn.sendFile(m.chat, archivo, 'Menú de Información', menu, fkontak);
    } catch (e) {
        await m.reply(`*❗❗ Error en el comando:*\n*${usedPrefix}${command}*\n*Intenta de nuevo. Si el problema persiste, contacta al administrador.*`);
        console.error(`❗❗ Error en ${usedPrefix + command}:`, e);
    }
};

handler.command = /menuinfo/i;
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);