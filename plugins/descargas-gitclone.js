import fetch from 'node-fetch'
const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙂𝙄𝙏𝙃𝙐𝘽\n𝙀𝙅𝙀𝙈𝙋𝙇𝙊\n*${usedPrefix + command} https://github.com/ramardo/SodicaBot-M*\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙂𝙄𝙏𝙃𝙐𝘽 𝙇𝙄𝙉𝙆\n𝙀𝙓𝘼𝙈𝙋𝙇𝙀\n*${usedPrefix + command} https://github.com/ramardo/SodicaBotV2*`
if (!regex.test(args[0])) throw `${lenguajeGB['smsAvisoFG']()}𝙀𝙉𝙇𝘼𝘾𝙀 𝙉𝙊 𝙑𝘼𝙇𝙄𝘿𝙊. 𝘿𝙀𝘽𝙀 𝘿𝙀 𝙎𝙀𝙍 𝙐𝙉 𝙀𝙉𝙇𝘼𝘾𝙀 𝘿𝙀 𝙂𝙄𝙏𝙃𝙐𝘽\n\n𝙄𝙉𝙑𝘼𝙇𝙄𝘿 𝙇𝙄𝙉𝙆. 𝙈𝙐𝙎𝙏 𝘽𝙀 𝘼 𝙂𝙄𝙏𝙃𝙐𝘽 𝙇𝙄𝙉𝙆`
let [_, user, repo] = args[0].match(regex) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
m.reply(`${lenguajeGB['smsAvisoEG']()}𝙀𝙉𝙑𝙄𝘼𝙉𝘿𝙊 𝘼𝙍𝘾𝙃𝙄𝙑𝙊, 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 🚀\n𝙎𝙄 𝙉𝙊 𝙇𝙀 𝙇𝙇𝙀𝙂𝘼 𝙀𝙇 𝘼𝙍𝘾𝙃𝙄𝙑𝙊 𝙀𝙎 𝘿𝙀𝘽𝙄𝘿𝙊 𝘼 𝙌𝙐𝙀 𝙀𝙇 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙄𝙊 𝙀𝙎 𝙋𝙀𝙎𝘼𝘿𝙊.\n\n𝙎𝙀𝙉𝘿𝙄𝙉𝙂 𝙁𝙄𝙇𝙀, 𝙅𝙐𝙎𝙏 𝘼 𝙈𝙊𝙈𝙀𝙉𝙏 🚀\n𝙄𝙁 𝙏𝙃𝙀 𝙁𝙄𝙇𝙀 𝘿𝙊𝙀𝙎 𝙉𝙊𝙏 𝘼𝙍𝙍𝙄𝙑𝙀, 𝙄𝙏 𝙄𝙎 𝘽𝙀𝘾𝘼𝙐𝙎𝙀 𝙏𝙃𝙀 𝙍𝙀𝙋𝙊𝙎𝙄𝙏𝙊𝙍𝙔 𝙄𝙎 𝙃𝙀𝘼𝙑𝙔.`)
conn.sendFile(m.chat, url, filename, null, m)
/*let info = `💖 *Infórmate sobre las Novedades y recuerda tener la última versión.*\n\n💝 *Find out about what's new and remember to have the latest version.*
  `.trim()
  
await conn.sendHydrated(m.chat, info, wm, null, ig, '𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢', null, null, [
['𝙈𝙚𝙣𝙪 𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨 🌀', '#descargasmenu'],
['𝙈𝙚𝙣𝙪 𝘾𝙤𝙢𝙥𝙡𝙚𝙩𝙤 | 𝙁𝙪𝙡𝙡 𝙈𝙚𝙣𝙪 ✨', '.allmenu'],
['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', '/menu']
], m,) */
}
handler.help = ['gitclone <url>']
handler.tags = ['downloader']
handler.command = /gitclone|clonarepo|clonarrepo|repoclonar/i
handler.diamante = 2
handler.level = 2
export default handler
