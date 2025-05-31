import fs from 'fs';
let permitidos = ['5491162480909@s.whatsapp.net', '5493413312015@s.whatsapp.net', '5491151244787@s.whatsapp.net']
let handler = async (m, { text }) => {
    if (!permitidos.includes(m.sender)) {
        return conn.reply(m.chat, 'no, gei', m)
    
    }
    let [plataforma, correo, contraseña] = text.split(' '); // Separar los argumentos
        if (!plataforma || !correo || !contraseña) {
        return await m.reply('*⚠️ ∫* Usá el formato correcto: .accsave plataforma correo contraseña');
        }

    let filePath = './codes/cuentas.json';
    let cuentas = {};

    // Leer el archivo y parsear el contenido
    if (fs.existsSync(filePath)) {
        cuentas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Convertir la plataforma a minúsculas para evitar duplicados
    plataforma = plataforma.toLowerCase();

    // Guardar o modificar la cuenta
    cuentas[plataforma] = { correo, contraseña };
    
    // Escribir el nuevo contenido en el archivo
    fs.writeFileSync(filePath, JSON.stringify(cuentas, null, 2));

    await m.reply(`*⫹⫺ ➭✅ ∫* Cuenta guardada/actualizada para ${plataforma}.`);
}

handler.command = /^accsave|saveacc|addacc$/i;

export default handler;
