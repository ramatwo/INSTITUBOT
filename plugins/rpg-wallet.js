let handler = async (m, { conn, text, usedPrefix, command }) => {     
    let who
    // Función para limpiar el número ingresado
    function limpiarNumero(numero) {
        return numero.replace(/\s/g, '').replace(/([@+-])/g, '');
    }

    // Si el comando incluye texto (número), lo usa; si no, utiliza el autor del mensaje
    if (text) {
        let numero = limpiarNumero(text);
        if (isNaN(numero)) return conn.reply(m.chat, `⚠️ El número ingresado no es válido. Por favor, introduce un número correctamente formateado.`, m);
        who = numero + '@s.whatsapp.net';
    } else {
        who = m.sender;
    }

    let name = conn.getName(who);
    let fkontak = { 
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
    let imagencita = "./media/menus/velocidad.bat";
    let user = global.db.data.users[who];

    if (!user) {
        return conn.reply(m.chat, `⚠️ No se encontró información para el número proporcionado.`, m);
    }

    let premium = user.premium;
    const cartera = {
        economia: {
            exp: true,
            diamante: true,
            money: true,
            oro: true,
        },
    };

    // Formatear el número de monedas con solo un decimal y una coma en lugar de un punto
    const recursos = Object.keys(cartera.economia)
        .map(v => user[v] && `*${global.rpgshop.emoticon(v)} ⇢ ${user[v].toFixed(1).replace('.', ',')}*`)
        .filter(v => v)
        .join('\n')
        .trim();

    let cart = `👝 *Titular ⇢ ${name}*\n🎟️ *VIP ⇢* ${premium ? '✅' : '❌'}\n${recursos}`;
    
    await conn.sendFile(m.chat, imagencita, 'Wallet', cart, fkontak);
}

handler.help = ['bal'];
handler.tags = ['xp'];
handler.command = ['bal', 'cartera', 'wallet', 'balance']; 
export default handler;
handler.register = true;
