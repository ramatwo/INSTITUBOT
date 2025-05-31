let handler = async (m, { conn, text, command, usedPrefix, args, isROwner }) => { 

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let cooldown = 3600000; // 1 hora
let userCooldowncaraocruz = global.userAhorcadoCooldowns || (global.userAhorcadoCooldowns = {});
let userCooldown = userCooldowncaraocruz[m.sender] || 0;
let time = userCooldown + cooldown;

if (new Date - userCooldown < cooldown) {
  return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a jugar.*`, null, m);
}


let textos = `\`\`\`CARA O CRUZ\n\n${usedPrefix + command} cara\n${usedPrefix + command} cruz\n\n${wm}\`\`\``
if (!isROwner) {
if (new Date - userCooldown < cooldown) {
    return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a jugar.*`, fkontak, m)
} }
if (!args[0]) {
    let pp = './src/game/caraocruz.jpg'
    return await conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, quoted: fkontak })
}
var astro = Math.random()
if (astro < 0.50) {//34
    astro = 'cara'
} else if (astro > 0.50){//34
astro = 'cruz' 
}
let user = global.db.data.users[m.sender]
let recompensa = 500000
let perdida = 600000
if (user.money < 600000) return m.reply(`❌ No tenés suficientes monedas para jugar. Necesitas ${perdida} monedas como minimo.`)
   
   if (!isROwner) {
    userCooldowncaraocruz[m.sender] = new Date * 1
   }

if (text == astro) {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(who) 
    global.db.data.users[m.sender].money += recompensa
    global.db.data.users[m.sender].victorias += 1
    m.reply(`╭━━━━[ GANASTE! 🎉 ]━━━⬣\n┃${name} Vos: ${text}\n┃SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`)
} else {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender 
    let name = conn.getName(who) 
    global.db.data.users[m.sender].money -= perdida
    global.db.data.users[m.sender].derrotas += 1
    m.reply(`╭━━━━[ PERDISTE! 🤡 ]━━⬣\n┃${name} Vos: ${text}\n┃SodicaBot: ${astro}\n┃📈 Perdiste: ${perdida} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`)
}
}

handler.help = ['cara', 'cruz']
handler.tags = ['games']
handler.command = /^(lanzar|caraocruz)$/i
handler.register = true
handler.owner = false
export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
   //  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
 // hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
  
    return minutes + " Minutos y " + seconds + " Segundos"
  }