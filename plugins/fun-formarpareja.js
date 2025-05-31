let lastUsed = 0; // Variable global para registrar el tiempo del último uso

let toM = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
    if (new Date() - lastUsed < 30000) { // Verificar si ha pasado menos de 30 segundos desde el último uso
        let remainingTime = (30000 - (new Date() - lastUsed)) / 1000;
        return m.reply(`Esperá ${remainingTime.toFixed(1)} segundos.`);
    }

    lastUsed = new Date(); // Actualizar el tiempo del último uso

    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps.getRandom();
    let b;
    do b = ps.getRandom();
    while (b === a);
    
    m.reply(`*${toM(a)}, ya es hora de que te 💍 cases con ${toM(b)}, hermosa pareja 😉💓*`, null, {
        mentions: [a, b]
    });
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
handler.register = true;
export default handler;

