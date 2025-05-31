import fs from 'fs';
let permitidos = ['5491162480909@s.whatsapp.net', '5493413312015@s.whatsapp.net', '5491151244787@s.whatsapp.net']
let handler = async (m, { text }) => {
    if (!permitidos.includes(m.sender)) {
        return conn.reply(m.chat, 'no, gei', m)
    
    }
    let plataforma = text.trim().toLowerCase(); // Obtener la plataforma y convertir a minúsculas
    let filePath = './codes/cuentas.json'

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
        return await m.reply('*⚠️ ∫* No hay cuentas guardadas aún.');
    }

    // Leer el archivo y parsear el contenido
    let cuentas = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Verificar si la plataforma existe
    if (!cuentas[plataforma]) {
        return await m.reply(`*⚠️ ∫* La plataforma '${plataforma}' no está guardada.`);
    }

    // Eliminar la plataforma
    delete cuentas[plataforma];

    // Guardar los cambios en el archivo
    fs.writeFileSync(filePath, JSON.stringify(cuentas, null, 2));

    await m.reply(`*⫹⫺ ➭✅ ∫* La plataforma '${plataforma}' fue eliminada.`);
}

handler.command = /^accdelete$/i;
export default handler;
