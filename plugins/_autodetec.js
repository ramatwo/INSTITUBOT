import chalk from 'chalk'
let WAMessageStubType = (await import("@whiskeysockets/baileys")).default
import { promises as fs } from 'fs'
import path from 'path';
import './_content.js'

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata, isBotAdmin, isROwner }) {

if (!m.messageStubType || !m.isGroup) return
let usuario = `@${m.sender.split`@`[0]}`
let chat = global.db.data.chats[m.chat]
//let users = participants.map(u => conn.decodeJid(u.id))
const groupAdmins = participants.filter(p => p.admin)
//const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
if (m.messageStubType == 172 && isROwner) {

	const rawUser = m.messageStubParameters[0];
	await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
	
/*{
	messageStubType: 172,
	messageStubParameters: [ '5491151244787@s.whatsapp.net', 'created', 'invite_link' ],
	type: undefined
  }*/
}

if (m.messageStubType == 20){
	
	await this.sendMessage(m.chat, { text: "¡Hola Administradores! 👋 Soy *SodicaBot*.\nUn bot hecho en 🇦🇷 para proteger este grupo con un potente sistema de seguridad 🔒 y también ofrecer comandos de entretenimiento 🎮 para hacerlo más divertido.\n\n> Me uní a este grupo porque aceptaron la solicitud de ingreso. ✅\n\nPodés empezar a configurarme fácilmente:\nUsá:\n*.on* _o tambien_ *.off* → Activá o desactivá los módulos de seguridad y otras opciones.\n\nEstoy listo para ayudar y proteger este grupo 🚀\n> RECORDAR DARME ADMINISTRADOR PARA FUNCIONAR CORRECTAMENTE\n> Si no confia en el bot porque no lo conoce, está invitado a unirse a nuestra comunidad enviando .comunidad\n\n> Este mensaje únicamente menciona a los administradores.", mentions: [m.sender], mentions: [...groupAdmins.map(v => v.id)] }, { quoted: fkontak })   

}
if (chat.detect && m.messageStubType == 2) {
const uniqid = (m.isGroup ? m.chat : m.sender).split('@')[0]
const sessionPath = './sesion/'
for (const file of await fs.readdir(sessionPath)) {
if (file.includes(uniqid)) {
await fs.unlink(path.join(sessionPath, file))
console.log(`${chalk.yellow.bold('[ ⚠️ Archivo Eliminado ]')} ${chalk.greenBright(`'${file}'`)}\n` +
`${chalk.blue('(Session PreKey)')} ${chalk.redBright('que provoca el "undefined" en el chat')}`
)
}}}

if (chat.detect && m.messageStubType == 21) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoAG']() + mid.smsAutodetec1(usuario, m), mentions: [m.sender], /*mentions: [...groupAdmins.map(v => v.id)]*/ }, { quoted: fkontak })   
} else if (chat.detect && m.messageStubType == 22) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec2(usuario, groupMetadata), mentions: [m.sender] }, { quoted: fkontak })  
} else if (chat.detect && m.messageStubType == 23) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec5(groupMetadata, usuario), mentions: [m.sender] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 24) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec3(usuario, m), mentions: [m.sender] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 25) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec4(usuario, m, groupMetadata), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 26) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec6(m), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType == 29) {
await this.sendMessage(m.chat, { text: `*@${m.messageStubParameters[0].split`@`[0]} Ahora es admin.*\n*🫵 Realizado por ${usuario}*`, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 30) {
await this.sendMessage(m.chat, { text:  `*@${m.messageStubParameters[0].split`@`[0]} Ya no es admin.*\n*🫵 Hecho por ${usuario}*`, mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)] }, { quoted: fkontak }) 
} else if (chat.detect && m.messageStubType == 72) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec9(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
} else if (chat.detect && m.messageStubType === 172 && m.messageStubParameters.length > 0) {
const rawUser = m.messageStubParameters[0];
const users = rawUser.split('@')[0]; 
const prefijosProhibidos = [
	'2', '7', '20', '21', '27', '30', '31', '32', '33', '40', '41', '43', '44', 
	'45', '46', '47', '48', '49', '63', '65', '66', '81', '82', '84', '86', 
	'91', '92', '93', '94', '95', '96', '211', '213', '220', '221', '222', 
	'223', '224', '225', '226', '227', '228', '229', '230', '231', '232', 
	'234', '237', '239', '240', '241', '243', '246', '247', '249', '251', 
	'255', '257', '260', '262', '263', '265', '266', '267', '298', '299', 
	'350', '351', '357', '358', '359', '372', '375', '377', '378', '380', 
	'381', '386', '387', '389', '420', '421', '677', '678', '679', '680', 
	'681', '682', '683', '684', '686', '687', '688', '689', '690', '691', 
	'692', '850', '852', '853', '855', '856', '886', '960', '961', '962', 
	'963', '964', '965', '966', '967', '968', '971', '972', '976', '977'
  ];
const usersConPrefijo = users.startsWith('+') ? users : `+${users}`;

if (chat.antifake && isBotAdmin) {
if (prefijosProhibidos.some(prefijo => usersConPrefijo.startsWith(prefijo))) {
try {
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'reject');
console.log(`Solicitud de ingreso de ${usersConPrefijo} rechazada automáticamente por seguridad.`);
} catch (error) {
console.error(`Error al rechazar la solicitud de ${usersConPrefijo}:`, error);
}} else {
try {
	/*
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ingreso de ${usersConPrefijo} aprobada automáticamente.`);
*/
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}} /*else {
try {
	
await conn.groupRequestParticipantsUpdate(m.chat, [rawUser], 'approve');
console.log(`Solicitud de ingreso de ${usersConPrefijo} aprobada automáticamente ya que #antifake está desactivado.`);
} catch (error) {
console.error(`Error al aprobar la solicitud de ${usersConPrefijo}:`, error);
}}*/
return;
} if (chat.detect && m.messageStubType == 123) {
await this.sendMessage(m.chat, { text: lenguajeGB['smsAvisoIIG']() + mid.smsAutodetec10(usuario, m), mentions: [m.sender] }, { quoted: fkontak })
} else {
if (m.messageStubType == 2) return
console.log({messageStubType: m.messageStubType,
messageStubParameters: m.messageStubParameters,
type: WAMessageStubType[m.messageStubType], 
})
}}
export default handler