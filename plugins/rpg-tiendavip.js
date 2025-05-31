let handler = async (m, { conn, text, usedPrefix, command, args }) => {
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
    let toUser = `${m.sender.split("@")[0]}`
    let aa = toUser + '@s.whatsapp.net'	
    let template = (args[0] || '').toLowerCase() 
    let solonumeros = `*Ingrese solo números.*\n*Ejemplo: ${usedPrefix + command} 1*`




    if (/comprar|prem1/i.test(command)) {
    var tiempoPremium = 1440 * text //tiempo total 
    var tiempoDecretado = 1440 * 1 //tiempo decretado 
    const gata = 100000
    let user = global.db.data.users[m.sender]
    
    if (!text) return conn.reply(m.chat, `Ingresá el tiempo premium que querés comprar\n\n*➭ 🎟️ 1 = ${tiempoDecretado} MINUTOS (un dia)*\n*➭ Por ${gata} ${rpgshop.emoticon('diamante')}s*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
    if (isNaN(text)) return conn.reply(m.chat, solonumeros, fkontak, m)
    if (user.diamante < gata) return conn.reply(m.chat, `No tenés suficientes *${rpgshop.emoticon('diamante')}s* para comprar VIP por un día. Comprá ${rpgshopp.emoticon('diamante')} usando *${usedPrefix}buy diamante cantidad*`, fkontak, m)
    user.diamante -= gata * text
    
    var tiempo = 10800000 * text //3 horas
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    //let imgpre = 'https://logowiki.net/wp-content/uploads/imgp/Premium-Logo-1-5365.jpg' 
    
    await conn.reply(m.chat, `*╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ Adquiriste un ticket VIP*
*┃*
*┃👤 Usuario » ${user.name}*
*┃💰 Pago »  -${gata * text} ${rpgshopp.emoticon('diamante')}*
*┃👝 Saldo anterior » ${user.diamante + gata} ${rpgshopp.emoticon('diamante')}*
*┃🛄 Saldo actual » ${user.diamante} ${rpgshopp.emoticon('diamante')}*
*┃🕐 Tiempo VIP adquirido » ${tiempoPremium} min (3 horas)*
*┃📉 Restante » ${user.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*\nPara consultar tus beneficios usá ${usedPrefix}beneficiosvip`, fkontak, { mentions: [aa,] })}
    

    if (/prem2/i.test(command)) {
    var tiempoPremium = 10080 * text //tiempo total 
    var tiempoDecretado = 10080 * 1 //tiempo decretado 
    const gata = 50000
    let user = global.db.data.users[m.sender]
        
    if (!text) return conn.reply(m.chat, `Ingresá el tiempo premium que querés comprar\n\n*➭ 🎟️ 1 = ${tiempoDecretado} MINUTOS (una semana)*\n*➭ ${gata} ${rpgshop.emoticon('token')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
    if (isNaN(text)) return conn.reply(m.chat, solonumeros, fkontak, m)
    if (user.token < gata) return conn.reply(m.chat, `No tenés suficientes *${rpgshop.emoticon('token')}s* para comprar VIP por una semana. Compre ${rpgshopp.emoticon('token')} usando *${usedPrefix}buy*`, fkontak, m)
    user.token -= gata * text
        
    var tiempo = 259200000 * text //3 dias
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    
    await conn.reply(m.chat,
`*╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ Adquiriste un ticket VIP*
*┃*
*┃👤 Usuario » ${user.name}*
*┃💰 Pago »  -${gata * text} ${rpgshopp.emoticon('diamante')}*
*┃👝 Saldo anterior » ${user.diamante + gata} ${rpgshopp.emoticon('diamante')}*
*┃🛄 Saldo actual » ${user.diamante} ${rpgshopp.emoticon('diamante')}*
*┃🕐 Tiempo VIP adquirido » ${tiempoPremium} min (3 dias)*
*┃📉 Restante » ${user.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*\nPara consultar tus beneficios usá ${usedPrefix}beneficiosvip`, fkontak, { mentions: [aa,] })}
        
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅

    if (/prem3/i.test(command)) {
    var tiempoPremium = 43200 * text //tiempo total 
    var tiempoDecretado = 43200 * 1 //tiempo decretado 
    const gata = 80000
    let user = global.db.data.users[m.sender]
        
    if (!text) return conn.reply(m.chat, `Ingrese un numero\n\n*➭ 🎟️ 1 = ${tiempoDecretado} MINUTOS (1 mes)*\n*➭ ${gata} ${rpgshop.emoticon('oro')}*\n\n*EJEMPLO: ${usedPrefix + command} 1*`, fkontak, m)
    if (isNaN(text)) return conn.reply(m.chat, solonumeros, fkontak, m)
    if (user.oro < gata) return conn.reply(m.chat, `No tenés suficiente *${rpgshop.emoticon('oro')}* para comprar VIP por una semana. Compre ${rpgshopp.emoticon('oro')} usando *${usedPrefix}buy*`, fkontak, m)
    user.oro -= gata * text
        
    var tiempo = 1814400049.68 * text //3 semanas
    var now = new Date() * 1
    if (now < user.premiumTime) user.premiumTime += tiempo
    else user.premiumTime = now + tiempo
    user.premium = true
    
    await conn.reply(m.chat,
 `*╭┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╮*
*┃🎟️ Adquiriste un ticket VIP*
*┃*
*┃👤 Usuario » ${user.name}*
*┃💰 Pago »  -${gata * text} ${rpgshopp.emoticon('diamante')}*
*┃👝 Saldo anterior » ${user.diamante + gata} ${rpgshopp.emoticon('diamante')}*
*┃🛄 Saldo actual » ${user.diamante} ${rpgshopp.emoticon('diamante')}*
*┃🕐 Tiempo VIP adquirido » ${tiempoPremium} min (3 semanas)*
*┃📉 Restante » ${user.premiumTime - now} seg*
*╰┈┈┈┈┈◈ 🌟 ◈┈┈┈┈┈╯*\nPara consultar tus beneficios usá ${usedPrefix}beneficiosvip`, fkontak, { mentions: [aa,] })}
        
    //┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅
        
    if (command) {
    switch (template) {		
    case 'premium':
    case 'vip':
    case 'prem':
    case 'pass':
    case 'pase':
    let num = "5491151244787"
    let mensaje = `                        *🎟️    TIENDA VIP    🎟️*\n\n📌 Comprá un tipo de ticket para convertirte en usuario premium\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n💎 VIP - Clase 1\n➭${usedPrefix}prem1 1\n*➭* Pase básico\n*➭* 100.000 ${rpgshop.emoticon('diamante')}s ➟ 3 horas \n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n💳 VIP - Clase 2\n*➭*${usedPrefix}prem2 1\n*➭* Pase Premium\n*➭* 50.000 💳 Tokens ➟ 3 dias\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n👑 VIP - Clase 3\n*➭*${usedPrefix}prem3 1\n*➭* Pase Empresario\n*➭* 100 ${rpgshop.emoticon('oro')} ➟ 3 semanas\n┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅\n👑 VIP - Clase 4\n*➭* *Pase Semestral*\n*➭* 3200 ARS (pesos argentinos) *6 MESES*\n*➭* 900 ARS *MENSUAL*\n*➭* 3.40 USD si es transf. internacional\n*➭* Contactar con mi propietario\n para completar la transacción\n wa.me/` + num
    await conn.reply(m.chat, mensaje, fkontak, { mentions: [aa,] })

    break	
            
    }}}
    handler.help = ['addprem [@user] <days>']
    handler.tags = ['owner']
    handler.command = /^(comprar|prem1|prem2|prem3|premium|vip|prem|pass|pase)$/i
handler.rwoner = true
    export default handler