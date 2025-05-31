const handler = async (m, { conn }) => {	
    let who = m.isGroup ? m.mentionedJid[0] || m.sender : m.sender;
    let name = conn.getName(who);
    let user = global.db.data.users[who];
    let premium = user && user.premium ? '✅' : '❌';
    let prem = global.db.data.users[who].premium
    let usuario = global.db.data.users[who].premiumTime
    await conn.reply(m.chat, `🎟️ *Usuario VIP ⇢* ${premium}\n*RESTANTE:*\n${prem ? `${clockString (usuario - new Date() * 1)}\n┃ *EL USUARIO ES VIP*` : 'EL USUARIO NO ES VIP'}`, null, { contextInfo: { mentionedJid: [who] } });
}

handler.command = /^checkprem$/i;

export default handler
function clockString(ms) {
    let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
    let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['┃ ', ye, ' *🗓️ Años*\n', '┃ ', mo, ' *⛅ Meses*\n', '┃ ', d, ' *☀️ Días*\n', '┃ ', h, ' *⏰ Horas*\n', '┃ ', m, ' *🕐 Minutos*\n', '┃ ', s, ' *⏱️ Segundos*'].map(v => v.toString().padStart(2, 0)).join('')
  }