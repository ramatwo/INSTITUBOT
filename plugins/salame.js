let handler = async (m, { conn, text, usedPrefix, command, groupMetadata }) => {
let _user = "524811096003@s.whatsapp.net"

let who
if (m.isGroup) who = m.mentionedJid[0]
else who = m.chat
let user = global.db.data.users

let txt = text.replace('@' + who.split`@`[0], '').trim()

   
  let gata = `enviando salame: @${_user.split("@s.whatsapp.net")[0]}\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈`

await conn.sendMessage(
    m.chat,
    { text: gata, mentions: [_user, m.sender] },
    { quoted: m }
  );

  conn.sendMessage(
    _user,
    {
      text: `que salame que sos`,
      mentions: [m.sender],
    },
    
  );



  }

handler.help = ["ddxp [@user]"];
handler.tags = ["xp"];
handler.command = ['salame'] 
handler.rowner = true;
export default handler;


