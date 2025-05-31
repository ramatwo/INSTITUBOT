import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const solicitudesPath = path.resolve(__dirname, '../codes/solicitudes.json');

let handler = async (m, { conn }) => {
    try {
        let solicitudes = JSON.parse(fs.readFileSync(solicitudesPath, 'utf-8'));

        if (solicitudes.length === 0) {
            m.reply(`📋 No hay solicitudes pendientes.`);
            return;
        }

        let message = `📋 *Lista de Solicitudes Pendientes:*\n\n`;
        solicitudes.forEach((solicitud, index) => {
            message += `🔹 *Solicitud ${index + 1}:*\n`;
            message += `   - 📌 *ID:* ${solicitud.id}\n`;
            message += `   - 👤 *Usuario:* wa.me/${solicitud.solicitante}\n`;
            message += `   - 🔗 *Grupo:* ${solicitud.link}\n`;
            message += `   - ⭐ *Prioridad:* ${solicitud.prioridad ? 'Premium' : 'Normal'}\n\n`;
        });

        m.reply(message);
    } catch (e) {
        console.error(e);
        m.reply(`❌ Hubo un error al leer las solicitudes: ${e.message}`);
    }
};

handler.command = /^addbotlist$/i;
handler.rowner = true;
export default handler;