

let timeout = 60000
let poin = 600 
let poin_lose = -100
let poin_bot = 200
global.suit = global.suit ? global.suit : {}



let handler = async (m, { conn, text, command, usedPrefix, args }) => {
//let pp = 'https://www.bighero6challenge.com/images/thumbs/Piedra,-papel-o-tijera-0003318_1584.jpeg'
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }  
// 60000 = 1 minuto // 30000 = 30 segundos // 15000 = 15 segundos // 10000 = 10 segundos
let time = global.db.data.users[m.sender].wait + 40000
let textos = `PIEDRA, PAPEL O TIJERA 😛😛\n\nPodés usar cualquiera de los tres:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\nSi querés hacer un pvp online con otro usuario tirate un:\n${usedPrefix + command} @0`
let textquien = `PIEDRA, PAPEL O TIJERA 😛😛\n\nPodés usar cualquiera de los tres:\n${usedPrefix + command} piedra\n${usedPrefix + command} papel\n${usedPrefix + command} tijera\n\nSi querés hacer un pvp online con otro usuario tirate un:\n${usedPrefix + command} @0`
        if (!m.mentionedJid[0] && !args[0]) return m.reply(textquien, m.chat, {mentions: conn.parseMention(textquien)}, {quoted: fkontak })
if (new Date - global.db.data.users[m.sender].wait < 40000) return await conn.reply(m.chat, `> *🕓 Esperá ${Math.floor((time - new Date()) / 1000)}sg antes de volver a jugar.*`, fkontak, m)
if (!args[0]) return await conn.sendMessage(m.chat, { image: { url: pp }, caption: textos, quoted: fkontak })


//------------------------------------------------------



        let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
        else who = m.sender 
       // let name = conn.getName(who) 
          
        
        
        
    global.db.data.users[m.sender].wait = new Date * 1
       
         
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
 
    
    //-------------------------------

        }}
handler.help = ['ppt']
handler.tags = ['games']
handler.command = /^(pvp)$/i
export default handler
handler.register = true
handler.group = true
handler.owner = false
