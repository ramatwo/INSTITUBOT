let handler = m => m
handler.before = async function (m) {
    let apuesta = 300000
    //let apuesta_bot = 300000
    let apuesta_lose = 300000
let pp = 'https://telegra.ph/file/c7924bf0e0d839290cc51.jpg'
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = '' 
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|Aceptar|acerta|aceptar|gas|aceptare?|nao|Rechazar|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `@${room.p2.split`@`[0]} rechazó el pvp, alto cagón`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play' 
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `*⚔️🎮 El PVP empezó ⚔️🎮*\n\nTienen tres opciones para elegir, piedra, papel o tijeras\n\n 👤 Jugador 1: @${room.p.split`@`[0]}\n 👤 Jugador 2: @${room.p2.split`@`[0]}\n\nHacenos saber tu elección enviandole un mensaje privado al bot con el elemento que elegiste\n\n*Elegir opción en wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let comienzop = `Hola! Seleccioná una de las tres opciones:\n\nღ Piedra\nდ Papel\nღ Tijera\n\n*Responda al mensaje con la opción*`
let comienzop2 = `Hola! Seleccioná una de las tres opciones:Hola! Seleccioná una de las tres opciones:\n\nღ Piedra\nღ Papel\nღ Tijera\n\n*Responda al mensaje con la opción*`
   
if (!room.pilih) this.sendMessage(room.p, { text: comienzop }, { quoted: fkontak })  
if (!room.pilih2) this.sendMessage(room.p2, { text: comienzop2 }, { quoted: fkontak })
room.waktu_milih = setTimeout(() => {
let iniciativa = `El pvp se canceló por inactividad`                              
if (!room.pilih && !room.pilih2) this.sendMessage(m.chat, { text: iniciativa }, { quoted: fkontak })
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `@${(room.pilih ? room.p2 : room.p).split`@`[0]} no eligió ninguna opción. pvp finalizado.`
this.sendMessage(m.chat, { text: textnull }, { quoted: fkontak }, { mentions: this.parseMention(textnull) })
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`⚔️ Elegiste ${m.text}. Fijate el grupo y  ${room.pilih2 ? `revisá los resultados` : 'esperá a que tu oponente elija para ver los resultados.'}`) 
if (!room.pilih2) this.reply(room.p2, `El oponente eligió. Es tu turno`, fkontak, 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`⚔️ Elegiste ${m.text}. Fijate el grupo y  ${room.pilih2 ? `revisá los resultados` : 'esperá a que tu oponente elija para ver los resultados.'}`)
if (!room.pilih) this.reply(room.p, `El oponente eligió. Es tu turno`, fkontak, 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 

this.reply(room.asal, `*⚔️🎮 RESULTADOS DEL PVP ⚔️🎮*\n\n${tie ? '🤝 EMPATE!' : ''} *@${room.p.split`@`[0]} (${room.text})* ${tie ? '' : room.p == win ? ` *GANASTE 🥳 ${apuesta} EXP*` : ` *PERDIÓ 🤡 ${apuesta_lose} EXP*`}
*@${room.p2.split`@`[0]} (${room.text2})* ${tie ? '' : room.p2 == win ? `*GANASTE 🥳 ${apuesta} EXP*` : ` *PERDIÓ 🤡 ${apuesta_lose} EXP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}