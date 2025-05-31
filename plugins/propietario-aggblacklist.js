import fs from 'fs';

let handler = async (m, { text, command }) => {
    if (!text) return m.reply(`*⛔ ∫ Poné un numero*`)
    let number = text.trim(); // Número proporcionado como argumento

    // Eliminar caracteres no numéricos y el prefijo internacional '+'
    number = number.replace(/[^0-9]/g, '').replace(/^\+/, '');

    // Guardar el número en la lista negra
    saveNumber(number);

    // Mensaje de respuesta
    await m.reply(`Número ${number} añadido a la lista negra.`);
    let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
    conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
}

// Función para guardar el número en la lista negra
function saveNumber(number) {
    let data = `${number}\n`;
    fs.appendFileSync('./codes/blacklist.txt', data);
}

handler.command = /^(blacklist|bl)$/i;
handler.rowner = true;
export default handler;
