import { join } from 'path'
import { promises } from 'fs'

let lastHealTime = {} // Objeto para almacenar la última vez que se ejecutó el comando por cada usuario

let handler = async (m, { conn, args, usedPrefix, __dirname }) => {
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

    
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let user = global.db.data.users[m.sender]

    if (user.health >= 100) return conn.reply(m.chat, `𝙏𝙐 𝙎𝘼𝙇𝙐𝘿 𝙀𝙎𝙏𝘼 𝙇𝙇𝙀𝙉𝘼 ❤️\n\n*SALUD: ${user.health}*`, fkontak, m)

    const cooldownTime = 2 * 60 * 60 * 1000; // 2 horas en milisegundos
    const currentTime = Date.now();
    const lastTime = lastHealTime[m.sender] || 0;

    if (currentTime - lastTime < cooldownTime) {
        const remainingTime = cooldownTime - (currentTime - lastTime);
        const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
        const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

        return conn.reply(m.chat, `La magia de la curación cuesta mucho trabajo de elaborar. Vuelve en ${remainingHours} horas y ${remainingMinutes} minutos.`, fkontak, m);
    }

    const heal = 40 + (user.cat * 4);
    let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - user.health) / heal)))) * 10;

    if (user.potion < count) return conn.reply(m.chat, `No tenés mas pociones. Necesitás ${count - user.potion} para curarte.

    Salud » ${user.health} ❤️
    Poción » ${user.potion} 🥤

    Comprar 🥤
    ${usedPrefix}buy potion ${count - user.potion}`, fkontak, m);

    user.potion -= count * 1; //1 potion = count (1) 
    user.health = 100

    lastHealTime[m.sender] = currentTime; // Actualizar la última vez que se ejecutó el comando

    conn.reply(m.chat, `*━┈━《 ✅ SALUD COMPLETA (${count}) 》━┈━*`, fkontak, m);
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = /^(heal|curar)$/i
handler.register = true
export default handler;

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}
