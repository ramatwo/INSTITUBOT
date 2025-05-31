/*import chalk from 'chalk';












//DESACTIVADO PORRQUE NO APARECE EL LOG DE NUEVAS SOLICITUDES







let handler = async function (m, { conn }) {
    // Verificar si el mensaje tiene un messageStubType
    if (!m.messageStubType) return;

    // Log para depuración
    console.log({
        messageStubType: m.messageStubType,
        messageStubParameters: m.messageStubParameters,
        type: conn?.WAMessageStubType?.[m.messageStubType] || 'Desconocido',
    });

    // Verificar si el messageStubType es 172 (solicitud de ingreso al grupo)
    if (m.messageStubType === 172) {
        const rawUser = m.messageStubParameters[0];

        // Verificar si el usuario que solicita es un ExtBot
        const isExtBot = global.conns.some(bot => bot.user.jid === rawUser);

        if (isExtBot) {
            try {
                // Rechazar la solicitud del ExtBot
                await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
                console.log(chalk.bold.yellow(`⚠️ Solicitud de ingreso de ExtBot (${rawUser}) rechazada automáticamente en el grupo ${m.chat}.`));
            } catch (error) {
                console.error(chalk.bold.red(`⚠️ Error al rechazar la solicitud de ExtBot (${rawUser}) en el grupo ${m.chat}: ${error}`));
            }
        }
    }
};

handler.before = async function (m, { conn }) {
    // Este handler se ejecuta antes de procesar otros comandos
    if (!m.isGroup) return; // Solo se aplica en grupos
};

export default handler;*/