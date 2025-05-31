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
        let ocrLink = `https://api.lolhuman.xyz/api/ocr?apikey=GataDiosV2&img=${encodeURIComponent(imgurLink)}`;

        // Obtener el resultado usando la API
        let ocrRes = await axios.get(ocrLink);
        if (!ocrRes || ocrRes.status !== 200 || !ocrRes.data || ocrRes.data.status !== 200) {
            throw 'Error al realizar OCR en la imagen.';
        }

        let ocrResult = ocrRes.data.result;

        // Enviar el resultado al chat
        conn.reply(m.chat, `Texto detectado en la imagen:\n${ocrResult}`, m);
    } catch (e) {
        console.error(e);
        conn.reply(m.chat, `Error: ${e}`, m);
    }
};

handler.command = ['ocr'];
handler.tags = ['tools'];
handler.help = ['ocr'];
handler.rowner = false;

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
