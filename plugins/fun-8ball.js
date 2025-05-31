let handler = async (m, { text, usedPrefix, command, conn }) => {
    try {
      if (!text) throw `*❓ ¡Preguntame algo! Escribe una pregunta después del comando.*\n> Ejemplo: ${usedPrefix}${command} ¿Mi familia me quiere?`
  
      // Respuestas de la bola mágica
      let respuestas = {
        positivas: [
          "¡Definitivamente sí! 🌟",
          "Sin duda alguna. 💯",
          "Claro que sí, no hay duda. 🙌",
          "¡Por supuesto que sí! 🌈",
          "Todo apunta a un sí rotundo. 👍",
        ],
        neutrales: [
          "Puede ser... 🤔",
          "No estoy seguro, vuelve a preguntar luego. 🕒",
          "La respuesta está en el aire... 🌬️",
          "Podría ser, pero no pongas todas tus esperanzas. 😐",
          "Quién sabe... el destino es incierto. 🌌",
        ],
        negativas: [
          "No cuentes con ello. 🚫",
          "Mis fuentes dicen que no. ❌",
          "No parece probable. 😔",
          "La respuesta es no. 📉",
          "No, mejor olvídalo. 🌪️",
        ],
      }
  
      // Elegir categoría y respuesta al azar
      let categorias = Object.keys(respuestas)
      let categoria = categorias[Math.floor(Math.random() * categorias.length)]
      let respuesta = respuestas[categoria][Math.floor(Math.random() * respuestas[categoria].length)]
  
      // Mensaje inicial "Pensando..."
      const { key } = await conn.sendMessage(m.chat, { text: "🎱 Pensando..." }, { quoted: m })
  
      // Tiempo de espera entre ediciones
      let delay = ms => new Promise(resolve => setTimeout(resolve, ms))
  
      await delay(2000)
      // Respuesta final
      let mensaje = `*🎱 Bola 8 mágica responde:*\n\n${respuesta}\n\n`
      if (categoria === "positivas") mensaje += "> ✨ ¡Todo parece estar a tu favor! ✨"
      if (categoria === "neutrales") mensaje += "> 🤔 Capaz necesites más claridad en tu camino."
      if (categoria === "negativas") mensaje += "> 💭 A veces, no obtener lo que querés es una bendición disfrazada."
  
      await conn.sendMessage(m.chat, { text: mensaje, edit: key })
    } catch (e) {
      console.log(e)
      conn.reply(m.chat, `*❓ ¡Preguntame algo! Escribe una pregunta después del comando.*\n> Ejemplo: ${usedPrefix}${command} ¿Mi familia me quiere?`, m)
    }
  }
  
  handler.help = ['8ball {pregunta}']
  handler.tags = ['fun']
  handler.command = ['8ball', 'bola8', 'pregunta'] // Puedes añadir más alias
  handler.register = true
  export default handler
  