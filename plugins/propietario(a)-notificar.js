const linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i
const grupo = global.canal1
let handler = async (m, { conn, text, usedPrefix, command, participants, groupMetadata }) => {
let users = m.sender.split`@`[0]
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let [_, code] = grupo.match(linkRegex) || []
if ( users == 5491162480909 || users == 5491156664731 || users == 5491162480909 || users == 5491162480909 || users == 584125778026 || users == 5492266466080 || users == 50689823726 || users == 573136855110 || users == 5214531173598 ) try {
//if ( users == 593993684821 || users == 5491162480909) try {
if (!text) return m.reply(`*Falta Texto*`) 
let res = await conn.groupAcceptInvite(code)
await conn.sendMessage(res, { text: text + ( users == 5491162480909 ? '\n\n_atte. SodicaCrew' : '' || users == 5491162480909 ? '' : '' ), mentions: (await conn.groupMetadata(`${res}`)).participants.map(v => v.id) }, { quoted: fkontak })
await m.reply(`✅ *MENSAJE ENVIADO CON ÉXITO* `)

} catch (e) {
await conn.sendButton(m.chat, `\n${wm}`, lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, null, [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], m)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)
} else {
await m.reply('```USTED NO TIENE AUTORIZACIÓN PARA USAR ESTE COMANDO.```')}
}
handler.command = ['mensajeoficial']
handler.rowner = true
export default handler
