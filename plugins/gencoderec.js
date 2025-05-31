import fs from 'fs';

let handler = async (m, { text }) => {
    // Dividir el texto en partes separadas por espacio o coma
    let args = text.trim().split(/[,\s]+/); // Esto divide tanto por espacios como por comas
    let resource = args[0];
    let amount = args[1];

    let validResources = ['exp', 'oro', 'diamante', 'money'];
    if (!validResources.includes(resource)) return await m.reply('⚠️ Ingresa un recurso válido (exp, oro, diamante, money). genrec exp 100');
    if (isNaN(amount)) return await m.reply('⚠️ Ingresa una cantidad válida.');

    // Generar código para el recurso
    let code = generateCode();
    saveCode(code, resource, amount);

    // Mensaje de respuesta con el código generado
    await m.reply(`✅ Código generado (${resource}: ${amount})`);
    await m.reply(`${code}`)
};

// Función para generar un código aleatorio
function generateCode() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'S0D1C4R3C';
    for (let i = 0; i < 10; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Función para guardar el código y el recurso en el archivo
function saveCode(code, resource, amount) {
    let data = `${code},${resource},${amount}\n`;
    fs.appendFileSync('./codes/coderecursos.txt', data);
}

handler.command = /^gencoderecurso|gencoderec$/i; // Ahora también acepta .genrec
handler.rowner = true;

export default handler;
