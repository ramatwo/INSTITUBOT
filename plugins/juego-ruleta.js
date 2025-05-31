/*//CÓDIGO CREADO POR elrebelde21 : https://github.com/elrebelde21
const handler = async (m, {conn, text, isPrems}) => {

    const date = global.db.data.users[m.sender].juegos + 3600000; //una hora
    if (new Date - global.db.data.users[m.sender].juegos < 3600000) throw `『⏰』𝙀𝙨𝙥𝙚𝙧𝙖 : ${msToTime(date - new Date())} 𝙥𝙖𝙧𝙖 𝙫𝙤𝙡𝙫𝙚𝙧 𝙖 𝙟𝙪𝙜𝙖𝙧 `
    //if (global.db.data.users[m.sender].exp < 0 || global.db.data.users[m.sender].money < 0 || global.db.data.users[m.sender].diamante < 0) return m.reply(`No tenés suficientes recursos. no se te cobra nada, pero en el caso de que pierdas no te podemos quitar nada. Tenés los diamantes o las monedas en negativo.`)
    let user = global.db.data.users[m.sender]
    const exp = Math.floor(Math.random() * 850000)
    const diamanteplus = Math.floor(Math.random() * 25)
    const money = Math.floor(Math.random() * 850000)
    let rulet = ['txt1', 'txt2', 'txt3', 'txt4', 'txt5', 'txt6']; 
    let ruleta = rulet[Math.floor(Math.random() * 6)]
    global.db.data.users[m.sender].juegos = new Date * 1;

    if (ruleta === 'txt1') return m.reply(`Buena suerte!!! 🐞🍀\n*Obtenés:* ${exp} XP`).catch(global.db.data.users[m.sender].exp += exp) 
    if (ruleta === 'txt2') return m.reply(`jaja re malo, perdiste ${exp} XP`).catch(global.db.data.users[m.sender].exp -= exp) 
    if (ruleta === 'txt3') return conn.groupParticipantsUpdate(m.chat, [m.sender], 'demote').catch(m.reply(`Te tocó dejar de ser admin`))
    if (ruleta === 'txt4') return conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove').catch(m.reply(`Te tocó dejar el grupo jiji`))
    if (ruleta === 'txt5') return m.reply(`*GANASTE PA* 🎰\n*Recompensa:* ${diamanteplus} 💎`).catch(global.db.data.users[m.sender].diamanteplus += diamanteplus)
    if (ruleta === 'txt6') return m.reply(`*GANASTE PA* 🎰\n*Recompensa:* ${money} 🪙`).catch(global.db.data.users[m.sender].money += money)  

    }
    handler.help = ['game'];
    handler.tags = ['xp'];
    handler.command = /^(ruletarusa)$/i
    handler.fail = null;
    handler.group = true
    handler.register = true
   
    export default handler;
    
    function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return hours + " Hora(s) " + minutes + " Minuto(s)"}
    
    
    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())];
    }*/