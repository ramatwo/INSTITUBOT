
let handler = async (m, { conn, command }) => {
    let comunidadd = ""
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let str = `*🔰 ÚNICA COMUNIDAD OFICIAL*
✨https://chat.whatsapp.com/F3fhmg3Adwx3u5aJ9y9RRO

*🔰 CANAL DE WHATSAPP*
✨ https://whatsapp.com/channel/0029Vae8MVf3QxS049qJ7a46
`
await conn.reply(m.chat, str, fkontak)}

handler.command = /^comunidad|grupos|gruposSodicaBot|SodicaBotgrupos|gruposdeSodicaBot|groupofc|grupos$/i
handler.exp = 600

export default handler
handler.register = false