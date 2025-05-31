let handler = async (m, { text, isROwner}) => {
  let user = global.db.data.users[m.sender]
 
    //if (!text) return m.reply(`*⛔ ∫ Poné un motivo*`)
    //if (text.length < 3) return m.reply(` poné bien el motivo gil`)
    if (text.length > 80) return m.reply(` poné bien el motivo gil`)
      
      let time = global.db.data.users[m.sender].lastsda + 300000
      if (!isROwner) {
    if (new Date - user.lastsda < 300000) return m.reply(`No te parece que estás usando a cada rato el afk? decidite si te vas o te quedás. Ahora esperá ${msToTime(time - new Date())} para volver a ponerte afk salamin`) 
    }
      user.lastsda = new Date * 1
      user.afk = + new Date
      user.afkReason = text
      //m.reply(`*✅ ∫ Entendido, modo afk activado.*`)
      m.react("✅")
    }
     handler.help = ['afk [alasan]']
     handler.tags = ['main']
     handler.command = /^afk$/i
     handler.register = true
     handler.premium = true
     handler.rowner =  false
     export default handler
     function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
      
      hours = (hours < 10) ? "0" + hours : hours
      minutes = (minutes < 10) ? "0" + minutes : minutes
      seconds = (seconds < 10) ? "0" + seconds : seconds
      
      return minutes + " m " + seconds + " s " 
      }