// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-menu.js — Comando .menu
// Muestra los comandos disponibles según el rango del usuario
// ─────────────────────────────────────────────────────────────────────────────

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

  // Bloque de sesión (disponible para todos)
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

  // Bloque de administración (solo admins y owners)
  if (esAdmin) {
    texto += `
┃
┃ 📣 *Comunicados*
┃  • ${prefix}enviar [texto]
┃    _Publicar aviso inmediatamente_
┃  • ${prefix}programar [DD/MM] [texto]
┃    _Programar aviso para una fecha_
┃  • ${prefix}lista
┃    _Ver avisos pendientes con ID_
┃  • ${prefix}editar [id] [nuevo texto]
┃    _Editar contenido de un aviso_
┃  • ${prefix}borrar [id]
┃    _Eliminar un aviso programado_
┃
┃ ⚙️ *Administración*
┃  • ${prefix}setrango [número] [rango]
┃    _Cambiar rango de un usuario_
┃    _Rangos: usuario / admin_
┃  • ${prefix}setcron [HH:MM]
┃    _Cambiar hora de envío automático_
┃    _Actual: ${global.cronHora || '00:00'}_`
  }

  texto += `\n┗━━━━━━━━━━━━━━━━━━━━━━━`

  await conn.reply(m.chat, texto.trim(), m)
}
