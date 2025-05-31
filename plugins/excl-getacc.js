import fs from 'fs';

let handler = async (m, { text, isROwner }) => {
    if (!isROwner) {let chat = m.chat; 
    if (chat !== '120363197086485243@g.us') {
        return await m.reply('*⫹⫺ ➭⛔ ∫* Este comando solo se puede usar en el grupo autorizado.');
    }}

    let plataforma = text.trim().toLowerCase(); // Convertir a minúsculas

    if (!plataforma) {
        return await m.reply('*⚠️ ∫* Usá el formato correcto: .getacc plataforma.');
    }

    let filePath = './codes/cuentas.json';
    let cuentas = {};

    // Leer el archivo y parsear el contenido
    if (fs.existsSync(filePath)) {
        cuentas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Verificar si la cuenta existe
    if (cuentas[plataforma]) {
        let { correo, contraseña } = cuentas[plataforma];
        await m.reply(`*👁️ Plataforma:* ${plataforma}\n*📧 Correo:* ${correo}\n*🔑 Contraseña:* ${contraseña}`);
    } else {
        await m.reply(`*⫹⫺ ➭⛔ ∫* No se encontró ninguna cuenta de ${plataforma}.`);
    }
}

handler.command = /^getacc$/i;
handler.premium = true
export default handler;