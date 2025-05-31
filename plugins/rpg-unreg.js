
/*import { createHash } from 'crypto'
let handler = async function (m, { args }) {
if (!args[0]) throw `Ingresá tu numero de serie con: *#myserial*\n\n Recordá que al eliminar tu usuario, tu numero va a quedar baneado permanentemente del bot.`
let user = global.db.data.users[m.sender]
let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 6)	
if (args[0] !== sn) throw `Ese no es tu numero serial. Tratar de hacerlo con el numero serial de otro usuario es motivo de ban permanente.`


delete global.db.data.users[m.sender]
m.reply(`Todos tus datos fueron eliminados y tu numero fue baneado.`)
}
handler.help = ['', 'ister'].map(v => 'unreg' + v + ' <numero de serie>')
handler.tags = ['xp']
handler.command = /^unreg(ister)?$/i
handler.register = true
export default handler*/
