import { createHash } from 'crypto'

let handler = async function (m, { conn, text, command, usedPrefix }) {
  let user = global.db.data.users[m.sender]
  let fkontak = { 
    "key": { 
      "participants": "0@s.whatsapp.net", 
      "remoteJid": "status@broadcast", 
      "fromMe": false, 
      "id": "Halo" 
    }, 
    "message": { 
      "contactMessage": { 
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
      }
    }, 
    "participant": "0@s.whatsapp.net" 
  }


    if (!text) return conn.reply(m.chat, `*🧠 TE CUESTA?*\nEscribí el nuevo nombre que deseas usar.\n\n*Ejemplo:* \`${usedPrefix}${command} pepito\``, fkontak, m)
    
    let nuevoNombre = text.trim()
    
    if (nuevoNombre.length < 3 || nuevoNombre.length > 12) {
      return conn.reply(m.chat, `⛔ *El nombre debe tener entre 3 y 12 caracteres.*`, fkontak, m)
    }

    if (user.gold < 10) {
      return conn.reply(m.chat, `⛔ *No tenés suficiente oro. Necesitas 10 oro para cambiar tu nombre.*`, fkontak, m)




    }

    user.name = nuevoNombre
    user.gold -= 10

    await conn.reply(m.chat, `✅ *Tu nombre ha sido cambiado a:* ${user.name}`, fkontak, m)
  
}

handler.command = ['cambiarnombre']
handler.private = false
handler.register = true
export default handler