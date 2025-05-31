import axios from 'axios';

let handler = async (m, { conn, usedPrefix }) => {
    try {
        if (!m.quoted) throw 'Debes responder a una imagen para utilizar este comando.';

        let img = await m.quoted.download();

        // Subir la imagen a Imgur
        let imgurRes = await uploadToImgur(img);
        if (!imgurRes || !imgurRes.data || !imgurRes.data.link) throw 'Error al subir la imagen a Imgur.';

        // Construir el enlace con la imagen subida
        let imgurLink = imgurRes.data.link;
        let ageDetectLink = `https://api.lolhuman.xyz/api/agedetect?apikey=GataDiosV2&img=${encodeURIComponent(imgurLink)}`;

        // Obtener la edad usando la API
        let ageDetectRes = await axios.get(ageDetectLink);
        if (!ageDetectRes || ageDetectRes.status !== 200 || !ageDetectRes.data || ageDetectRes.data.status !== 200) {
            throw 'Error al obtener la edad de la persona.';
        }

        let age = ageDetectRes.data.result;

        // Enviar el resultado al chat
        conn.reply(m.chat, `Esa persona tiene aproximadamente ${age} años`, m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, `Error: ${e}`, m);
    }
};

handler.command = ['agedetect', 'detectaredad'];
handler.tags = ['tools'];
handler.help = ['agedetect'];
handler.premium = true
handler.restrict = true
handler.register = true
export default handler;

async function uploadToImgur(image) {
    try {
        let response = await axios.post('https://api.imgur.com/3/image', image, {
            headers: {
                'Content-Type': 'image/*',
                'Authorization': 'Client-ID ed2cac9cc22d803',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading to Imgur:', error);
        return null;
    }
}
