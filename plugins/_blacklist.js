import fs from 'fs';

// Variable para almacenar los números de la lista negra
let numerosblacklist = [];

// Función para cargar los números de la lista negra desde el archivo
function loadBlacklist() {
    try {
        // Leer el contenido del archivo y dividirlo por líneas
        let content = fs.readFileSync('./codes/blacklist.txt', 'utf8');
        numerosblacklist = content.trim().split('\n');
        console.log('Lista negra cargada:', numerosblacklist);
    } catch (error) {
        console.error('Error al cargar la lista negra:', error);
    }
}

// Cargar los números de la lista negra al iniciar el bot
loadBlacklist();

// Actualizar la lista negra cada 5 minutos
setInterval(loadBlacklist, 5 * 60 * 1000);

// Función para normalizar números telefónicos
function normalizeNumber(number) {
    // Eliminar el prefijo "1" después del código de país +52
    if (number.startsWith('52') && number.length > 10) {
        return number.replace(/^52(1?)/, '52');
    }
    // Asegurarse de que los números con código +1 no tengan prefijos adicionales
    if (number.startsWith('1') && number.length > 10) {
        return number.replace(/^1/, '1');
    }
    return number;
}

let handler = m => m;
handler.before = async function (m, { conn, isBotAdmin }) {
    if (!m.isGroup) return !1;
    let chat = global.db.data.chats[m.chat];
    if (isBotAdmin) {
        let texto = `*🛡️➭⛔ ∫ SISTEMA DE SEGURIDAD:*\nEl número +${m.sender.split`@`[0]} es un usuario potencialmente peligroso para grupos.\n> 🛡️ SodicaBot Shield System`;

        // Normalizar el número del remitente
        let senderNumber = normalizeNumber(m.sender.split`@`[0]);

        // Iterar sobre los números de la lista negra
        for (let numero of numerosblacklist) {
            let normalizedBlacklistNumber = normalizeNumber(numero);
            if (senderNumber.startsWith(normalizedBlacklistNumber)) {
                global.db.data.users[m.sender].banned = true;
                await conn.reply(m.chat, texto, m);
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');

                let avisodeuso = "🛡️➭⛔ Nuevo usuario baneado por el blacklist";
                conn.sendMessage('5491162480909@s.whatsapp.net', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
                break;
            }
        }
    }
};
export default handler;
