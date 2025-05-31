let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉 𝙏𝙀𝙓𝙏𝙊`
  try {
    await conn.updateProfileName(text)
    m.reply('LISTO!')
  } catch (e) {
    console.log(e)
    throw `Error`
  }
}
handler.help = ['setbotname <teks>']
handler.tags = ['owner']
handler.command = /^(setbotname)$/i

handler.rowner = true

export default handler