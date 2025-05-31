let handler = async (m, { conn }) => {

await conn.reply(m.chat, "si querés activar el antilink, usá #on antilink para solo enlaces de whatsapp\npara cualquier tipo de link, usá #on antilink2\n*recomendamos activar uno solo para evitar errores*")
}
handler.help = ['linkgroup']
handler.tags = ['group']
handler.command = /^enlace|link(gro?up)?$/i
handler.group = true
handler.botAdmin = true
export default handler