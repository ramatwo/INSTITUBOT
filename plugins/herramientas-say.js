let handler = async (m, {conn, text, usedPrefix, command}) => {
    if (!text) throw `*❕ Ingresa el texto, ejemplo:*\n${usedPrefix + command} Hola`
    let textfilter = text.replace(wm, "(*si berdad*)")
    conn.reply(m.chat, textfilter, null)
  }
  handler.help = ["say <teks>"]
  handler.tags = ["tools"];
  handler.command = /^(say|di)$/i
  handler.register = true
  export default handler
  handler.register = true
  handler.rowner = true