import TicTacToe from '../lib/tictactoe.js' 
	conn.game = conn.game ? conn.game : {}
let handler = async (m, { conn, usedPrefix, command, text }) => {
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
if (command == 'tictactoe' || command == 'ttc' || command == 'ttt' || command == 'xo') {
	try {

	if (Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) throw `${lenguajeGB['smsAvisoAG']()}𝙏𝙊𝘿𝘼𝙑𝙄𝘼 𝘼𝙇𝙂𝙐𝙄𝙀𝙉 𝙀𝙎𝙏𝘼 𝙅𝙐𝙂𝘼𝙈𝘿𝙊 𝙀𝙉 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙎𝙄 𝙌𝙐𝙄𝙀𝙍𝙀𝙎 𝘼𝘽𝘼𝙉𝘿𝙊𝙉𝘼𝙍 𝙀𝙎𝘾𝙍𝙄𝘽𝘼 *salir*\n𝙏𝘼𝙈𝘽𝙄𝙀𝙉 𝙋𝙐𝙀𝘿𝙀𝙎 𝙀𝙇𝙄𝙈𝙄𝙉𝘼𝙍 𝙇𝘼 𝙎𝘼𝙇𝘼 𝙐𝙎𝘼𝙉𝘿𝙊 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 *${usedPrefix}delttt*\n\n𝙎𝙊𝙈𝙀𝙊𝙉𝙀 𝙄𝙎 𝙎𝙏𝙄𝙇𝙇 𝙋𝙇𝘼𝙔𝙄𝙉𝙂 𝙄𝙉 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈\n𝙄𝙁 𝙔𝙊𝙐 𝙒𝘼𝙉𝙏 𝙏𝙊 𝙇𝙀𝘼𝙑𝙀, 𝙒𝙍𝙄𝙏𝙀 *out*\n𝙔𝙊𝙐 𝘾𝘼𝙉 𝘼𝙇𝙎𝙊 𝘿𝙀𝙇𝙀𝙏𝙀 𝙏𝙃𝙀 𝙍𝙊𝙊𝙈 𝙐𝙎𝙄𝙉𝙂 𝙏𝙃𝙀 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 *${usedPrefix}delttt*`
	if (!text) return m.reply(`❌ Tenes que ponerle nombre a la sala.\n*${usedPrefix + command} salita*`) 
	let room = Object.values(conn.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true)) 
	if (room) {
	//await conn.reply(m.chat, `Un usuario se metió en la sala *${text}*.\nComienza el juego!! 😼`, fkontak, m)
	
	let key = await conn.reply(m.chat, `⭕️ *TA-TE-TI* ❌\n\n*¿Cómo jugar?*\n_Respondé al mensaje con un número. El número tiene que contener la posiscion en la que quieras estar (1,2,3,4,5,6,7,8,9)_\n\n*⏳ LA PARTIDA INICIA EN 5 SEGUNDOS*`, fkontak, m)
	
	room.o = m.chat
	room.game.playerO = m.sender
	room.state = 'PLAYING'
	let arr = room.game.render().map(v => {
	return {
	X: '❎',
	O: '⭕',
	1: '1️⃣',
	2: '2️⃣',
	3: '3️⃣',
	4: '4️⃣',
	5: '5️⃣',
	6: '6️⃣',
	7: '7️⃣',
	8: '8️⃣',
	9: '9️⃣',
	10: '🔟',
	11: '11️⃣',
	12: '12️⃣',
	13: '13️⃣',
	14: '14️⃣',
	15: '15️⃣',
	16: '16️⃣',
	}[v]})
	let str = `    ⭕️ TA-TE-TI ❌
👤 JUGADORES 
*┈┈┈┈┈┈┈┈┈*
❎ = @${room.game.playerX.split('@')[0]}
⭕ = @${room.game.playerO.split('@')[0]}
*┈┈┈┈┈┈┈┈┈*
${arr.slice(0, 4).join('')}
${arr.slice(4, 8).join('')}
${arr.slice(8, 12).join('')}
${arr.slice(12).join('')}
*┈┈┈┈┈┈┈┈┈*
*🪄 TURNO DE:* 
*@${room.game.currentTurn.split('@')[0]}*
	`.trim()
	
	if (room.x !== room.o) await conn.sendMessage(room.x, { text: str, mentions: this.parseMention(str)}, { quoted: fkontak, m })
		await new Promise(resolve => setTimeout(resolve, 5000));
	await conn.sendMessage(room.o, { text: str, mentions: conn.parseMention(str), edit: key}, { quoted: fkontak, m },)
			
	} else {
	room = {
	id: 'tictactoe-' + (+new Date),
	x: m.chat,
	o: '',
	game: new TicTacToe(m.sender, 'o', 4), // Cambiar el tamaño del tablero a 4x4
	state: 'WAITING' }
			
	if (text) room.name = text     

	let imgplay = `https://www.redpiso.es/news/wp-content/uploads/2023/08/3raya.png`
	conn.sendMessage(m.chat, { image: { url: imgplay }, caption: `*⭕️ TA-TE-TI ❌*\n\n👤 *JUGADORES*\n*┈┈┈┈┈┈┈┈┈*\n❎ = *Vos*\n*┈┈┈┈┈┈┈┈┈*\n*🕒 Esperando a un jugador...*\n\n
	
❓ El usuario con el que quieras jugar tiene que poner:
	*${usedPrefix + command} ${text}*
	
> 🏃‍♂️ Si querés irte de la sala, usá *${usedPrefix}delttt*` }, { mentions: conn.parseMention(text), quoted: fkontak })
	conn.game[room.id] = room
	}
} catch (e) { 
	
	m.reply(`❌ Ocurrió un error. Probá usando otro nombre para tu sala o enviá .delttt y probá de nuevo.`) }
	

}
	if (command == 'delttt') {
		let room = Object.values(conn.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))
		if (room == undefined) return await conn.reply(m.chat, `No estás en ninguna sala.\n\nIniciá una sala usando ${usedPrefix}ttt sala)`, fkontak, m)
		delete conn.game[room.id]
		
		await conn.reply(m.chat, `> *🗑️ Se eliminó la sala*`, fkontak, m)
		}
	}
handler.command = /^(tateti|ttt|delttt)$/i
handler.register = true
handler.owner = false
export default handler
