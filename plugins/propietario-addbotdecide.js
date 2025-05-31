import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const solicitudesPath = path.resolve(__dirname, '../codes/solicitudes.json');

let handler = async (m, { conn, text, command }) => {
    if (!text) throw `Usa el comando de esta manera:\n.gacept <ID>\n.greject <ID> <motivo>`;

    let solicitudes = JSON.parse(fs.readFileSync(solicitudesPath, 'utf-8'));
    let parts = text.split(' ');
    let id = parts[0];
    let reason = parts.slice(1).join(' ').trim(); // Resto del mensaje como motivo

    let solicitud = solicitudes.find(s => s.id === id);

    if (!solicitud) throw `❌ No se encontró ninguna solicitud con el ID: ${id}`;

    if (command === 'gacept') {
        try {
            await conn.groupAcceptInvite(solicitud.link.split('/')[1]);
            await conn.sendMessage(solicitud.solicitante + '@s.whatsapp.net', {
                text: `✅ • TU SOLICITUD *${solicitud.id}* FUE ACEPTADA.\n\n> Recordá darle administrador a SodicaBot y que tus administradores estén al tanto de que lo añadiste. Si el bot es eliminado, no es posible volver a unirlo al grupo.`,
            });
            m.reply(`✅ Solicitud ${solicitud.id} aceptada y notificada al usuario.`);

            solicitudes = solicitudes.filter(s => s.id !== id);
            fs.writeFileSync(solicitudesPath, JSON.stringify(solicitudes, null, 2));
        } catch (e) {
            m.reply(`❌ Hubo un error al unirse al grupo: ${e.message}`);
        }
    } else if (command === 'greject') {
        if (!reason) throw `❌ Debes proporcionar un motivo para rechazar la solicitud.\nEjemplo: .greject HTL El bot fue eliminado`;

        try {
            await conn.sendMessage(solicitud.solicitante + '@s.whatsapp.net', {
                text: `❌ Tu solicitud *${solicitud.id}* fue rechazada.\n\n📌 *Motivo:* ${reason}`,
            });
            solicitudes = solicitudes.filter(s => s.id !== id);
            fs.writeFileSync(solicitudesPath, JSON.stringify(solicitudes, null, 2));
            m.reply(`❌ Solicitud ${solicitud.id} rechazada con motivo: "${reason}" y notificada al usuario.`);
        } catch (e) {
            console.error(e);
            m.reply(`❌ Hubo un error al enviar el mensaje al usuario: ${e.message}`);
        }
    }
};

handler.command = /^(gacept|greject)$/i;
handler.rowner = true;
export default handler;