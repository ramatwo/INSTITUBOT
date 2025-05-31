import fs from 'fs';

let handler = async (m, { text }) => {
    if (!text) return m.reply(`*⛔ ∫ Poné un numero*`)
    let number = text.trim(); // Número proporcionado como argumento

    // Eliminar caracteres no numéricos y el prefijo internacional '+'
    number = number.replace(/[^0-9]/g, '').replace(/^\+/, '');

    // Guardar el número en la lista negra
    saveNumber(number);

    // Mensaje de respuesta
    await m.reply(`Número ${number} añadido a la lista negra de transferencias.`);
}

// Función para guardar el número en la lista negra
function saveNumber(number) {
    let data = `${number}\n`;
    fs.appendFileSync('./codes/blacklisttransfer.txt', data);
}

handler.command = /^(blacklisttransfer|blt)$/i;
handler.rowner = true;
export default handler;
