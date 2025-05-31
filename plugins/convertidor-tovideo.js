import { webp2mp4 } from '../lib/webp2mp4.js'
//import { ffmpeg } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!m.quoted) throw `Responder a un sticker gif para hacer video`
let mime = m.quoted.mimetype || ''
if (!/webp/.test(mime)) throw `Responder a un sticker gif para hacer video`
let media = await m.quoted.download()
let out = Buffer.alloc(0)
if (/webp/.test(mime)) {
out = await webp2mp4(media)
} 
await conn.sendFile(m.chat, out, 'error.mp4', '*listo pa*', m, 0, { thumbnail: out })
}
handler.help = ['tovideo']
handler.tags = ['sticker']
handler.command = ['tovideo']
export default handler
