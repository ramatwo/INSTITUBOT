

global.owner = [
  ['5491162489898', 'Admin', true],
]

global.channelId = '120363425175355706@newsletter'

global.botNombre = 'InstituBot'

global.prefix = '.'


global.cronHora = '00:00'
global.timezone = 'America/Buenos_Aires'


global.pinLength = 4


global.authFile = 'sesion'

global.botNumberCode = ''
global.MSG = {
  noSesion: '❌ Necesitás iniciar sesión.\nUsá *.registro [usuario] [PIN]* para registrarte\no *.login [usuario] [PIN]* para ingresar.',
  noAdmin: '⛔ No tenés permisos para usar este comando.\nSolo los administradores pueden hacerlo.',
  pinInvalido: `❌ El PIN debe tener exactamente ${global.pinLength || 4} dígitos numéricos.`,
  errorDB: '❌ Error interno al acceder a la base de datos. Intentá de nuevo.',
}
