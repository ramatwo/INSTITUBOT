/*import yts from 'yt-search';
import fs from 'fs';
let handler = async (m, { conn, text, usedPrefix, command }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
if (!text) return conn.reply(m.chat, `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙑𝙄𝘿𝙀𝙊 𝙊 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝘾𝙃𝘼𝙉𝙉𝙀𝙇`, fkontak,  m)
try {
let vids_ = { 
from: m.sender, 
urls: [] 
}
if (!global.videoList) {
global.videoList = [];
}
if (global.videoList[0]?.from == m.sender) {
delete global.videoList;
}
let results = await yts(text);
let textoInfo = `          *BÚSQUEDA EN YOUTUBE*
Descargá el video que quieras con:
${usedPrefix}video link 
${usedPrefix}toaudio (primero descarga el video y responde al video con .audio)\n\n••••••••••••••••••••••••••••••••••••`.trim()  
let teks = results.all.map((v, i) => {
let link = v.url;
vids_.urls.push(link);
return `[${i + 1}]\n🔖 *TÍTULO:*  ${v.title}
🔗 *ENLACE:* ${v.url}
⏳ *DURACIÓN:* ${v.timestamp}
💾 *SUBIDO:* ${v.ago}
👤 *VISTAS:* ${v.views}`}).join('\n\n••••••••••••••••••••••••••••••••••••\n\n')
conn.sendFile(m.chat, results.all[0].thumbnail, 'yts.jpeg', textoInfo + '\n\n' + teks, fkontak, m)
global.videoList.push(vids_);
} catch {    
}}
handler.help = ['', 'earch'].map(v => 'yts' + v + ' <pencarian>')
handler.tags = ['tools']
handler.command = /^playlist|yt|play|youtube|ytbuscar|yts(earch)?$/i
handler.diamante = 1000
handler.register = true
//handler.level = 30
export default handler*/