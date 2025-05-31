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
*╭━━━[ MENÚ RPG ]━━⬣*
┃ *Comprá y conseguí recursos.*
┃ *¿Llegarás al top 1?*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🏆➺ _${usedPrefix}top_
┃⚗️➺ _${usedPrefix}pase premium_
┃⚗️➺ _${usedPrefix}listapremium_
┃⚗️➺ _${usedPrefix}transfer *tipo cantidad @tag*_
┃⚗️➺ _${usedPrefix}balance_
┃⚗️➺ _${usedPrefix}wallet_
┃⚗️➺ _${usedPrefix}experiencia_
┃⚗️➺ _${usedPrefix}lvl_
┃⚗️➺ _${usedPrefix}inventario_
┃⚗️➺ _${usedPrefix}aventura_
┃⚗️➺ _${usedPrefix}caza_
┃⚗️➺ _${usedPrefix}alimentos_
┃⚗️➺ _${usedPrefix}curar_
┃⚗️➺ _${usedPrefix}buy_
┃⚗️➺ _${usedPrefix}sell_
┃⚗️➺ _${usedPrefix}verificar_
┃⚗️➺ _${usedPrefix}perfil_
┃⚗️➺ _${usedPrefix}myns_
┃⚗️➺ _${usedPrefix}minardiamantes_
┃⚗️➺ _${usedPrefix}minarcoins_
┃⚗️➺ _${usedPrefix}minarexp_
┃⚗️➺ _${usedPrefix}minar *:* minar2 *:* minar3_
┃⚗️➺ _${usedPrefix}diario_
┃⚗️➺ _${usedPrefix}cadahora_
┃⚗️➺ _${usedPrefix}cadasemana_
┃⚗️➺ _${usedPrefix}cadames_
┃⚗️➺ _${usedPrefix}cofre_
┃⚗️➺ _${usedPrefix}chambear_
*╰━━━━━━━━━━━━⬣*`;

        await conn.sendFile(m.chat, archivo, 'Menú de RPG', menu, fkontak);
    } catch (e) {
        await m.reply(`*❗❗ Error en el comando:*\n*${usedPrefix}${command}*\n*Intenta de nuevo. Si el problema persiste, contacta al administrador.*`);
        console.error(`❗❗ Error en ${usedPrefix + command}:`, e);
    }
};

handler.command = /menurpg/i;
handler.register = true;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);