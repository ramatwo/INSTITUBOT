/*import fs from "fs"

let cooldowns = {}

let handler = m => m

handler.all = async function (m) {
    let vn = './media/ah.mp3'
    const estilo = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
        },
        message: {
            orderMessage: {
                itemCount: -999999,
                status: 1,
                surface: 1,
                message: 'Bot WhatsApp',
                orderTitle: 'Bang',
                thumbnail: fs.readFileSync('./media/menus/img1.jpg'),
                sellerJid: '0@s.whatsapp.net'
            }
        }
    }
    const estiloaudio = {
        key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "5219992095479-1625305606@g.us" } : {})
        },
        message: {
            "audioMessage": { "mimetype": "audio/ogg; codecs=opus", "seconds": "99569", "ptt": "true" }
        }
    }

    // Definir el tiempo de cooldown en segundos
    let cooldownTime = 10; // 10 segundos

    // Verificar si el comando tiene un cooldown activo
    if (cooldowns[m.command]) {
        let elapsedTime = (Date.now() - cooldowns[m.command]) / 1000; // Convertir a segundos
        if (elapsedTime < cooldownTime) {
            // El comando está en cooldown, no ejecutar y salir
            return
        }
    }

    // Establecer el tiempo de ejecución actual para el comando
    cooldowns[m.command] = Date.now();

    if (/^bot$/i.test(m.text)) {
       // conn.(m.chat, `porno gay`, wm, [['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', `#menu`]], 'conversation', { sendEphemeral: true, quoted: estilo })
       conn.reply(m.chat, "que querés", m, { mentions: { mentionedJid: [m.sender] }})
      // conn.sendFile(m.chat, vn, 'bot.mp3', null, m, true, { type: 'audioMessage', ptt: true, sendEphemeral: true, quoted: estiloaudio })
    }
    if (/^sodicabot$/i.test(m.text)) {
        
        conn.reply(m.chat, "que querés SALAME", m, { mentions: { mentionedJid: [m.sender] }})
      
     }

    return !0
}

export default handler

*/