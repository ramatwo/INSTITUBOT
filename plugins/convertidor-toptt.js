import { toPTT } from '../lib/converter.js'
let handler = async (m, { conn, usedPrefix, command }) => {
let q = m.quoted ? m.quoted : m
let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
if (!/video|audio/.test(mime)) throw `responde un video`
let media = await q.download?.()
if (!media && !/video/.test(mime)) throw `error`
if (!media && !/audio/.test(mime)) throw `error`
let audio = await toPTT(media, 'mp4')
if (!audio.data && !/audio/.test(mime)) throw `error`
if (!audio.data && !/video/.test(mime)) throw `error`
conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['tovn (reply)']
handler.tags = ['audio']
handler.command = /^tovn|vn|ptt|toaudio$/i
export default handler
