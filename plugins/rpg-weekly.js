
let handler = async (m, { isPrems, conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}

let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([100000, 180000, 250000, 300000])}` * 1
let exppremium = `${pickRandom([200000, 280000, 350000, 600000])}` * 1

let diamanteplus = `${pickRandom([1, 5, 10, 80])}` * 1
let diamantepluspremium = `${pickRandom([2, 100, 50, 90])}` * 1

let magia = `${pickRandom([5, 8])}` * 1
let magiapremium = `${pickRandom([12, 19])}` * 1

let sampah = `${pickRandom([3])}` * 1
let sampahpremium = `${pickRandom([5, 8, 16])}` * 1

let sword = `${pickRandom([1])}` * 1
let swordpremium = `${pickRandom([2, 3, 3, 5, 8])}` * 1

let uncoommon = `${pickRandom([2, 2, 2, 3, 3, 3, 4, 4, 4, 5])}` * 1
let uncoommonpremium = `${pickRandom([5, 5, 5, 10, 5, 7, 7, 9, 9, 10])}` * 1

let mythic = `${pickRandom([1])}` * 1
let mythicpremium = `${pickRandom([3, 3, 3, 4, 4, 4, 3])}` * 1
 
const recompensas = {
  exp: premium ? exppremium : exp,
  diamanteplus: premium ? diamantepluspremium : diamanteplus,
  magia: premium ? magiapremium : magia,
  sampah: premium ? sampahpremium : sampah,
  sword: premium ? swordpremium : sword,
  uncoommon: premium ? uncoommonpremium : uncoommon,
  mythic: premium ? mythicpremium : mythic,
}

let time = user.lastweekly + 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000 //7 dias
if (new Date - user.lastweekly < 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000) return await conn.reply(m.chat, `𝙔𝘼 𝙍𝙀𝘾𝙄𝘽𝙄𝙎𝙏𝙀 𝙏𝙐 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙎𝙀𝙈𝘼𝙉𝘼𝙇 ⛅\n\n𝙔𝙊𝙐 𝘼𝙇𝙍𝙀𝘼𝘿𝙔 𝙍𝙀𝘾𝙀𝙄𝙑𝙀𝘿 𝙔𝙊𝙐𝙍 𝙒𝙀𝙀𝙆𝙇𝙔 𝙍𝙀𝙒𝘼𝙍𝘿 ⛅\n\n𝙑𝙐𝙀𝙇𝙑𝙀 𝙀𝙉 : 𝘾𝙊𝙈𝙀 𝘽𝘼𝘾𝙆 𝙄𝙉\n${clockString(time - new Date() * 1)}`, fkontak,  m)

let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━⛅━☃️━⛈️━━⬣
┃ ☀️ *RECOMPENSA SEMANAL*
┃ 🎟️ VIP ⇢ ${premium ? '✅' : '❌'}
┃ *${premium ? '🎟️ Recompensa VIP' : '🆓 Recompensa regular'}*
┃ ${texto} ${premium ? '*GRACIAS POR SER VIP*' : '*Recompensa regular*'}
╰━━💫━🌈━🌛━━⬣`
let img = "./media/menus/velocidad.bat"
await conn.sendFile(m.chat, img, 'Weekly', text, fkontak)
user.lastweekly = new Date * 1
}
handler.command = ['weekly', 'semana', 'semanal', 'cadasemana', 'entregasemanal'] 
handler.level = 7
export default handler
handler.register = true
handler.rowner = false
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['┃⇢ ', ye, ' *🗓️ Años : Year*\n', '┃⇢ ', mo, ' *⛅ Mes : Month*\n', '┃⇢ ', d, ' *☀️ Días*\n', '┃⇢ ', h, ' *⏰ Horas*\n', '┃⇢ ', m, ' *🕐 Minutos : Minutes*\n', '┃⇢ ', s, ' *⏱️ Segundoss*'].map(v => v.toString().padStart(2, 0)).join('')
}