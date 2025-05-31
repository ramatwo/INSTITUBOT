/*let handler = async (m, { conn, text, command, args, isAdmin }) => {
    // Validar que se haya proporcionado un número
    if (!text) return m.reply(`Usa el comando de esta manera:\n\n*${command} número* o\n*${command} número motivo*`);
    
    let parts = text.split(' ');
    let number = parts[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Extraer y formatear el número
    let reason = parts.slice(1).join(' ').trim(); // Resto del mensaje como motivo

    // Validar que el número sea válido
    if (!number || number === '@s.whatsapp.net') return m.reply(`Debes especificar un número de teléfono válido.\n\nEjemplo: ${command} 549116248409`);

    switch (command) {
        case 'gacept':
            try {
                await conn.sendMessage(number, { text: `✅ Tu solicitud fue aceptada.` });
                conn.reply(m.chat, `✅ Se aceptó la solicitud y se notificó al número: ${number.split('@')[0]}`, m);
            } catch (e) {
                console.error(e);
                conn.reply(m.chat, `❌ Hubo un error al enviar el mensaje a ${number.split('@')[0]}.`, m);
            }
            break;

        case 'greject':
            if (!reason) return m.reply(`Debes especificar un motivo para rechazar la solicitud.\n\nEjemplo: ${command} 549116248409 no se permiten bots`);
            try {
                await conn.sendMessage(number, { text: `❌ Tu solicitud fue rechazada: ${reason}` });
                conn.reply(m.chat, `✅ Se rechazó la solicitud y se notificó al número: ${number.split('@')[0]} con el mensaje: "${reason}"`, m);
            } catch (e) {
                console.error(e);
                conn.reply(m.chat, `❌ Hubo un error al enviar el mensaje a ${number.split('@')[0]}.`, m);
            }
            break;

        default:
            return m.reply(`Comando desconocido. Usa:\n\n*${command} número* o\n*${command} número motivo*`);
    }
};

// Registrar los comandos para que sean detectados
handler.command = /^(gacept|greject|gr|ga)$/i; // Detecta .gacept y .greject
handler.rowner = true; // Solo administradores pueden usar estos comandos

export default handler;
*/