let handler = async (m, {text, usedPrefix, command }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
  else who = m.chat

  let user = global.db.data.users[who]
  if (!who) throw `*Mencioná o respondé el msj de la persona en cuestión.*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`

  let txt = text.replace('@' + who.split`@`[0], '').trim()
  let name = await '@' + who.split`@`[0]

  var hora1 = 3600000 * txt //1h
  var dia1 = 86400000 * txt //1d
  var semana1 = 604800000 * txt //1s
  var mes1 = 2629800000 * txt //1m
  var now = new Date() * 1

  if (!txt && !m.quoted) throw `*FALTA EL TIEMPO PREMIUM*`
  if (txt == 0 || txt == null) throw `*DEBE INGRESAR EL TIEMPO PREMIUM*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*\n*${usedPrefix + command} 1*`
  if (isNaN(txt)) return m.reply(`*SOLO NÚMERO*\n\n*${usedPrefix + command} @${m.sender.split`@`[0]} 1*`)
    let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
  conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
  if (command == 'addprem' || command == 'userpremium') {
      if (now < user.premiumTime) user.premiumTime += hora1
      else user.premiumTime = now + hora1
      user.premium = true
      const tiempoEnHoras = `${txt} hora(s)`;
      m.reply(`*🎟️ Nuevo usuario VIP*

      *✨ Usuario » ${name}*
      *🕐 Tiempo » ${tiempoEnHoras}*
      *📉 Restante » ${user.premiumTime - now} miliseg*`)
  }

  if (command == 'addprem2' || command == 'userpremium2') {
      if (now < user.premiumTime) user.premiumTime += dia1
      else user.premiumTime = now + dia1
      user.premium = true
      const tiempoEnDias = `${txt} día(s)`;
      m.reply(`*🎟️ Nuevo usuario VIP*

*✨ Usuario » ${name}*
*🕐 Tiempo » ${tiempoEnDias}*
*📉 Restante » ${user.premiumTime - now} miliseg*`)
  }

  if (command == 'addprem3' || command == 'userpremium3') {
      if (now < user.premiumTime) user.premiumTime += semana1
      else user.premiumTime = now + semana1
      user.premium = true
      const tiempoEnSemanas = `${txt} semana(s)`;
      m.reply(`*🎟️ Nuevo usuario VIP*

*✨ Usuario » ${name}*
*🕐 Tiempo » ${tiempoEnSemanas}*
*📉 Restante » ${user.premiumTime - now} miliseg*`)
  }

  if (command == 'addprem4' || command == 'userpremium4') {
      if (now < user.premiumTime) user.premiumTime += mes1
      else user.premiumTime = now + mes1
      user.premium = true
      const tiempoEnMeses = `${txt} mes(es)`;
      m.reply(`*🎟️ Nuevo usuario VIP*

*✨ Usuario » ${name}*
*🕐 Tiempo » ${tiempoEnMeses}*
*📉 Restante » ${user.premiumTime - now} miliseg*`)
  }

  
}
handler.help = ['addprem [@user] <days>']
handler.tags = ['owner']
handler.command = ['addprem', 'userpremium', 'addprem2', 'userpremium2', 'addprem3', 'userpremium3', 'addprem4', 'userpremium4']
handler.group = true
handler.rowner = true
export default handler
