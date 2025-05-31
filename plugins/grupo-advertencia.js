let handler = async (m, { conn, text, command, usedPrefix }) => {//prems 
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    let lenGB = lenguajeGB.lenguaje() == 'en' ? usedPrefix + 'on antitoxic' : usedPrefix + 'on antitoxic';
    if (!db.data.chats[m.chat].antitoxic && m.isGroup) return conn.reply(m.chat, lenguajeGB.smsAdveu1() + lenGB, fkontak, m) 
    let who 
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
    else who = m.chat
    let name = await conn.getName(m.sender)	
        
    let user = global.db.data.users[who]
    if (!who) return conn.reply(m.chat, lenguajeGB.smsMalused3() + `*${usedPrefix + command} @${name} ${lenguajeGB['smsAdveu2']()}*`, fkontak, m)  	
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) return conn.reply(m.chat, lenguajeGB.smsAdveu3() + `*${usedPrefix + command} @${name} ${lenguajeGB['smsAdveu2']()}*`, fkontak, m)  	
    try {
    user.warn += 1
    await m.reply(
        `${
          user.warn == 1 ? `*@${who.split`@`[0]}*` : `*@${who.split`@`[0]}*`
        } *RECIBIÓ UNA ADVERTENCIA EN ESTE GRUPO*\n\n🫵 *${text}*\n\n*ADVERTENCIA*\n⚠️ *${user.warn}/3*`,
        null,
        { mentions: [who] });
   
    if (user.warn >= 3) {
    user.warn = 2
    await m.reply(`*Se te advirtió varias veces y no hiciste caso.*\n*@${who.split`@`[0]}* *vas a ser eliminado.*`, false, { mentions: [who] })
    //user.banned = true
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove') //@${m.sender.split`@`[0]}
    //await this.updateBlockStatus(m.sender, 'block') 
    }	
    return !1
    } catch (e) {
      console.error(e);
      conn.reply(m.chat, `Error: usó mal el comando.`, m);
      console.log(e)
  }}
    handler.help = ['addprem <@user>']
    handler.tags = ['owner']
    handler.command = /^(advertir|advertencia|Advertencias|strike|warn|warning)$/i
    handler.group = true
    handler.admin = true
    handler.botAdmin = true
    handler.register = true
    export default handler