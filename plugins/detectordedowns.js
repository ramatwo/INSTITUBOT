/*let cooldowns = {}

let handler = m => m
handler.all = async function (m) {
    let chat = global.db.data.chats[m.chat]
    let name = conn.getName(m.sender)
    
    // Configuración de cooldown por comando
    let commandCooldowns = {
        down: 5,
    }

    let command = m.text.toLowerCase().split(' ')[0].replace(/[^a-zA-Z0-9]/g, '') // Obtener el primer segmento de texto como el comando
    
    // Verificar si el comando tiene un cooldown activo
    if (cooldowns[command]) {
        let elapsedTime = (Date.now() - cooldowns[command]) / 1000; // Conversor a segundos
        let cooldownTime = commandCooldowns[command] || 3; // Configura el cooldown predeterminado si no se especifica en el objeto commandCooldowns

        if (elapsedTime < cooldownTime) {
            // El comando está en cooldown, no ejecutar y salir
            return
        }
    }

 
    cooldowns[command] = Date.now();


    if (/d(\s*|\d*|\W*)o(\s*|\d*|\W*)w(\s*|\d*|\W*)n/i.test(m.text)) {
        let teks = `
    ${pickRandom([`⚠️⚠️⚠️⛔⛔⛔D WORD DETECTADA⛔⛔⛔⚠️⚠️⚠️`])}
    `.trim();
        conn.reply(m.chat, teks, m, { mentions: { mentionedJid: [m.sender] }});
    }
    
    

    


    return !0;
}

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}*/
