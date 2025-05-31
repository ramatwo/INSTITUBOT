let handler = async (m, { conn, text, args, participants, usedPrefix, command }) => {	
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let a = []
let b = text.split('|')

if (!b[0]) return conn.reply(m.chat, `Para crear una encuesta, debés usar el comando así:\n*${usedPrefix + command} Motivo de Encuesta|opcion1|oopcion2|opcion3....*`, fkontak, m) 
if (!b[1]) return conn.reply(m.chat, `Para crear una encuesta, debés usar el comando así:\n*${usedPrefix + command} Motivo de Encuesta|opcion1|oopcion2|opcion3....*`, fkontak, m)
if (b[13]) return conn.reply(m.chat, `❌ Máximo 12 opciones.`, fkontak, m)

for (let c = 1; c < b.length; c++) { a.push([b[c]]) }
let texto = `📊 *ENCUESTA* 📊\n*👤 ⇢ ${conn.getName(m.sender)}*\n*${text.split('|')[0]}*`

return conn.sendPoll(m.chat, texto, a, {mentions: m})}
handler.command = ['poll', 'encuesta', 'crearencuesta', 'startpoll', 'encuestas', 'polls'] 
export default handler
handler.register = true