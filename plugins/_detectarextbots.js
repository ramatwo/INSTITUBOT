/**import chalk from 'chalk';

let handler = async function (m, { conn, participants, groupMetadata, isBotAdmin, isAdmin, isROwner }) {
    if (!m.isGroup) return;

    const groupAdmins = participants.filter(p => p.admin);
    const extBots = global.conns.filter(bot => bot.user.jid !== global.conn.user.jid && bot.user.jid !== conn.user.jid);

    if (extBots.length > 0) {
        let nonAdminBots = [];
        let adminBots = [];

        for (let extBot of extBots) {
            const isExtBotAdmin = groupAdmins.some(admin => admin.id === extBot.user.jid);
            if (isExtBotAdmin) {
                adminBots.push(extBot);
            } else {
                nonAdminBots.push(extBot);
            }
        }

        if (nonAdminBots.length > 0) {
            // Si hay bots que no son admin, se sale uno de ellos
            const botToLeave = nonAdminBots[Math.floor(Math.random() * nonAdminBots.length)];
            try {
                await botToLeave.groupLeave(m.chat);
                console.log(chalk.bold.yellow(`⚠️ ExtBot ${botToLeave.user.jid} se ha salido del grupo ${m.chat} para evitar duplicación de comandos.`));
            } catch (error) {
                console.error(chalk.bold.red(`⚠️ Error al intentar que el ExtBot ${botToLeave.user.jid} se salga del grupo ${m.chat}: ${error}`));
            }
        } else if (adminBots.length > 1) {
            // Si todos los bots son admin, se sale uno aleatorio excepto el bot principal
            const botToLeave = adminBots[Math.floor(Math.random() * adminBots.length)];
            try {
                await botToLeave.groupLeave(m.chat);
                console.log(chalk.bold.yellow(`⚠️ ExtBot ${botToLeave.user.jid} se ha salido del grupo ${m.chat} para evitar duplicación de comandos.`));
            } catch (error) {
                console.error(chalk.bold.red(`⚠️ Error al intentar que el ExtBot ${botToLeave.user.jid} se salga del grupo ${m.chat}: ${error}`));
            }
        }
    }
};

handler.before = async function (m, { conn, participants, groupMetadata, isBotAdmin, isAdmin, isROwner }) {
    if (!m.isGroup) return;

    const groupAdmins = participants.filter(p => p.admin);
    const extBots = global.conns.filter(bot => bot.user.jid !== global.conn.user.jid && bot.user.jid !== conn.user.jid);

    if (extBots.length > 0) {
        let nonAdminBots = [];
        let adminBots = [];

        for (let extBot of extBots) {
            const isExtBotAdmin = groupAdmins.some(admin => admin.id === extBot.user.jid);
            if (isExtBotAdmin) {
                adminBots.push(extBot);
            } else {
                nonAdminBots.push(extBot);
            }
        }

        if (nonAdminBots.length > 0) {
            // Si hay bots que no son admin, se sale uno de ellos
            const botToLeave = nonAdminBots[Math.floor(Math.random() * nonAdminBots.length)];
            try {
                await botToLeave.groupLeave(m.chat);
                console.log(chalk.bold.yellow(`⚠️ ExtBot ${botToLeave.user.jid} se ha salido del grupo ${m.chat} para evitar duplicación de comandos.`));
            } catch (error) {
                console.error(chalk.bold.red(`⚠️ Error al intentar que el ExtBot ${botToLeave.user.jid} se salga del grupo ${m.chat}: ${error}`));
            }
        } else if (adminBots.length > 1) {
            // Si todos los bots son admin, se sale uno aleatorio excepto el bot principal
            const botToLeave = adminBots[Math.floor(Math.random() * adminBots.length)];
            try {
                await botToLeave.groupLeave(m.chat);
                console.log(chalk.bold.yellow(`⚠️ ExtBot ${botToLeave.user.jid} se ha salido del grupo ${m.chat} para evitar duplicación de comandos.`));
            } catch (error) {
                console.error(chalk.bold.red(`⚠️ Error al intentar que el ExtBot ${botToLeave.user.jid} se salga del grupo ${m.chat}: ${error}`));
            }
        }
    }
};

export default handler;*/