let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `Etiquete o escriba el nombre.` 

if (command == 'gay') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *GAY*_ 🏳️‍🌈`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}

 // ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'lesbiana') { 
let juego = `_*${text.toUpperCase()}* *ES* *${(100).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_ 🏳️‍🌈`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'pajero') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_ 😏💦`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'pajera') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()}*_ 😏💦`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'puto') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'puta') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()},* *MÁS INFORMACIÓN A SU PRIVADO 🔥🥵*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}

 // ------------------------------------------------------------------------------------------------------------------------------------------------
  
if (command == 'manco') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------  
  
if (command == 'manca') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()} 💩*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------ 
  
if (command == 'rata') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🐁 COME QUESO 🧀*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------   
  
if (command == 'prostituto') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS?*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
// ------------------------------------------------------------------------------------------------------------------------------------------------   
  
if (command == 'prostituta') {
let juego = `_*${text.toUpperCase()}* *ES* *${(101).getRandom()}%* *${command.replace('how', '').toUpperCase()} 🫦👅, QUIEN QUIERE DE SUS SERVICIOS?*_`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
  
 // ------------------------------------------------------------------------------------------------------------------------------------------------   
if (command == 'love') {
let juego = `*❤️❤️ MEDIDOR DE AMOR ❤️❤️*\n*_El amor de ${text.toUpperCase()} ES DE ${(101).getRandom()}% Deberias pedirle que sea tu  novia/o ?_*`.trim()
await conn.reply(m.chat, juego, m, m.mentionedJid ? { mentions: m.mentionedJid } : {})}
//conn.sendHydrated(m.chat, juego, wm, null, md, 'SodicaBot', null, null, [
//['𝙈𝙚𝙣𝙪 𝙅𝙪𝙚𝙜𝙤𝙨 | 𝙂𝙖𝙢𝙚𝙨 𝙈𝙚𝙣𝙪 🎡', '#juegosmenu'],
//['𝙊𝙩𝙧𝙖 𝙫𝙚𝙯 | 𝘼𝙜𝙖𝙞𝙣 🤭', `${usedPrefix + command} ${text.toUpperCase()}`],
//['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
//], m, m.mentionedJid ? {
//mentions: m.mentionedJid
//} : {})} 
}
handler.help = ['love', 'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map(v => v + ' @tag | nombre')
handler.tags = ['calculator']
handler.command = ['love', 'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto']
handler.exp = 100
handler.register = true
export default handler
