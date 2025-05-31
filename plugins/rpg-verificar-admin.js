import { createHash } from 'crypto';

let handler = async function (m, { conn,command, args, mentionedJid }) {
    console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAA")
    if (!args[0] || !args[1]) {
        return conn.reply(m.chat, 'Uso incorrecto. Formato: .admreg nombre edad', m);
    }

    let [nombre, edad] = args;
    if (isNaN(edad) || edad < 11 || edad > 31) {
        return conn.reply(m.chat, 'Por favor, ingresa una edad válida (entre 11 y 31).', m);
    }

    let who = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    if (!who) return conn.reply(m.chat, 'Por favor, menciona a la persona que deseas registrar.', m);

    let user = global.db.data.users[who];
    if (user && user.registered) {
        return conn.reply(m.chat, 'Este usuario ya está registrado.', m);
    }

    // Registro manual
    user.name = nombre;
    user.age = parseInt(edad);
    user.registered = true;
    user.regTime = +new Date;
    let serial = createHash('md5').update(who).digest('hex').slice(0, 6);

    // Confirmación
    await conn.reply(m.chat, `Registro completado:
👤 Nombre: ${nombre}
🧮 Edad: ${edad} años
🔗 Serial: ${serial}`, m);
};

handler.help = ['admreg <nombre> <edad>'];
handler.tags = ['admin'];
handler.command = /^admreg$/i;
//handler.admin = true; // Solo los administradores pueden usar este comando

export default handler;
