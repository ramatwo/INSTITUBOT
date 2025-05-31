import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}

  

let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([50000, 60000, 70000])}` * 1
let exppremium = `${pickRandom([80000, 85000, 100000, 150000])}` * 1
	
let money = `${pickRandom([16000, 20000])}` * 1
let moneypremium = `${pickRandom([50000, 70000])}` * 1

let potion = `${pickRandom([1,0,0])}` * 1
let potionpremium = `${pickRandom([2, 4,0,1,0])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 2, 0])}` * 1
let tiketcoinpremium = `${pickRandom([20, 10, 10, 30, 40])}` * 1

let eleksirb = `${pickRandom([1, 1, 1, 3, 1, 2, 2, 1, 5, 8])}` * 1
let eleksirbpremium = `${pickRandom([30, 30, 50, 30, 80, 30, 40, 40, 100, 70])}` * 1

let umpan = `${pickRandom([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])}` * 1
let umpanpremium = `${pickRandom([300, 600, 90, 1200, 1500, 1800, 2100, 2400, 2700, 3000])}` * 1



const recompensas = {	
  exp: premium ? exppremium : exp,
  money: premium ? moneypremium : money,
  potion: premium ? potionpremium : potion,
  tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
  eleksirb: premium ? eleksirbpremium : eleksirb,
  umpan: premium ? umpanpremium : umpan,
}

let time = user.lastclaim + 86400000 //un dia
if (new Date - user.lastclaim < 86400000) return await conn.reply(m.chat, `Ya reclamaste tu regalo emoción, esperá *${msToTime(time - new Date())}*`, fkontak,  m)
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━🎁━🎁━🎁━━⬣
┃ ✨ Recompensa Diaria
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Regular'}*
┃ ${texto}
┃ *${premium ? 'GRACIAS POR SER VIP' : 'Recompensa regular'}*
╰━━🎁━🎁━🎁━━⬣

🎟️ VIP ⇢ ${premium ? '✅' : '❌'}\n${wm}`
let img = "./media/menus/velocidad.bat"
await conn.sendFile(m.chat, img, 'Daily', text, fkontak)

user.lastclaim = new Date * 1
}
handler.help = ['daily']
handler.tags = ['xp']
handler.command = ['daily','diario'] 
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
  var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}
handler.register = true