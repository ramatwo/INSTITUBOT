import { mediafiredl } from '@bochilteam/scraper';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Ejemplo de uso: ${usedPrefix}${command} https://www.mediafire.com/file/941xn27qbby/sodicabot/file`;
  }

  // Verificar que la URL proporcionada sea de MediaFire
  if (!/^https?:\/\/(www\.)?mediafire\.com\/file\//.test(args[0])) {
    throw 'Por favor, proporciona un enlace válido de MediaFire.';
  }

  try {
    // Notificar que se está procesando la descarga
    m.react('⌛');

    // Descargar el archivo usando la librería mediafiredl
    let res = await mediafiredl(args[0]);
    let { url, filename, ext, aploud, filesize, filesizeH } = res;

    // Formatear la información del archivo descargado
    let caption = `
*💌 Nombre:* ${filename}
*📊 Tamaño:* ${filesizeH}
*🗂️ Extensión:* ${ext}
*📨 Subido:* ${aploud}
`.trim();

    // Enviar la información del archivo
    await m.reply(caption);

    m.react('📤');
    // Enviar el archivo al chat como documento
    await conn.sendFile(m.chat, url, filename, '', m, null, {
      mimetype: ext,
      asDocument: true,
    });

  } catch (error) {
    // Enviar mensaje de error si la descarga falla
    m.react('❌');
    await m.reply(`❌ Error al descargar el archivo: ${error.message}`);
  }
};

handler.help = ['mediafire'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;

handler.diamante = true;
handler.register = true;

export default handler;
