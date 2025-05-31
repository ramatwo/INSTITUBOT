let handler = async (m, { conn }) => {
    const fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    const user = global.db.data.users[m.sender] || {};
    const cooldownTime = 43200000; // 12 horas
    const currentTime = new Date().getTime();

    if (currentTime - (user.lastberburu || 0) < cooldownTime) {
        const remainingTime = cooldownTime - (currentTime - user.lastberburu);
        return conn.reply(
            m.chat,
            `Ya cazaste. Descansá y esperá.\nTe queda ${clockString(remainingTime)}`,
            fkontak,
            m
        );
    }

    // Generar valores aleatorios y armas
    const randomValues = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5));
    const weapons = ['🪚', '⛏️', '🧨', '💣', '🔫', '🔪', '🗡️', '🏹', '🦾', '🥊', '🧹', '🔨', '🛻'];

    const hsl = `
*✧ Resultados de la caza de ${conn.getName(m.sender)} ✧*
${['🐂', '🐅', '🐘', '🐐', '🐼', '🐊', '🐒', '🐗', '🐖', '🐓']
    .map((animal, i) => `*${animal} ${weapons[Math.floor(Math.random() * weapons.length)]} ${randomValues[i]}*`)
    .join('\n')}
`;

    // Actualizar valores del usuario
    const animals = ['tigre', 'elefante', 'cabra', 'panda', 'cocodrilo', 'bufalo', 'mono', 'jabali', 'chancho', 'gallo'];
    animals.forEach((animal, index) => {
        user[animal] = (user[animal] || 0) + randomValues[index];
    });

    // Actualizar tiempo de caza
    user.lastberburu = currentTime;

    setTimeout(() => {
        conn.reply(m.chat, hsl, fkontak, m);
    }, 1000);
};

handler.help = ['caza de animales'];
handler.tags = ['rpg'];
handler.command = /^(hunt|caza(r)?)$/i;
handler.register = true;

export default handler;

// Función para convertir milisegundos a formato de tiempo
function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}
