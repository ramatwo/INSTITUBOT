let handler = async (m, { conn }) => {
  // Obtener estadísticas y formatear
  let stats = Object.entries(db.data.stats)
    .map(([key, val]) => {
      let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help.join(' & ') : plugins[key]?.help || key;
      if (/exec/.test(name)) return;
      return { name, ...val };
    })
    .filter(Boolean) // Elimina valores nulos o indefinidos
    .sort((a, b) => b.total - a.total);

  // Formatear el texto
  let txt = stats.slice(0, 10).map(({ name, total, last }, idx) => {
    if (name.includes('-') && name.endsWith('.js')) {
      name = name.split('-')[1].replace('.js', '');
    }
    return `TOP ${idx + 1}\n*┏━━━━━━━━━━━━━━━━┓*\n*┣⚒️ COMANDO:* ${name}\n┣≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋\n┣🗂️ 𝙐𝙎𝙊𝙎 : ${total}\n┣≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋≋\n*┣📍 USADO HACE:* ${getTime(last)}\n*┗━━━━━━━━━━━━━━━━┛*`;
  }).join('\n\n');

  // Enviar la respuesta
  m.reply(`*🐻‍❄️ TOP COMANDOS MAS USADOS:*\n\n${txt}`);
}

handler.help = ['dashboard'];
handler.tags = ['info'];
handler.command = /^topcomandos$/i;

export default handler;

// Función para parsear milisegundos
export function parseMs(ms) {
  if (typeof ms !== 'number') throw 'Parameter must be filled with number';
  return {
    dias: Math.trunc(ms / 86400000),
    horas: Math.trunc(ms / 3600000) % 24,
    minutos: Math.trunc(ms / 60000) % 60,
    segundos: Math.trunc(ms / 1000) % 60,
    milisegundos: Math.trunc(ms) % 1000
  };
}

// Función para obtener el tiempo en formato legible
export function getTime(ms) {
  let now = parseMs(+new Date() - ms);
  if (now.dias) return `${now.dias} días atrás`;
  if (now.horas) return `${now.horas} horas atrás`;
  if (now.minutos) return `${now.minutos} minutos atrás`;
  return `hace unos segundos`;
}

handler.register = true;
