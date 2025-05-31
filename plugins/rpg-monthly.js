let handler = async (m, { isPrems, conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}


let user = global.db.data.users[m.sender]
let premium = user.premium

let diamante = `${pickRandom([1500, 2300, 2900, 3600, 4200])}` * 1
let diamantepremium = `${pickRandom([4500, 5900, 7000, 8800, 10000])}` * 1

let emas = `${pickRandom([5, 8, 12, 16, 19, 22, 25, 27, 29, 30])}` * 1
let emaspremium = `${pickRandom([14, 16, 18, 22, 27, 29, 33, 36, 38, 40])}` * 1

let token = `${pickRandom([5, 9, 15, 16, 25, 28, 30])}` * 1
let tokenpremium = `${pickRandom([12, 19, 25, 34, 44, 50])}` * 1

let eleksirb = `${pickRandom([20, 30, 39, 50, 55, 59, 60])}` * 1
let eleksirbpremium = `${pickRandom([35, 55, 80, 120, 150, 170])}` * 1

let oro = `${pickRandom([4, 7, 9, 14, 20])}` * 1
let oropremium = `${pickRandom([19, 18, 26, 38, 50])}` * 1

let berlian = `${pickRandom([5, 7, 9, 11, 15, 19, 26, 28, 29, 30])}` * 1
let berlianpremium = `${pickRandom([16, 22, 31, 39, 42, 53, 65, 67, 69, 70])}` * 1

let kardus = `${pickRandom([5, 8, 10, 17, 25, 39, 46, 48, 49, 50])}` * 1
let karduspremium = `${pickRandom([17, 30, 49, 55, 58, 59, 73, 79, 81, 89])}` * 1

let pet = `${pickRandom([4, 4, 4, 6, 6, 7, 7, 2, 2, 2])}` * 1
let petpremium = `${pickRandom([7, 7, 7, 12, 12, 12, 18, 18, 18, 20])}` * 1

let gardenboxs = `${pickRandom([3, 3, 3, 3, 4, 4, 2, 2, 2, 5])}` * 1
let gardenboxspremium = `${pickRandom([6, 6, 8, 8, 10, 10, 12, 12, 12, 15])}` * 1

let legendary = `${pickRandom([2, 2, 2, 2, 2, 3, 3, 4, 4, 4])}` * 1
let legendarypremium = `${pickRandom([4, 4, 4, 6, 6, 6, 7, 7, 9, 10])}` * 1
 
const recompensas = {
  diamante: premium ? diamantepremium : diamante,
  emas: premium ? emaspremium : emas,
  token: premium ? tokenpremium : token,
  eleksirb: premium ? eleksirbpremium : eleksirb,
  oro: premium ? oropremium : oro,
  berlian: premium ? berlianpremium : berlian,
  kardus: premium ? karduspremium : kardus,
  pet: premium ? petpremium : pet,
  gardenboxs: premium ? gardenboxspremium : gardenboxs,
  mythic: premium ? legendarypremium : legendary,
}

let time = user.lastmonthly + 2 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000 //un mes
if (new Date - user.lastmonthly < 2 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000) return await conn.reply(m.chat, `𝙔𝘼 𝙍𝙀𝘾𝙄𝘽𝙄𝙎𝙏𝙀 𝙏𝙐 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙈𝙀𝙉𝙎𝙐𝘼𝙇 🌅\n${clockString(time - new Date() * 1)}`, fkontak,  m)

let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━🏄‍♂️━⛷️━🤾‍♀️━━⬣
┃ 🏅 𝙍𝙀𝘾𝙊𝙈𝙋𝙀𝙉𝙎𝘼 𝙈𝙀𝙉𝙎𝙐𝘼𝙇
┃ ${premium ? '🎟️ Recompensa VIP' : '🆓 Recompensa regular'}*
┃ ${texto} ${premium ? '*GRACIAS POR SER VIP*' : '*Recompensa regular*'}
╰━━🧘‍♂️━🤺━🚴‍♀️━━⬣\n\n🎟️ VIP ⇢ ${premium ? '✅' : '❌'}\n${wm}`
let img = "./media/menus/velocidad.bat"
await conn.sendFile(m.chat, img, 'Mensual', text, fkontak)

user.lastmonthly = new Date * 1
}
handler.command = ['monthly', 'cadames', 'mes', 'mensual', 'entregadelmes'] 
handler.level = 10
export default handler
handler.register = true

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