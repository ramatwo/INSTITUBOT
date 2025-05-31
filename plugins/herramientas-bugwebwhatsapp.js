const handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) return m.reply(`*Menciona a alguien random y agregá un texto:*\n*${usedPrefix + command}* @${m.sender.split`@`[0]} a`, null, {mentions: [m.sender]});
    const cm = copy(m);
    let who;
    if (text.includes('@0')) who = '0@s.whatsapp.net';
    else if (m.isGroup) who = cm.participant = m.mentionedJid[0];
    else who = m.chat;
    if (!who) return m.reply(`*Menciona a alguien random y agregá un texto:*\n*${usedPrefix + command}* @${m.sender.split`@`[0]} a`, null, {mentions: [m.sender]});
    cm.key.fromMe = false;
    cm.message[m.mtype] = copy(m.msg);
    const sp = '@' + who.split`@`[0];
    const [fake, ...real] = text.split(sp);
    conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
      contextInfo: {
        mentionedJid: conn.parseMention(real.join(sp).trim()),
      },
    });
  };
  handler.help = ['bugweb <text> @user <text2>'];
  handler.tags = ['tools'];
  handler.command = /bugweb/;
  handler.register = true
  handler.premium = true
  handler.rowner = true
  export default handler;
  
  function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }