let handler = async (m, { conn, participants, groupMetadata }) => {

    const fkontak = {
        "key": {
        "participants":"0@s.whatsapp.net",
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

    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.png'
   
    let text =`_👋🏻Hola, sean todos bienvenidos a:_\n *${groupMetadata.subject}*

${groupMetadata.desc?.toString() || 'desconocido'}
`.trim()
const mentionedJid = groupMetadata.participants.map(v => v.id);
    //conn.sendFile(m.chat, pp, 'pp.jpg', text, null, true, { mentions: mentionedJid})
    conn.reply(m.chat, text, fkontak, m)
}

handler.command = ['welcome','bienvenidos','bienbenidos', 'bienvenida'] 
handler.group = true
handler.admin = true

export default handler