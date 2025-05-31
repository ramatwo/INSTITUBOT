import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply('*Escribí el nombre de la canción que querés buscar.*');
await m.react('⌛️');

try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent({image: { url }}, {upload: conn.waUploadToServer})
return imageMessage
}

let push = [];
let api = await fetch(`https://delirius-apiofc.vercel.app/search/spotify?q=${encodeURIComponent(text)}`);
let json = await api.json()
m.react('📤')
for (let track of json.data) {
let image = await createImage(track.image)


        push.push({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: `◦ *Título:* ${track.title} \n◦ *Artistas:* ${track.artist} \n◦ *Duración:* ${track.duration} \n◦ *Popularidad:* ${track.popularity} \n◦ *Fecha:* ${track.publish}`
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: '' 
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '',
                hasMediaAttachment: true,
                imageMessage: image 
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
{
"name": "cta_copy",
"buttonParamsJson": "{\"display_text\":\"💾 Descargar Audio\",\"id\":\"123456789\",\"copy_code\":\".spotifydl " + track.url + "\"}"
},
]
})
}

);
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({text: '*Resultados de:* ' + `${text}`}),
footer: proto.Message.InteractiveMessage.Footer.create({text: 'Spotify Search Avanzado'}),
header: proto.Message.InteractiveMessage.Header.create({hasMediaAttachment: false}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({cards: [...push]})
})
}}}, {
    'quoted': m
  });

await m.react('✅');
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error)
m.reply(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
}}

handler.help = ["spotifysearch *<texto>*"]
handler.tags = ["search"]
handler.command = /^(spotifysearch|spotifys|spotify)$/i
handler.register = true
handler.rowner = false

export default handler