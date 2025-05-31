import { sticker } from '../lib/sticker.js';
import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
        let text;
        if (args.length >= 1) {
            text = args.join(" ");
        } else if (m.quoted && m.quoted.text) {
            text = m.quoted.text;
        } else {
            return m.reply('Agregá un texto.');
        }

        if (text.length > 30) {
            return m.reply('Máximo 30 letras.');
        }

        m.reply("Creando sticker...");

        let pp = await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg');

        const obj = {
            "type": "quote",
            "format": "png",
            "backgroundColor": "#000000",
            "width": 512,
            "height": 768,
            "scale": 2,
            "messages": [{
                "entities": [],
                "avatar": true,
                "from": {
                    "id": 1,
                    "name": m.name,
                    "photo": {
                        "url": pp
                    }
                },
                "text": text,
                "replyMessage": {}
            }]
        };

        const response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.result && response.data.result.image) {
            const buffer = Buffer.from(response.data.result.image, 'base64');
            let stiker = await sticker(buffer, false, global.packname, global.author);
            if (stiker) {
                return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
            } else {
                return m.reply('No se pudo crear el sticker.');
            }
        } else {
            return m.reply('Error al obtener la imagen del sticker.');
        }
    } catch (e) {
        console.error(e);
        m.reply('Hubo un error al procesar el sticker. Intenta de nuevo.');
    }
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;

export default handler;
