import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, '🫕 Ingresa el enlace de algún Track, Playlist o Álbum de Spotify.', m);
    }

    let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
    if (!isSpotifyUrl) {
        return conn.reply(m.chat, 'Mandá un enlace válido de Canción, Playlist o Álbum de Spotify.', m);
    }

    await m.react('🕓');

    try {
        const spotdr = await fetch('https://fastrestapis.fasturl.cloud/downup/spotifydown?url=' + encodeURIComponent(text));
        const spotdl = (await spotdr.json()).result;

        let img = await (await fetch(spotdl.metadata.cover)).buffer();
        
        let txt = `SPOTIFY DL\n\n`;
        txt += `🪼 *Titulo:* ${spotdl.metadata.title}\n`;
        txt += `🪩 *Artista:* ${spotdl.metadata.artist}\n`;
        txt += `🦋 *Álbum:*  ${spotdl.metadata.album}\n`;
        txt += `🚀 *Lanzamiento:* ${spotdl.metadata.releaseDate}\n\n`;
        txt += `El audio se está procesando, por favor esperá...`;

        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m);
        await conn.sendMessage(m.chat, { audio: { url: spotdl.link }, fileName: `${spotdl.metadata.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        
        await m.react('✅');
    } catch (error) {
        console.error('Error al procesar la descarga de Spotify:', error);
        await m.react('✖️');
    }
};

handler.help = ['spotifydl'];
handler.tags = ['downloader'];
handler.command = /^(spotifyDl|spdl|SpotifyDL|spotifydl)$/i;
handler.register = true;

export default handler;