var handler = async (m, { conn }) => {

    if (!/viewOnce/.test(m.quoted?.mtype)) return conn.reply(m.chat, '❌ *Respondé a un archivo multimedia enviado para ver una vez*', m)
   try { let mtype = Object.keys(m.quoted.message)[0]
    let buffer = await m.quoted.download()
    let caption = m.quoted.message[mtype].caption || ''
    caption = `*-${caption}*`
    conn.sendMessage(m.chat, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: m })
} catch (e) {
    m.reply('❌ *El archivo no se puede desencriptar*')
    console.error(e)}
}
handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^readviewonce|mirar/i

handler.diamante = true
handler.register = true
handler.premium = true
handler.rowner = false
export default handler