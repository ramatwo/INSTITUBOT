let handler = async (m, { conn, usedPrefix, usedPrefix: _p, command }) => {
try {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = `*tocá en leer más 👇👇*
${readMore}
*╭━[ MODIFICAR AUDIO 🧰 ]━⬣*
┃ *Realiza Modificaciones*
┃ *al Audio o Nota de Voz *
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🧰 _${usedPrefix}bass_
┃🧰 _${usedPrefix}saturar_
┃🧰 _${usedPrefix}deep_
┃🧰 _${usedPrefix}earrape_
┃🧰 _${usedPrefix}fast_
┃🧰 _${usedPrefix}fat_
┃🧰 _${usedPrefix}nightcore_
┃🧰 _${usedPrefix}reverse_
┃🧰 _${usedPrefix}robot_
┃🧰 _${usedPrefix}slow_
┃🧰 _${usedPrefix}smooth_
┃🧰 _${usedPrefix}tupai_
*╰━━━━━━━━━━━━⬣*
`.trim()
await conn.sendFile(m.chat, archivo, 'Modificador de audios', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /menuaudios/i
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)