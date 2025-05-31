
let handler = async (m, { conn }) => {
        await m.reply('Para descargar un audio, primero debes descargar el video y despues responder al video con el comando *.toaudio*')
        
    } 
handler.tags = ['ayuda']
handler.command = ['audioayuda']

handler.rowner = true

export default handler