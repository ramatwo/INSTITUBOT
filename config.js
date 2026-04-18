// ─────────────────────────────────────────────────────────────────────────────
// config.js — Configuración global de InstituBot
// ─────────────────────────────────────────────────────────────────────────────

// ► OWNERS: Números con rango máximo (sin +, sin espacios)
// Ejemplo: '5491162480909'
global.owner = [
  ['5491162489898', 'Admin', true],
]

// ► ID del Canal de WhatsApp donde se publicarán los avisos
// Formato: '1234567890@newsletter'
// Dejalo vacío y completalo cuando tengas el ID del canal.
global.channelId = '120363425175355706@newsletter'

// ► Nombre del bot (aparece en mensajes)
global.botNombre = '🏫 InstituBot'

// ► Prefijo de comandos
global.prefix = '.'

// ► Hora del cron job automático (formato 24hs, Argentina)
// Podés cambiarlo con el comando .setcron [HH:MM] (solo admins)
// Por defecto: 00:00
global.cronHora = '00:00'

// ► Zona horaria para el cron
global.timezone = 'America/Buenos_Aires'

// ► Longitud del PIN (dígitos)
global.pinLength = 4

// ► Ruta de la sesión de Baileys
global.authFile = 'sesion'

// ► Número del bot (dejalo vacío para usar QR, o poné el número para usar código)
// Formato: '+5491100000000'
global.botNumberCode = ''

// ─────────────────────────────────────────────────────────────────────────────
// Mensajes de respuesta reutilizables
global.MSG = {
  noSesion:   '❌ Necesitás iniciar sesión.\nUsá *.registro [usuario] [PIN]* para registrarte\no *.login [usuario] [PIN]* para ingresar.',
  noAdmin:    '⛔ No tenés permisos para usar este comando.\nSolo los administradores pueden hacerlo.',
  pinInvalido: `❌ El PIN debe tener exactamente ${global.pinLength || 4} dígitos numéricos.`,
  errorDB:    '❌ Error interno al acceder a la base de datos. Intentá de nuevo.',
}
