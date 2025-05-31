import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    if (!m.quoted) throw '❗️ Usa un sticker para agregar un paquete y nombre. Responde al sticker que deseas modificar.'
    
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw '❗️ El archivo no es un sticker en formato webp. Responde a un sticker en formato webp para agregar un paquete y nombre.'
        
        let img = await m.quoted.download()
        if (!img) throw '❗️ No se pudo descargar el sticker. Asegúrate de responder a un sticker válido.'
        
        stiker = await addExif(img, packname || '', author || '')
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) {
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
                contextInfo: {
                    'forwardingScore': 200,
                    'isForwarded': false,
                    externalAdReply: {
                        showAdAttribution: false,
                        title: wm,
                        body: `h`,
                        mediaType: 2,
                        sourceUrl: comunidad,
                        thumbnail: imagen1
                    }
                }
            })
        } else {
            throw '❗️ Hubo un error al intentar modificar el sticker. Inténtalo de nuevo.'
        }
    }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^wm$/i
export default handler
handler.register = true
