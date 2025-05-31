
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
*╭━〔 JUEGOS 〕━⬣*
┃🎡➺ _${usedPrefix}slot *cantidad*_
┃🎡➺ _${usedPrefix}ttt *sala*_
┃🎡➺ _${usedPrefix}lanzar *cara* | *cruz*_
┃🎡➺ _${usedPrefix}ppt *piedra : papel : tijera*_
┃🎡➺ _${usedPrefix}ahorcado_
┃🎡➺ _${usedPrefix}pvp *@usuario*_
┃🎡➺ _${usedPrefix}blackjack *cantidad*_
┃🎡➺ _${usedPrefix}8ball *pregunta de si/no*_
┃🎡➺ _${usedPrefix}dar *texto*_
┃🎡➺ _${usedPrefix}messi_
┃🎡➺ _${usedPrefix}meme_
┃🎡➺ _${usedPrefix}personalidad *@usuario*_
┃🎡➺ _${usedPrefix}chiste_
┃🎡➺ _${usedPrefix}formarpareja_
┃🎡➺ _${usedPrefix}dado_
┃🎡➺ _${usedPrefix}verdad_
┃🎡➺ _${usedPrefix}reto_
┃🎡➺ _${usedPrefix}hornycard *@tag*_
┃🎡➺ _${usedPrefix}difuminar_
┃🎡➺ _${usedPrefix}topcomandos_
┃🎡➺ _${usedPrefix}toppenes_
┃🎡➺ _${usedPrefix}topnegros_
┃🎡➺ _${usedPrefix}topsalames_
┃🎡➺ _${usedPrefix}topskibiditoilets_
┃🎡➺ _${usedPrefix}tophomos_
┃🎡➺ _${usedPrefix}topviolines_
┃🎡➺ _${usedPrefix}topgordas_
┃🎡➺ _${usedPrefix}topotakus_
┃🎡➺ _${usedPrefix}toppajer@s_
┃🎡➺ _${usedPrefix}topput@s_
┃🎡➺ _${usedPrefix}topintegrantes_
┃🎡➺ _${usedPrefix}toplagrasa_
┃🎡➺ _${usedPrefix}toppanafrescos_
┃🎡➺ _${usedPrefix}topshiposters_
┃🎡➺ _${usedPrefix}toplindos_
┃🎡➺ _${usedPrefix}topfamososs_
┃🎡➺ _${usedPrefix}topparejas_
┃🎡➺ _${usedPrefix}gay *nombre : @tag*_
┃🎡➺ _${usedPrefix}lesbiana *nombre : @tag*_
┃🎡➺ _${usedPrefix}manca *nombre : @tag*_
┃🎡➺ _${usedPrefix}manco *nombre : @tag*_
┃🎡➺ _${usedPrefix}pajero *nombre : @tag*_
┃🎡➺ _${usedPrefix}pajera *nombre : @tag*_
┃🎡➺ _${usedPrefix}puto *nombre : @tag*_
┃🎡➺ _${usedPrefix}puta *nombre : @tag*_
┃🎡➺ _${usedPrefix}rata *nombre : @tag*_
┃🎡➺ _${usedPrefix}love *nombre : @tag*_
┃🎡➺ _${usedPrefix}doxear *@usuario*_
┃🎡➺ _${usedPrefix}pajear *@usuario*_
┃🎡➺ _${usedPrefix}pokedex *pokemon*_
*╰━━━━━━━━━━━━⬣*`;

        await conn.sendFile(m.chat, archivo, 'Menú de Juegos', menu, fkontak);
    } catch (e) {
        await m.reply(`*❗❗ Error en el comando:*\n*${usedPrefix}${command}*\n*Error:* ${e.message}`);
        console.log(`❗❗ ${usedPrefix}${command} ❗❗`);
        console.log(e);
    }
};

handler.command = /menujuegos/i;
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);


