import chalk from 'chalk';

let handler = async function (m, { conn, participants, isROwner }) {
    if (!m.isGroup) return m.reply('Este comando solo puede usarse en grupos.');
    if (!isROwner) return m.reply('Solo los owners pueden usar este comando.');

    const extBots = global.conns.filter(bot => bot.user.jid !== global.conn.user.jid && bot.user.jid !== conn.user.jid);

    if (extBots.length === 0) {
        return m.reply('No hay ExtBots conectados en este grupo.');
    }

    for (let extBot of extBots) {
        try {
            // Verificar si el ExtBot está en el grupo
            const groupMetadata = await extBot.groupMetadata(m.chat).catch(() => null);
            if (!groupMetadata) {
                console.log(chalk.bold.yellow(`⚠️ ExtBot ${extBot.user.jid} no está en el grupo ${m.chat}.`));
                continue;
            }

            // Si está en el grupo, intentar salir
            await extBot.groupLeave(m.chat);
            console.log(chalk.bold.yellow(`⚠️ ExtBot ${extBot.user.jid} se ha salido del grupo ${m.chat}.`));
        } catch (error) {
            console.error(chalk.bold.red(`⚠️ Error al intentar que el ExtBot ${extBot.user.jid} se salga del grupo ${m.chat}: ${error}`));
        }
    }

    m.reply('Salida finalizada.');
};

handler.command = /^salirextbots$/i;
handler.group = true;
handler.owner = true;

export default handler;