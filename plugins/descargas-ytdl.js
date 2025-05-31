import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `*Debes proporcionar un número o un enlace de YouTube válido.*\nEjemplo: ${usedPrefix + command} 1 o ${usedPrefix + command} https://youtu.be/4Xe0ux8AktY`, null, m);

    let youtubeLink = args[0];
    if (!youtubeLink.startsWith('http')) {
        // Validar si el argumento es un índice
        const index = parseInt(youtubeLink) - 1;
        if (isNaN(index) || index < 0 || !global.videoList || !global.videoList.length) {
            return conn.reply(m.chat, `❌ No hay resultados disponibles o el índice es inválido. Usa ${usedPrefix}ytsearch para buscar videos primero.`, null, m);
        }

        const matchingItem = global.videoList.find(item => item.from === m.sender);
        if (!matchingItem || index >= matchingItem.urls.length) {
            return conn.reply(m.chat, `❌ El índice proporcionado no es válido. Selecciona un número entre 1 y ${matchingItem ? matchingItem.urls.length : 0}.`, null, m);
        }

        youtubeLink = matchingItem.urls[index];
    }

    m.react('⌛️');

    try {
        const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(youtubeLink)}`;
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (!json.status || !json.data || !json.data.download || !json.data.download.url) {
            throw new Error('Error al obtener datos de la API.');
        }

        const { title, download } = json.data;
        const { url, filename, size } = download;

        await conn.sendMessage(m.chat, {
            video: { url },
            fileName: filename,
            caption: `🎥 *Título:* ${title}\n📦 *Tamaño:* ${size}`,
        }, { quoted: m });

        m.react('✅');
    } catch (e) {
        m.react('❌');
        console.error(e);
        conn.reply(m.chat, `⛔ Ocurrió un error al descargar el video. Intenta nuevamente o reporta el problema.`, null, m);
    }
};

handler.command = /^(ytdl|ytdownload|video|youtubedownload)$/i;
handler.register = true;
export default handler;