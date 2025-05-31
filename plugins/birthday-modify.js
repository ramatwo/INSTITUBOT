let handler = async (m, { text, isAdmin }) => {
    if (!isAdmin) return m.reply('❌ Solo los administradores pueden usar este comando.');

    const regex = /^@(\S+)\s+(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})$/;
    const match = text.match(regex);

    if (!match) return m.reply('Formato inválido. Usa .birthdaym @usuario día/mes/año, día-mes-año o día mes año.');

    const [_, mentionedUser, day, month, year] = match;
    const birthday = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

    const userId = mentionedUser.replace('@', '');
    let user = global.db.data.users[userId];
    if (!user) return m.reply(`⚠️ Error: No se encontró el perfil del usuario @${userId}.`, null, { mentions: [userId] });

    user.birthday = birthday;

    m.reply(`🎉 ¡El cumpleaños de @${userId} ha sido modificado a ${birthday}! 🎂`, null, { mentions: [userId] });
};

handler.command = ['birthdaym', 'modificarcumpleaños'];
handler.register = true;
handler.rowner = true;
handler.group = true;
export default handler;