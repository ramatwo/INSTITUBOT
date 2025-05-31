

let handler = async (m, { conn, usedPrefix, text, command }) => {
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
*╭━[ STICKERS ]━⬣*
┃ *Cositas que se le pueden hacer*
┃ *a los stickers*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🎐 _${usedPrefix}sticker | s *imagen/video*_
┃🎐 _${usedPrefix}emojimix *😺+😆*_
┃🎐 _${usedPrefix}attp *texto*_
┃💡 _${usedPrefix}wm *texto*_
┃⛱️ _${usedPrefix}pat *@tag*_
┃⛱️ _${usedPrefix}kiss *@tag*_
┃⛱️ _${usedPrefix}food *@tag*_
*╰━━━━━━━━━━━━⬣*`;

        await conn.sendFile(m.chat, archivo, 'Menú de Stickers', menu, fkontak);

    } catch (e) {
        await m.reply(`*❗❗ Error en el comando:*\n*${usedPrefix}${command}*\n*Intenta de nuevo. Si el problema persiste, contacta al administrador.*`);
        console.error(`❗❗ Error en ${usedPrefix + command}:`, e);
    }
};

handler.command = /menustickers/i;
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
