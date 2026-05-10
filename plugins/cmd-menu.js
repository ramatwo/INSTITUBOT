export async function run({ m, rango, esAdmin, esOwner, userData, conn }) {
  const bot = global.botNombre || '🏫 InstituBot'
  const prefix = global.prefix || '.'
  const logeado = userData?.loggedIn === 1
  const usuario = userData?.usuario || 'Invitado'

  let texto = `
┏━━━━━━━━━━━━━━━━━━━━━━━
┃ ${bot}
┃ 📋 *Menú de Comandos*
┣━━━━━━━━━━━━━━━━━━━━━━━`.trim()

  texto += `\n┃\n┃ 👤 *Sesión*`

  if (!logeado) {
    texto += `
┃  • ${prefix}registro [usuario] [PIN]
┃    _Crear cuenta nueva_
┃  • ${prefix}login [usuario] [PIN]
┃    _Iniciar sesión_`
  } else {
    texto += `
┃  • ${prefix}logout
┃    _Cerrar sesión_
┃
┃ 👤 Sesión: *${usuario}*
┃ 🎖️ Rango: *${rango}*`
  }

  if (esAdmin) {
    texto += `
┃
┃ 📣 *Comunicados*
┃  • ${prefix}enviar [texto]
┃    _publicar aviso en el momento_
┃  • ${prefix}programar [DD/MM] [texto]
┃    _programar aviso para una fecha_
┃  • ${prefix}lista
┃    _ver avisos pendientes con ID_
┃  • ${prefix}editar [id] [nuevo texto]
┃    _editar contenido de aviso_
┃  • ${prefix}borrar [id]
┃    _eliminar aviso_
┃
┃ ⚙️ *Administrar Sistema*
┃  • ${prefix}setrango [número] [rango]
┃    _cambia rango de usuario_
┃    _rangos: usuario / admin_
┃  • ${prefix}setcron [HH:MM]
┃    _cambia hora de envío automático_
┃    ahora: ${global.cronHora || '00:00'}_`
  }

  texto += `\n┗━━━━━━━━━━━━━━━━━━━━━━━`

  await conn.reply(m.chat, texto.trim(), m)
}
