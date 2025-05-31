
let handler = async (m, { conn, usedPrefix, command, args }) => {
let users = global.db.data.users[m.sender]
let cooldown = 3600000; // 1 hora
let userCooldownslot = global.userAhorcadoCooldowns || (global.userAhorcadoCooldowns = {});
let userCooldown = userCooldownslot[m.sender] || 0;
let time = userCooldown + cooldown;

if (new Date - userCooldown < cooldown) {
  return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a jugar.*`, null, m);
}


    let fa = `❌ RECHAZADO:
    Debés usar el comando de la siguiente manera
    ${usedPrefix}slot1/2/3 100`.trim()
    
    if (!args[0]) return m.reply(fa) 
    if (isNaN(args[0])) return m.reply(fa) 
    let apuesta = parseInt(args[0])
    
    if (apuesta < 100) throw `❌ RECHAZADO: Debés apostar un mínimo de 100.`
    if (apuesta > 10000000) throw `❌ RECHAZADO: No te emocionés apostando tanto.`
    if (users.exp < apuesta) {
    throw `❌ RECHAZADO: No tenés suficientes recursos. Usá el menurpg para ganar objetos.`    
    }
    userCooldownslot[m.sender] = new Date * 1; // Actualiza el tiempo de cooldown del usuario
    if (command == 'slot1') {
   
        
    let emojis = ["🍁", "⚡", "🍇"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
    y = [],
    z = [];
    for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
    global.db.data.users[m.sender].victorias += 1
    end = `💸 *GANASTE +${apuesta + apuesta} EXP*`
    users.exp += apuesta
    } else if (a == b || a == c || b == c) {
    users.exp
    end = `*CASI!!*`
    users.exp -= apuesta
    } else {
    global.db.data.users[m.sender].derrotas += 1
    end = `*PERDISTE!!* ❌ -${apuesta} EXP`
    users.exp -= apuesta
    }
    
    var hawemod = [
    `${x[1]} : ${y[0]} : ${z[0]}
    ${z[0]} : ${y[1]} : ${x[1]}
    ${z[1]} : ${x[2]} : ${y[0]}`, 
    `${x[0]} : ${y[1]} : ${z[2]}
    ${y[1]} : ${z[2]} : ${x[1]}
    ${x[2]} : ${y[0]} : ${z[0]}`, 
    `${x[1]} : ${y[2]} : ${z[1]}
    ${y[0]} : ${z[0]} : ${x[2]}
    ${x[2]} : ${y[1]} : ${z[0]}`
    ]
    
    const maxIterations = 4;
    const arrayCasuale = generaArrayCasuale(hawemod, maxIterations);
    
    const array = [...arrayCasuale, ];
      
    let { key } = await conn.sendMessage(m.chat, { text: `*INICIANDO...*` }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (let i = 0; i < maxIterations; i++) {
    
    await conn.sendMessage(m.chat, { text: `🎰 | *SLOTS* | 🎰\n────────\n` + `${array[i]}` + `\n ────────\n🎰 |   *SLOTS*   | 🎰`, edit: key }, { quoted: m });
    await new Promise((resolve) => setTimeout(resolve, 1))}
      
    return await conn.sendMessage(m.chat, {text: `
    🎰 | *SLOTS* | 🎰 
    ────────
    ${x[0]} : ${y[0]} : ${z[0]}
    ${x[1]} : ${y[1]} : ${z[1]}
    ${x[2]} : ${y[2]} : ${z[2]}
     ────────
    🎰 |   *SLOTS*   | 🎰\n\n${end}`, edit: key}, {quoted: m})}
    
    
    
    
    if (users.money < apuesta)  { 
    throw `❌ RECHAZADO: No tenés suficientes recursos. Usá el menurpg para ganar objetos.`    
    }
    if (command == 'slot2') {
        
    let emojis = ["🐈", "🐓", "🐙"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
    y = [],
    z = [];
    for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
      global.db.data.users[m.sender].victorias += 1
    end = `💸 *GANASTE +${apuesta + apuesta} MONEDITAS*`
    users.money += apuesta
    } else if (a == b || a == c || b == c) {
    end = `*CASI!!*`
    users.money -= apuesta
    } else {
      global.db.data.users[m.sender].derrotas += 1
    end = `*PERDISTE!!* ❌ -${apuesta} MONEDITAS*`
    users.money -= apuesta
    }
    
    var hawemod = [
    `${x[0]} : ${y[1]} : ${z[0]}
    ${z[0]} : ${y[0]} : ${x[1]}
    ${z[2]} : ${x[2]} : ${y[2]}`, 
    `${x[0]} : ${y[0]} : ${z[0]}
    ${y[1]} : ${z[1]} : ${x[1]}
    ${x[2]} : ${y[2]} : ${z[2]}`, 
    `${x[0]} : ${y[1]} : ${z[0]}
    ${y[1]} : ${z[0]} : ${x[1]}
    ${x[2]} : ${y[1]} : ${z[0]}`
    ]
    
    const maxIterations = 4;
    const arrayCasuale = generaArrayCasuale(hawemod, maxIterations);
    
    const array = [...arrayCasuale, ];
      
    let { key } = await conn.sendMessage(m.chat, { text: `*INICIANDO...*` }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (let i = 1; i <= maxIterations; i++) {
    await conn.sendMessage(m.chat, { text: `🎰 | *SLOTS* | 🎰\n────────\n` + `${array[i]}` + `\n ────────\n🎰 |   *SLOTS*   | 🎰`, edit: key }, { quoted: m });
    await new Promise((resolve) => setTimeout(resolve, 50))}
      
    return await conn.sendMessage(m.chat, {text: `
    🎰 | *SLOTS* | 🎰 
    ────────
    ${x[0]} : ${y[0]} : ${z[0]}
    ${x[1]} : ${y[1]} : ${z[1]}
    ${x[2]} : ${y[2]} : ${z[2]}
     ────────
    🎰 |   *SLOTS*   | 🎰\n\n${end}`, edit: key}, {quoted: m})}
    
    
        
    if (users.diamante < apuesta) {  
    throw `❌ RECHAZADO: No tenés suficientes recursos. Usá el menurpg para ganar objetos.`    
    }
    if (command == 'slot3') {
        
    let emojis = ["🪵", "💣", "💎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
    y = [],
    z = [];
    for (let i = 0; i < 3; i++) {
    x[i] = emojis[a];
    a++;
    if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
    y[i] = emojis[b];
    b++;
    if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
    z[i] = emojis[c];
    c++;
    if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
      global.db.data.users[m.sender].victorias += 1
    end = `💸 *GANASTE +${apuesta + apuesta} DIAMANTES*`
    users.diamante += apuesta
    } else if (a == b || a == c || b == c) {
    end = `*CASI!!*`
    users.diamante -= apuesta
    } else {
      global.db.data.users[m.sender].derrotas += 1
    end = `*PERDISTE!!* ❌ -${apuesta} DIAMANTES*`
    users.diamante -= apuesta
    }
    
    var hawemod = [
    `${x[0]} : ${y[1]} : ${z[0]}
    ${z[1]} : ${y[0]} : ${x[0]}
    ${z[2]} : ${x[1]} : ${y[2]}`, 
    `${x[0]} : ${y[1]} : ${z[0]}
    ${y[1]} : ${z[2]} : ${x[1]}
    ${x[2]} : ${y[1]} : ${z[2]}`, 
    `${x[0]} : ${y[0]} : ${z[1]}
    ${y[1]} : ${z[2]} : ${x[0]}
    ${x[0]} : ${y[2]} : ${z[1]}`
    ]
    
    const maxIterations = 4;
    const arrayCasuale = generaArrayCasuale(hawemod, maxIterations);
    
    const array = [...arrayCasuale, ];
      
    let { key } = await conn.sendMessage(m.chat, { text: `*INICIANDO...*` }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 1000));
    for (let i = 1; i <= maxIterations; i++) {
    await conn.sendMessage(m.chat, { text: `🎰 | *SLOTS* | 🎰\n────────\n` + `${array[i]}` + `\n ────────\n🎰 |   *SLOTS*   | 🎰`, edit: key }, { quoted: m });
    await new Promise((resolve) => setTimeout(resolve, 50))}
      
    return await conn.sendMessage(m.chat, {text: `
    🎰 | *SLOTS* | 🎰 
    ────────
    ${x[0]} : ${y[0]} : ${z[0]}
    ${x[1]} : ${y[1]} : ${z[1]}
    ${x[2]} : ${y[2]} : ${z[2]}
     ────────
    🎰 |   *SLOTS*   | 🎰\n\n${end}`, edit: key}, {quoted: m})}
    
            
            
    if (command == 'slot') {       
    await conn.reply(m.chat, `❌ RECHAZADO:
    Debés usar el comando de la siguiente manera
    ${usedPrefix}slot1 o slot2 o slot3 1000`, m)}

}

    
    
    
handler.command = /^(slot|slot1|slot2|slot3)$/i
handler.register = true
handler.owner = false
export default handler
function generaArrayCasuale(array, ripetizioni) {
    let risultato = [];
    for (let i = 0; i < ripetizioni; i++) {
      risultato = risultato.concat(array);
    }
    return risultato;
  }


  function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    
    return minutes + " m " + seconds + " s " 
    }