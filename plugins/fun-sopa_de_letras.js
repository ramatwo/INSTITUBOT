//CREADO POR @gata_dios
 
let fila, columna, sopaNube, sopaPalabra, sopaDir, userSP, cambioLetra, diamante = null
let intentos = 0
let handler = async (m, { conn, text, usedPrefix, command}) => {
    let cooldown = 3600000; // 1 hora
    let userCooldownsopa = global.userAhorcadoCooldowns || (global.userAhorcadoCooldowns = {});
    let userCooldown = userCooldownsopa[m.sender] || 0;
    let time = userCooldown + cooldown;
  

  
if (!userSP) {
    if (new Date - userCooldown < cooldown) {
        return await conn.reply(m.chat, `*🕓 Esperá ${msToTime(time - new Date())}s antes de volver a jugar.*`, null, m);
      }
userSP = m.sender.split("@")[0]
//await conn.reply(m.chat, `> ✅ *Usuario registrado en el juego:* *@${m.sender.split("@")[0]}*`, m, { mentions: [m.sender] })
m.react("✅")
userCooldownsopa[m.sender] = new Date * 1; // Actualiza el tiempo de cooldown del usuario
}

async function generarSopaDeLetras() {
const LADO = 16 // Si es alto o bajo, puede dar error, deja como esta
let sopaDeLetras = new Array(LADO);
  
for (let i = 0; i < LADO; i++) {
sopaDeLetras[i] = new Array(LADO)
}
const PALABRAS = [
  "ALTO", "AMOR", "ARTE", "AZAR", "BOCA", "BOLA", "CASA", "CINE", "COLA", "DADO",
  "DATO", "DUDA", "EDAD", "ECHO", "FAMA", "FASE", "FOCO", "GATO", "GOMA", "HUMO",
  "IDEA", "ISLA", "JUGO", "LAGO", "LUZ", "MANO", "MESA", "NUBE", "NUDO", "OCIO",
  "OLLA", "ORO", "PALO", "PATO", "RAYO", "ROCA", "SANO", "SOLA", "TAZA", "TELA",
  "UVAS", "VACA", "VELO", "VINO", "YOGA", "ZONA"
];

const PALABRA = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]
  
let filaInicial = Math.floor(Math.random() * LADO)
let columnaInicial = Math.floor(Math.random() * LADO)
const DIRECCIONES = ["horizontal", "vertical", "diagonalDerecha", "diagonalIzquierda"]
const DIRECCION = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)]

let palabraAgregada = false
while (!palabraAgregada) {
filaInicial = Math.floor(Math.random() * LADO)
columnaInicial = Math.floor(Math.random() * LADO)

// Algoritmo para garantizar la palabra 
let palabraEntra = true;
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal" && (columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "vertical" && (filaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalDerecha" && (filaInicial + i >= LADO || columnaInicial + i >= LADO)) {
palabraEntra = false
break;
} else if (DIRECCION === "diagonalIzquierda" && (filaInicial + i >= LADO || columnaInicial - i < 0)) {
palabraEntra = false
break;
}
}

// Si la palabra entra, agregar a la sopa de letras
if (palabraEntra) {
for (let i = 0; i < PALABRA.length; i++) {
if (DIRECCION === "horizontal") {
sopaDeLetras[filaInicial][columnaInicial + i] = PALABRA.charAt(i)
} else if (DIRECCION === "vertical") {
sopaDeLetras[filaInicial + i][columnaInicial] = PALABRA.charAt(i)
} else if (DIRECCION === "diagonalDerecha") {
sopaDeLetras[filaInicial + i][columnaInicial + i] = PALABRA.charAt(i)
} else {
sopaDeLetras[filaInicial + i][columnaInicial - i] = PALABRA.charAt(i)
}
}
palabraAgregada = true;
}
}

// Diseño 
const LETRAS_POSIBLES = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓜⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"
const numerosUni = ["⓿", "❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿", "⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"]
const numerosUni2 = [" ⓿", "❶", "❷", " ❸", " ❹", "❺", "❻", "❼", "❽", " ❾", " ❿", " ⓫", "⓬", "⓭", "⓮", "⓯", "⓰", "⓱", "⓲", "⓳", "⓴"]
let sopaDeLetrasConBordes = ""
sopaDeLetrasConBordes += "     " + [...Array(LADO).keys()].map(num => numerosUni2[num]).join(" ") + "\n"
//sopaDeLetrasConBordes += "   *╭" + "┄".repeat(LADO) + '┄┄' + "╮*\n"

for (let i = 0; i < LADO; i++) {
let fila = numerosUni[i] + " "

for (let j = 0; j < LADO; j++) {
if (sopaDeLetras[i][j]) {
fila += sopaDeLetras[i][j] + " "
} else {
let letraAleatoria = LETRAS_POSIBLES.charAt(Math.floor(Math.random() * LETRAS_POSIBLES.length))
fila += letraAleatoria + " "
}
}
fila += ""
sopaDeLetrasConBordes += fila + "\n"
}
//sopaDeLetrasConBordes += "   *╰" + "┄".repeat(LADO) + '┄┄' + "╯*"
sopaDeLetrasConBordes = sopaDeLetrasConBordes.replace(/[a-zA-Z]/g, letra => LETRAS_POSIBLES[letra.charCodeAt() - 65] || letra)

await m.reply(`🔠 *SOPA DE LETRAS* 🔠
*PALABRA:* \`\`\`"${PALABRA}"\`\`\`
*TENÉS 3 MINUTOS PARA ENCONTRAR LA RESPUESTA CORRECTA*
${readMore}
> *RECOMENDAMOS TENER EL CELULAR CON MINIMO 462 DE DPI PARA VER CORRECTAMENTE LA SOPA DE LETRAS*
> *ESCRIBÍ EL NÚMERO DE FILA Y COLUMNA DEL COMIENZO DE LA PRIMERA LETRA _"${PALABRA.charAt(0)}"_ DE LA PALABRA _"${PALABRA}"_ TENÉS _${intentos}_ INTENTOS*
> *EJEMPLO:*
> ❇️ \`\`\`${usedPrefix + command} 28\`\`\`
> ➡️ \`\`\`FILA 2\`\`\`    ⬇️ \`\`\`COLUMNA 8\`\`\``.trim())
await m.reply(`🔠 *${PALABRA.split("").join(" ")}* 🔠\n\n` + sopaDeLetrasConBordes.trimEnd())
fila = filaInicial 
columna = columnaInicial
sopaNube = sopaDeLetrasConBordes
sopaPalabra = PALABRA 
sopaDir = DIRECCION.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())
}

// Condiciones del juego
cambioLetra = sopaDir
let tagUser = userSP + '@s.whatsapp.net'
if (userSP != m.sender.split("@")[0]) {
await conn.reply(m.chat, `*@${tagUser.split("@")[0]} ESTA JUGANDO SOPA DE LETRAS 🔠 ACTUALEMENTE*`, m, { mentions: [tagUser] })
return
}
if (intentos === 0) {
intentos = 3  
generarSopaDeLetras()
resetUserSP(sopaDir)

async function resetUserSP() {
await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 1000)) // 2 min
if (intentos !== 0) {
await conn.reply(m.chat, `*@${m.sender.split("@")[0]} TE QUEDA UN MINUTO* 😨`, m, { mentions: [m.sender] })
}
await new Promise((resolve) => setTimeout(resolve, 3 * 60 * 1000)) // 3 min
if (intentos !== 0) {
    global.db.data.users[m.sender].derrotas += 1
await conn.reply( m.chat, `*@${m.sender.split("@")[0]} se te acaabó el tiempo* 😧\n\n> *La palabra era _"${sopaPalabra}"_ y estaba en _${sopaDir}_ fila _${fila}_ y columnaa _${columna}_*`, m, { mentions: [m.sender] })
//fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
}
}}else {
if (`${fila}${columna}` == text) {
if (sopaPalabra.length <= 4) {
diamante = 4
} else if (sopaPalabra.length <= 8) {
diamante = 8
} else if (sopaPalabra.length <= 11) {
diamante = 24
} else {
diamante = 32
}
global.db.data.users[m.sender].diamante += diamante
//global.db.data.users[m.sender].victorias += 1
global.db.data.users[m.sender].derrotas += 1
await m.reply(`\`\`\`🎊 HAS GANADO ${diamante} ${rpgshop.emoticon('diamante')} \`\`\`\n\n*CORRECTO  LA PALABRA _"${sopaPalabra}"_ SE ENCONTRABA EN LA DIRECCIÓN _${cambioLetra}_ DE LA FILA _${fila}_ Y COLUMNA _${columna}_*`)
fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
return
}else{
if (intentos === 1) {
fila = null, columna = null, sopaNube = null, sopaPalabra = null, sopaDir = null, userSP = null, cambioLetra = null
intentos = 0
global.db.data.users[m.sender].derrotas += 1
await m.reply(`🫡 *AGOTASTE LOS INTENTOS  LA PALABRA _"${sopaPalabra}"_ SE ENCONTRABA EN LA DIRECCIÓN _${cambioLetra}_ DE LA FILA _${fila}_ Y COLUMNA _${columna}_*`)
return  
} else {
intentos -= 1
await m.reply(`😮‍💨 *INCORRECTO. TE QUEDAN _${intentos}_ INTENTOS*${intentos === 1 ? '' : `\n*PALABRA A ENCONTRAR:* \`\`\`${sopaPalabra}\`\`\``}\n\n${intentos === 1 ? `\`\`\`💡 PISTA \`\`\`\n*LA PALABRA _${sopaPalabra}_ SE ENCUENTRA EN LA DIRECCIÓN _"${cambioLetra}"_*\n\n` : ''}${sopaNube}`)
return
}}
}}

handler.command = /^(sopa|sopadeletras|soup)$/i
export default handler
handler.register = true
handler.owner = false
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      //  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  
      // hours = (hours < 10) ? "0" + hours : hours
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return minutes + " Minutos y " + seconds + " Segundos";
  }