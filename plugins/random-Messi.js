import axios from 'axios';
import fs from 'fs';

let handler = async (m, { conn, usedPrefix, command }) => {
  // Obtener el contenido del archivo Messi.json local
  let messiJsonPath = '.\\src\\JSON\\Messi.json';
  let jsonData = fs.readFileSync(messiJsonPath, 'utf-8');
  let res = JSON.parse(jsonData);

  // Obtener un enlace aleatorio del archivo
  let url = res[Math.floor(res.length * Math.random())];

  // Descargar la imagen y enviarla al chat
  let response = await axios.get(url, { responseType: 'arraybuffer' });
  let buffer = Buffer.from(response.data, 'binary');
  
  // Puedes ajustar el nombre del archivo según la extensión del enlace
  let fileName = 'Messi.jpg';
  //conn.reply(m.chat, `⛔ *Por tratar de bugearla tu numero fue enviado a la administración y se van a tomar medidas con tu cuenta.*`, fkontak, m)
  conn.sendFile(m.chat, buffer, fileName, `Messi 🇦🇷`, m);
  //let avisodeuso = "MESSI USADO"
   // conn.sendMessage('5491162480909@s.whatsapp.net', {text: avisodeuso, mentions: [m.sender], },{ quoted: m })
};

handler.help = ['messi'];
handler.tags = ['internet'];
handler.command = /^(messi)$/i;

export default handler;
