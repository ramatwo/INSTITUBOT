import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const xpperlimit = 300;

// Variables globales para almacenar el precio del Bitcoin y la última actualización
let bitcoinPrice = 0;
let lastUpdateTime = 0;

// Función para actualizar el precio del Bitcoin
async function updateBitcoinPrice(retries = 3) {
    const now = Date.now();
    try {
        const response = await fetch('https://api.coinlore.net/api/ticker/?id=90');
        const data = await response.json();
        const price = parseFloat(data[0]?.price_usd);
        if (!isNaN(price) && price > 0) {
            bitcoinPrice = Math.round(price); // Redondeamos el precio
            lastUpdateTime = now;
            console.log(`Precio de Bitcoin actualizado: ${bitcoinPrice} USD`);
            console.log(`Valor del oro: ${bitcoinPrice * 10}`);
        } else {
            throw new Error('Precio inválido recibido de la API');
        }
    } catch (error) {
        if (retries > 0) {
            console.warn(`Error al obtener el precio del Bitcoin, reintentando... (${retries} intentos restantes)`);
            setTimeout(() => updateBitcoinPrice(retries - 1), 1000); // Reintentar después de 1 segundo
        } else {
            bitcoinPrice = 100000; // Valor predeterminado para evitar que sea 0
            console.error('Error al obtener el precio del Bitcoin:', error);
            console.warn(`Se usará un valor predeterminado de Bitcoin: ${bitcoinPrice} USD`);
        }
    }
}

// Función para asegurarse de que la carpeta exista
function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

// Llama a la función para inicializar el precio al iniciar

await updateBitcoinPrice();

let handler = async (m, { command, conn, usedPrefix, args }) => {

    let user = global.db.data.users[m.sender];

    let time = user.lastmiming + 60000; // 1 minuto
    if (new Date() - user.lastmiming < 100) return await conn.reply(m.chat, `⏱️ Volvé en ${msToTime(time - new Date())}`, m);
    m.react('⏳');
    await updateBitcoinPrice(); // Asegúrate de que el precio esté actualizado

    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" 
}
const marginRate = 1.1; // Margen de 10% para diferenciar compra y venta
const items = {
    buy: {
       
        money: { exp: 1 },
        diamante: { money: 10 },
        oro: { money: bitcoinPrice * 10 },
        potion: { money: 500000 },
        kaleng: { money: 2 },
        agua: {money: 500 },
        ingnova: { money: 20000 },
        esclavo: { money: 20000000 }, // Precio de una esclavo
        coal: { money: 500 }

    },
    sell: {
        exp: { money: 1 },
        diamante: { money: 9 }, // Ajustado con margen
        money: { exp: 1 },
        diamanteplus: { diamante: 5 }, // Reducir para evitar abuso
        oro: { money: bitcoinPrice * 10 }, // Reducido en un margen
        token: { diamante: 10 },
        esmeralda: { money: 1000 },
        tiketcoin: { money: 3 },
        berlian: { money: 900 }, // Reducido
        magia: { money: 100 },
        agua: { money: 500 },
        trash: { money: 50 }, // Reducido el valor
        wood: { money: 800 },
        rock: { money: 400 },
        batu: { money: 100 },
        string: { money: 200 },
        iron: { money: 1000 },
        coal: { money: 200 },
        botol: { money: 100 },
        kardus: { money: 1000 },
        eleksirb: { money: 500 },
        emas: { money: 400 },
        sampah: { money: 3000 },
        serigala: { money: 3 },
        sword: { money: 800 },
        umpan: { money: 100 },
        healtmonster: { money: 1000 },
        pancingan: { money: 300 },
        common: { money: 100 },
        uncoommon: { money: 1000 },
        mythic: { money: 5000 },
        pet: { money: 1000 },
        gardenboxs: { money: 1000 },
    },
};


    const more = String.fromCharCode(8206);
    const readMore = more.repeat(4001);
    let imgr = flaaa.getRandom();
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase()]).filter(([v]) => v && v in user));

    let text = '';
    let footer = '';
    let image = '';
    text = command.toLowerCase() === 'buy'
    ? `${htki} *COMPRAR* ${htka}`.trim()
    : `${htki} *VENDER* ${htka}`.trim();

footer = command.toLowerCase() === 'buy'
    ? `🔖 LISTA DE ÍTEMS\n${readMore}\n✨ Ejemplo de compra:\n*» ${usedPrefix}${command} ítem cantidad*\n*» ${usedPrefix}${command} potion 5*\n${readMore}\n${Object.keys(listItems).map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find(v => v in user);
    return `*» ${global.rpgshop.emoticon(v)} (${v})*\n*Cuesta:* ${listItems[v][paymentMethod]} ${global.rpgshop.emoticon(paymentMethod)}\n*-----------------------------------------*\n`.trim();
}).join('\n')}`
    : `🔖 LISTA DE ÍTEMS\n${readMore}\n✨ Ejemplo de venta:\n*» ${usedPrefix}${command} ítem cantidad*\n*» ${usedPrefix}${command} potion 5*\n${readMore}\n${Object.keys(listItems).map((v) => {
    let paymentMethod = Object.keys(listItems[v]).find(v => v in user);
    return `*» ${global.rpgshop.emoticon(v)}*\n*» ${v}*\n*Ganancia:* ${listItems[v][paymentMethod]} ${global.rpgshop.emoticon(paymentMethod)}\n*-----------------------------------------*\n`.trim();
}).join('\n')}`;

    const item = (args[0] || '').toLowerCase();
    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1;

    if (!listItems[item]) return conn.sendFile(m.chat, imgr, 'Tienda de ítems', footer, fkontak);

    const phoneNumber = m.sender.replace(/[^\d]/g, ''); // Normaliza el número de teléfono

    if (command.toLowerCase() === 'buy') {
        if (item === 'esclavo') {
            if (user.money < 20000000) {
                throw `❌ No tenés suficientes recursos.`
            }
            if (!Array.isArray(user.esclavo)) user.esclavo = []; // Asegúrate de que sea un array
            if (user.esclavo.length >= 10) return conn.reply(m.chat, '❌ No puedes tener más de 10 esclavos.', m);
            user.esclavo.push({ health: 5, food: 7, water: 2, minedCoins: 0 });
            user.money -= 20000000; // Precio de un esclavo
            return conn.reply(m.chat, `🎉 Compraste un esclavo. Ahora tenés ${user.esclavo.length}/10 esclavos.`, m);
        }

        let paymentMethod = Object.keys(listItems[item]).find(v => v in user);
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return await conn.reply(m.chat, `*–--『 Insuficiente 』--–*\n\n*Necesitas ${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* *${global.rpgshop.emoticon(paymentMethod)} Para Comprar ${total} ${global.rpgshop.emoticon(item)}.*\n*Tenés ${user[paymentMethod]} ${global.rpgshop.emoticon(paymentMethod)}.*`, fkontak, m);

        user[paymentMethod] -= listItems[item][paymentMethod] * total;
        user[item] += total;
// Guardar en logs solo si la cantidad es mayor a 5
if (total > 5) {
    let chat = await conn.getName(m.chat)
    const logMessage = `[${new Date().toLocaleString('es-ES', { timeZone: 'America/Buenos_Aires', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}] COMPRA: ${item} ${total} CHAT: ${m.chat.includes("@g.us") ? `${m.chat} ~${chat}` : 'privado'}\n`;
    const logFilePath = `./logs/tienda/${phoneNumber}.txt`;
  
    // Asegúrate de que la carpeta exista
    ensureDirectoryExistence(logFilePath);
  
    // Si el archivo existe, agrega el log. Si no, lo crea y agrega el log.
    fs.appendFileSync(logFilePath, logMessage);
  }


        await conn.reply(m.chat, `*––『 ÓRDEN DE COMPRA 』––*\n🛒 *Compraste ${item} » ${total} ${global.rpgshop.emoticon(item)}*.\n💸 *Gasto: ${(listItems[item][paymentMethod] * total)} ${global.rpgshop.emoticon(paymentMethod)}*\n📊 *Ahora tenés: ${user[item]} ${global.rpgshop.emoticon(item)}*`, fkontak, m);
    } else {
        if (user[item] < total) return await conn.reply(m.chat, `*No tenés suficiente ${global.rpgshop.emoticon(item)} para vender.*\n*Tenés ${user[item]} ${global.rpgshop.emoticon(item)}*`, fkontak, m);

        let paymentMethod = Object.keys(listItems[item]).find(v => v in user);
        user[item] -= total;
        user[paymentMethod] += listItems[item][paymentMethod] * total;

        // Guardar en logs solo si la cantidad es mayor a 5
        if (total > 5) {
            
            let chat = await conn.getName(m.chat)
    const logMessage = `[${new Date().toLocaleString('es-ES', { timeZone: 'America/Buenos_Aires', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}] VENTA: ${item} ${total} CHAT: ${m.chat.includes("@g.us") ? `${m.chat} ~${chat}` : 'privado'}\n`;
            const logFilePath = `./logs/tienda/${phoneNumber}.txt`;

            // Asegúrate de que la carpeta exista
            ensureDirectoryExistence(logFilePath);

            // Si el archivo existe, agrega el log. Si no, lo crea y agrega el log.
            fs.appendFileSync(logFilePath, logMessage);
        }

        await conn.reply(m.chat, `*––『 ÓRDEN DE VENTA 』––*\n🎉 *VENDISTE ${item} » ${total} ${global.rpgshop.emoticon(item)}*.\n💸 *Ganaste ${(listItems[item][paymentMethod] * total)} ${global.rpgshop.emoticon(paymentMethod)}*\n📊 *Ahora tenés: ${user[item]} ${global.rpgshop.emoticon(item)}*`, fkontak, m);
    }
};



handler.help = ['buy', 'sell'].map(v => v + ' [item] [count]');
handler.tags = ['rpg'];
handler.command = /^(buy|sell)$/i;
handler.disabled = false;
handler.register = true;
handler.rowner = false;
export default handler;

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + " minutos y " + seconds + " segundos";
}

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number === 'number' && !isNaN(number);
}
