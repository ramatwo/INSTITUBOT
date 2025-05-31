import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import sharp from 'sharp'
import ffmpeg from 'fluent-ffmpeg'

let handler = async (m, { conn, args }) => {
  let stiker = false

  if (/viewOnce/.test(m.quoted?.mtype)) return conn.reply(m.chat, '❌ *Respetá la privacidad de los usuarios o usá el comando .mirar*', m)
  try {
   
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('⛔ El video no puede durar más de 10 segundos.')
      let img = await q.download?.()
      if (!img) throw `⛔ Responde a una imagen, video o gif para crear un sticker.`
      let out
      try {
        if (/image/g.test(mime)) {
          img = await sharp(img).resize(512, 512, { fit: 'fill' }).toBuffer()
        } else if (/video/g.test(mime)) {
          await new Promise((resolve, reject) => {
            ffmpeg(img)
              .outputOptions('-vf', 'scale=512:512:force_original_aspect_ratio=increase,crop=512:512')
              .on('end', resolve)
              .on('error', reject)
              .save('output.mp4')
          })
          img = 'output.mp4'
        }
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
        await conn.reply(m.chat, `Yendo ✈️`, m)
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) {
            try {
              out = await uploadFile(img)
            } catch (e) {
              console.error('Error uploading file:', e)
              out = null
            }
          }
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packname, global.author)
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL invalido')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: `SODICABOT SYSTEM`, body: `SODICABOT SYSTEM`, mediaType: 2, sourceUrl: comunidad, thumbnail: imagen1 } } }, { quoted: m })
    else throw 'Yendo ✈️'
  }
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker'] 

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}