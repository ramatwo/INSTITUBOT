
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
*╭━━[ HERRAMIENTAS 🛠️ ]━━⬣*
┃🛠️ _${usedPrefix}google_ (VIP)
┃🛠️ _${usedPrefix}edad_ (VIP)
┃🛠️ _${usedPrefix}afk *motivo*_ (VIP)
┃🛠️ _${usedPrefix}inspect *url de grupo*_ (VIP)
┃🛠️ _${usedPrefix}mirar_ (VIP)
┃🛠️ _${usedPrefix}agedetect (VIP) {EN MANTENIMIENTO}_
┃🛠️ _${usedPrefix}sorteo *texto*_ (VIP)
┃🛠️ _${usedPrefix}acortar *url*_
┃🛠️ _${usedPrefix}checkpx *img*_
┃🛠️ _${usedPrefix}ofuscar *codigo de programacion*_
┃🛠️ _${usedPrefix}encuesta *pregunta|opcion1|opcion2|...*_
┃🛠️ _${usedPrefix}calc *operacion*_
┃🛠️ _${usedPrefix}readmore *texto*_
┃🛠️ _${usedPrefix}ssweb *link*_
┃🛠️ _${usedPrefix}del *responder mensaje*_
┃🛠️ _${usedPrefix}qrcode *texto*_
┃🛠️ _${usedPrefix}readmore *texto1|texto2*_
┃🛠️ _${usedPrefix}styletext *texto*_
┃🛠️ _${usedPrefix}traducir *idioma* *texto*_
┃🛠️➺ _${usedPrefix}morse codificar *texto*_
┃🛠️➺ _${usedPrefix}morse decodificar *morse*_
┃🛠️➺ _${usedPrefix}horario_
┃🛠️➺ _${usedPrefix}checkprem *@usuario*_
┃🛠️➺ _${usedPrefix}getpp *<@tag/reply>*_
*╰━━━━━━━━━━━━⬣*`;

        await conn.sendFile(m.chat, archivo, 'Menú de Herramientas', menu, fkontak);
    } catch (e) {
        await m.reply(`*❗❗ Error en el comando:*\n*${usedPrefix}${command}*\n*Intenta de nuevo. Si el problema persiste, contacta al administrador.*`);
        console.error(`❗❗ Error en ${usedPrefix + command}:`, e);
    }
};

handler.command = /menuherramientas|menutools/i;
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

