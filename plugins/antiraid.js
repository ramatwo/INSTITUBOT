// Variable para almacenar la configuración del modo de protección contra raid
let raidModeConfig = {
    enabled: false, // Estado del modo de protección contra raid
    users: {} // Objeto para almacenar los mensajes recientes de cada usuario
};

// Función para activar el modo de protección contra raid
const activateRaidMode = () => {
    raidModeConfig.enabled = true;
    raidModeConfig.users = {}; // Reiniciar el objeto de usuarios
    return `Modo de protección contra raid activado.`;
}

// Función para desactivar el modo de protección contra raid
const deactivateRaidMode = () => {
    raidModeConfig.enabled = false;
    raidModeConfig.users = {}; // Reiniciar el objeto de usuarios
    return `Modo de protección contra raid desactivado.`;
}

const handler = async (m, { args, isAdmin, conn }) => {
    if (!isAdmin) return m.reply("Comando solo para administradores.");

    if (args[0] === "on") {
        if (!raidModeConfig.enabled) {
            return m.reply(activateRaidMode());
        } else {
            return m.reply("Modo de protección contra raid ya activo.");
        }
    } else if (args[0] === "off") {
        if (raidModeConfig.enabled) {
            return m.reply(deactivateRaidMode());
        } else {
            return m.reply("Modo de protección contra raid ya desactivado.");
        }
    } else {
        return m.reply("Usá *on* para activar o *off* para desactivar el módulo antiraid.");
    }
}

// Función para manejar los mensajes y detectar el spam
handler.before = async (m) => {
    // Verificar si el modo de protección contra raid está activado en el grupo
    if (raidModeConfig.enabled) {
        let user = raidModeConfig.users[m.sender];
        let now = Date.now();
        
        // Si es la primera vez que envía un mensaje o ha pasado más de 3 segundos desde el último mensaje
        if (!user || (now - user.lastMessage > 3000)) {
            // Reiniciar el contador de mensajes para este usuario
            raidModeConfig.users[m.sender] = { count: 1, lastMessage: now, warningCount: 0 };
        } else {
            // Incrementar el contador de mensajes para este usuario
            raidModeConfig.users[m.sender].count++;
            // Si ha enviado más de 2 mensajes en menos de 5 segundos
            if (raidModeConfig.users[m.sender].count > 2) {
                // Incrementar el contador de advertencias
                raidModeConfig.users[m.sender].warningCount++;
                // Si se ha enviado la advertencia menos de dos veces en los últimos 4 segundos
                if (raidModeConfig.users[m.sender].warningCount <= 2) {
                    // Enviar advertencia de spam
                    setTimeout(() => {
                        m.reply("*⚠️ POSIBLE RAID DETECTADO. DEJÁ DE ENVIAR TANTOS MENSAJES SEGUIDOS.*");
                    }, 1000);
                }
                // Reiniciar el contador de mensajes para este usuario
                raidModeConfig.users[m.sender].count = 0;
                // Reiniciar el temporizador para contar 4 segundos
                raidModeConfig.users[m.sender].lastMessage = now;
                // Si el usuario ha recibido más de dos advertencias en los últimos 4 segundos
                if (raidModeConfig.users[m.sender].warningCount > 2) {
                    // Eliminar al usuario
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
            }
        }
    }
}

handler.command = /^antiraid$/i;
handler.admin = true;
handler.group = true;

export default handler;
