
/*
let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.suit = global.suit ? global.suit : {}

*/

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
//let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  


let cooldown = 3600000; // 1 hora
let userCooldownppt = global.userAhorcadoCooldowns || (global.userAhorcadoCooldowns = {});
let userCooldown = userCooldownppt[m.sender] || 0;
let time = userCooldown + cooldown;





let textos = `PIEDRA, PAPEL O TIJERA 😛😛\n\nPodés usar cualquiera de los tres:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\nSi querés hacer un pvp online con otro usuario tirate un:\n${usedPrefix + command} @0`
if (new Date - userCooldown < cooldown) {
    return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a jugar.*`, null, m);
  }
  
if (!args[0]) return await conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, quoted: fkontak })


//------------------------------------------------------


let textquien = `PIEDRA, PAPEL O TIJERA 😛😛\n\nPodés usar cualquiera de los tres:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\nSi querés hacer un pvp online con otro usuario tirate un:\n${usedPrefix + command} @0`
        if (!m.mentionedJid[0] && !args[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)}, {quoted: fkontak })
        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
        else who = m.sender 
        let name = conn.getName(who) 
          
        let astro = Math.random();
        if (astro < 0.34) {
        astro = 'piedra';
        } else if (astro > 0.34 && astro < 0.67) {
        astro = 'tijera';
        } else {
        astro = 'papel';
        }
        
        userCooldownppt[m.sender] = new Date * 1; 
        if (text == astro) {
        let money = global.db.data.users[who].money
        let bono = global.db.data.users[m.sender].money += 2
        conn.reply(m.chat, `╭━━━━[ *EMPATE! 🤝* ]━━━━⬣\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💸 Bono: ${bono} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        } else if (text == 'papel') {
        if (astro == 'piedra') {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money += 100
        global.db.data.users[m.sender].victorias += 1
        conn.reply(m.chat, `*╭━━━━[ GANASTE! 🎉 ]━━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m);
        } else {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money -= 25
        global.db.data.users[m.sender].derrotas += 1
        conn.reply(m.chat, `*╭━━━━[ PERDISTE! 🤡 ]━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃📈 Perdiste: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        }} else if (text == 'tijera') {
        if (astro == 'papel') {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money += 900
        global.db.data.users[m.sender].victorias += 1
        conn.reply(m.chat, `*╭━━━━[ GANASTE! 🎉 ]━━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        } else {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money -= 300
        global.db.data.users[m.sender].derrotas += 1
        conn.reply(m.chat,`*╭━━━━[ PERDISTE! 🤡 ]━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃📈 Perdiste: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        }} else if (text == 'tijera') {
        if (astro == 'papel') {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money += 1000
        global.db.data.users[m.sender].victorias += 1
        conn.reply(m.chat, `*╭━━━━[ GANASTE! 🎉 ]━━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        } else {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money -= 300
        global.db.data.users[m.sender].derrotas += 1
        conn.reply(m.chat, `*╭━━━━[ PERDISTE! 🤡 ]━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃📈 Perdiste: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣*`, m);
        }} else if (text == 'papel') {
        if (astro == 'piedra') {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money += 1000
        global.db.data.users[m.sender].victorias += 1
        conn.reply(m.chat,`*╭━━━━[ GANASTE! 🎉 ]━━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        } else {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money -= 300
        global.db.data.users[m.sender].derrotas += 1
        conn.reply(m.chat, `*╭━━━━[ PERDISTE! 🤡 ]━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃📈 Perdiste: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣*`, m);
        }} else if (text == 'piedra') {
        if (astro == 'tijera') {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money += 1000
        global.db.data.users[m.sender].victorias += 1
        conn.reply(m.chat, `*╭━━━━[ GANASTE! 🎉 ]━━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃💰 Recompensa: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣`, m)
        //m.reply(`*╭━━━━[ 𝙃𝘼 𝙂𝘼𝙉𝘼𝘿𝙊! 🎉 ]━━━⬣*\n┃${name} 𝙐𝙨𝙩𝙚𝙙: ${text}\n┃🐱 𝙂𝙖𝙩𝙖𝘽𝙤𝙩: ${astro}\n┃💰 𝙋𝙧𝙚𝙢𝙞𝙤: ${[recompensa].getRandom()} 𝙂𝙖𝙩𝙖𝘾𝙤𝙞𝙣𝙨\n┃💵 Tu balance: ${money} 𝙂𝙖𝙩𝙖𝘾𝙤𝙞𝙣𝙨\n╰━━━━━━[ ${vs} ]━━━━━⬣`);
        } else {
        let money = global.db.data.users[who].money
        let recompensa = global.db.data.users[m.sender].money -= 300
        global.db.data.users[m.sender].derrotas += 1
        conn.reply(m.chat,  `*╭━━━━[ PERDISTE! 🤡 ]━━⬣*\n┃${name}: ${text}\n┃🤖 SodicaBot: ${astro}\n┃📈 Perdiste: ${recompensa} Moneditas\n┃💵 Tu balance: ${money} Moneditas\n╰━━━━━━[ ${vs} ]━━━━━⬣*`, m);
    }
}
         /*
        if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.sender))) return m.reply(`Terminá tu partida actual antes de iniciar otra.`) 
        if (Object.values(conn.suit).find(room => room.id.startsWith('suit') && [room.p, room.p2].includes(m.mentionedJid[0]))) return m.reply(`La persona con la que querés hacer un pvp ya se encuentra en una sala.`) 
        let id = 'suit_' + new Date() * 1
        let caption = `*🎮⚔️ PVP DE PIEDRAPAPELOTIJERA ⚔️🎮*\n\n*@${m.sender.split`@`[0]} desafía a @${m.mentionedJid[0].split`@`[0]} a un pvp!!*\n\n_*@${m.mentionedJid[0].split`@`[0]} debe escribir aceptar o rechazar*_`;
        //let imgplaygame = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`
        conn.suit[id] = {
        chat: await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender, m.mentionedJid]}),
        //await conn.sendButton(m.chat, caption, footer, imgplaygame, [[`Aceptar`], [`Rechazar`]], null, {mentions: conn.parseMention(caption)}),
        id: id,
        p: m.sender,
        p2: m.mentionedJid[0],
        status: 'wait',
        waktu: setTimeout(() => {
        if (conn.suit[id]) conn.reply(m.chat, `El tiempo para el pvp finalizó.`, m)
        delete conn.suit[id]}, timeout), poin, poin_lose, poin_bot, timeout
                }*/
    }
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(ppt)$/i
export default handler
handler.register = true
handler.group = true
handler.owner = false
/*function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}*/
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      //  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
      // hours = (hours < 10) ? "0" + hours : hours
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return minutes + " Minutos y " + seconds + " Segundos";
  }