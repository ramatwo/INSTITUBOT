import fs from 'fs';

let handler = async (m, { text }) => {
    let days = parseInt(text.trim()); // Número de días proporcionado como argumento
    if (isNaN(days)) return; // Verifica si el argumento es un número válido
    let duration = days * 24 * 60 * 60 * 1000; // Convierte los días a milisegundos

    // Generar código de membresía VIP
    let code = generateCode();
    // Guardar el código y la duración en un archivo local
    saveCode(code, duration);

    // Mensaje de respuesta con el código generado
    await m.reply(`${code}`);
}

// Función para generar un código aleatorio
function generateCode() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'S0D1C4V1P';
    for (let i = 0; i < 10; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Función para guardar el código y la duración en un archivo local
function saveCode(code, duration) {
    let data = `${code},${duration}\n`;
    fs.appendFileSync('./codes/codeprem.txt', data);
}

handler.command = /^gencode$/i;
handler.rowner = true;
export default handler;
