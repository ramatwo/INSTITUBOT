let handler = async (m, { conn, isPrems}) => { //lastmiming
const fkontak = {
        "key": {
        "participants":"0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"    
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    }

let user = global.db.data.users[m.sender]
let premium = user.premium  
let minar = `${pickRandom(['Que pro 😎 has minado',
'🌟✨ Genial,  Obtenés',
'WOW  eres un gran Minero ⛏️ Obtenés',
'Minaste',
'😲 Lograste Minar la cantidad de',
'Tus Ingresos suben gracias a que minaste',
'⛏️⛏️⛏️⛏️⛏️ Minando',
'🤩 SII ! AHORA TENÉS',
'La minería esta de tu lado, por ello obtenés',
'😻 La suerte de Minar',
'♻️ Tu Misión se ha cumplido, lograste minar',
'⛏️ La Mineria te ha beneficiado con',
'🛣️ Encontraste un lugar y por minar dicho lugar Obtienes',
'👾 Gracias a que minaste, tus ingresos suman',
'Felicidades, ahora tenés','⛏️⛏️⛏️ Obtenés'])}`

let pp = "./media/menus/velocidad.bat"
let agua = `${pickRandom([2, 3, 1, 5])}` * 1
let aguapremium = `${pickRandom([2, 4, 6, 7, 5, 9])}` * 1

let rock = `${pickRandom([6, 9, 0, 12, 2])}` * 1
let rockpremium = `${pickRandom([13, 9, 17, 20, 25])}` * 1

let pancingan = `${pickRandom([1, 2, 1, 0])}` * 1
let pancinganpremium = `${pickRandom([1, 3, 4, 9, 2, 5, 8])}` * 1

const recompensas = {	
  agua: premium ? aguapremium : agua,
  rock: premium ? rockpremium : rock,
  pancingan: premium ? pancinganpremium : pancingan,
}
//let xp = Math.floor(Math.random() * 2000)
let money = `${pickRandom([10000, 20000, 25000, 30000, 37000, 40000, 100000])}` * 1
let moneypremium = `${pickRandom([50000, 60000, 70000, 80000, 90000, 100000, 500000])}` * 1

let time = user.lastcoins + 18000000 //3 horas
if (new Date - user.lastcoins < 18000000) return await conn.reply(m.chat, `*⏱️ Volvé en ${msToTime(time - new Date())} para seguir minando⛏️*`, fkontak,  m)
user.money += premium ? moneypremium : money  
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `+${recompensas[reward]} ${global.rpgshop.emoticon(reward)}\n`}

let gat = `*${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${money} ${global.rpgshop.emoticon('money')}*\n\n🍁 𝗕 𝗢 𝗡 𝗢\n${texto}\n\n🎟️ VIP ⇢ ${premium ? '✅' : '❌'}\n${wm}`
await conn.sendFile(m.chat, pp, 'SodicaBot.exe', gat, fkontak)

user.lastcoins = new Date * 1  
}
handler.help = ['minar2']
handler.tags = ['gata']
handler.command = ['minar2', 'miming2', 'mine2', 'minarmoneditas', 'minarcoins'] 
handler.fail = null
handler.exp = 0
export default handler
handler.register = true

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + "m y " + seconds + "s " 
}  

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
