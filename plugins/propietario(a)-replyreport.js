let handler = async (m, { conn, text, command, args, isAdmin }) => {

    // Validar que se haya proporcionado un número
    if (!text) return m.reply(`Usa el comando de esta manera:\n\n*${command} número respuesta*`);
    
    let parts = text.split(' ');
    let number = parts[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'; // Extraer y formatear el número
    let reason = parts.slice(1).join(' ').trim(); // Resto del mensaje como motivo

    // Validar que el número sea válido
    if (!number || number === '@s.whatsapp.net') return m.reply(`Debes especificar un número de teléfono válido.\n\nEjemplo: ${command} 549116248409`);

    switch (command) {

        case 'replyrep':
            if (!reason) return m.reply(`Debes especificar un motivo para responder el reporte.\n\nEjemplo: ${command} 549116248409 gay`);
            try {
                await conn.sendMessage(number, { text: `*⚠️ Tu reporte recibió una respuesta:*\n\n${reason}` });
                conn.reply(m.chat, `✅ Se envió la respuesta al reporte.\nNumero: ${number.split('@')[0]}\nRespuesta: ${reason}`, m);
            } catch (e) {
                console.error(e);
                conn.reply(m.chat, `❌ Hubo un error al enviar el mensaje a ${number.split('@')[0]}.`, m);
            }
            break;

        default:
            return m.reply(`Comando desconocido. Usa:\n\n*${command} número* o\n*${command} número respuesta*`);
    }
};

// Registrar los comandos para que sean detectados
handler.command = /^(replyrep)$/i; // Detecta .gacept y .greject
handler.rowner = true; // Solo administradores pueden usar estos comandos

export default handler;
