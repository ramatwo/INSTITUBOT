/*let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i

let cooldowns = new Map();

let handler = async (m, { conn, text }) => {
    let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text;
    let [_, code] = link.match(linkRegex) || [];

    if (!code) throw `⛔ ∫ Ingresá un enlace.\n> Ejemplo: #unete ${comunidad}`;
    const specificOwner = '5491151244787@s.whatsapp.net';
    const requesterId = m.sender;

    const now = Date.now();
    const cooldownTime = 12 * 60 * 60 * 1000; // 12 hours

    if (requesterId !== specificOwner) {
        if (cooldowns.has(requesterId)) {
            const lastRequestTime = cooldowns.get(requesterId);
            if (now - lastRequestTime < cooldownTime) {
                throw `⛔ ∫ Ya enviaste una solicitud recientemente.`;
            }
        }

        cooldowns.set(requesterId, now);
       //wait delay(5 * 500);

        m.reply(`*📌 Nueva solicitud*\n\n*👤 Usuario:* ` + 'wa.me/' + requesterId.split('@')[0] + '\n*🔗 Grupo:* ' + link, specificOwner);
        m.reply("*✅ Su solicitud está siendo procesada*\n\n⚠️ *Su grupo va a ser revisado para ver si cumple con los requisitos*\n\n📌 *El grupo debe cumplir con los siguientes requisitos, de lo contrario su solicitud va a ser rechazada:*\n> ⚔️ El Bot debe ser administrador en todo momento.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n> ⚔️ No debe haber otros bots.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n‼️ *Procure que sus administradores estén al tanto de los requisitos, porque si no se respetan, todos los administradores serán baneados permanentemente del bot.*\n\n*🔗 Si tiene dudas o consuiltas, está invitado a unirse a la comunidad para contactar con los administradores del bot. use #comunidad*");
    } else {
        m.reply(`*Unido correctamente✅✅✅*`);
        await delay(5 * 500);
        let res = await conn.groupAcceptInvite(code);
    }
}

handler.help = ['join [chat.whatsapp.com]'];
handler.tags = ['owner'];
handler.command = /^unete|join|nuevogrupo|unir|unite|unirse|entra|addbot|entrar$/i;
handler.register = true;
handler.rowner = false;
handler.premium = false;
export default handler;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));*/