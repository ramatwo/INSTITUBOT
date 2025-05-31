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

let magia = `${pickRandom([0, 1, 3, 1, 2])}` * 1
let magiapremium = `${pickRandom([200, 300, 500, 900, 1000, 700])}` * 1

let diamanteplus = `${pickRandom([0, 1, 0, 0, 2])}` * 1
let diamantepluspremium = `${pickRandom([300, 400, 500, 500, 500])}` * 1

let tiketcoin = `${pickRandom([1, 0, 0, 1, 0, 0, 2])}` * 1
let tiketcoinpremium = `${pickRandom([200, 300, 400, 500, 200, 300, 300])}` * 1

const recompensas = {	
  magia: premium ? magiapremium : magia,
  diamanteplus: premium ? diamantepluspremium : diamanteplus,
  tiketcoin: premium ? tiketcoinpremium : tiketcoin,
}

let diamante = `${pickRandom([200, 300, 400, 500, 1000])}` * 1
let diamantepremium = `${pickRandom([400, 700, 800, 900, 1000, 1300])}` * 1

let time = user.lastdiamantes + 18000000 //5 horas
if (new Date - user.lastdiamantes < 18000000) return await conn.reply(m.chat, `*⏱️ Volvé en ${msToTime(time - new Date())} para seguir minando⛏️*`, fkontak,  m)
user.diamante += premium ? diamantepremium : diamante  
let texto = ''
for (let reward of Object.keys(recompensas)) {
    if (!(reward in user)) continue
    user[reward] += recompensas[reward]
texto += `+${recompensas[reward]} ${global.rpgshop.emoticon(reward)}\n`}

let gat = `*${premium ? '🎟️ Recompensa Premium' : '🆓 Recompensa Gratis'}*\n*${minar}*\n*${diamante} ${global.rpgshop.emoticon('diamante')}*\n\n🍁 𝗕 𝗢 𝗡 𝗢\n\n${texto}\n\n🎟️ VIP ⇢ ${premium ? '✅' : '❌'}\n${wm}`
await conn.sendFile(m.chat, pp, 'SodicaBot.exe', gat, fkontak)

user.lastdiamantes = new Date * 1  
}
handler.help = ['minar']
handler.tags = ['diamantes']
handler.command = ['minar3', 'miming3', 'mine3', 'minardiamantes', 'minargemas', 'minardiamante'] 
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

return minutes + " m y " + seconds + " s " 
}  

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
