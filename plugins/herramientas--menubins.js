// Función sleep (pausa) usando promesas
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Funciones de extrapolación
function genbasico(bin1, bin2, r) {
    const ba = bin1.substring(0, 10);
    const ba2 = bin2.substring(0, 10);
    const genba = `${ba}${r}`;
    const genba2 = `${ba2}${r}`;
    return `CC1: ${genba}\nCC2: ${genba2}`;
}

function genmedio(bin1, bin2, r) {
    const ex = bin1.substring(0, 7);
    const ex2 = bin2.substring(0, 7);
    const tra = bin1.substring(8, 10);
    const tra2 = bin2.substring(8, 10);
    const po = bin1.substring(12, 14);
    const po2 = bin2.substring(12, 14);
    const la = bin1.substring(15);
    const la2 = bin2.substring(15);
    const gen = `${ex}x${tra}x${po}x${la}`;
    const gen2 = `${ex2}x${tra2}x${po2}x${la2}`;
    return `CC1: ${gen}\nCC2: ${gen2}`;
}

function genavanzado(bin1, bin2, r) {
    const comp = bin1.substring(9, 11);
    const comp2 = bin2.substring(9, 11);
    const sum1 = parseInt(comp[0], 10) + parseInt(comp2[0], 10);
    const sum2 = parseInt(comp[1], 10) + parseInt(comp2[1], 10);
    const result1 = (sum1 / 2) * 5;
    const result2 = (sum2 / 2) * 5;
    const add = result1.toString().substring(0, 2);
    const add2 = result2.toString().substring(0, 2);
    const extrapolado = parseInt(add, 10) + parseInt(add2, 10);
    const fingen = `${bin1.substring(0, 8)}${extrapolado}${r}`;
    return `CC1: ${fingen}`;
}

let handler = async (m, { conn, text, command, usedPrefix, args }) => {
    if (command === 'menubins') {
        // Mostrar menú de opciones
        const menu = `
*💳 MENÚ DE BINS 💳*
1️⃣ BUSCADOR DE BINS MASTERCARD
2️⃣ BUSCADOR DE BINS VISA
3️⃣ BUSCADOR DE BINS AMEX
4️⃣ BUSCADOR DE BINS DISCOVER
5️⃣ MULTIGENERADOR DE BINS/CC
6️⃣ CHEQUEADOR DE BINS
7️⃣ GENERADOR LIVE DE BINS
8️⃣ MULTI EXTRAPOLADOR DE CC

📌 Usa el comando con el número de la opción:
*${usedPrefix}menubins <número>*
Ejemplo: *${usedPrefix}menubins 8*
        `.trim();

        if (!args[0]) return m.reply(menu);

        const option = parseInt(args[0]);
        if (isNaN(option) || option < 1 || option > 8) {
            return m.reply('❌ Opción inválida. Por favor, selecciona un número del 1 al 8.');
        }

        switch (option) {
            case 8: // Multi Extrapolador de CC
                return await handleExtrapolador(m, conn, usedPrefix);
            default:
                return m.reply('⚠️ Esta opción aún no está implementada.');
        }
    }
};

async function handleExtrapolador(m, conn, usedPrefix) {
    // Solicitar la primera CC
    await m.reply('🔢 Por favor, envía la primera CC (16 dígitos):');
    const cc1 = await waitForMessage(conn, m.chat, /^\d{16}$/);

    if (!cc1) return m.reply('❌ No se recibió una CC válida. Operación cancelada.');

    // Solicitar la segunda CC
    await m.reply('🔢 Ahora, envía la segunda CC (16 dígitos):');
    const cc2 = await waitForMessage(conn, m.chat, /^\d{16}$/);

    if (!cc2) return m.reply('❌ No se recibió una segunda CC válida. Operación cancelada.');

    // Enviar mensaje inicial
    const { key } = await conn.sendMessage(m.chat, { text: '⏳ Realizando extrapolación básica, media y avanzada...' });

    // Realizar extrapolaciones
    const r = 'xxxxxx'; // Valor de relleno
    const resultados = [];

    resultados.push(`*EXTRAPOLACIÓN BÁSICA:*\n${genbasico(cc1, cc2, r)}`);
    resultados.push(`*EXTRAPOLACIÓN MEDIA:*\n${genmedio(cc1, cc2, r)}`);
    resultados.push(`*EXTRAPOLACIÓN AVANZADA:*\n${genavanzado(cc1, cc2, r)}`);

    // Esperar 5 segundos antes de editar el mensaje
    await sleep(5000);

    // Editar el mensaje con los resultados
    const resultadoFinal = resultados.join('\n\n');
    await conn.sendMessage(m.chat, { text: `✅ *Resultados de la extrapolación:*\n\n${resultadoFinal}`, edit: key });
}

// Función para esperar un mensaje del usuario
async function waitForMessage(conn, chatId, regex) {
    return new Promise((resolve) => {
        const handler = (chatUpdate) => {
            const message = chatUpdate.messages?.[0];
            if (message?.key.remoteJid === chatId && regex.test(message.message.conversation)) {
                conn.ev.off('messages.upsert', handler);
                resolve(message.message.conversation);
            }
        };
        conn.ev.on('messages.upsert', handler);
    });
}

handler.help = ['menubins'];
handler.tags = ['tools'];
handler.command = /^(menubins)$/i;
handler.group = true;
handler.register = true;
handler.owner = false;

export default handler;