import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'

let regionNames = new Intl.DisplayNames(['es'], { type: 'region' })

let handler = async (m, { conn, text, usedPrefix, command: cmd }) => {
	let num = m.quoted?.sender || m.mentionedJid?.[0] || text
	if (!num) throw `Ejemplo: ${usedPrefix + cmd} @tag / 628xxx`
	num = num.replace(/\D/g, '') + '@s.whatsapp.net'
	if (!(await conn.onWhatsApp(num))[0]?.exists) throw 'El usuario no existe'
	let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png')
	let bio = await conn.fetchStatus(num).catch(_ => { })
	let name = await conn.getName(num)
	let business = await conn.getBusinessProfile(num)
	let format = PhoneNum(`+${num.split('@')[0]}`)
	let country = regionNames.of(format.getRegionCode('international'))
	let wea = `\t\t\t\t*▾ WHATSAPP ▾*\n\n*° País :* ${country.toUpperCase()}\n*° Nombre :* ${name ? name : '-'}\n*° Formato de Número :* ${format.getNumber('international')}\n*° URL Api :* wa.me/${num.split('@')[0]}\n*° Menciones :* @${num.split('@')[0]}\n*° Estado :* ${bio?.status || '-'}\n*° Fecha de Estado :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale('es').format('LL') : '-'}\n\n${business ? `\t\t\t\t*▾ INFO NEGOCIO ▾*\n\n*° BusinessId :* ${business.wid}\n*° Sitio Web :* ${business.website ? business.website : '-'}\n*° Email :* ${business.email ? business.email : '-'}\n*° Categoría :* ${business.category}\n*° Dirección :* ${business.address ? business.address : '-'}\n*° Horario :* ${business.business_hours.timezone ? business.business_hours.timezone : '-'}\n*° Descripción* : ${business.description ? business.description : '-'}` : '*Cuenta estándar de WhatsApp*'}`
	img ? await conn.sendMessage(m.chat, { image: { url: img }, caption: wea, mentions: [num] }, { quoted: m }) : m.reply(wea)
}

handler.help = ['wastalk']
handler.tags = ['stalk']
handler.command = /^(wa|whatsapp)stalk$/i

handler.register = true

export default handler
