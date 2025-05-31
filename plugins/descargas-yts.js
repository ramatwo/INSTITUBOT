import yts from 'yt-search';
import baileys from '@whiskeysockets/baileys';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply('*Escribí el nombre del video que querés buscar.*');
    await m.react('⌛️');

    try {
        const searchResults = await yts(text);

        if (!searchResults.videos.length) {
            return conn.reply(m.chat, `❌ No se encontraron resultados para: *${text}*`, null, m);
        }

        let push = [];
        for (let v of searchResults.videos.slice(0, 5)) { // Limitar a los primeros 5 resultados
            push.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `◦ *Título:* ${v.title}\n◦ *Duración:* ${v.timestamp}\n◦ *Vistas:* ${v.views}\n◦ *Publicado:* ${v.ago}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: ''
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: '',
                    hasMediaAttachment: true,
                    imageMessage: await generateWAMessageContent({ image: { url: v.thumbnail } }, { upload: conn.waUploadToServer }).then(({ imageMessage }) => imageMessage)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_copy",
                            buttonParamsJson: `{"display_text":"💾 Descargar Video","id":"123456789","copy_code":".ytdl ${v.url}"}`
                        }
                    ]
                })
            });
        }

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({ text: '*Resultados de:* ' + `${text}` }),
                        footer: proto.Message.InteractiveMessage.Footer.create({ text: 'YouTube Search Avanzado' }),
                        header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards: [...push] })
                    })
                }
            }
        }, { quoted: m });

        await m.react('✅');
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    } catch (error) {
        console.error(error);
        m.reply(`⛔ Ocurrió un error al ejecutar este comando. Reportalo con .reportar El siguiente comando no funciona: ${usedPrefix + command} ❗❗`);
    }
};

handler.help = ["ytsearch *<texto>*"];
handler.tags = ["search"];
handler.command = /^(ytsearch|yts|youtubesearch|play)$/i;
handler.register = true;

export default handler;