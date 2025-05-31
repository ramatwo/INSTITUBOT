import fs from 'fs';
import path from 'path';
import { format as formatDate } from 'date-fns';
import PhoneNumber from 'awesome-phonenumber';

// Variable para almacenar los números de la lista negra
let numerosblacklist = [];

// Función para cargar los números de la lista negra desde el archivo
function loadBlacklist() {
    try {
        let content = fs.readFileSync('./codes/blacklisttransfer.txt', 'utf8');
        numerosblacklist = content.trim().split('\n');
    } catch (error) {
        console.error('Error al cargar la lista negra:', error);
    }
}

// Cargar los números de la lista negra al iniciar el bot
loadBlacklist();

// Actualizar la lista negra cada 5 minutos
setInterval(loadBlacklist, 5 * 60 * 1000);

const items = [
    'diamante', 'exp','potion', 'token', 'money', 'trash', 'wood',
    'rock', 'string', 'petFood', 'esmeralda',
    'diamanteplus', 'oro', 'iron', 'common',
    'uncoommon', 'mythic', 'legendary', 'pet',
];

let confirmation = {}; 
let globalArgs = {}; 

async function handler(m, { conn, args, usedPrefix, command, isROwner }) {
    globalArgs = { conn, args, usedPrefix, command };
 /*   if (!isROwner) {
    if (global.conn.user.jid !== conn.user.jid) {
        return conn.sendMessage(m.chat, { text: `*USE ESTE COMANDO EN EL BOT PRINCIPAL* \n\n*https://api.whatsapp.com/send/?phone=${global.conn.user.jid.split`@`[0]}&text=${usedPrefix + command}*` }, { quoted: m });
    }
    }*/
// Validar que los argumentos se proporcionen en el orden correcto
if (args.length < 3 || !items.includes(args[0].toLowerCase()) || isNaN(args[1]) || !args[2].startsWith('@')) {
    return m.reply(`❌ *Formato incorrecto. Usá el comando de la siguiente manera:*\n\n*${usedPrefix + command} tipo cantidad @usuario*\n\n*EJEMPLO:*\n*${usedPrefix + command} exp 50000 @usuario*`);
}


    let user = global.db.data.users[m.sender];
    const item = items.filter(v => v in user && typeof user[v] === 'number');
    let comision = 50000;
    let lol = `💱 *TRANSFERENCIA* 💱

*${usedPrefix + command}  tipo cantidad @usuario*
*EJEMPLO*
*${usedPrefix + command} exp 30 @59300000000*

╭━━━━━━━━━━━━━━━━━━ ღ
┃ ✅ *transferencias disponibles*
┃──────────────
┃ diamante *= Diamantes* 💎
┃ money *= Moneditas* 🪙 
┃ exp *= Experiencia* ⚡
┃ oro = *Oro* 👑 
┃ potion *= Poción* 🥤
┃ diamanteplus *= Diamante+* 💎💎
╰━━━━━━━━━━━━━━━━━━ ღ 
comision ${comision} money
`.trim();

   

    const type = (args[0] || '').toLowerCase();
    if (!item.includes(type)) return m.reply(lol);
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1;
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '';
    
    if (!who) return m.reply(`❌ *ETIQUETE AL USUARIO*`);
    if (!(who in global.db.data.users)) return m.reply(`❌ *EL USUARIO ${who} NO SE ENCUENTRA EN MI BASE DE DATOS*`);
    
    // Verificar si el destinatario está en la lista negra
    if (numerosblacklist.includes(who.split`@`[0])) {
        return m.reply(`❌ *No se pudo enviar la transferencia a este usuario. No lo vuelva a intentar*`);
    }
    if (!isROwner) {
    if (type === 'exp' && count > 30000000) {
        return m.reply(`❌ *No se permiten enviar transferencias que manipulen el top global. No lo vuelva a intentar*`);
    }
    if (type === 'oro' && count > 30) {
        return m.reply(`❌ *No se permiten enviar transferencias que manipulen el top global. No lo vuelva a intentar*`);
    }
    if (type === 'money' && count > 30000000) {
        return m.reply(`❌ *No se permiten enviar transferencias que manipulen el top global. No lo vuelva a intentar*`);
    }
    if (type === 'diamante' && count > 20000000) {
        return m.reply(`❌ *No se permiten enviar transferencias que manipulen el top global. No lo vuelva a intentar*`);
    }
    if (type === 'diamanteplus' && count > 10000000) {
        return m.reply(`❌ *No se permiten enviar transferencias que manipulen el top global. No lo vuelva a intentar*`);
    }}
    if (user[type] * 1 < count) return m.reply(`❌ *NO TIENE SUFUCIENTE PARA REALIZAR LA TRANSFERENCIA DE ${type}*`);
    if (!isROwner) {
    if (global.db.data.users[m.sender].money < comision) return m.reply(`❌ *Necesitás ${comision} monedas para cubrir la comisión.*`);
    }
    // Verificar si el remitente está en la lista negra
    if (numerosblacklist.includes(m.sender.split`@`[0])) {
        return m.reply('❌ No se pudo crear tu transferencia.');
    }

    let mentionedJid = [who];
    let username = conn.getName(who);

    let confirm = `*Estás a punto de transferir:*
💹 *${count} ${type} para* *@${(who || '').replace(/@s\.whatsapp\.net/g, '')}* ? 
*Estás seguro?*
Mandá: si/no
Tenés 10 segundos`.trim();

    await conn.reply(m.chat, confirm, m, { mentions: [who] });

    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type,
        count,
        timeout: setTimeout(() => (m.reply('*El tiempo para esta transferencia se acabó.*'), delete confirmation[m.sender]), 10 * 1000),
    };
}

handler.before = async m => {
    const { conn, args, usedPrefix, command } = globalArgs;
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;
    let { timeout, sender, message, to, type, count } = confirmation[m.sender];
    if (m.id === message.id) return;
    let user = global.db.data.users[sender];
    let _user = global.db.data.users[to];
    let cooldown = 20000
    let userCooldowntransfer = global.userAhorcadoCooldowns || (global.userAhorcadoCooldowns = {});
    let userCooldown = userCooldowntransfer[m.sender] || 0;
    let time = userCooldown + cooldown;
  

    if (/^No|no|ño$/i.test(m.text)) {

        if (new Date - userCooldown < cooldown) {
            return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a transferir.*`, null, m);
          }
        userCooldowntransfer[m.sender] = new Date * 1
        clearTimeout(timeout);
        delete confirmation[sender];
        return m.reply('*CANCELADO*');
    }

    if (/^Si|si|chi$/i.test(m.text)) {

        if (new Date - userCooldown < cooldown) {
            return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a transferir.*`, null, m);
          }
        userCooldowntransfer[m.sender] = new Date * 1
        let previous = user[type] * 1;
        let _previous = _user[type] * 1;

        global.db.data.users[m.sender].money -= 100000;
        global.db.data.users['5491159909622@s.whatsapp.net'].money += 100000;
        user[type] -= count * 1;
        _user[type] += count * 1;

        if (previous > user[type] * 1 && _previous < _user[type] * 1) {
            m.reply(`✅ *Transferencia realizada con éxito.*`, null, { mentions: [to] });
            //-------------------------------------------------

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
let chat = await conn.getName(m.chat)
let GroupID = '120363366019425116@g.us';

// Verificar si la transferencia se realiza desde un ExtBot
let isExtBot = conn.user.jid !== global.conn.user.jid;

// Construir el mensaje del log
let logMessage = `💳 Transferencia Realizada 💳\n\n🌐 Cantidad: ${count} ${type}\n📤 Saliente: +${m.sender.split`@`[0]}\n📥 Entrante: +${(who || '').replace(/@s\.whatsapp\.net/g, '')}\n⁉️ GRUPO: ${m.chat.includes("@g.us") ? `${chat}` : 'privado'}\n`;

// Si es un ExtBot, incluir información adicional sobre qué ExtBot ejecutó la transferencia
if (isExtBot) {
    const extBotInfo = `${conn.user.name || 'ExtBot'} (+${conn.user.jid.split('@')[0]})`;
    logMessage += `🤖 EXTBOT: ${extBotInfo}\n`;
}

// Enviar el mensaje al grupo usando la conexión principal (SodicaBot)
global.conn.sendMessage(GroupID, { text: logMessage }, { quoted: m });

   
    // Log the transfer
    const phoneNumber = m.sender.replace(/[^\d]/g, '');
    const senderName = conn.getName(m.sender);
    const hostNumber = PhoneNumber('+' + conn.user.jid.replace('@s.whatsapp.net', '')).getNumber('international');
    const hostName = conn.user.name || 'SodicaBot';
    const hostInfo = `${hostNumber} ~${hostName}${conn.user.jid === global.conn.user.jid ? '' : ' 【EXTBOT】'}`;
    const logMessageFile = `[${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}] TRANSFERENCIA: ${senderName} (+${phoneNumber}) COMANDO: ${usedPrefix + command} ${type} ${count} @${to.split`@`[0]}\nCantidad: ${count} ${type} | Saliente: +${m.sender.split`@`[0]} | Entrante: +${to.split`@`[0]} | GRUPO: ${m.chat.includes("@g.us") ? `${chat}` : 'privado'}\nHOST: ${hostInfo}\n----------------------------------------\n`;
    const logFilePath = `./logs/transferencias/${phoneNumber}.txt`;

    // Ensure the directory exists
    ensureDirectoryExistence(logFilePath);

    // Append the log message to the file
    fs.appendFileSync(logFilePath, logMessageFile);


        } else {
            user[type] = previous;
            _user[type] = _previous;
            m.reply(`❌ *Error al transferir ${count} ${type} para* *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] });
        }

        clearTimeout(timeout);
        delete confirmation[sender];
    }
};

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]');
handler.tags = ['xp'];
handler.command = ['transfer', 'transferir', 'trans', 'tr', 'give'];
handler.register = true;
handler.group = true
handler.disabled = false;
handler.owner = false;

export default handler;

function isNumber(x) {
    return !isNaN(x);
}

function ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}
