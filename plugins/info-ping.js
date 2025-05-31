import { cpus as _cpus, totalmem, freemem } from 'os'
import speed from "performance-now";
import osu from 'node-os-utils'
//import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
let format = sizeFormatter({
std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})
let handler = async (m, { conn }) => {
try {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let _muptime

if (process.send) {
  process.send('uptime')
  _muptime = await new Promise(resolve => {
  process.once('message', resolve)
  setTimeout(resolve, 1000)
}) * 1000 }
  
let muptime = clockString(_muptime)
const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
let cpuv = osu.cpu
let cpuCore = cpuv.count()
let cpuPer
let p1 = cpuv.usage().then(cpuPercentage => { cpuPer = cpuPercentage }).catch(() => { cpuPer = NotDetect })
await Promise.all([p1])




/*const { key } = await conn.sendMessage(m.chat, {text: "🏓 PONG."}, {quoted: fkontak});*/
m.react("🏓")
//let old = performance.now()
//let neww = performance.now()

let ini_timestamp = speed();
let ini_latensi = speed() - ini_timestamp + 1;
let text_ping = `${ini_latensi.toFixed(4)}`;

let caption = `
*⚡🚗 VELOCIDAD:* *${text_ping}* *ms*
🕐 Ejecutando durante: ${muptime}
*💬* GRUPOS: ${chats.length - groupsIn.length}
*💬* CHATS PRIVADOS: ${chats.length}
*🟢 RAM:* ${format(totalmem() - freemem())} / ${format(totalmem())} (${format(freemem())} libres)
*🧠 CPU:* ${cpuCore} Núcleos (${cpuPer}% usado)
`

console.log("ejecución de ping iniciada")
/*
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG..", edit: key});
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG...", edit: key});
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG", edit: key});
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG.", edit: key});
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG..", edit: key});
await new Promise(resolve => setTimeout(resolve, 200));
await conn.sendMessage(m.chat, {text: "🏓 PONG...", edit: key});
await new Promise(resolve => setTimeout(resolve, 1000));
await conn.sendMessage(m.chat, {text: caption, edit: key});
*/
await new Promise(resolve => setTimeout(resolve, 1000));
m.react("✅")
conn.reply(m.chat, caption, m, fkontak, )
} catch (e) {
  console.log(e)
  conn.reply(m.chat, '❌ *Ocurrió un fallo.*', m, fkontak, )}
}
handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping|speed|velocidad|rapidez|activo|status|velocity)$/i
export default handler

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [' ' + d, ' *Días ☀️* ', h, ' *Horas 🕐* ', m, ' *Minutos ⏰* ', s, ' *Segundos ⏱️* '].map(v => v.toString().padStart(2, 0)).join('')
}
handler.register = true