let handler = async (m, { conn, participants, groupMetadata }) => {

const groupAdmins = participants.filter(p => p.admin) 
const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
let text = 
`✦ - - ${lenguajeGB['smsGI1']()} - - ✦

⇢ ${lenguajeGB['smsGI2']()}
・ ${groupMetadata.id}

⇢ ${lenguajeGB['smsGI3']()}
・ ${groupMetadata.subject}

⇢ ${lenguajeGB['smsGI4']()}
・ ${groupMetadata.desc?.toString() || lenguajeGB['smsGI5']()}

⇢ ${lenguajeGB['smsGI6']()}
・ ${participants.length} ${lenguajeGB['smsGI7']()}

⇢ ${lenguajeGB['smsGI8']()}
・ @${owner.split('@')[0]}

⇢ ${lenguajeGB['smsGI9']()}
${listAdmin}

*《 - - - - - - - 𓃠 ${vs} - - - - - - - 》*
`.trim()
  
await conn.reply(m.chat, text, m, { mentions: [...groupAdmins.map(v => v.id), owner] })
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(infogrupo|gro?upinfo|info(gro?up|gc))$/i
handler.group = true
handler.register = true
export default handler
