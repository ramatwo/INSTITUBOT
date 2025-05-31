import fetch from 'node-fetch';
import fs from 'fs/promises';

let ro = 500000;
let probabilidadBase = 50; // Probabilidad base de éxito
let numerosNoRob = [];

// Función para cargar los números protegidos desde el archivo norob.txt
async function loadNoRobList() {
    try {
        let content = await fs.readFile('./codes/norob.txt', 'utf8');
        numerosNoRob = content.trim().split('\n');
    } catch (error) {
        console.error('Error al cargar la lista de no rob:', error);
    }
}

async function getoroValue() {
    try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
        const data = await response.json();
        const bitcoinPrice = Math.round(data.bpi.USD.rate_float);
        return bitcoinPrice * 10; // Precio del oro basado en el Bitcoin
    } catch (error) {
        console.error('Error al obtener el precio del oro:', error);
        return 0; // Devuelve 0 si hay un error para evitar fallos en el cálculo
    }
}

let handler = async (m, { text }) => {
    let now = new Date().getTime();
    let lastRob = global.db.data.users[m.sender]?.lastrob || 0;
    let cooldown = 7200000; // 2 horas 
    let timeRemaining = cooldown - (now - lastRob);

    if (timeRemaining > 0) {
        throw `*⫹⫺ ➭⏱️ ∫ Esperá ${msToTime(timeRemaining)} para robar nuevamente.*`;
    }

    await loadNoRobList();

    let who;
    if (m.isGroup) {
        if (m.quoted) who = m.quoted.sender;
        else if (m.mentionedJid && m.mentionedJid[0]) who = m.mentionedJid[0];
        else if (text) who = parsePhoneNumber(text);
    } else {
        who = m.chat || (text && parsePhoneNumber(text));
    }

    if (!who) throw `*⫹⫺ ➭⛔ ∫ Etiquetá a alguien o respondé a un mensaje para robar.*`;

    if (!(who in global.db.data.users)) throw `*⫹⫺ ➭⛔ ∫ Este usuario no está en la base de datos.*`;

    const phoneNumber = who.split("@")[0];
    let user = global.db.data.users[m.sender];
    let isVIP = user.premium || false; // Verificar si el usuario es VIP
    let probabilidadExito = isVIP ? probabilidadBase + 10 : probabilidadBase; // Ajustar probabilidad si es VIP

    let users = global.db.data.users[who];
    if (users.afk != -1) return m.reply(`No le podés robar a un usuario AFK.`);
    if (numerosNoRob.includes(phoneNumber)) {
        let robowner = Math.floor(Math.random() * ro * 7);
        global.db.data.users[m.sender].exp -= robowner;
        global.db.data.users[m.sender].lastrob = now;
        global.db.data.users[m.sender].derrotas += 1
        throw `*🚔 ‣ Te agarró la policía y no pudiste robar nada. Perdiste ${robowner} EXP.*`;
    }

    let rob = Math.floor(Math.random() * ro * 7)

    // Simular probabilidad de éxito
    let exito = Math.random() * 100 < probabilidadExito;
if (global.db.data.users[m.sender].exp < rob) return m.reply(`*⫹⫺ ➭⛔ ∫ No tenés suficiente EXP.*`);
    if (!exito) {
        global.db.data.users[m.sender].derrotas += 1
        global.db.data.users[m.sender].exp -= rob; // Restar el EXP al ladrón
        global.db.data.users[m.sender].lastrob = now;
        let mensaje = isVIP
            ? `*🚔 ‣ Te agarró la policía y te cagó a tiros por negro. Perdiste ${rob} EXP*`
            : `*🚔 ‣ Te agarró la policía y no pudiste robar nada. Perdiste ${rob} EXP.*`;
        return m.reply(mensaje, null, { mentions: [who] });
    }

    if (users.exp >= rob) {
        global.db.data.users[m.sender].victorias += 1
        global.db.data.users[m.sender].exp += rob;
        global.db.data.users[who].exp -= rob;
        global.db.data.users[m.sender].lastrob = now;
        return m.reply(`*‣ Le afanaste ${rob} EXP a @${who.split`@`[0]}*${isVIP ? '\n> NIGGABILIDAD: ✅' : ''}`, null, { mentions: [who] });
    }

    let moneyRob = rob
    if (users.money >= moneyRob) {
        global.db.data.users[m.sender].victorias += 1
        global.db.data.users[m.sender].money += moneyRob;
        global.db.data.users[who].money -= moneyRob;
        global.db.data.users[m.sender].lastrob = now;
        return m.reply(`*‣ Le afanaste ${moneyRob} monedas a @${who.split`@`[0]}*${isVIP ? '\n> NIGGABILIDAD: ✅' : ''}`, null, { mentions: [who] });
    }

    if (users.diamante >= rob) {
        global.db.data.users[m.sender].victorias += 1
        let diamantesToRob = Math.floor(rob / 9);
        global.db.data.users[m.sender].diamante = (global.db.data.users[m.sender].diamante || 0) + diamantesToRob;
        global.db.data.users[who].diamante -= diamantesToRob;
        global.db.data.users[m.sender].lastrob = now;
        return m.reply(`*‣ Le afanaste ${diamantesToRob} diamante a @${who.split`@`[0]}*${isVIP ? '\n> NIGGABILIDAD: ✅' : ''}`, null, { mentions: [who] });
    }

    let oroValue = await getoroValue();
    if (users.oro >= rob / oroValue) {
        global.db.data.users[m.sender].victorias += 1
        let oroRob = rob / oroValue;
        global.db.data.users[m.sender].oro = (global.db.data.users[m.sender].oro || 0) + oroRob;
        global.db.data.users[who].oro -= oroRob;
        global.db.data.users[m.sender].lastrob = now;
        return m.reply(`*‣ Le afanaste ${oroRob.toFixed(2)} de oro a @${who.split`@`[0]}*${isVIP ? '\n> NIGGABILIDAD: ✅' : ''}`, null, { mentions: [who] });
    }

    return m.reply(`*⫹⫺ ➭ ⛔ ∫ @${who.split`@`[0]} no tiene suficientes recursos para robar.*`, null, { mentions: [who] });
};

handler.help = ['rob'];
handler.tags = ['econ2'];
handler.command = ['robar', 'rob', 'afanar', 'ron'];
export default handler;
handler.register = true;
handler.group = true;
handler.rowner = false;

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    return `${hours.toString().padStart(2, '0')} Horas ${minutes.toString().padStart(2, '0')} Minutos`;
}

function parsePhoneNumber(number) {
    return number.replace(/\s/g, '').replace(/([@+-])/g, '') + '@s.whatsapp.net';
}
