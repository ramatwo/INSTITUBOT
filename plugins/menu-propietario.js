import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
const { levelling } = '../lib/levelling.js'
import PhoneNumber from 'awesome-phonenumber'
import { promises } from 'fs'
import { join } from 'path' 

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
try {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let { exp, diamante, level, role } = global.db.data.users[m.sender]
let { min, xp, max } = xpRange(level, global.multiplier)
let name = await conn.getName(m.sender)
let d = new Date(new Date + 3600000)
let locale = 'es'
let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
let date = d.toLocaleDateString(locale, {
day: 'numeric',
month: 'long',
year: 'numeric'
})
let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
day: 'numeric',
month: 'long',
year: 'numeric'
}).format(d)
let time = d.toLocaleTimeString(locale, {
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
let _uptime = process.uptime() * 1000
let _muptime
if (process.send) {
process.send('uptime')
_muptime = await new Promise(resolve => {
process.once('message', resolve)
setTimeout(resolve, 1000)
}) * 1000
}
let { money, token } = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let muptime = clockString(_muptime)
let uptime = clockString(_uptime)
let totalreg = Object.keys(global.db.data.users).length
let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
let replace = {
'%': '%',
p: _p, uptime, muptime,
me: conn.getName(conn.user.jid),
npmname: _package.name,
npmdesc: _package.description,
version: _package.version,
exp: exp - min,
maxexp: xp,
totalexp: exp,
xp4levelup: max - exp,
github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
level, diamante, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
readmore: readMore
}
text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let mentionedJid = [who]
let username = conn.getName(who)
let pp = gataVidMenu.getRandom()
let pareja = global.db.data.users[m.sender].pasangan 
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
//let fsizedoc = '1'.repeat(10)
//let adReply = { fileLength: fsizedoc, seconds: fsizedoc, contextInfo: { forwardingScore: fsizedoc, externalAdReply: { showAdAttribution: true, title: wm, body: '👋 ' + username, mediaUrl: ig, description: 'Hola', previewType: 'PHOTO', thumbnail: await(await fetch(gataMenu.getRandom())).buffer(), sourceUrl: redesMenu.getRandom() }}}
const numberToEmoji = { "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣", "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣", "8": "8️⃣", "9": "9️⃣", }
let lvl = level
let emoji = Array.from(lvl.toString()).map((digit) => numberToEmoji[digit] || "❓").join("")

let menu = `
*╭━[ MENU PARA PROPIETARIO ]━⬣*
┃ *Comandos solo para Propietario/a *
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃💎 _${usedPrefix}join *enlace*_
┃💎 _${usedPrefix}unete *enlace*_
┃💎➺ _${usedPrefix}dardiamantes *cantidad*_
┃💎➺ _${usedPrefix}darxp *cantidad*_
┃💎➺ _${usedPrefix}darCoins *cantidad*_
┃💎➺ _${usedPrefix}addprem1 2 3 4 *@tag* *cantidad*_
┃💎➺ _${usedPrefix}delprem *@tag*_
┃💎➺ _${usedPrefix}idioma | language_
┃💎➺ _${usedPrefix}listabloqueados_
┃💎➺ _${usedPrefix}comunicar | bc *texto*_
┃💎➺ _${usedPrefix}comunicarpv *texto*_
┃💎➺ _${usedPrefix}broadcastgc *texto*_
┃💎➺ _${usedPrefix}cleartmp_
┃💎➺ _${usedPrefix}delexp *@tag*_
┃💎➺ _${usedPrefix}delMoneditas *@tag*_
┃💎➺ _${usedPrefix}deldiamantes *@tag*_
┃💎➺ _${usedPrefix}reiniciar | restart_
┃💎➺ _${usedPrefix}listapremium | listprem_
┃💎➺ _${usedPrefix}añadirdiamantes *@tag cantidad*_
┃💎➺ _${usedPrefix}añadirxp *@tag cantidad*_
┃💎➺ _${usedPrefix}añadircoins *@tag cantidad*_
┃💎➺ _${usedPrefix}chatsbaneados_
┃💎➺ _${usedPrefix}listabaneados_
┃💎➺ _${usedPrefix}infinito_
┃💎➺ _${usedPrefix}kickall_
┃💎➺ _${usedPrefix}listaadv_
┃💎➺ _${usedPrefix}banlist_
┃💎➺ _${usedPrefix}gencode *dias*_
┃💎➺ _${usedPrefix}gencoderec *recurso cantidad*_
┃💎➺ _${usedPrefix}silentcick_
┃💎➺ _${usedPrefix}sixtag_
*╰━━━━━━━━━━━━⬣*`.trim()
await conn.sendFile(m.chat, gataVidMenu.getRandom(), 'gata.mp4', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command = /ramamenu/i
handler.register = true //necesita etar registrado
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}  