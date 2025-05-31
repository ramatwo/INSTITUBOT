let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Verifica si el texto de la sugerencia está presente
  if (!text) throw `${mg}*Escribí tu sugerencia*\n\n*Ejemplo:*\n*${usedPrefix + command} me gustaria que añadan...*`;

  // Verifica la longitud del texto
  if (text.length < 10) throw `⫹⫺ ➭⛔ ∫ *Mínimo 10 caracteres. NO ENVIE SUGERENCIAS FALSAS O SERÁS BANEADO PERMANENTEMENTE.*`;
  if (text.length > 1000) throw `Máximo 1000 caracteres.`;

  // Crea el mensaje de sugerencia
  let teks = `*╭━━[ NUEVA SUGERENCIA]━━━⬣*\n*┃*\n*┃* *Número:*\n┃ ✦ +${m.sender.split`@`[0]}\n*┃*\n*┃* *Sugerencia:*\n*┃* ✦ ${text}\n*┃*\n*╰━━━━━━━━━━━━━━━━━━⬣*`;

  // Envía la sugerencia al número especificado
  conn.reply('5491162480909@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
      contextInfo: {
          mentionedJid: [m.sender]
      }
  });

  // Responde al usuario confirmando la recepción de la sugerencia
  m.reply(`*✅ ∫ Gracias por tu sugerencia. Si es buena la vamos a tener en cuenta y vas a ser recompensado/a por ayudar a agregar contenido al bot.*\n\n*En caso de ser una sugerencia basura/falsa, podrías ser baneado permanentemente.*`);
}

handler.help = ['sugerencia'].map(v => v + ' <teks>');
handler.tags = ['info'];
handler.register = true;
handler.command = /sugerir|sugerencia|suggest/i;

export default handler;
