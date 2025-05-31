import axios from 'axios';
import * as cheerio from 'cheerio';

let handler = async (m, { conn, args }) => {
    if (!args[0]) throw 'Por favor, proporciona una URL de Twitter.';
    const sender = m.sender.split('@')[0];
    const url = args[0];

    // Enviar un mensaje de espera al usuario
    m.react('⏳');

    try {
        // Intentar descargar usando la primera función twitterDL
        let downloadResult = await twitterDL(url);

        // Si la primera función falla, intentar con la segunda función twitterDLv2
        if (!downloadResult.status || downloadResult.media.length === 0) {
            downloadResult = await twitterDLv2(url);
        }

        // Si ambas funciones fallan, lanzar un error
        if (!downloadResult.status || downloadResult.media.length === 0) {
            m.react('❌');
            throw 'No se pudo descargar el video de Twitter. Intenta con otro enlace o verifica que el enlace sea correcto.';
        }

        // Obtener el primer medio disponible (imagen o video)
        const media = downloadResult.media[0].url || downloadResult.media[0];

        // Descargar el medio como buffer
        const { data: videoBuffer } = await axios.get(media, { responseType: 'arraybuffer' });

        // Enviar el video como archivo adjunto en el chat
        const caption = `@${sender} 🎥`;
        await conn.sendMessage(
            m.chat, 
            {
                video: videoBuffer,
                mimetype: 'video/mp4',
                fileName: 'video.mp4',
                caption: caption,
                mentions: [m.sender],
            }, 
            { quoted: m }
        );
        m.react('📤');

    } catch (error) {
        m.react('❌');
        // Enviar mensaje de error al usuario si ocurre algún problema
        console.error('Error en el handler:', error);
        conn.reply(m.chat, `Ocurrió un error: ${error.message}`, m);
    }
};

// Configuración del comando
handler.help = ['twitter <url>'];
handler.tags = ['downloader'];
handler.command = /^(x|twt|twitter(dl)?)$/i;

handler.diamante = true;
handler.register = true;

export default handler;

// Función para descargar desde Twitter (Versión 1)
async function twitterDL(url) {
    try {
        const result = { status: true, type: '', media: [] };
        const { data } = await axios.post('https://savetwitter.net/api/ajaxSearch', 
            { q: url, lang: 'en' }, 
            {
                headers: {
                    accept: '*/*',
                    'user-agent': 'PostmanRuntime/7.32.2',
                    'content-type': 'application/x-www-form-urlencoded',
                },
            }
        );

        let $ = cheerio.load(data.data);

        // Verificar si hay video disponible
        if ($('div.tw-video').length === 0) {
            // Si no hay video, buscar imágenes
            $('div.video-data > div > ul > li').each(function () {
                result.type = 'image';
                result.media.push($(this).find('div > div:nth-child(2) > a').attr('href'));
            });
        } else {
            // Si hay video, agregarlo a la lista de medios
            $('div.tw-video').each(function () {
                let qualityText = $(this).find('.tw-right > div > p:nth-child(1) > a').text().includes('(')
                    ? $(this).find('.tw-right > div > p:nth-child(1) > a').text().split('(')[1].split('p')[0].trim()
                    : $(this).find('.tw-right > div > p:nth-child(1) > a').text().trim();

                result.type = 'video';
                result.media.push({
                    quality: qualityText,
                    url: $(this).find('.tw-right > div > p:nth-child(1) > a').attr('href'),
                });
            });
        }

        return result;
    } catch (err) {
        return {
            status: false,
            message: 'No se encontró el medio en Twitter.\n\n' + String(err),
        };
    }
}

// Función para descargar desde Twitter (Versión 2)
async function twitterDLv2(url) {
    try {
        const { data } = await axios.get(`https://twitsave.com/info?url=${url}`);
        let $ = cheerio.load(data);
        let result = [];

        // Buscar y extraer la información de los videos disponibles
        $('div.origin-top-right > ul > li').each(function () {
            const resolutionText = $(this).find('a > div > div > div').text();
            if (resolutionText.includes('Resolution: ')) {
                const width = resolutionText.split('Resolution: ')[1].split('x')[0];
                const height = resolutionText.split('Resolution: ')[1].split('x')[1];
                const videoUrl = $(this).find('a').attr('href');
                result.push({ width, height, url: videoUrl });
            }
        });

        // Si no se encuentran videos, devolver un estado de error
        if (result.length === 0) {
            return { status: false, message: 'No se pudo encontrar el video en Twitter.' };
        }

        // Ordenar los resultados por resolución y elegir el de mayor calidad
        const sortedResult = result.sort((a, b) => b.height - a.height);
        const highestResolution = sortedResult[0].width;
        return { status: true, media: sortedResult.filter((video) => video.width === highestResolution) };

    } catch (err) {
        return { status: false, message: 'Error al obtener los datos de Twitsave.\n\n' + String(err) };
    }
}
