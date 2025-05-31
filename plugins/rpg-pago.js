/*import fetch from 'node-fetch';

let handler = async (m, { isPrems, conn }) => {
    let fkontak = { 
        "key": { 
            "participants": "0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net" 
    };

    let user = global.db.data.users[m.sender];

    // Verificar si ya usó el comando
    if (user.lastsda === 3) {

        let expReward2 = isPrems ? 15000000 : 10000000;
        user.exp -= expReward2;
        return conn.sendMessage(m.chat, {
            text: `❌ Ya reclamaste tu recompensa. Por vivo perdiste ${expReward2.toLocaleString()} exp`,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: fkontak });
    }

    // Calcular experiencia a otorgar
    let expReward = isPrems ? 10000000 : 5000000;
    user.exp += expReward;
    user.lastsda = 3; // Actualizar para indicar que ya se usó

    let response = `
╭━━━🇦🇷━🇦🇷━🇦🇷━━━⬣
┃ 🇦🇷 2 AÑOS DE MEXICHANGOS LLORANDO🇦🇷🇦🇷
┃ 🇦🇷 EXP GANADA: +${expReward.toLocaleString()} EXP
┃ VIP: ${isPrems ? '✅' : '❌'}
┃ 🇦🇷 VIVA LA PATRIA !!
╰━━━🇦🇷━🇦🇷━🇦🇷━━━⬣
    `;

    conn.sendMessage(m.chat, {
        text: response,
        contextInfo: { mentionedJid: [m.sender] }
    }, { quoted: fkontak });
    let avisodeuso = "CAMPEONESDELMUNDO reclamado"
    conn.sendMessage('5491162480909@s.whatsapp.net', {text: avisodeuso, mentions: [m.sender], },{ quoted: m })
};

handler.command = ['argcampeon']; // Comando del handler
handler.level = 40; // Nivel mínimo requerido
export default handler;

//a espera de un nuevo evento*/