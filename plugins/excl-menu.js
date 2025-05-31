import fs from 'fs';

let handler = async (m, {isROwner}) => {
    if (!isROwner) {
    let chat = m.chat;
    if (chat !== '120363197086485243@g.us') {
        return await m.reply('*⫹⫺ ➭⛔ ∫* Este comando solo se puede usar en el grupo autorizado.');
    }}

    let filePath = './codes/cuentas.json'
    
    //verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
        return await m.reply('*⚠️ ∫* No hay cuentas guardadas.');
    }

    //ler el archivo y parsear el contenido
    let cuentas = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let plataformas = Object.keys(cuentas);

    //se fija si hay plataformas disponibles
    if (plataformas.length === 0) {
        return await m.reply('*⚠️ ∫* No hay cuentas guardadas.');
    }

    //formatear la lista de plataformas
    let mensaje = '*📋 ∫* Plataformas disponibles:\n';
    plataformas.forEach(plataforma => {
        mensaje += `- ${plataforma.charAt(0).toUpperCase() + plataforma.slice(1)}\n`;
    });

    await m.reply(mensaje);
}

handler.command = /^accmenu$/i;
export default handler;
