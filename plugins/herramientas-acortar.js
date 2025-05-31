import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) throw `*❌ ∫ Error:* Ingrese un enlace válido.`;

    // Acortar usando Bitly
    let bitlyResponse = await fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Authorization': '109ebd91de889f935447c6bfd097ab5cd010e2a5',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "long_url": text, "domain": "bit.ly" })
    });
    let bitlyJson = await bitlyResponse.json();

    let hasil = `*✅ ∫ Link acortado exitosamente:*\n*https://${bitlyJson.id}*`.trim();
    m.reply(hasil);
};

handler.help = ['bitly', 'acortar'].map(v => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(bitly|acortar)$/i;
handler.fail = null;
export default handler;
handler.register = true