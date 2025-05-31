import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
import cheerio from 'cheerio';
import fetch from "node-fetch"
import axios from "axios"
import moment from "moment-timezone"
import { es as esDefault } from "./lib/multi-language/_default.js"
import { es} from "./lib/idiomas/total-idiomas.js"


global.owner = [
      ['5491162480909', '⭐Owner', true],  //primario
      ['5491151244787', '⭐Owner', true],  //secundario
      ['5491156664731', '💻Desarrollador', true],// ignasio
      ['34611817890', 'CAPI', true],
      ['5491159909622', '💻Desarrollador', true], //sodicacrew
      ['5491127762573', 'ROMAN', true],// roman 
      ['5493413312015', 'santy', true]// santy 
      ]

global.mods = []
global.prems = []
    global.avisador = ['5491151244787@s.whatsapp.net'],  

global.gataJadibts = true
global.OFJadibts = true

global.isBaileysFail = false

global.obtenerQrWeb = 0; 

global.keepAliveRender = 0; 

global.botNumberCode = "" 
global.confirmCode = "" 

global.lenguajeGB = es
global.mid = esDefault
global.version_language = '1.0 (MID-GB)'

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

global.official = [ 
      ["5491151244787", 'ramasec 💻', 1], ]
      
global.mail = ''
global.desc = '' 
global.desc2 = '' 
global.country = '' 

global.packname = 'SodicaBot'
global.author = '@sodica.crew'

global.vs = '2.6'
global.vsJB = "2.0 (Beta)"
global.gt = 'SodicaBot'


global.rg = '*✅ ∫ Resultado*\n\n'
global.resultado = rg

global.ag = '*⚠️ ∫ ADVERTENCIA*\n\n'
global.advertencia = ag

global.iig = '*❕∫ Información*\n\n'
global.informacion = iig

global.fg = '*❌ ∫ Error*╮\n\n'
global.fallo = fg

global.mg = '*❗️∫ MAL*\n\n'
global.mal = mg

global.eeg = '*📩 ∫ Reporte*\n\n'
global.envio = eeg

global.eg = '*✅ ∫ Éxito*\n\n'
global.exito = eg

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
global.wm = "SodicaBot"
global.igfg = "Powered by SodicaCrew"
global.nomorown = "5491151244787"
global.pdoc = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"]
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
// ❰ RPG ❱
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='];

global.cmenut = "❖––––––『"
global.cmenub = "┊✦ "
global.cmenuf = "╰━═┅═━––––––๑\n"
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     "
 
global.dmenut = "*❖─┅──┅〈*"
global.dmenub = "*┊»*"
global.dmenub2 = "*┊*"
global.dmenuf = "*╰┅────────┅✦*"
global.htjava = "⫹⫺"

global.htki = "*⭑•̩̩͙⊱•••• ☪*"
global.htka = "*☪ ••••̩̩͙⊰•⭑*"

global.comienzo = "• • ◕◕════"
global.fin = " • •"

global.botdate = `⫹⫺ Fecha:  ${moment.tz('America/Buenos_Aires').format('DD/MM/YY')}` //Asia/Jakarta
global.bottime = `TIempo: ${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`//America/Los_Angeles
global.fgif = {
key: {
participant : '0@s.whatsapp.net'},
message: { 
"videoMessage": { 
"title": wm,
"h": `Hmm`,
'seconds': '999999999', 
'gifPlayback': 'true', 
'caption': bottime,
'jpegThumbnail': fs.readFileSync('./media/menus/img1.jpg')
}}}


global.multiplier = 1600 // Cuanto más alto, más difícil subir de nivel 

global.ch = {
ch1: 'INTRODUCEID@newsletter',
}
global.comunidad = "INTRODUCEENLACE"
// • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
unwatchFile(file);
console.log(chalk.redBright("Update 'config.js'"));
import(`${file}?update=${Date.now()}`);
})