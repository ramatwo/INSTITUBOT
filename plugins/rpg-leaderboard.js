const cooldowns = {};

let handler = async (m, { conn, command, args, participants, usedPrefix }) => {
  try {
    const topwait = "💾 Revisando la base de datos. Espera un momento...";
    const groupId = m.chat;
    const cooldown = cooldowns[groupId] || 0;
    const remainingCooldown = cooldown - Date.now();

    if (remainingCooldown > 0) {
      return await m.reply(`Debes esperar ${Math.ceil(remainingCooldown / (1000 * 60 * 60))} horas antes de usar este comando nuevamente.`);
    }

    m.reply(topwait, null, { mentions: conn.parseMention(topwait) });
    await new Promise(resolve => setTimeout(resolve, 500));

    if (command === 'topgen' || command === 'topmen') {
      cooldowns[groupId] = Date.now() + (3 * 60 * 60 * 1000); // 3 horas en milisegundos
      // Procesamiento asíncrono
      processTop(command, args, m, conn, participants).catch(e => {
        console.error(e);
        m.reply('Ocurrió un error al procesar el comando.');
      });
    }

    if (command === 'topdonantes') {
      let top = `*🌷 TOP 10 DONANTES*\n\n*_1.- 🌷 Faku_* +54 9 264 456-0887\n*_2.- 🌷 Rama_* +54 9 11 5124-4787\n*_2.- 💮 Rocío_* +54 9 2323 63-2307`;
      m.reply(top, null, { mentions: conn.parseMention(top) });
    }

    if (command === 'topwins') {
      cooldowns[groupId] = Date.now() + (3 * 60 * 60 * 1000); // 3 horas en milisegundos
      // Procesamiento asíncrono
      processTopWins(args, m, conn, participants).catch(e => {
        console.error(e);
        m.reply('Ocurrió un error al procesar el comando.');
      });
    }
  } catch (e) {
    await m.reply(m.chat, 'error', m);
    console.log('error log');
    console.log(e);
  }
};

async function processTop(command, args, m, conn, participants) {
  // Cargar usuarios de forma eficiente
  let users = Object.entries(global.db.data.users).map(([key, value]) => ({ ...value, jid: key }));

  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'));
  let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedExp.length);
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'));

  let usersLevel = sortedLevel.map(enumGetKey);

  let toprango = `💠 *TOP ${len} GENERAL💪*\nVos: *#${usersLevel.indexOf(m.sender) + 1}* de *#${usersLevel.length}*\n\n${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => jid === p.jid) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *lvl ${level} 🔅*`).join('\n')}`;

  await m.reply(toprango, null, { mentions: conn.parseMention(toprango) });
}

async function processTopWins(args, m, conn, participants) {
  // Cargar usuarios de forma eficiente
  let users = Object.entries(global.db.data.users).map(([key, value]) => ({ ...value, jid: key }));

  let sortedWins = users.map(toNumber('victorias')).sort(sort('victorias'));
  let len = args[0] && args[0].length > 0 ? Math.min(100, Math.max(parseInt(args[0]), 10)) : Math.min(10, sortedWins.length);

  let topWins = sortedWins.slice(0, len).map((user, index) => {
    return `*${index + 1}.- ${user.name}* - ${user.victorias} victorias`;
  }).join('\n');

  let topMessage = `*🏆 TOP ${len} USUARIOS CON MÁS VICTORIAS*\n\n${topWins}`;
  m.reply(topMessage, null, { mentions: conn.parseMention(topMessage) });
}

function toNumber(key) {
  return (user) => ({ ...user, [key]: Number(user[key] || 0) });
}

function sort(key) {
  return (a, b) => b[key] - a[key];
}

function enumGetKey(user) {
  return user.jid;
}
handler.command = ['topgen', 'topmen', 'topdonantes', 'topwins'];
handler.register = true
handler.premium = true
export default handler;
