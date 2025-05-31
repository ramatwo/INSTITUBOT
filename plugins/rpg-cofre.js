let handler = async (m, { isPrems, conn }) => {
  let time = global.db.data.users[m.sender].lastcofre + 86400000 // 86400000 24hrs
  if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) throw `Ya reclamaste el cofre. Volvé en *${msToTime(time - new Date())}* `
  
  let img = "./media/menus/velocidad.bat"
  let diamantes = `${pickRandom([200, 800, 900])}` * 1
  let tokens = `${pickRandom([2, 3, 4, 5, 0, 1, 6, 7, 8, 9, 10])}` * 1
  let moneditas = `${pickRandom([20000, 30000, 4000, 50000, 0, 10000, 60000, 70000, 80000, 90000, 10000])}` * 1
  let expp = `${pickRandom([20000, 30000, 40000, 50000, 0, 100000, 60000, 70000, 80000, 90000, 10000])}` * 1
  
    global.db.data.users[m.sender].diamante += diamantes
    global.db.data.users[m.sender].money += moneditas
    global.db.data.users[m.sender].token += tokens
    global.db.data.users[m.sender].exp += expp
    
  let texto = `${(conn.user.jid == global.conn.user.jid ? '' : `\n*SOY UNA EXTENSION DE: +${global.conn.user.jid.split`@`[0]}*`) || ''}
  ╭━━🎉━🎉━🎉━━⬣
  ┃✨ Obtuviste un cofre jugoso
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
  
  await conn.sendFile(m.chat, img, 'Cofre', texto, fkontak)

  global.db.data.users[m.sender].lastcofre = new Date * 1
  }
  handler.help = ['daily']
  handler.tags = ['xp']
  handler.command = ['coffer', 'cofre', 'abrircofre', 'cofreabrir'] 
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
