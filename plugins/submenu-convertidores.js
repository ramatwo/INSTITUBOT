
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, command }) => {
try {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = `*tocá en leer más 👇👇*
${readMore}

*╭━[ CONVERTIDORES 🛰️ ]━⬣*
┃ *Convierte sticker en imagen*
┃ *Crea enlace de archivos*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🛰️➺ _${usedPrefix}toimg *sticker*_
┃🛰️➺ _${usedPrefix}toaudio *video*_
┃🛰️➺ _${usedPrefix}tovideo *audio*_
┃🛰️➺ _${usedPrefix}tourl *video, imagen*_
┃🛰️➺ _${usedPrefix}tts es *texto*_
*╰━━━━━━━━━━━━⬣*

`.trim()
await conn.sendFile(m.chat, archivo, 'Menú de Convertidores', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /menuconvertidores/i
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
