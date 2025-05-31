import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const solicitudesPath = path.resolve(__dirname, '../codes/solicitudes.json');
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

const specificOwner = '5491151244787@s.whatsapp.net'; // Número del owner específico
let cooldowns = {}; // Objeto para almacenar los tiempos de cooldown

let handler = async (m, { conn, text, isOwner, isPremium }) => {
    let link = text.match(linkRegex)?.[0];
    if (!link) throw `⛔ Ingresa un enlace válido.\nEjemplo: .addbot https://chat.whatsapp.com/FrpevRhgdfghMMiY7LMmX`;

    const requesterId = m.sender;
    const now = Date.now();
    const cooldownTime = isPremium ? 3600000 : 43200000; // 1 hora para premium, 12 horas para normales

    // Verificar si el usuario está en cooldown
    if (cooldowns[requesterId] && now - cooldowns[requesterId] < cooldownTime && !isOwner) {
        const remainingTime = cooldownTime - (now - cooldowns[requesterId]);
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        throw `⛔ Debes esperar ${hours > 0 ? `${hours} horas y ` : ''}${minutes} minutos antes de enviar otra solicitud.`;
    }

    const id = generateId();
    const solicitud = {
        id,
        solicitante: requesterId.split('@')[0],
        link,
        prioridad: isPremium ? 'Premium' : 'Normal' // Indicar si es prioridad
    };

    if (isOwner) {
        m.reply(`*Unido correctamente✅*`);
        await conn.groupAcceptInvite(link.split('/')[1]);
    } else {
        let solicitudes = JSON.parse(fs.readFileSync(solicitudesPath, 'utf-8'));
        solicitudes.push(solicitud);
        fs.writeFileSync(solicitudesPath, JSON.stringify(solicitudes, null, 2));

        // Enviar la solicitud al owner específico
        await conn.sendMessage(specificOwner, {
            text: `*📌 Nueva solicitud*\n\nℹ️ *ID:* ${id}\n👤 *Usuario:* wa.me/${solicitud.solicitante}\n🔗 *Grupo:* ${link}\n⭐ *Prioridad:* ${solicitud.prioridad}`
        });

        m.reply(`✅ Su solicitud está siendo procesada.\nℹ️ LA ID DE TU SOLICITUD ES *${id}*\n\n⚠️ *El grupo va a ser revisado para verificar si cumple con los requisitos.*\n\n📌 *El grupo debe cumplir con los siguientes requisitos, de lo contrario su solicitud va a ser rechazada:*\n> ⚔️ El Bot debe ser administrador en todo momento.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n> ⚔️ No debe haber otros bots.\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n‼️ *Procure que sus administradores estén al tanto de los requisitos, porque si no se respetan, todos los administradores serán baneados permanentemente del bot.*\n\n*🔗 Si tiene dudas o consultas, está invitado a unirse a la comunidad para contactar con los administradores del bot. use #comunidad*`);
    }

    // Registrar el tiempo de la solicitud para el cooldown
    cooldowns[requesterId] = now;
};

handler.command = /^(unete|join|nuevogrupo|unir|unite|unirse|entra|addbot|entrar)$/i;
export default handler;

function generateId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array(3).fill().map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}