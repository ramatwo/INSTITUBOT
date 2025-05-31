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
    'Minaste, obtenés',
    'Tus Ingresos suben gracias a que minaste',
    '⛏️⛏️ Minando',
    '⛏️ La Mineria te benefició con',
    '👾 Gracias a que minaste, ahora tenés',
    '⛏️⛏️⛏️ Obtenés'])}`
    
    
    
    
    let string = `${pickRandom([2, 3, 4, 5])}` * 1
    let stringpremium = `${pickRandom([50, 60, 70, 80, 90, 100])}` * 1
    
    let coal = `${pickRandom([4, 5, 8, 10, 12])}` * 1
    let coalpremium = `${pickRandom([90, 140, 150, 170, 200])}` * 1
    
    let emas = `${pickRandom([0, 2, 3, 0, 0, 0])}` * 1
    let emaspremium = `${pickRandom([40, 50, 10, 10, 70, 80])}` * 1
    
    let exp = `${pickRandom([50000, 20000, 30000, 40000 , 100000])}` * 1
    let exppremium = `${pickRandom([50000, 60000, 70000, 80000, 90000, 100000, 500000])}` * 1
    
    const recompensas = {	
      string: premium ? stringpremium : string,
      coal: premium ? coalpremium : coal,
      emas: premium ? emaspremium : emas,
      exp: premium ? exppremium : exp,
    }
    
    //let xp = `${pickRandom([5000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 25000, 30000, 37000, 40000, 45000])}` * 1
   // let exppremium = `${pickRandom([50000, 60000, 70000, 80000, 90000, 100000, 105000, 115000, 120000])}` * 1
    
    let time = user.lastmiming + 18000000 //4 horas
    if (new Date - user.lastmiming < 18000000) return await conn.reply(m.chat, `*⏱️ Volvé en ${msToTime(time - new Date())} para seguir minando⛏️*`, fkontak,  m)
   // user.exp += premium ? exppremium : xp  
    let texto = ''
    for (let reward of Object.keys(recompensas)) {
        if (!(reward in user)) continue
        user[reward] += recompensas[reward]
    texto += `+${recompensas[reward]} ${global.rpgshop.emoticon(reward)}\n`}
    
    
    await conn.reply(m.chat, `*${minar}*\n${texto}`, fkontak,  m)
    user.lastmiming = new Date * 1  
    }
    handler.help = ['minar']
    handler.tags = ['xp']
    handler.command = ['minar', 'minarxp', 'minarexp', 'mine', 'minar1'] 
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
    