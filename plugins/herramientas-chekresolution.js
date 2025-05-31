//By https://github.com/DIEGO-OFC

import * as Jimp from "jimp";
import uploadImage from "../lib/uploadImage.js"
import uploadFile from "../lib/uploadFile.js"

let handler = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "*[❕] RESPONDE A UNA IMAGEN*"

let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadImage : uploadImage)(media)

let source = await jimp.read(await link)

let height = await source.getHeight()
let width = await source.getWidth()

m.reply(`_*RESOL. :*_ ${width} x ${height}
Ancho : ${width}
Altura : ${height}`)
}
handler.help = ['cekresolution <reply | caption>', 'cekreso <reply | caption>']
handler.tags = ['tool']
handler.command = /checkpx/i

export default handler
handler.register = true