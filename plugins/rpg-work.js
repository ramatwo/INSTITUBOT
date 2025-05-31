let handler = async (m, { conn, isPrems }) => {
    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
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
    let time = global.db.data.users[m.sender].lastwork + 3600000 //1 hora
    if (new Date - global.db.data.users[m.sender].lastwork < 3600000) throw `*Eh chambeador, esperá ${msToTime(time - new Date())} antes de volver a la chamba.*`
    let user = global.db.data.users[m.sender]
    let premium = user.premium
    
    let exp = `${pickRandom([10000, 20000, 30000, 40000, 50000])}` * 1
    let exppremium = `${pickRandom([50000,60000,70000,80000, 90000])}` * 1

    const recompensas = {
        exp: premium ? exppremium : exp
      }
    let texto = ''
    for (let reward of Object.keys(recompensas)) {
        if (!(reward in user)) continue
        user[reward] += recompensas[reward]
        texto += `_${recompensas[reward]}_`
    }

    global.db.data.users[m.sender].exp += exp * 1


    await conn.reply(m.chat, `*${pickRandom(global.work)}* ${texto} *EXP*⚡`, fkontak, m)

    global.db.data.users[m.sender].lastwork = new Date * 1
}
handler.help = ['work']
handler.tags = ['xp']
handler.command = ['work', 'trabajar', 'chambear', 'chamba']
handler.fail = null
handler.exp = 0
handler.register = true
handler.rowner = false
export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + "m " + seconds + "s "
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}

global.work = [
    "Trabajaste militando para cristina kirchner y te robaron. perdiste",
    "Trabajaste como negro, y encima ganás",
    "Trabaja para una empresa militar privada, ganando",
    "Organiza un evento de cata de vinos y obtiene",
    "Moderaste el grupo cuando Sodica no estaba. el pago fue",
    "Iba caminando por la calle y te encontraste mil sopes. Ganaste",
    "Ayudaste con el grupo mientras los admin no estaban. el pago fue",
    "Te secuestran y te llevan a un coliseo subterráneo donde luchaste contra monstruos con personas que nunca antes habías conocido. Ganaste",
    "Te limpiaste el culo y ganaste",
    "Desarrollas juegos para ganarte la vida y ganás",
    "¿Por qué este comando se llama trabajo? Ni siquiera estás haciendo nada. Sin embargo, ganás",
    "Trabajaste en la oficina horas extras por",
    "Trabajas como secuestrador y ganás",
    "Trabajas en el restaurante y ganás",
    "Trabajas 10 minutos en un 'Pizzas El Dogor'. Ganaste",
    "Trabajas como escritor y ganás",
    "Revisas tu wallet de bitcoins. No tenías nada porque sos alto pobre, pero ganás",
    "Ves a alguien renegando por subir una caja a su auto. Lo ayudas y te pagan con",
    "ganás un concurso de ser pelotudo. El premio es",
    "Trabajas todo el día en la empresa SodicaCrew™ por",
    "Ayudaste a moderar un grupo mientras SodicaBot estaba saturado. Ganaste",
    "Diseñaste un logo por",
    "Trabajaste como albañil por",
    "Trabajas como prostituta por",
    "La demanda de juegos para teléfonos aumentó, programaste un nuevo juego lleno de microtransacciones. Ganaste",
    "Trabajas como actor de voz para Bob Esponja y ganaste",
    "Estabas cultivando semillas como un negro esclavo de mierda y ganaste",
    "Trabajas como militante de Javier Milei y ganaste",
    "Agarraste la pala y ganaste",
    "Trabajas como artista pobre. Ganaste",
    "ARRIBA JAVIER MILEI. Por ser libertario ganaste",
    "Le diste una moneda a un indigente y mágicamente encontraste una bolsa de dinero. Ganaste",
    "Fuiste parte de un proyecto de caridad. Como recompensa, recibiste",
    "Escribiste un libro de autoayuda que nadie compró, pero al final alguien te dio",
    "Creaste contenido viral en TikTok y ganaste",
    "Vendiste empanadas en el barrio y te quedaste con",
    "Organizaste una feria comunitaria y al final te recompensaron con",
    "Arreglaste computadoras viejas y vendiste cada una por",
    "Ayudaste a tu vecino con su jardín y recibiste como pago",
    "Cazaste un animal salvaje en un bosque virtual y obtuviste",
    "Te pusiste a minar criptomonedas en tu tostadora y ganaste",
    "Reparaste autos como mecánico y te pagaron con",
    "Te ofreciste como guía turístico y te dieron",
    "Diseñaste un meme épico y te donaron",
    "Fuiste streamer por un día y tus viewers te regalaron",
    "Participaste en un programa de televisión y el premio fue",
    "Ayudaste a un amigo a mudarse. Como agradecimiento, recibiste",
    "Salvaste un gato de un árbol y el dueño te recompensó con",
    "Escribiste un ensayo brillante que ganó un premio. El premio fue",
    "Hiciste pan casero y lo vendiste por",
    "Ganaste una apuesta con tu amigo sobre quién podía comer más empanadas. Tu recompensa fue",
    "Jugaste en una feria de pueblo y obtuviste un premio en efectivo de",
    "Trabajaste como taxista por un día y ganaste",
    "Inventaste un nuevo cóctel y te dieron propina por",
    "Arreglaste el internet de tu vecino y te recompensaron con"
];
