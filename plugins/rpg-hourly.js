import fetch from 'node-fetch'
let handler = async (m, { isPrems, conn }) => {
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
let user = global.db.data.users[m.sender]
let premium = user.premium

let exp = `${pickRandom([5000, 6000, 7000, 8000, 9000, 9990, 10000, 13000, 15000, 18000])}` * 1
let exppremium = `${pickRandom([10000, 15000, 18000, 21000, 25000, 29000, 33000, 36000, 40000, 45000])}` * 1

let botol = `${pickRandom([10, 10, 20, 30, 30, 0, 0])}` * 1
let botolpremium = `${pickRandom([300, 300, 700, 700, 500, 500])}` * 1
	
let batu = `${pickRandom([20, 20, 10, 10, 10, 10, 3])}` * 1
let batupremium = `${pickRandom([400, 40, 30, 700, 70, 50])}` * 1

let common = `${pickRandom([10, 0, 0, 20, 0, 100, 10, 1])}` * 1
let commonpremium = `${pickRandom([200, 200, 100, 300, 400])}` * 1
 
const recompensas = {
  exp: premium ? exppremium : exp,
  botol: premium ? botolpremium : botol,
  batu: premium ? batupremium : batu,
  common: premium ? commonpremium : common,
}

let time = user.lasthourly + 3600000 //1 Hora //3600000
if (new Date - user.lasthourly < 3600000) return await conn.reply(m.chat, `Pará emoción, ni pasó la hora todavia. Volvé en *${msToTime(time - new Date())}*`, fkontak,  m)

let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `*+${recompensas[reward]}* ${global.rpgshop.emoticon(reward)}\n┃ `}
let text = `╭━━🕐━🕑━🕒━━⬣
┃ ♻️ entrega h-oral 
┃ *${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa regular'}*
┃ ${texto}
┃ *${premium ? 'GRACIAS POR SER VIP' : 'Recompensa regular'}*
╰━━🕕━🕔━🕓━━⬣\n\n🎟️ VIP ⇢ ${premium ? '✅' : '❌'}`
let pp = "./media/menus/velocidad.bat";
conn.sendFile(m.chat, pp, "Cada Hora.bat", text);

user.lasthourly = new Date * 1
}
handler.help = ['hourly']
handler.tags = ['xp']
handler.command = ['hourly', 'entega', 'cadahora', 'recibirentrega'] 
//handler.level = 4 
export default handler
handler.register = true
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}