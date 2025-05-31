
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => { 
//try{
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
let chat = global.db.data.chats[m.chat]
let bot = global.db.data.settings[conn.user.jid] || {}
let toUser = `${m.sender.split("@")[0]}`
let aa = toUser + '@s.whatsapp.net'

let titulo = [ 
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.welcome ? '✅' : '❌' : " | ⚠️"}`, 
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.detect ? '✅' : '❌' : " | ⚠️"}`,  
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.autolevelup ? '✅' : '❌' : " | ⚠️"}`,   
"PARA CREADOR : CHATS" + ' ' + `${bot.restrict ? '✅' : '❌'}`,    
"PARA CREADOR : CHATS" + ' ' + `${bot.antiCall ? '✅' : '❌'}`,
"PARA CREADOR : CHATS" + ' ' + `${bot.antiSpam ? '✅' : '❌'}`,	
"PARA CREADOR : CHATS" + ' ' + `${global.opts['self'] ? '❌' : '✅'}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.modoadmin ? '✅' : '❌' : " | ⚠️"}`,  
"PARA CREADOR : CHATS" + ' ' + `${global.opts['autoread'] ? '✅' : '❌'}`, 
"PARA CREADOR : CHATS" + ' ' + `${bot.temporal ? '✅' : '❌'}`,      
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.stickers ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.autosticker ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.reaction ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.audios ? '✅' : '❌' : " | ⚠️"}`,  
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.modohorny ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antitoxic ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.antiver ? '✅' : '❌' : " | ⚠️"}`,  
"PARA ADMINS Y CREADOR : CHATS" + ' ' + `${m.isGroup ? chat.delete ? '✅' : '❌' : " | ⚠️"}`,  
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antifake ? '✅' : '❌' : " | ⚠️"}`,  
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiLink ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiLink2 ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : " | ⚠️"}`,   
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : " | ⚠️"}`,    
"PARA ADMINS Y CREADOR : GRUPOS" + ' ' + `${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : " | ⚠️"}`,    
"PARA CREADOR : CHATS" + ' ' + `${global.opts['pconly'] ? '✅' : '❌'}`,  
"PARA CREADOR : CHATS" + ' ' + `${global.opts['gconly'] ? '✅' : '❌'}`]

let nombre = [ lenguajeGB.smsWel1(), lenguajeGB.smsDete1(), lenguajeGB.smsANivel1(), lenguajeGB.smsRestri1(), lenguajeGB.smsLlamar1(), lenguajeGB.smsAntiSp1(), lenguajeGB.smsModP1(), lenguajeGB.smsModAd1(), lenguajeGB.smsLect1(), lenguajeGB.smsTempo1(), lenguajeGB.smsStik1(), lenguajeGB.smsStickA1(), lenguajeGB.smsReacc1(), lenguajeGB.smsAudi1(), lenguajeGB.smsModHor1(), lenguajeGB.smsAntitoc1(), lenguajeGB.smsModOb1(), lenguajeGB.smsAntiEli1(), lenguajeGB.smsAntiInt1(), lenguajeGB.smsAntiE1(), lenguajeGB.smsAntiEE1(), lenguajeGB.smsAntiTT1(), lenguajeGB.smsAntiYT1(), lenguajeGB.smsAntiTEL1(), lenguajeGB.smsAntiFB1(),
lenguajeGB.smsAntiIG1(), lenguajeGB.smsAntiTW1(), lenguajeGB.smsSOLOP1(), lenguajeGB.smsSOLOG1()]

let descripción = [ lenguajeGB.smsWel2(), lenguajeGB.smsDete2(), lenguajeGB.smsANivel2(), lenguajeGB.smsRestri2(), lenguajeGB.smsLlamar2(), lenguajeGB.smsAntiSp2(), lenguajeGB.smsModP2(), lenguajeGB.smsModAd2(), lenguajeGB.smsLect2(), lenguajeGB.smsTempo2(), lenguajeGB.smsStik2(), lenguajeGB.smsStickA2(), lenguajeGB.smsReacc2(), lenguajeGB.smsAudi2(), lenguajeGB.smsModHor2(), lenguajeGB.smsAntitoc2(), lenguajeGB.smsModOb2(), lenguajeGB.smsAntiEli2(), lenguajeGB.smsAntiInt2(), lenguajeGB.smsAntiE2(), lenguajeGB.smsAntiEE2(), lenguajeGB.smsAntiTT2(), lenguajeGB.smsAntiYT2(), lenguajeGB.smsAntiTEL2(), lenguajeGB.smsAntiFB2(),
lenguajeGB.smsAntiIG2(), lenguajeGB.smsAntiTW2(), lenguajeGB.smsSOLOP2(), lenguajeGB.smsSOLOG2()]

let comando = [ "welcome", "detect", "autolevelup", "restrict", "anticall", "antispam", "public", "modoadmin", "autoread", "temporal", "stickers", "autosticker", "reaction", "audios", "modohorny", "antitoxic", "antiviewonce", "antidelete", "antifake", "antilink", "antilink2", "antitiktok", "antiyoutube", "antitelegram", "antifacebook",
"antinstagram", "antitwitter", "pconly", "gconly"]

let sections = Object.keys(titulo, nombre, descripción, comando).map((v, index) => ({ title: `${titulo[v]}`,
rows: [{ title: `${nombre[v]} : ${command} ${comando[v]}`, description: `${1 + index}. ${descripción[v]}`, rowId: usedPrefix + command + ' ' + comando[v], }], }))

let name = await conn.getName(m.sender)


let isEnable = /true|activar|enable|(turn)?on|1/i.test(command)
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false

switch (type) {

/*
case 'welcome': case 'bienvenida':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
    */
case 'detect': case 'avisos':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
		
case 'antidelete': case 'antieliminar': case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
    
case 'public': case 'publico':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
    
case 'antilink': case 'antienlace':
if (m.isGroup) {
if (!(isAdmin)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
    
case 'antilink2': case 'antienlace2':
if (m.isGroup) {
if (!(isAdmin)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
		
case 'antitiktok': case 'antitk': case 'antitik':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTiktok = isEnable 
break
		
case 'antiyoutube': case 'antiyt':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiYoutube = isEnable 
break
		
case 'antitelegram': case 'antitl': case 'antitele': case 'antitg': case 'antitel':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTelegram = isEnable 
break
		
case 'antifacebook': case 'antifb': case 'antifbook':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiFacebook = isEnable 
break
		
case 'antiinstagram': case 'antinstagram': case 'antiig': case 'antig': case 'antiinsta': case 'antinsta':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiInstagram = isEnable 
break
		
case 'antitwitter': case 'antitw': case 'antitwit': case 'antitwter': case 'antitwiter': case 'antiTwr':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTwitter = isEnable 
break
    
case 'modohorny': case 'modocaliente':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modohorny = isEnable          
break
    
case 'stickers':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.stickers = isEnable          
break
    
case 'temporal':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.temporal = isEnable
break
		
case 'autolevelup': case 'autonivel': case 'nivelautomatico':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autolevelup = isEnable          
break
    
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autosticker = isEnable          
break
    
case 'reaction': case 'reaccion': case 'emojis': case 'antiemojis': case 'reacciones': case 'reaciones':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.reaction = isEnable          
break

    
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.audios = isEnable          
break
    
case 'antiver': case 'modover': case 'modoobservar': case 'modobservar': case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiver = isEnable 
break
		
case 'antiinternacional': case 'antinternacional': case 'antinternational': case 'antifake': case 'antifalsos': case 'antivirtuales': case 'antiextranjeros':		
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antifake = isEnable          
break
		
case 'jadibotmd': case 'modojadibot': case 'serbotmd': case 'modoserbot': 
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.jadibotmd = isEnable
break 
    
case 'restrict': case 'restringir':
isAll = true
if (!isROwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break
    
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
    
case 'autoread': case 'autovisto':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.autoread2 = isEnable    
global.opts['autoread'] = isEnable  
break
    
case 'anticall': case 'antillamar':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiCall = isEnable
break
		
case 'antispam':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.antiSpam = isEnable
break
 
case 'modoadmin': case 'soloadmin':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.modoadmin = isEnable          
break    
   
case 'pconly': case 'privateonly': case 'soloprivados':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
    
case 'gconly': case 'grouponly': case 'sologrupos':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break

case 'antiprivado':
case 'privado':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiPrivate = isEnable
break

case 'antitrabas':
case 'antitraba':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiTraba = isEnable
break

case 'simi':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.simi = isEnable
break

case 'swonly': case 'statusonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
default:
if (!/[01]/.test(command)) return await conn.reply(m.chat, `*~ CENTRO DE CONFIGURACIÓN*\n\n😝 *Un gusto verte* *@${toUser}*

*Seleccioná una opción de la lista*
*Para empezar a Configurar*

*Recordá:*
✅ ⇢ *Función Activada*
❌ ⇢ *Función Desactivada*
⚠️ ⇢ *Este chat no es un Grupo*

${m.isGroup ? `` : `${lenguajeGB.smsConfi9()}`}

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.welcome ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} welcome
✦ Mensaje de Bienvenida para nuevos miembros en los grupos
*❌❌❌ COMANDO DESHABILITADO ❌❌❌*
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.detect ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} detec
✦ Avisos de acciones dentro del grupo

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : CHATS"} ${m.isGroup ? chat.autolevelup ? '✅' : '❌' : " | ⚠️"} 
✦ ${usedPrefix + command} autolevelup
✦ Recibir experiencia en el RPG con solo enviar mensajes

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${bot.restrict ? '✅' : '❌'}
✦ ${usedPrefix + command} restrict
✦ Habilita a SodicaBot a eliminar o añadir personas de grupos

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${bot.antiCall ? '✅' : '❌'}
✦ ${usedPrefix + command} antiCall
✦ Bloquea a Personas que hagan llamadas al bot

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${bot.antiSpam ? '✅' : '❌'}
✦ ${usedPrefix + command} antiSpam
✦ Banear el uso de Comados cuando alguien realice algún tipo de Spam

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${global.opts['self'] ? '❌' : '✅'}
✦ ${usedPrefix + command} self
✦ Función para que todos puedan usar a SodicaBot

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.modoadmin ? '✅' : '❌' : " | ⚠️"} 
✦ ${usedPrefix + command} modoadmin
✦ Solo administradores pueden usar a SodicaBot en los grupos

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${global.opts['autoread'] ? '✅' : '❌'}
✦ ${usedPrefix + command} autoread
✦ Marcar como visto todos los mensajes que recibe SodicaBot

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.stickers ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} stickers
✦ Función para que SodicaBot cree stickers

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.autosticker ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} autosticker
✦ SodicaBot va a crear un sticker automticamente de las fotos que se envien al chat

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : CHATS"} ${m.isGroup ? chat.reaction ? '✅' : '❌' : " | ⚠️"}    
✦ ${usedPrefix + command} reaction
✦ SodicaBot va a reaccionar con emojis randoms a mensajes randoms

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : CHATS"} ${m.isGroup ? chat.audios ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} audios
✦ SodicaBot puede enviar audios como respuesta

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : CHATS"} ${m.isGroup ? chat.antiver ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiver
✦ Permitir ver multimedia enviada para ver una vez

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : CHATS"} ${m.isGroup ? chat.delete ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} delete
✦ Los mensajes eliminados serán reenviados al grupo

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antifake ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antifake
✦ Elimina numeros internacionales raros (como +991) que pueden ser peligrosos

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiLink ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiLink
✦ Elimina usuarios que envien links unicamente de whatsapp

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiLink2 ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiLink2
✦ Elimina usuarios que envien cualquier tipo de link

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiTiktok ? '✅' : '❌' : " | ⚠️"} 
✦ ${usedPrefix + command} antiTiktok
✦ Elimina usuarios que envien links de tiktok

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiYoutube ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiYoutube
✦ Elimina usuarios que envien links de YouTube

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiTelegram ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiTelegram
✦ Elimina usuarios que envien links de telegram

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiFacebook ? '✅' : '❌' : " | ⚠️"} 
✦ ${usedPrefix + command} antiFacebook
✦ Elimina usuarios que envien links de FaceBook

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiInstagram ? '✅' : '❌' : " | ⚠️"}
✦ ${usedPrefix + command} antiInstagram
✦ Elimina usuarios que envien links de instagram

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA ADMINS Y CREADOR : GRUPOS"} ${m.isGroup ? chat.antiTwitter ? '✅' : '❌' : " | ⚠️"}   
✦ ${usedPrefix + command} antiTwitter
✦ Elimina usuarios que envien links de Twitter (o X)

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${global.opts['pconly'] ? '✅' : '❌'}
✦ ${usedPrefix + command} pconly
✦ SodicaBot solo va a responder chats privados, ignorando grupos

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈

✦ ${"PARA CREADOR : CHATS"} ${global.opts['gconly'] ? '✅' : '❌'}
✦ ${usedPrefix + command} gconly
✦ SodicaBot solo va a responder grupos, ignorando chats privados`, fkontak, { mentions: [aa,] })
throw false
}
await conn.reply(m.chat, `• *_FUNCIÓN_* *=* ${type}
• *_ESTADO_* *=* ${isEnable ? "✅ ∫ ACTIVADO" : "❌ ∫ DESACTIVADO"}`, fkontak, m)
/*await conn.sendButton(m.chat, `• *_FUNCIÓN_* *|* ${type} 
• *_ESTADO_* *|* ${isEnable ?"✅ ∫ ACTIVADO" : "❌ ∫ DESACTIVADO"}`, wm, null, [[`${isEnable ? "❌ ∫ DESACTIVAR" : "✅ ∫ ACTIVAR"}`, `${isEnable ? `.off ${type}` : `.on ${type}`}`], [lenguajeGB.smsConMenu(), '.menu']], fkontak, m)*/
}	


handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i
export default handler
handler.register = true

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)