/*let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin, command }) {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let user = `@${m.sender.split`@`[0]}`
let delet = m.key.participant;
let bang = m.key.id;
  
if (isBotAdmin && m.isGroup) {
   
if (m.text && m.text.toLowerCase().includes("off modoadmin") || m.text.toLowerCase().includes(".off modoadmin")) {
    let avisodeuso = `*💾 MOODOADMIN ALERTA 💾*\n\n🔧 *COMANDO:* ${command}`;
    conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
conn.sendMessage(m.chat, { text: `> ${user} se detectó que modificaste el modo administrador. Este comando fue enviado a mis administradores para evaluar su uso.`, mentions: [m.sender] }, { quoted: fkontak })
//await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } })
//await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
return null
}
}}
export default handler*/