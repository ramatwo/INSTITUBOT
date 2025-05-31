import { xpRange } from '../lib/levelling.js'

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


let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let menu = `*REGLAMENTO 👇👇*
${readMore}

*╭━[ TÉRMINOS DE SERVICIO  ]━⬣*
┃ 1.	No se permite enviar exp entre dos o más usuarios a uno en concreto con la intención de modificar la tabla de clasificación (top usuarios con más nivel/exp) 

2.	No se permite el spam de comandos ni la explotación del plugin del chatbot.
ej.: enviar varias veces “que” para que el bot responda “so” varias veces.

3.	No se permite el abuso de bugs. Si un usuario descubre un bug debe notificarlo con #reportar >motivo< y dependiendo de la gravedad del bug, será recompensado.

4.	No enviar más de una solicitud por día con el #addbot del mismo grupo.

5.	No debe enviar reportes o sugerencias basura.

6.	El uso de una cuenta secundaria para generar más EXP está permitido, con algunas condiciones:
6.1.	El usuario debe ser propietario de ese número.
6.2.	El usuario debe avisar a la administración sobre su número secundario.
6.3.	Otros usuarios NO deben hacerle transferencias a ese número, deben hacerlo al principal.
6.4.	No se puede jugar con el numero secundario a juegos que den exp. Debe ser todo desde el número principal.
7.	No se permite más de un número secundario. Esto aplica también a tener amigos que usen los comandos RPG y después te transfieran el exp generado.
8. Incumplir las normas de la comunidad puede llevarte a un ban en el bot tambien.
> Cada regla tiene un castigo dependiendo de su gravedad. Puede ir desde un simple aviso hasta un ban permanente. 
*╰━━━━━━━━━━━━⬣*

`.trim()
await conn.sendFile(m.chat, img, 'R E G L A M E N T O', menu, fkontak)
	
} catch (e) {
await m.reply(lenguajeGB['smsMalError3']() + '\n*' + lenguajeGB.smsMensError1() + '*\n*' + usedPrefix + `${lenguajeGB.lenguaje() == 'es' ? 'reporte' : 'report'}` + '* ' + `${lenguajeGB.smsMensError2()} ` + usedPrefix + command)
console.log(`⛔ Ocurrió un error al ejecutar este comando. Reportelo con  .reportar El siguiente comando no funciona:  ${usedPrefix + command} ❗❗`)
console.log(e)}}

handler.command =/^(reglas|TOS|terminosdeuso)$/i
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}  