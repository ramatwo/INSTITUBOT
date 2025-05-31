/*              Codigo Creado Por Bruno Sobrino 
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
      if (!args[0]) return m.reply(`${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙋𝙍𝙀𝙁𝙄𝙅𝙊 𝘿𝙀 𝙐𝙉 𝙋𝘼𝙄𝙎 𝙋𝘼𝙍𝘼 𝘽𝙐𝙎𝘾𝘼𝙍 𝙉𝙐𝙈𝙀𝙍𝙊𝙎 𝙀𝙉 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝘿𝙀 𝙀𝙎𝙀 𝙋𝘼𝙄𝙎, 𝙀𝙅𝙀𝙈𝙋𝙇𝙊: ${usedPrefix + command} 593*`) 
      if (isNaN(args[0])) return m.reply(`${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙀𝙇 𝙋𝙍𝙀𝙁𝙄𝙅𝙊 𝘿𝙀 𝙐𝙉 𝙋𝘼𝙄𝙎 𝙋𝘼𝙍𝘼 𝘽𝙐𝙎𝘾𝘼𝙍 𝙉𝙐𝙈𝙀𝙍𝙊𝙎 𝙀𝙉 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 𝘿𝙀 𝙀𝙎𝙀 𝙋𝘼𝙄𝙎, 𝙀𝙅𝙀𝙈𝙋𝙇𝙊: ${usedPrefix + command} 593*`) 
      let lol = args[0].replace(/[+]/g, '')
      let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol)) 
      let bot = global.db.data.settings[conn.user.jid] || {}
      if (ps == '') return m.reply(`no existe ningún +${lol}`)
      let numeros = ps.map(v=> '➥ @' + v.replace(/@.+/, ''))
      const delay = time => new Promise(res=>setTimeout(res,time));
      switch (command) {
      case "listanum": 
      conn.reply(m.chat, `⚠️ 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙉𝙐𝙈𝙀𝙍𝙊𝙎 𝘾𝙊𝙉 𝙀𝙇 𝙋𝙍𝙀𝙁𝙄𝙅𝙊 +${lol} 𝙌𝙐𝙀 𝙀𝙎𝙏𝘼𝙉 𝙀𝙉 𝙀𝙇 𝙂𝙍𝙐𝙋𝙊 ⚠️\n\n` + numeros.join`\n`, m, { mentions: ps })
      break   
      case "kicknum":  
      if (!bot.restrict) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsSoloOwner']()}`) 
      if (!isBotAdmin) return m.reply(`${lenguajeGB['smsAvisoAG']()} ${lenguajeGB['smsAllAdmin']()}`)          
      conn.reply(m.chat, `Iniciando eliminación de +${lol}.`, m)            
      let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net'
      let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol || lol))
      for (let user of users) {
      let error = `@${user.split("@")[0]} ya ha sido eliminado.`    
      if (user !== ownerGroup + '@s.whatsapp.net' && user !== global.conn.user.jid && user !== global.owner + '@s.whatsapp.net' && user.startsWith(lol || lol) && user !== isSuperAdmin && isBotAdmin && bot.restrict) { 
      await delay(500)    
      let responseb = await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
      if (responseb[0].status === "404") m.reply(error, m.chat, { mentions: conn.parseMention(error)})  
      await delay(500)
      } else return m.reply(`${lenguajeGB['smsAvisoFG']()}`)}
      break            
      }}
      handler.command = /^(listanum|kicknum)$/i
      handler.group = handler.botAdmin = handler.admin = true
      handler.fail = null
      export default handler
      handler.register = true