import fs from 'fs'
import path from 'path'
let allowedNumbers = ['5491162480909@s.whatsapp.net', '5491151244787@s.whatsapp.net', '5491132690592@s.whatsapp.net', '56965538527@s.whatsapp.net'];

let handler = async (m, { conn, args }) => {
  if (!allowedNumbers.includes(m.sender)) {
    return conn.reply(m.chat, 'Debés ser parte de la AFIP para poder pedir logs.', m);
}
  // Validación de parámetros
  if (args.length < 2) {
    return m.reply("❗ Formato incorrecto.\nUso: .getlog [tienda|transferencias|tr] [número]")
  }
  
  let typeArg = args[0].toLowerCase()
  let phone = args[1]
  
  if (isNaN(phone)) return m.reply("❗ El número de teléfono debe ser numérico.")
  
  // Determinar la carpeta en base al tipo: "tienda" o "transferencias"
  let folder = ""
  if (typeArg === "tienda") {
    folder = "tienda"
  } else if (typeArg === "transferencias" || typeArg === "tr") {
    folder = "transferencias"
  } else {
    return m.reply("❗ Tipo desconocido. Usa: tienda, transferencias o tr.")
  }
  
  // Construir la ruta del archivo
  let filePath = `./logs/${folder}/${phone}.txt`
  
  // Mensaje de depuración: buscando archivo
  await m.react("🔍")
  
  // Verificar si el archivo existe
  if (!fs.existsSync(filePath)) {
    return m.reply("❗ Archivo no encontrado.")
  }
  
  try {
    // Leer el archivo
    let fileData = fs.readFileSync(filePath)
    // Mensaje de depuración: enviando archivo
    await m.react("✅")
    // Enviar el archivo al chat
    await conn.sendMessage(m.chat, { 
      document: fileData, 
      mimetype: 'text/plain', 
      fileName: `${phone}.txt` 
    })
  } catch (e) {
    await m.reply("❗ Error al enviar el archivo.")
    console.error(e)
  }
}

handler.command = /^getlog$/i
export default handler
