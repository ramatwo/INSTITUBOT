
let handler = async (m, { conn, usedPrefix, usedPrefix: _p, command }) => {
try {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = `*tocá en leer más 👇👇*
${readMore}
*╭━[ CONFIGURACIÓN - GRUPOS ]━⬣*
┃ *Mejorá tú Grupo con SodicaBot*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃🌐➺ _${usedPrefix}ban *@tag*_
┃🌐➺ _${usedPrefix}grupo *abrir : cerrar*_
┃🌐➺ _${usedPrefix}promote *@tag*_
┃🌐➺ _${usedPrefix}demote *@tag*_
┃🌐➺ _${usedPrefix}invocar *texto*_
┃🌐➺ _${usedPrefix}hidetag *texto*_
┃🌐➺ _${usedPrefix}configtime_ *abrir : cerrar* *numero*
┃🌐➺ _${usedPrefix}setname *nombre del grupo*_
┃🌐➺ _${usedPrefix}setdesc *descripcion*_
┃🌐➺ _${usedPrefix}resetlink_
┃🌐➺ _${usedPrefix}on *caracteristica*_
┃🌐➺ _${usedPrefix}off *caracteristica*_
┃🌐➺ _${usedPrefix}setwelcome *texto*_
┃🌐➺ _${usedPrefix}setbye *texto*_
*╰━━━━━━━━━━━━⬣*
${readMore}
*╭━━━[ AJUSTES - CHATS ]━━━⬣*
┃ *Configurá con on y off*
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃⚙️ _${usedPrefix}on *:* off *welcome*_
┃⚙️ _${usedPrefix}on *:* off *detect*_
┃⚙️ _${usedPrefix}on *:* off *autolevelup*_
┃⚙️ _${usedPrefix}on *:* off *stickers*_
┃⚙️ _${usedPrefix}on *:* off *autosticker*_
┃⚙️ _${usedPrefix}on *:* off *reaction*_
┃⚙️ _${usedPrefix}on *:* off *antiviewonce*_
┃⚙️ _${usedPrefix}on *:* off *antidelete*_
┃⚙️ _${usedPrefix}on *:* off *antifake*_
┃⚙️ _${usedPrefix}on *:* off *antilink*_
┃⚙️ _${usedPrefix}on *:* off *antilink2*_
┃⚙️ _${usedPrefix}on *:* off *antitk*_
┃⚙️ _${usedPrefix}on *:* off *antiyt*_
┃⚙️ _${usedPrefix}on *:* off *antitel*_
┃⚙️ _${usedPrefix}on *:* off *ntifb*_
┃⚙️ _${usedPrefix}on *:* off *antig*_
┃⚙️ _${usedPrefix}on *:* off *antitw*_
*╰━━━━━━━━━━━━⬣*`.trim()
await conn.sendFile(m.chat, archivo, 'Menú de ajustes', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /menuajustes|menuconfig|menuconfiguracion/i
handler.register = true //necesita etar registrado
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}  