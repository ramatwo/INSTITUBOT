export function before(m) {
    let user = global.db.data.users[m.sender];
    
    if (user.afk > -1) {
        const afkTime = new Date() - user.afk;
        const afkReason = user.afkReason ? `*📜 ∫ Motivo:* ${user.afkReason}` : '';
        const afkDuration = msToTime(afkTime);

        m.reply(`*⚠️ ∫ Se desactivó tu modo AFK.*\n*⏳ ∫ Tiempo:* ${afkDuration}\n${afkReason}`.trim());
        
        // Restablecer estado AFK del usuario
        user.afk = -1;
        user.afkReason = '';
        
        //m.react("⛔");
    }
    
    // Verificar menciones y citas
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    
    for (let jid of jids) {
        let mentionedUser = global.db.data.users[jid];
        if (!mentionedUser || mentionedUser.afk < 0) continue;

        const afkTime = new Date() - mentionedUser.afk;
        const afkReason = mentionedUser.afkReason || 'NO ESPECIFICÓ MOTIVO DE INACTIVIDAD';
        const afkDuration = msToTime(afkTime);

      //  m.reply(`*⛔ ∫ Este usuario se encuentra AFK.*\n*⏳ ∫ Tiempo:* ${afkDuration}\n*📜 ∫ Motivo:* ${afkReason}`.trim());
        m.react("🎉");
    }

    return true;
}

// Función para formatear milisegundos en un tiempo legible
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));

    let timeString = [];
    if (days > 0) timeString.push(`${days} día(s)`);
    if (hours > 0) timeString.push(`${hours} hora(s)`);
    if (minutes > 0) timeString.push(`${minutes} minuto(s)`);
    if (seconds > 0) timeString.push(`${seconds} segundo(s)`);

    return timeString.join(', ');
}
