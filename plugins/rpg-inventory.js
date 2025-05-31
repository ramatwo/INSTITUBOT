import daily from './rpg-daily.js' 
import weekly from './rpg-weekly.js'
import monthly from './rpg-monthly.js'
import adventure from './rpg-aventura.js'
//import { xpRange } from '../lib/levelling.js'

//import moment from 'moment-timezone'
//import fs from 'fs'

const inventory = {
	
  others: {
    level: true,
    diamante: true,
    health: true,
    money: true,
    exp: true
  },
  items: {
    bibitanggur: true,
    bibitmangga: true,
    bibitpisang: true,
    bibitapel: true,
    bibitjeruk: true,
    potion: true,
    trash: true,
    wood: true,
    rock: true,
    string: true,
    esmeralda: true,
    diamanteplus: true,
    oro: true,
    iron: true,
    upgrader: true
  },
  durabi: {
    sworddurability: true,
    pickaxedurability: true,
    fishingroddurability: true,
    armordurability: true
  },
  tools: {
    armor: {
      '0': `❌`,
      '1': 'Leather Armor',
      '2': 'Iron Armor',
      '3': 'oro Armor',
      '4': 'diamanteplus Armor',
      '5': 'esmeralda Armor',
      '6': 'Crystal Armor',
      '7': 'Obsidian Armor',
      '8': 'Netherite Armor',
      '9': 'Wither Armor',
      '10': 'Dragon Armor',
      '11': 'Hacker Armor'
    },
    sword: {
      '0': `❌`,
      '1': 'Wooden Sword',
      '2': 'Stone Sword',
      '3': 'Iron Sword',
      '4': 'oro Sword',
      '5': 'Copper Sword',
      '6': 'diamanteplus Sword',
      '7': 'esmeralda Sword',
      '8': 'Obsidian Sword',
      '9': 'Netherite Sword',
      '10': 'Samurai Slayer Green Sword',
      '11': 'Hacker Sword'
    },
    pickaxe: {
      '0': `❌`,
      '1': 'Wooden Pickaxe',
      '2': 'Stone Pickaxe',
      '3': 'Iron Pickaxe',
      '4': 'oro Pickaxe',
      '5': 'Copper Pickaxe',
      '6': 'diamanteplus Pickaxe',
      '7': 'Emerlad Pickaxe',
      '8': 'Crystal Pickaxe',
      '9': 'Obsidian Pickaxe',
      '10': 'Netherite Pickaxe',
      '11': 'Hacker Pickaxe'
    },
    fishingrod: true

  },
  crates: {
    common: true,
    uncoommon: true,
    mythic: true,
    pet: true,
    legendary: true
  },
  pets: {
    horse: 10,
    cat: 10,
    fox: 10,
    dog: 10,
    robo: 10,
    lion: 10,
    rhinoceros: 10,
    dragon: 10,
    centaur: 10,
    magia: 10,
    griffin: 10,
    phonix: 10,
    wolf: 10
  },
  cooldowns: {
    lastclaim: {
      name: 'daily',
      time: daily.cooldown
    },
    lastweekly: {
    	name: 'weekly',
        time: weekly.cooldown
        },
    lastmonthly: {
      name: 'monthly',
      time: monthly.cooldown
    },
    lastadventure: {
      name: 'adventure',
      time: adventure.cooldown
    }
  }
}
let handler = async (m, { conn, args, command, jid, text, usedPrefix }) => {
	
let imgr = "./media/menus/velocidad.bat"
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (typeof global.db.data.users[who] == "Sin Datos") {
      global.db.data.users[who] = {
        exp: 0,
        diamante: 20,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Novato',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
     
if (!args[0]) {


await conn.reply(m.chat, `ℹ️ *∫ Información de tu inventario*\n\n*➭ Inventario de ítems:*\n${usedPrefix + command} 1\n*➭ Inventario de misiones:*\n${usedPrefix + command} 2\n*➭ Inventario de comida y seres vivos:*\n${usedPrefix + command} 3`, m)
//await conn.sendMessage(m.chat, listMessage, {quoted: fkontak})
}

if (args[0] == '1') { // Inventario 1
	
let member = global.db.data.users[m.sender]
let user = global.db.data.users[m.sender]
let healt = user.health
let money = member.money
let exp = member.exp
let token = member.token
let dia = member.diamante
 //nuevos let
 let gallo = user.gallo
let cabra = user.cabra
let vaca = user.vaca
let bufalo = user.bufalo
let chancho = user.chancho
let tigre = user.tigre

let mono = user.mono
let jabali = user.jabali
let panda = user.panda
let elefante = user.elefante
let cocodrilo = user.cocodrilo




let paus = user.paus 
let kepiting = user.kepiting
let gurita = user.gurita 
let cumi = user.cumi 
let buntal = user.buntal 
let dory = user.dory 
let lumba = user.lumba 
let lobster = user.lobster 
let hiu = user.hiu 
let udang = user.udang
let ikan = user.ikan 
let orca = user.orca 
//let pancingan = user.pancingan
//let _pancingan = user.anakpancingan 
	 

let ayamb = user.ayamb
let ayamg = user.ayamg
let sapir = user.sapir
let ssapi = user.ssapi

let makananpet = user.makananpet
let makanannaga = user.makanannaga                                         
let makananphonix = user.makananphonix                                     
let makanangriffin = user.makanangriffin
let makananmagia = user.makananmagia                                       
let makanancentaur = user.makanancentaur

let mangga = user.mangga
let anggur = user.anggur
let pisang = user.pisang
let jeruk = user.jeruk
let apel = user.apel

let bibitanggur = user.bibitanggur                            
let bibitjeruk = user.bibitjeruk                              
let bibitapel = user.bibitapel
let bibitmangga = user.bibitmangga                            
let bibitpisang = user.bibitpisang
//nuevos let fin

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
	
let str = `
🏷️ *INVENTARIO* 
👤» *${name}* ${who.split("@")[0]}\n${readMore}

     *『 PRODUCTOS 』*

✦ *${rpg.emoticon('health')}* *» ${healt}*
✦ ${rpgg.emoticon('exp')} *Exp » ${exp}*
✦ ${rpgg.emoticon('diamante')} *Diamante » ${dia}*
✦ ${rpgg.emoticon('money')} *Moneditas: » ${money}*
✦ ${rpgg.emoticon('token')} *Token » ${token}*
✦ *${rpgshop.emoticon('esmeralda')} » ${member.esmeralda}*
✦ *${rpgshop.emoticon('berlian')} » ${member.berlian}*
✦ *${rpgshop.emoticon('tiketcoin')} » ${member.tiketcoin}*
✦ *${rpgshop.emoticon('magia')} » ${member.magia}*
✦ *${rpgshop.emoticon('diamanteplus')}+ » ${member.diamanteplus}*
✦ *${rpgshop.emoticon('oro')} » ${member.oro}*
${readMore}

       *『 SUPERVIVENCIA 』*

✦ *${rpgshop.emoticon('potion')} » ${member.potion}*
✦ *${rpgshop.emoticon('agua')} » ${member.agua}*
✦ *${rpgshop.emoticon('trash')} » ${member.trash}*
✦ *${rpgshop.emoticon('wood')} » ${member.wood}*
✦ *${rpgshop.emoticon('rock')} » ${member.rock}*
✦ *${rpgshop.emoticon('batu')} » ${member.batu}*
✦ *${rpgshop.emoticon('string')} » ${member.string}*
✦ *${rpgshop.emoticon('iron')} » ${member.iron}*
✦ *${rpgshop.emoticon('coal')} » ${member.coal}*
✦ *${rpgshop.emoticon('botol')} » ${member.botol}*
✦ *${rpgshop.emoticon('kaleng')} » ${member.kaleng}*
✦ *${rpgshop.emoticon('kardus')} » ${member.kardus}*
✦ *${rpgshop.emoticon('ingnova')} » ${member.ingnova}*
${readMore}

       *『 OBJETOS 』*

✦ *${rpgshop.emoticon('eleksirb')} » ${member.eleksirb}*
✦ *${rpgshop.emoticon('emas')} » ${member.emas}*
✦ *${rpgshop.emoticon('sampah')} » ${member.sampah}*
✦ *${rpgshop.emoticon('serigala')} » ${member.serigala}*
✦ *${rpgshop.emoticon('sword')} » ${member.sword}*
✦ *${rpgshop.emoticon('umpan')} » ${member.umpan}*
✦ *${rpgshop.emoticon('healtmonster')} » ${member.healtmonster}*
✦ *${rpgshop.emoticon('pancingan')} » ${member.pancingan}*
${readMore}

       *『 CAJAS 』*

✦ *${rpgshop.emoticon('common')}* *» ${user.common}*
✦ *${rpgshop.emoticon('uncoommon')}* *» ${user.uncoommon}*
✦ *${rpgshop.emoticon('mythic')}* *» ${user.mythic}*
✦ *${rpgshop.emoticon('pet')}* *» ${user.pet}*
✦ *${rpgshop.emoticon('petFood')}* *» ${user.petFood}*
✦ *${rpgshop.emoticon('gardenboxs')}* *» ${user.gardenboxs}*
`.trim()

conn.reply(m.chat, str, m)

	
} else if (args[0] == '2') { // Inventario 2

  let user = global.db.data.users[m.sender]
  let name = m.sender
  let usuario = await conn.getName(name)
  
  let tiempoRestante = (lastTime, interval) => {
      let remaining = interval - (new Date - lastTime)
      let hours = Math.floor(remaining / 3600000)
      let minutes = Math.floor((remaining % 3600000) / 60000)
      return `${hours}h ${minutes}m`
  }

  let str = `
  *『🏷️ INVENTARIO DE MISIONES 』*
👤» *${usuario}* ( ${who.split("@")[0]} )\n${readMore}

     *『 LABURO 』*

⚡ *Minar EXP* » ${new Date - user.lastmiming < 18000000 ? `❌ (${tiempoRestante(user.lastmiming, 18000000)})` : '✅ .minar1'}
🪙 *Minar Moneditas* » ${new Date - user.lastcoins < 18000000 ? `❌ (${tiempoRestante(user.lastcoins, 18000000)})` : '✅ .minar2'}
💎 *Minar Diamantes* » ${new Date - user.lastdiamantes < 18000000 ? `❌ (${tiempoRestante(user.lastdiamantes, 18000000)})` : '✅ .minar3'}
⛏️ *Chamba* » ${new Date - user.lastwork < 3600000 ? `❌ (${tiempoRestante(user.lastwork, 3600000)})` : '✅ .work'}
💣 *Robar* » ${new Date - user.lastrob < 7200000 ? `❌ (${tiempoRestante(user.lastrob, 7200000)})` : '✅ .rob'}
🏹 *Caza* » ${new Date - user.lastberburu < 43200000 ? `❌ (${tiempoRestante(user.lastberburu, 43200000)})` : '✅ .caza'}
⛰️ *Aventura* » ${new Date - user.lastadventure < 36000000 ? `❌ (${tiempoRestante(user.lastadventure, 36000000)})` : '✅ .aventura'}
⚗️ *Cofre* » ${new Date - user.lastcofre < 86400000 ? `❌ (${tiempoRestante(user.lastcofre, 86400000)})` : '✅ .cofre'}

     *『 TIEMPO 』*

🕐 *Hourly* » ${new Date - user.lasthourly < 3600000 ? `❌ (${tiempoRestante(user.lasthourly, 3600000)})` : '✅ .hourly'}
📦 *Daily* » ${new Date - user.lastclaim < 86400000 ? `❌ (${tiempoRestante(user.lastclaim, 86400000)})` : '✅ .daily'}
🎁 *Weekly* » ${new Date - user.lastweekly < 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000 ? `❌ (${tiempoRestante(user.lastweekly, 2 * 60 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000)})` : '✅ .weekly'}
📮 *Monthly* » ${new Date - user.lastmonthly < 2 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000 ? `❌ (${tiempoRestante(user.lastmonthly, 2 * 60 * 60 * 1000 + 30 * 24 * 60 * 60 * 1000)})` : '✅ .monthly'}
`.trim()

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

conn.reply(m.chat, str, fkontak, m, { mentions: conn.parseMention(str) })
	
    } else if (args[0] == '3') { // Inventario animales
	    
let user = global.db.data.users[m.sender]
let gallo = user.gallo
let cabra = user.cabra
let vaca = user.vaca
let bufalo = user.bufalo
let chancho = user.chancho
let tigre = user.tigre

let mono = user.mono
let jabali = user.jabali
let panda = user.panda
let elefante = user.elefante
let cocodrilo = user.cocodrilo




let paus = user.paus 
let kepiting = user.kepiting
let gurita = user.gurita 
let cumi = user.cumi 
let buntal = user.buntal 
let dory = user.dory 
let lumba = user.lumba 
let lobster = user.lobster 
let hiu = user.hiu 
let udang = user.udang
let ikan = user.ikan 
let orca = user.orca 
let pancingan = user.pancingan
let _pancingan = user.anakpancingan 
	 

let ayamb = user.ayamb
let ayamg = user.ayamg
let sapir = user.sapir
let ssapi = user.ssapi

let makananpet = user.makananpet
let makanannaga = user.makanannaga                                         
let makananphonix = user.makananphonix                                     
let makanangriffin = user.makanangriffin
let makananmagia = user.makananmagia                                       
let makanancentaur = user.makanancentaur

let mangga = user.mangga
let anggur = user.anggur
let pisang = user.pisang
let jeruk = user.jeruk
let apel = user.apel

let bibitanggur = user.bibitanggur                            
let bibitjeruk = user.bibitjeruk                              
let bibitapel = user.bibitapel
let bibitmangga = user.bibitmangga                            
let bibitpisang = user.bibitpisang

let aineh = `  *『🏷️ INVENTARIO - OTROS 』*
👤» *${name}* ${who.split("@")[0]}\n${readMore}
       *『 ANIMALES 』*

✦${rpg.emoticon('tigre')} ➡️ ${tigre}
✦${rpg.emoticon('elefante')} ➡️ ${elefante}
✦${rpg.emoticon('cabra')} ➡️ ${cabra}
✦${rpg.emoticon('panda')} ➡️ ${panda}
✦${rpg.emoticon('cocodrilo')} ➡️ ${cocodrilo}
✦${rpg.emoticon('bufalo')} ➡️ ${bufalo}
✦${rpg.emoticon('cow')} ➡️ ${vaca}
✦${rpg.emoticon('mono')} ➡️ ${mono}
✦${rpg.emoticon('Jabali')} ➡️ ${jabali}
✦${rpg.emoticon('chancho')} ➡️ ${chancho}
✦${rpg.emoticon('gallo')} ➡️ ${gallo}

✦💬 Animales totales » ${ cocodrilo + elefante + panda + jabali + mono + tigre + bufalo + cabra + gallo + vaca + chancho }


       *『 COMIDA 』*
✦🥓 Comida de Mascota : Food Pet » ${makananpet}
✦🍖 Pollo a la Parrilla : Grilled Chicken » ${ayamb}
✦🍗 Pollo frito : Fried Chicken » ${ayamg}
✦🥘 Alimento de Carne : Meat Food » ${sapir}
✦🥩 Bistec de Carne : Beef Steak » ${ssapi}

✦🎒 Total inv » ${makananpet + ayamb + ayamg + sapir + ssapi} Comida


       *『 FRUTAS Y SEMILLAS 』*
✦🥭 Mango » ${mangga}
✦🍇 Uva : Grape » ${anggur}
✦🍌 Platano : Banana » ${pisang}
✦🍊 Naranja : Orange » ${jeruk}
✦🍎 Manzana : Apple » ${apel}

✦🌾 Semillas de Mango : Mango Seeds
» ${bibitmangga}
✦🌾 Semillas de uva : Grape Seeds
» ${bibitanggur}                                   
✦🌾 Semillas de plátano : Banana Seeds
» ${bibitpisang}
✦🌾 Semillas de naranja : Orange Seeds
» ${bibitjeruk}
✦🌾 Semillas de manzana : Apple seeds
» ${bibitapel}


       *『 ALIMENTOS 』*
✦ 🍱 *Alimentos para mascotas: Pet Food*
» *${makananpet}*
✦ 🕊️ *Comida para Fénix : Phoenix Food*
» *${makananphonix}*
✦ 🐉 *Comida para Dragón : Dragon Food*
» *${makanannaga}*
✦ 🦅 *Comida para Ave : Griffin Food*
» *${makanangriffin}*
✦ 🌀 *Comida Mágica : Magic Food*
» *${makananmagia}*
✦ 🐐 *Comida para Centauro : Centauro Food*
» *${makanancentaur}*



       *『 ACUÁTICOS 』*

✦ 🦈 *Tiburón : Shark » ${hiu}*
✦ 🐟 *Pez : Fish » ${ikan}*
✦ 🐠 *Dory : Surgeonfish » ${dory}*
✦ 🐋 *Orca : Killer whale » ${orca}*
✦ 🐳 *Ballena : Whale » ${paus}*
✦ 🦑 *Calamar : Squid » ${cumi}*
✦ 🐙 *Pulpo : Octopus » ${gurita}*
✦ 🐡 *Pez Globo : Blowfish » ${buntal}*
✦ 🦐 *Camarón : Shrimp » ${udang}*
✦ 🐬 *Delfín : Dolphin » ${lumba}*
✦ 🦞 *Langosta : Lobster » ${lobster}*
✦ 🦀 *Cangrejo : Crab » ${kepiting}*


       *『 GANCHO 』*
*╭────────────────*
*│🪝 Gancho : Hook » ${pancingan == 0 ? 'No tenés' : '' || pancingan == 1 ? 'Nivel  ✦ 1' : '' || pancingan == 2 ? 'Nivel  ✦ 2' : '' || pancingan == 3 ? 'Nivel  ✦ 3' : '' || pancingan == 4 ? 'Nivel  ✦ 4' : '' || pancingan == 5 ? 'Nivel  ✦ 5 ǁ MAX' : ''}*
*│ Poder del Gancho » ${pancingan == 0 ? 'No tenés' : '' || pancingan > 0 && pancingan < 5 ? `Nivel » ${pancingan} a Nivel ${pancingan + 1}*\n*│ Exp » ${_pancingan} -> ${pancingan *10000}*` : '' || pancingan == 5 ? 'Nivel  ✦ 5 ǁ MAX' : ''}*
*╰────────────────*

       *『 CAJAS 』*
✦📥 *Cajas : Boxs » ${user.boxs}*
✦📦 *Caja Común : Common Box » ${user.common}*
✦🥡 *Caja Poco Común : Uncommon » ${user.uncoommon}*
✦🗳️ *Caja Mítica : Mythic Box » ${user.mythic}*
✦🎁 *Caja Legendaria : Legendary Box » ${user.legendary}*.
✦🍱 *Caja para Mascota : Pet Box » ${user.pet}*
✦💐 *Caja de Jardinería : Garden boxs » ${user.gardenboxs}*
`.trim()

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
conn.reply(m.chat, aineh, m)}
}
handler.help = ['inventario']
handler.tags = ['rpg']
handler.command = /^(inventory|inv|inventario)$/i
handler.register = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4201)

function clockString(ms) {
  let ye = isNaN(ms) ? '--' : Math.floor(ms / 31104000000) % 10
  let mo = isNaN(ms) ? '--' : Math.floor(ms / 2592000000) % 12
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return ['*│ Nueva misión en*\n', '*│* ', mo, ' *⛅ Meses*\n', '*│* ', d, ' *☀️ Días*\n', '*│* ', h, ' *⏰ Horas*\n', '*│* ', m, ' *🕐 Minutos*\n', '*│* ', s, ' *⏱️ Segundos*\n*│*'].map(v => v.toString().padStart(2, 0)).join('')
}