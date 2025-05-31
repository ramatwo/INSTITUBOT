import fs from 'fs';

let cooldowns = {}; // Objeto para almacenar los tiempos de uso por usuario

let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender];
    
    // Verificar si el usuario está en cooldown
    if (cooldowns[m.sender]) {
        let remaining = cooldowns[m.sender] - new Date().getTime();
        if (remaining > 0) {
            return await m.reply(`*⫹⫺ ➭⏳ ∫* no seas avaricioso. Esperá ${Math.ceil(remaining / 1000)} segundos antes de reclamar otra key.`);
        }
    }

    if (!text) {
        // Si no se proporciona ningún código, enviar un mensaje de error y salir de la función
        return await m.reply('⚠️ Ingresa un código.');
    }

    let code = text.trim(); // Código proporcionado como argumento

    // Leer el archivo que contiene los códigos de recursos
    let data = fs.readFileSync('./codes/coderecursos.txt', 'utf8');
    let lines = data.trim().split('\n');
    let isValid = false;
    let resource = '';
    let amount = 0;

    // Verificar si el código proporcionado es válido y obtener su recurso y cantidad
    for (let line of lines) {
        let [codeFromFile, res, amt] = line.split(',');
        if (codeFromFile == code) {
            isValid = true;
            resource = res;
            amount = parseInt(amt);
            break;
        }
    }

    // Si el código es válido, otorgar el recurso correspondiente al usuario
    if (isValid) {
        if (resource === 'exp') user.exp += amount;
        if (resource === 'oro') user.oro += amount;
        if (resource === 'diamante') user.diamante += amount;
        if (resource === 'money') user.money += amount;

        // Eliminar el código del archivo
        removeCode(code);

        // Guardar el cooldown del usuario (60 segundos)
        cooldowns[m.sender] = new Date().getTime() + 7000; // 60 segundos en milisegundos

        // Mensaje de respuesta
        await m.reply(`✅ Código válido. Obtenés ${amount} de ${resource}.`);
    } else {
        // Si el código no es válido, enviar un mensaje de error
        await m.react('❌');
    }
};

// Función para eliminar un código del archivo
function removeCode(codeToRemove) {
    let data = fs.readFileSync('./codes/coderecursos.txt', 'utf8');
    let lines = data.trim().split('\n');
    let newData = '';

    // Crear un nuevo conjunto de datos excluyendo el código especificado
    for (let line of lines) {
        let [code, resource, amount] = line.split(',');
        if (code != codeToRemove) {
            newData += `${code},${resource},${amount}\n`;
        }
    }

    // Escribir el nuevo conjunto de datos en el archivo
    fs.writeFileSync('./codes/coderecursos.txt', newData);
}

handler.command = /^claimrecurso|claimrec$/i;

export default handler;
