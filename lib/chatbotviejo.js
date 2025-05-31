let cooldowns = {}

let handler = m => m
handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let name = conn.getName(m.sender)
    let cooldownTime = 2// 
    // Verificar si el comando tiene un cooldown activo
    if (cooldowns[m.command]) {
        let elapsedTime = (Date.now() - cooldowns[m.command]) / 1000; //conversor a seg
        if (elapsedTime < cooldownTime) {
            // El comando está en cooldown, no ejecutar y salir
            return
        }
    }

    // Establecer el tiempo de ejecución actual para el comando
    cooldowns[m.command] = Date.now();

    if (/^callate$/i.test(m.text)) {
        let teks = `
${pickRandom([`callame`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }
    if (/^hola$/i.test(m.text)) {
        let teks = `
${pickRandom([`tu nariz contra mis bolas`, `mi pito en tu cola`, `patimicola`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^que$/i.test(m.text)) {
        let teks = `
${pickRandom([`sito`, `so`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^macaco|macaco|mono|mexicano|mejicano$/i.test(m.text)) {
        let teks = `
${pickRandom([`CUIADO VIENEN LOS MEXICANOS\n🙉🙉🙉🙉🙉🙉`, `My mexican reaction: 🙉🙉🙉`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^rra$/i.test(m.text)) {
        let teks = `
${pickRandom([`eres.`, `sos.`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^13|trece$/i.test(m.text)) {
        let teks = `
${pickRandom([`agarrala que crece jsdkajsak`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^erizo|.erizo$/i.test(m.text)) {
        let teks = `
${pickRandom([`🦔`, `🦔🦔🦔`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }

    if (/^rama|ramatwo$/i.test(m.text)) {
        let teks = `
${pickRandom([`bienvenidas XL`, `gordas no`])}
`.trim()
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }})
    }
    return !0;
}

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
