let handler = async (m, { conn, args, command, text }) => {
    let user = global.db.data.users[m.sender];
    if (!user.birthday) user.birthday = []; // Inicializa con 0 esclavos
    if (!user) return m.reply('⚠️ Error: No se encontró tu perfil en la base de datos.');

    if (!text) return m.reply('Por favor, proporciona tu cumpleaños en el formato día/mes/año, día-mes-año o día mes año.');

    const regex = /^(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})$/;
    const match = text.match(regex);

    if (!match) return m.reply('Formato inválido. Usa día/mes/año, día-mes-año o día mes año.');

    const [_, day, month, year] = match;
    const birthday = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

    user.birthday = birthday;

    m.reply(`🎉 ¡Tu cumpleaños ha sido registrado como ${birthday}! 🎂`);
};

handler.checkBirthdays = async (m, { global }) => {
    
    const today = new Date();
    const todayString = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}`;

    for (let userId in global.db.data.users) {
        let user = global.db.data.users[userId];
        if (user.birthday && user.birthday.startsWith(todayString) && !user.birthdayNotified) {
            m.reply(`🎉🎂 ¡HOY ES EL CUMPLEAÑOS DE @${userId}! 🎂🎉`, null, { mentions: [userId] });
            user.birthdayNotified = true; // Evita que se envíe el mensaje más de una vez
        }
    }
};

handler.command = ['cumpleaños', 'birthday'];
handler.register = true;
handler.owner = true;
export default handler;