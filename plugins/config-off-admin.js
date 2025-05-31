
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => { 
    //try{
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": true, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    let chat = global.db.data.chats[m.chat]
    let user = global.db.data.users[m.sender]
    let bot = global.db.data.settings[conn.user.jid] || {}
    let toUser = `${m.sender.split("@")[0]}`
    let aa = toUser + '@s.whatsapp.net'
    
    let titulo = [
    lenguajeGB.smsParaAdmins() + ' ' + `${m.isGroup ? chat.antitoxic ? '✅' : '❌' : lenguajeGB.smsNoGg()}`,]
    
    let nombre = [ lenguajeGB.smsWel1(), lenguajeGB.smsDete1(), lenguajeGB.smsANivel1(), lenguajeGB.smsRestri1(), lenguajeGB.smsLlamar1(), lenguajeGB.smsAntiSp1(), lenguajeGB.smsModP1(), lenguajeGB.smsModAd1(), lenguajeGB.smsLect1(), lenguajeGB.smsTempo1(), lenguajeGB.smsStik1(), lenguajeGB.smsStickA1(), lenguajeGB.smsReacc1(), lenguajeGB.smsAudi1(), lenguajeGB.smsModHor1(), lenguajeGB.smsAntitoc1(), lenguajeGB.smsModOb1(), lenguajeGB.smsAntiEli1(), lenguajeGB.smsAntiInt1(), lenguajeGB.smsAntiE1(), lenguajeGB.smsAntiEE1(), lenguajeGB.smsAntiTT1(), lenguajeGB.smsAntiYT1(), lenguajeGB.smsAntiTEL1(), lenguajeGB.smsAntiFB1(),
    lenguajeGB.smsAntiIG1(), lenguajeGB.smsAntiTW1(), lenguajeGB.smsSOLOP1(), lenguajeGB.smsSOLOG1()]
    
    let descripción = [ lenguajeGB.smsWel2(), lenguajeGB.smsDete2(), lenguajeGB.smsANivel2(), lenguajeGB.smsRestri2(), lenguajeGB.smsLlamar2(), lenguajeGB.smsAntiSp2(), lenguajeGB.smsModP2(), lenguajeGB.smsModAd2(), lenguajeGB.smsLect2(), lenguajeGB.smsTempo2(), lenguajeGB.smsStik2(), lenguajeGB.smsStickA2(), lenguajeGB.smsReacc2(), lenguajeGB.smsAudi2(), lenguajeGB.smsModHor2(), lenguajeGB.smsAntitoc2(), lenguajeGB.smsModOb2(), lenguajeGB.smsAntiEli2(), lenguajeGB.smsAntiInt2(), lenguajeGB.smsAntiE2(), lenguajeGB.smsAntiEE2(), lenguajeGB.smsAntiTT2(), lenguajeGB.smsAntiYT2(), lenguajeGB.smsAntiTEL2(), lenguajeGB.smsAntiFB2(),
    lenguajeGB.smsAntiIG2(), lenguajeGB.smsAntiTW2(), lenguajeGB.smsSOLOP2(), lenguajeGB.smsSOLOG2()]
    
    let comando = [ "antitoxic"]
    
    let sections = Object.keys(titulo, nombre, descripción, comando).map((v, index) => ({ title: `${titulo[v]}`,
    rows: [{ title: `${nombre[v]} : ${command} ${comando[v]}`, description: `${1 + index}. ${descripción[v]}`, rowId: usedPrefix + command + ' ' + comando[v], }], }))
    
    let name = await conn.getName(m.sender)
    /*const listMessage = {
    text: `${lenguajeGB.smsConfi10()}`,
    footer: `╭━━━✦ *${lenguajeGB.smsConfi1()}* ✦━━━━⬣
    ┃
    ┃🌟 ${lenguajeGB.smsConfi2()} *${name}*
    ┃
    ${lenguajeGB.smsConfi3()}
    ${lenguajeGB.smsConfi4()}
    ┃
    ${lenguajeGB.smsConfi5()}
    ${lenguajeGB.smsConfi6()}
    ${lenguajeGB.smsConfi7()}
    ${lenguajeGB.smsConfi8()}
    ${m.isGroup ? `┃` : `┃\n${lenguajeGB.smsConfi9()}`}
    ╰━━━━━✦ *${vs}* ✦━━━━⬣
    ${wm}`,
    title: null,
    buttonText: `⚙️ ${lenguajeGB.smsConfi1()} ⚙️`,
    sections }*/
    
    let isEnable = /#activar/i.test(command)
    let type = (args[0] || '').toLowerCase()
    let isAll = false, isUser = false
    
    switch (type) {
    
            
   		
    case 'simi': case 'simi': case 'simi':
    if (m.isGroup) {
    if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn)
    throw false
    }}
    chat.simi = isEnable
    break
    
            

        
    default:
    if (!/[01]/.test(command)) return await conn.reply(m.chat, `${lenguajeGB.smsConfi10()}\n\n🌟 *Un gusto verte* *@${toUser}*
    
    ${lenguajeGB.smsConfi3()}
    ${lenguajeGB.smsConfi4()}
    
    ${lenguajeGB.smsConfi5()}
    ${lenguajeGB.smsConfi6()}
    ${lenguajeGB.smsConfi7()}
    ${lenguajeGB.smsConfi8()}
    ${m.isGroup ? `` : `${lenguajeGB.smsConfi9()}`}2f3f4f5f6f7f8f9f`, fkontak, { mentions: [aa,] })
    //conn.sendMessage(m.chat, { text: texto }, { quoted: fkontak })
    //conn.sendMessage(m.chat, texto, {quoted: fkontak})	
    throw false
    }
    await conn.reply(m.chat, `*MODO OWNER*
• *_${lenguajeGB['smsMens1']()}_* *=* ${type} 
• *_${lenguajeGB['smsMens2']()}_* *=* ${isEnable ? lenguajeGB.smsEncender() : lenguajeGB.smsApagar()}`, fkontak, m)}	
    /*await conn.sendButton(m.chat, `${lenguajeGB['smsAvisoRG']()}ღ *_${lenguajeGB['smsMens1']()}_* *|* ${type} 
    ღ *_${lenguajeGB['smsMens2']()}_* *|* ${isEnable ? lenguajeGB.smsEncender() : lenguajeGB.smsApagar()} 
    ღ *_${lenguajeGB['smsMens3']()}_* *|* ${isAll ? lenguajeGB.smsMens4() : isUser ? '' : lenguajeGB.smsMens5()}`, wm, null, [[`${isEnable ? lenguajeGB.smsApagar() : lenguajeGB.smsEncender()}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], [lenguajeGB.smsConMenu(), '.menu']], fkontak, m)}*/
    
    handler.help = ['#activar', '#desactivar'].map(v => v + 'able <option>')
    handler.tags = ['group', 'owner']
    handler.command = /#desactivar/i
    export default handler
    handler.register = true
    handler.rowner = true
    const more = String.fromCharCode(8206)
    const readMore = more.repeat(4001)