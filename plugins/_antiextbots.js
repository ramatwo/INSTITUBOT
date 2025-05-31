import { areJidsSameUser } from '@whiskeysockets/baileys';

export async function before(m, { participants, conn }) {
    if (m.isGroup) {
        let chat = global.db.data.chats[m.chat];

        let botJid = global.conn.user.jid; 

        // Si el bot actual es el bot principal, no hace nada
        if (botJid === conn.user.jid) {
            return;
        } else {
            // Verifica si el grupo es el especificado
            if (m.chat === '120363298242345373@g.us') {
                return; // No hace nada si es el grupo especificado
            }

            // Verifica si el bot principal está presente en el grupo
            let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id));

            if (isBotPresent) {
                setTimeout(async () => {
                    await conn.reply(
                        m.chat,
                        `Solo bot principal permitido, saliendo del grupo...`,
                        m
                    );
                    await conn.groupLeave(m.chat);
                }, 2000); // Espera 5 segundos antes de salir
            }
        }
    }
}