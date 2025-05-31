const cooldown = 36000000; // 10 horas
let handler = async (m, { usedPrefix, conn }) => {
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
    };

    let pp = "./media/menus/velocidad.bat";

    let imgr = flaaa.getRandom();
    let user = global.db.data.users[m.sender];
    let timers = (cooldown - (new Date - user.lastadventure));

    if (user.health < 80) {
        return await conn.reply(m.chat, `Tu salud está por abajo de 80. Cúrate con .heal`, fkontak, imgr, m);
    }

    if (new Date - user.lastadventure <= cooldown) {
        let tiempoRestante = msToTime(timers); // Convertir milisegundos a un formato legible
        return await conn.reply(m.chat, `Estás descansando, te quedan ⏱️ ${tiempoRestante}`, fkontak, imgr, m);
    }

    const rewards = reward(user);
    let text = `🛫 Te fuiste de aventuras 😛😛😛
${cmenua}`;

    for (const lost in rewards.lost) if (user[lost]) {
        const total = rewards.lost[lost].getRandom();
        user[lost] -= total * 1;
        if (total) text += `\n${global.rpg.emoticon(lost)} restante ${total}`;
    }
    text += '\n\n⁉️ Con qué te encontraste? ⁉️\n';
    for (const rewardItem in rewards.reward) if (rewardItem in user) {
        const total = rewards.reward[rewardItem].getRandom();
        user[rewardItem] += total * 1;
        if (total) text += `\n» ${global.rpg.emoticon(rewardItem)} ${total}`;
    }
    conn.sendFile(m.chat, pp, 'Aventura.bat', text.trim(), fkontak);

    user.lastadventure = new Date * 1;
};
handler.help = ['adventure'];
handler.tags = ['rpg'];
handler.command = /^(adventure|aventura|aventurar)$/i;
handler.register = true;
handler.cooldown = cooldown;
handler.disabled = false;

export default handler;

// Función para manejar las recompensas
function reward(user = {}) {
    let rewards = {
        reward: {
            money: 40000,
            exp: 30000,
            trash: 1500,
            potion: 1,
            rock: 20,
            token: 20,
            wood: 30,
            string: 20,
            common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
            uncoommon: [0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
                )).fill(0)
            ),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
                new Array(8 - (
                    (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
                )).fill(0)
            ),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            cat: [0, 1, 0, 0, 0],
            centaur: [0, 1, 0, 0, 0],
            dog: [0, 1, 0, 0, 0],
            dragon: [0, 1, 0, 0, 0],
            esmeralda: [0, 1, 0, 0, 0],
            fox: [0, 1, 0, 0, 0],
            griffin: [0, 1, 0, 0, 0],
            horse: [0, 1, 0, 0, 0],
            magia: [0, 1, 0, 0, 0],
            lion: [0, 1, 0, 0, 0],
            pet: [0, 1, 0, 0, 0],
            phonix: [0, 1, 0, 0, 0],
            rhinoceros: [0, 1, 0, 0, 0],
            robo: [0, 1, 0, 0, 0],
            wolf: [0, 1, 0, 0, 0],
            iron: [0, 0, 0, 1, 0, 0],
            oro: [0, 0, 0, 0, 0, 1, 0],
            diamanteplus: [0, 0, 0, 0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
                )).fill(0)
            ),
        },
        lost: {
            health: 101 - user.cat * 4,
            armordurability: (15 - user.armor) * 7
        }
    };
    return rewards;
}

// Función para convertir milisegundos a un formato legible
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours} horas, ${minutes} minutos y ${seconds} segundos`;
}
