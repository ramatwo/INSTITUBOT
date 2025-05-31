

let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net', '5492644560887@s.whatsapp.net', '5492323532307@s.whatsapp.net']
let handler = async (m, { isPrems, conn }) => {

    if (!allowedNumbers.includes(m.sender)) {
        return conn.reply(m.chat, 'Debés haber donado a las causas benéficas que se realizaron.', m)
    }
    let user = global.db.data.users[m.sender]
    let time = user.donantetime + 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000  // 36000000 10 Horas //86400000 24 Horas
    if (new Date - user.donantetime < 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000  ) throw `Ya reclamaste el cofre. Volvé en\n*${clockString(time - new Date() * 1)}* `
    
    let img = "./media/menus/velocidad.bat"
    let diamantes = `${pickRandom([90000, 60000])}` * 1
    let tokens = `${pickRandom([20, 30, 40, 50, 0, 10, 60, 70, 80, 90, 100])}` * 1
    let moneditas = `${pickRandom([200000, 300000, 40000, 500000, 0, 100000, 600000, 700000, 800000, 900000, 100000])}` * 1
    let expp = `${pickRandom([200000, 300000, 400000, 500000, 0, 1000000, 600000, 700000, 800000, 900000, 100000])}` * 1
    
      global.db.data.users[m.sender].diamante += diamantes
      global.db.data.users[m.sender].money += moneditas
      global.db.data.users[m.sender].token += tokens
      global.db.data.users[m.sender].exp += expp
      
    let texto = `
    ╭━━🎉━🎉━🎉━━⬣
    ┃ Obtuviste un cofre por donar!!
    ┃ ┈┈┈┈┈┈┈┈┈┈┈┈┈
    ┃⚗️ *${diamantes} Diamantes* 💎
    ┃⚗️ *${tokens} Tokens* 🪙
    ┃⚗️ *${moneditas} Moneditas* 🪙
    ┃⚗️ *${expp} Exp* ⚡
    ╰━━〔 𓃠 *${vs}* 〕━━⬣`
    
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
    
    await conn.sendFile(m.chat, img, 'Cofre para buenas personas :)', texto, fkontak)
  
    user.donantetime = new Date * 1
    }
    handler.help = ['daily']
    handler.tags = ['xp']
    handler.command = ['cofreson'] 
    handler.level = 5
    handler.register = true
    export default handler
    
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


    function clockString(ms) {
     

        let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
        let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
        let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
        let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
        return ['┃⇢ ', d, ' ☀️ Días*\n', '┃⇢ ', h, ' *⏰ Horas*\n', '┃⇢ ', m, ' *🕐 Minutos*\n', '┃⇢ ', s, ' *⏱️ Segundos'].map(v => v.toString().padStart(2, 0)).join('')
      }