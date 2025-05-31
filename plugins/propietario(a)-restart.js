import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text,command }) => {

    if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (conn.user.jid == conn.user.jid) {
        let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
        conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
       // await m.reply('Enviando solicitud de apagado al servidor...')
       // await m.reply('Solicitud recibida y ejecutada correctamente.')
        await m.reply('reiniciando...')
        process.exit(0)
    } else throw 'eh'
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'apagar', 'stop']

handler.rowner = true

export default handler