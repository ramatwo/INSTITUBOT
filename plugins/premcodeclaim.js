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
        return await m.reply('*⚠️ ∫* Ingresa un código.');
    }

    let code = text.trim(); // Código proporcionado como argumento

    // Leer el archivo que contiene los códigos de membresía VIP
    let data = fs.readFileSync('./codes/codeprem.txt', 'utf8');
    let lines = data.trim().split('\n');
    let isValid = false;
    let duration = 0;

    // Verificar si el código proporcionado es válido y obtener su duración
    for (let line of lines) {
        let [codeFromFile, dur] = line.split(',');
        if (codeFromFile == code) {
            isValid = true;
            duration = parseInt(dur);
            break;
        }
    }

    // Verificar si el usuario ya es premium y tiene más de 172800000000 de tiempo premium
   //if (user.premium == true && user.premiumTime > 172800000000) { throw `Ya sos premium amigo.`}

    // Si el código es válido, otorgar premium al usuario y eliminar el código del archivo
    if (isValid) {
        let now = new Date().getTime();

        // Actualizar el tiempo premium del usuario
        if (now < user.premiumTime) {
            user.premiumTime += duration;
        } else {
            user.premiumTime = now + duration;
        }
        user.premium = true;

        // Eliminar el código del archivo
        removeCode(code);

        // Guardar el cooldown del usuario (60 segundos)
        cooldowns[m.sender] = new Date().getTime() + 7000; // 60 segundos en milisegundos

        // Mensaje de respuesta
        await m.reply(`*⫹⫺ ➭✅ ∫* Código válido. Obtenés VIP por ${duration / (24 * 60 * 60 * 1000)} día(s).`);
    } else {
        // Si el código no es válido, enviar un mensaje de error
        await m.react('❌');
    }
};

// Función para eliminar un código del archivo
function removeCode(codeToRemove) {
    let data = fs.readFileSync('./codes/codeprem.txt', 'utf8');
    let lines = data.trim().split('\n');
    let newData = '';

    // Crear un nuevo conjunto de datos excluyendo el código especificado
    for (let line of lines) {
        let [code, duration] = line.split(',');
        if (code != codeToRemove) {
            newData += `${code},${duration}\n`;
        }
    }

    // Escribir el nuevo conjunto de datos en el archivo
    fs.writeFileSync('./codes/codeprem.txt', newData);
}

handler.command = /^claimkey|key|claim$/i;

export default handler;
