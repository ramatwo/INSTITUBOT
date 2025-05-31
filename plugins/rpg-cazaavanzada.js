let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Verificar si el usuario tiene al menos 3 unidades de algún alimento cocinado
    if (user.gallo < 3 && user.vaca < 3 && user.babi < 3 && user.pescado < 3) {
        return conn.reply(m.chat, 'Necesitas al menos 3 unidades de algún alimento cocinado para cazar minerales.', m);
    }

    // Verificar el tiempo de espera (cooldown) de 24 horas
  /*  let time = global.db.data.users[m.sender].lastCazaAvanzada + 86400000; // 24 horas en milisegundos
    if (new Date - global.db.data.users[m.sender].lastCazaAvanzada < 86400000) {
        return conn.reply(m.chat, `Ya cazaste minerales. Descansa y espera.\nTe queda ${clockString(time - new Date())}`, m);
    }*/

    // Consumir 3 unidades de algún alimento cocinado
    let carneConsumida = '';
    if (user.gallo >= 3) {
        user.gallo -= 3;
        carneConsumida = 'Pollo';
    } else if (user.vaca >= 3) {
        user.vaca -= 3;
        carneConsumida = 'Vaca';
    } else if (user.babi >= 3) {
        user.babi -= 3;
        carneConsumida = 'Cerdo';
    } else if (user.pescado >= 3) {
        user.pescado -= 3;
        carneConsumida = 'Pescado';
    }

    // Generar recompensas
    let diamante = `${pickRandom([150, 50, 440, 1620, 500])}`;
    let oro = `${pickRandom([0, 0, 1, 2, 10, 3, 4, 2, 0])}`;
    let money = `${pickRandom([10000, 20000, 25000, 30000, 37000, 40000, 100000])}`;

    user.diamante += parseInt(diamante);
    user.oro += parseInt(oro);
    user.money += parseInt(money);

    let hsl = `
╔═════✪〘 𝐂𝐀𝐙𝐀 𝐀𝐕𝐀𝐍𝐙𝐀𝐃𝐀 〙✪═════╗
║
║ 🥩 Carne consumida: ${carneConsumida}
║
║ 🎁 Recompensas:
║ ├─ diamante: ${diamante}
║ ├─ oro: ${oro}
║ └─ Money: ${money}
║
╚════════════════════════════╝
    `;
    conn.reply(m.chat, hsl, m);

    user.lastCazaAvanzada = new Date * 1;
};

handler.help = ['cazaavanzada'];
handler.tags = ['rpg'];
handler.command = /^(cazaavanzada)$/i;
handler.register = true;
handler.rowner = true

export default handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}