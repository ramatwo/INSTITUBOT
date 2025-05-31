import fs from 'fs';

let handler = async (m, { text }) => {
    let args = text.split(' '); // Dividir el texto en partes separadas por espacios
    let days = parseInt(args.shift()); // Extraer el número de días del primer elemento del array
    let customCode = args.join(' '); // Unir el resto de los elementos del array para formar el código personalizado
    if (isNaN(days) || !customCode) return; // Verificar si el número de días es válido y si se proporcionó un código personalizado

    let duration = days * 24 * 60 * 60 * 1000; // Convierte los días a milisegundos

    // Guardar el código y la duración en un archivo local
    saveCode(customCode, duration);

    // Mensaje de respuesta con el código generado
    await m.reply(`*⫹⫺ ➭✅ ∫* Código VIP generado: ${customCode}`);
}

// Función para guardar el código y la duración en un archivo local
function saveCode(code, duration) {
    let data = `${code},${duration}\n`;
    fs.appendFileSync('./codes/codeprem.txt', data);
}

handler.command = /^genpcode$/i;
handler.rowner = true
export default handler;
