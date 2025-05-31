//
//By @NeKosmic || https://github.com/NeKosmic/
//

//import * as fs from 'fs';

export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let chat = global.db.data.chats[m.chat];
    let bot = global.db.data.settings[this.user.jid] || {};
    let name = await conn.getName(m.sender);
    let fakemek = {
        key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" },
        message: {
            groupInviteMessage: {
                groupJid: "51995386439-1616969743@g.us",
                inviteCode: "m",
                groupName: "P",
                caption: 'SodicaBot',
                jpegThumbnail: null
            }
        }
    };

    if (chat.antiTraba && m.text.length > 51500) { //Cantidad máxima de caracteres aceptados en un mensaje
        if (isAdmin) return console.log("Mensaje largo detectado");

        conn.sendMessage(m.chat, `*Se detectó un mensaje que contiene muchos caracteres. Esto puede causar lag en algunos dispositivos.*\n${isBotAdmin ? '' : 'No soy administrador, no puedo hacer nada.'}`, m);

        if (isBotAdmin) {
            conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }});
            setTimeout(() => {
                conn.sendMessage(m.chat, {
                    text: `Marca el chat como leido ✓\n${"\n".repeat(400)}\n• El número : wa.me/${m.sender.split("@")[0]}\n• Alias : ${name}\n‼️Acaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos`,
                    mentions: [m.sender]
                }, { quoted: fakemek });
            }, 0);
            setTimeout(() => {
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }, 1000);
        } else if (!bot.restrict) {
            return m.reply(`${lenguajeGB['smsSoloOwner']()}`);
        }
    }
    return !0;
}