let handler  = async (m, { conn, command, args, usedPrefix }) => {
  let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
  
  let user = global.db.data.users[m.sender]
  let pescarUsuario = await conn.getName(m.sender)
  let gancho = user.pancingan
  let canaDePescar = user.pancing
  let carnadaUser = user.umpan
  let type = (args[0] || '').toLowerCase()
  let pancing = user.pancing
  let pancingan = user.pancingan
  let nivelPescar = pancing == 0 ? 'No tengo | I do not have' : '' || pancing == 1 ? 'Nivel | Level ✦ 1' : '' || pancing == 2 ? 'Nivel | Level ✦ 2' : '' || pancing == 3 ? 'Nivel | Level ✦ 3' : '' || pancing == 4 ? 'Nivel | Level ✦ 4' : '' || pancing >= 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''
  let nivelGancho = pancingan == 0 ? 'No tengo | I do not have' : '' || pancingan == 1 ? 'Nivel | Level ✦ 1' : '' || pancingan == 2 ? 'Nivel | Level ✦ 2' : '' || pancingan == 3 ? 'Nivel | Level ✦ 3' : '' || pancingan == 4 ? 'Nivel | Level ✦ 4' : '' || pancingan >= 5 ? 'Nivel | Level ✦ 5 ǁ MAX' : ''
  
  var img1 = ['https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/05/05/6092b70b84a7c.r_d.618-390-0.jpeg','https://i.blogs.es/874833/dubai1/1366_2000.jpg','https://www.orangesmile.com/extreme/img/main/marina-bay-sands-pool_2.jpg','https://factum-info.net/es/images/3_Interesnoe/4_puteshestvie/78_2_Marina-Bay-Sands-4.jpg','https://www.infoviajera.com/wp-content/uploads/2019/08/La_Piscina_Infinita_Mas_Grande_del_Mundo_Singapur_Marina_Bay-infinity-pool-4-d.jpg'].getRandom()
  var img2 = ['https://i.ytimg.com/vi/eonYdzU1MIA/maxresdefault.jpg','https://fb36e89981.cbaul-cdnwnd.com/1c7fd8909117357b511677a932235d4e/200000528-c615dc70fe/700/lago%20tanganika%20africa.jpg?ph=fb36e89981','http://www.nsf.gov/od/lpa/news/03/images/tanganyika_mahale.jpg','https://www.goafrique.it/wp-content/uploads/sites/118/2018/02/lake-tanganyika-1024x597.jpg','https://media.istockphoto.com/photos/lake-tanganyika-picture-id183316304?k=20&m=183316304&s=612x612&w=0&h=PGk1q2U-9foXY-QVorJwJF6Lrjl-uupu4iRC5st_2qo='].getRandom()
  var img3 = ['https://viajes.nationalgeographic.com.es/medio/2020/05/25/agujero-azul-belice_1377ebaf_1280x720.jpg','https://www.fundacionaquae.org/wp-content/uploads/2019/08/baikal5.jpg','http://www.capital.com.pa/wp-content/uploads/2011/05/CraterLakeAerial.jpg','https://ihow.pro/assets/images/media/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2xha2UtYmFpa2FsLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6ODI4fX19','https://guia.viajobien.com/wp-content/uploads/2017/06/7554289674_28b922f42c_h.jpg'].getRandom()
  var img4 = ['https://pinake.files.wordpress.com/2020/09/mar-caspio.jpg','https://www.meteorologiaenred.com/wp-content/uploads/2020/03/Formaci%C3%B3n-del-mar-Caspio.jpg','https://www.gaceta.unam.mx/wp-content/uploads/2021/01/caspdes.jpg','https://viajes.chavetas.es/wp-content/uploads/albums/uzbekistan16/d11-05.jpg','https://www.caracteristicas.co/wp-content/uploads/2017/03/mares-4-e1565805117646.jpg'].getRandom()
  var img5 = ['https://www.caracteristicas.co/wp-content/uploads/2018/11/oceano-pacifico-2-e1583028795824.jpg','https://www.caracteristicas.co/wp-content/uploads/2018/10/oceano-pacifico-arrefice-e1540842615839.jpg','https://ecologismos.com/wp-content/2017/12/reservas-marinas.jpg','https://www.nationalgeographic.com.es/medio/2021/06/07/atun-rojo_d35c81ef_1280x853.jpg','https://elsumario.com/wp-content/uploads/2018/09/tiburon-1.jpg'].getRandom()
  
  var mensajePesca = [`𝙋𝙍𝙀𝙋𝘼𝙍𝘼𝙉𝘿𝙊 𝙇𝘼 ${rpgg.emoticon('fishingrod')} 𝘾𝘼Ñ𝘼 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼𝙍...`, `🪣 𝘼𝙇𝙄𝙎𝙏𝘼𝙉𝘿𝙊 𝙄𝙈𝙋𝙇𝙀𝙈𝙀𝙉𝙏𝙊𝙎 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼...`, `📡 𝘽𝙐𝙎𝘾𝘼𝙉𝘿𝙊 𝙇𝙐𝙂𝘼𝙍 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼...`, `𝙀𝙉 𝙃𝙊𝙍𝘼 𝘽𝙐𝙀𝙉𝘼  𝙃𝙊𝙔 𝙎𝙀𝙍𝘼 𝙐𝙉𝘼 𝙂𝙍𝘼𝙉 𝙋𝙀𝙎𝘾𝘼 🌤️`, `𝙋𝙍𝙀𝙋𝘼𝙍𝘼𝙉𝘿𝙊 ${rpgshopp.emoticon('pancingan')} 𝙂𝘼𝙉𝘾𝙃𝙊 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼`, `🌊 𝙀𝙉 𝘽𝙍𝙀𝙑𝙀 𝙀𝙈𝙋𝙀𝙕𝘼𝙍𝘼 𝙇𝘼 𝙋𝙀𝙎𝘾𝘼 `].getRandom()
  var mensajePesca2 = [`𝙋𝙍𝙀𝙋𝘼𝙍𝘼𝙉𝘿𝙊 𝙇𝘼 𝘾𝘼𝙍𝙉𝘼𝘿𝘼 ${rpgshopp.emoticon('umpan')}`, `💥 𝙋𝘼𝙍𝙀𝘾𝙀 𝙌𝙐𝙀 𝙊𝘽𝙏𝙀𝙉𝘿𝙍𝘼𝙎 𝙈𝙐𝘾𝙃𝙊𝙎 𝙋𝙀𝘾𝙀𝙎`, `𝙏𝙄𝙀𝙉𝙀𝙎 𝙈𝙐𝘾𝙃𝘼 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨ 𝙋𝘼𝙍𝘼 𝙐𝙉𝘼 𝙂𝙍𝘼𝙉 𝙋𝙀𝙎𝘾𝘼`, `𝙏𝙐 𝙉𝙄𝙑𝙀𝙇 𝘿𝙀 ${rpgg.emoticon('fishingrod')} 𝙔 ${rpgshopp.emoticon('pancingan')} 𝙀𝙎𝙏𝘼𝙉  𝘼𝘾𝙏𝙊𝙎 𝙋𝘼𝙍𝘼 𝙀𝙎𝙏𝘼 𝙂𝙍𝘼𝙉 𝙋𝙀𝙎𝘾𝘼 `, `🍀 𝙇𝘼 𝙎𝙐𝙀𝙍𝙏𝙀 𝙏𝙀 𝘽𝙍𝙄𝙉𝘿𝘼𝙍𝘼 𝙐𝙉𝘼 𝙀𝙓𝙀𝙇𝙀𝙉𝙏𝙀 𝙋𝙀𝙎𝘾𝘼`, `🌊 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 𝘿𝙀𝙇 𝘼𝙂𝙐𝘼 𝙀𝙎 𝙀𝙎𝙏𝘼𝘽𝙇𝙀 𝙋𝘼𝙍𝘼 𝘾𝙊𝙈𝙀𝙉𝙕𝘼𝙍 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`].getRandom()
  var mensajePesca3 = [`𝙏𝘼𝙇 𝙑𝙀𝙕  𝘼𝙏𝙍𝘼𝙋𝙊  🦀🦞🦐`, `𝙏𝘼𝙇 𝙑𝙀𝙕  𝘼𝙏𝙍𝘼𝙋𝙊  🦑🐙🐡`, `𝙏𝘼𝙇 𝙑𝙀𝙕  𝘼𝙏𝙍𝘼𝙋𝙊  🐠🐟🐬`, `𝙏𝘼𝙇 𝙑𝙀𝙕  𝘼𝙏𝙍𝘼𝙋𝙊  🐳🦈🐋`].getRandom()
  var mensajeLugar = [`𝙋𝙄𝙎𝘾𝙄𝙉𝘼 𝙈𝘼𝙍𝙄𝙉𝘼 𝘿𝙀 𝙎𝙄𝙉𝙂𝘼𝙋𝙐𝙍`, `𝙇𝘼𝙂𝙐𝙉𝘼 𝙏𝘼𝙉𝙂𝘼𝙉𝙄𝘾𝘼`, `𝙇𝘼𝙂𝙊 𝘽𝘼𝙄𝙆𝘼𝙇`, `𝙈𝘼𝙍 𝘾𝘼𝙎𝙋𝙄𝙊`, `𝙊𝘾𝙀𝘼𝙉𝙊 𝙋𝘼𝘾𝙄𝙁𝙄𝘾𝙊`]
  
  var energia = ['10', '20', '40', '60', '90']
  var carnada = ['0', '40', '80', '150', '200']
  var nivelCanaDePescar = ['1', '2', '3', '4', '5', '6']
  var nivelDelGancho = ['1', '2', '3', '4', '5', '6']
  var nivelUser = ['2', '4', '5', '7', '10']
    
  const sections = [
  {
  title: htjava + ' 🛥️ 𝙇𝙐𝙂𝘼𝙍𝙀𝙎 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 ' + htjava,
  rows: [
  {title: "🎣 " + mensajeLugar[0], rowId: usedPrefix + command + ' 1', description: `𝑼𝒏𝒂 𝒑𝒊𝒔𝒄𝒊𝒏𝒂 𝒑𝒂𝒏𝒐𝒓𝒂𝒎𝒊𝒄𝒂 𝒄𝒐𝒏 𝒗𝒂𝒓𝒊𝒂𝒔 𝒆𝒔𝒑𝒆𝒄𝒊𝒆𝒔 𝒎𝒂𝒓𝒊𝒏𝒂𝒔 \n`},
  {title: "🎣 " + mensajeLugar[1], rowId: usedPrefix + command + ' 2', description: `𝑨𝒕𝒓𝒆𝒗𝒆𝒕𝒆 𝒂 𝒑𝒆𝒔𝒄𝒂𝒓 𝒆𝒏 𝒍𝒂 𝑳𝒂𝒈𝒖𝒏𝒂 𝒎𝒂𝒔 𝒅𝒊𝒗𝒆𝒓𝒔𝒂 𝒅𝒆𝒍 𝑴𝒖𝒏𝒅𝒐 \n`}, 
  {title: "🎣 " + mensajeLugar[2], rowId: usedPrefix + command + ' 3', description: `𝑪𝒐𝒏𝒔𝒊𝒅𝒆𝒓𝒂𝒅𝒂 𝒍𝒂 𝑴𝒂𝒅𝒓𝒆 𝒅𝒆 𝒍𝒐𝒔 𝑳𝒂𝒈𝒐𝒔, 𝒂𝒒𝒖𝒊 𝒕𝒂𝒍 𝒗𝒆𝒛 𝒆𝒔𝒕𝒆𝒏 𝒍𝒐𝒔 𝑪𝒂𝒍𝒂𝒎𝒂𝒓𝒆𝒔 \n`},
  {title: "🎣 " + mensajeLugar[3], rowId: usedPrefix + command + ' 4', description: `𝑼𝒏 𝒍𝒂𝒈𝒐 𝒕𝒂𝒏 𝒈𝒓𝒂𝒏𝒅𝒆 𝒒𝒖𝒆 𝒆𝒔 𝒑𝒓𝒐𝒃𝒂𝒃𝒍𝒆 𝒒𝒖𝒆 𝒂𝒃𝒖𝒏𝒅𝒆 𝒎𝒖𝒄𝒉𝒂𝒔 𝒆𝒔𝒑𝒆𝒄𝒊𝒆𝒔 𝒎𝒂𝒓𝒊𝒏𝒂𝒔 \n`},
  {title: "🎣 " + mensajeLugar[4], rowId: usedPrefix + command + ' 5', description: `𝑼𝒏 𝑴𝒂𝒓 𝒕𝒂𝒏 𝒈𝒓𝒂𝒏𝒅𝒆 𝒚 𝑷𝒓𝒐𝒇𝒖𝒏𝒅𝒐 𝑷𝒆𝒓𝒇𝒆𝒄𝒕𝒐 𝒑𝒂𝒓𝒂 𝑷𝒆𝒔𝒄𝒂𝒓 \n`}
  ]}]
  
  const listMessage = {
  text: `🦦 𝙀𝙇𝙄𝙅𝘼 𝙀𝙉 𝙌𝙐𝙀 𝙇𝙐𝙂𝘼𝙍 𝙌𝙐𝙄𝙀𝙍𝙀 𝙋𝙀𝙎𝘾𝘼𝙍 `,
  footer: `*- - - - - - - - - - - - - - - - - -*
  *⊹ ${rpgshop.emoticon('stamina')}*
  ➥ *${user.stamina}%* ${rpgshopp.emoticon('stamina')}
  *⊹ ${rpgshop.emoticon('umpan')}*
  ➥ *${user.umpan}* ${rpgshopp.emoticon('umpan')}
  *⊹ ${rpgshop.emoticon('pancing')}*
  ➥ *${nivelPescar}* ${rpgshopp.emoticon('pancing')}
  *⊹ ${rpgshop.emoticon('pancingan')}*
  ➥ *${nivelGancho}* ${rpgshopp.emoticon('pancingan')}
  *- - - - - - - - - - - - - - - - - -*
  *𝗣𝗥𝗘𝗠𝗜𝗨𝗠 ${user.premium ? "✅": "❌"}*
  ${wm}`,
  title: `*⎔───ꕤ 𝙋𝙀𝙎𝘾𝘼 : 𝙁𝙄𝙎𝙃𝙄𝙉𝙂 ꕤ───⎔*`,
  buttonText: `${rpgshopp.emoticon('pancing')} 𝙋𝙀𝙎𝘾𝘼𝙍 ${rpgshopp.emoticon('pancing')}`,
  sections }
  
  try {
  if (/fishing|mancing|pescar/i.test(command)) {
  switch (type) {
            
  case '1':
  let __temporizador1 = user.lastmancingeasy + 3600000 //1 h lastfishing
  let totalTiempo1 = clockString(__temporizador1 - new Date() * 1)
  let usuario = conn.getName(m.sender)
  
  if (user.level <= 1) return conn.sendButton( m.chat, `${fg}𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙏𝙀𝙉𝙀𝙍 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelUser[0]}*`, `𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: *${user.level}*\n` + wm, [[`𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝙍 𝙈𝙄 𝙉𝙄𝙑𝙀𝙇 ${rpgg.emoticon('level')}`, `.nivel`]], fkontak, m)   
  if (user.stamina < 9) return conn.sendButton( m.chat, `${ag}𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝙀𝙉𝙏𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼. 𝙈𝙄𝙉𝙄𝙈𝙊 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼𝙎 𝙐𝙉 *${energia[0]}%* 𝘿𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨`, `𝙀𝙉𝙀𝙍𝙂𝙄𝘼 𝘼𝘾𝙏𝙐𝘼𝙇: ${rpgg.emoticon('stamina')} *${user.stamina}%*\n` + wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${energia[0]}% ${rpgg.emoticon('stamina')}`, '.buy stamina 10'], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`], [`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m)     
  if (user.pancingan > 0 ) {  
  if (user.pancing > 0 ) {
  if (user.umpan > 0 ) {
  if (new Date - user.lastmancingeasy > 3600000) {
                    
  let ikan = `${Math.floor(Math.random() * 10)}`.trim()
  let lele = `${Math.floor(Math.random() * 10)}`.trim() 
  let nila = `${Math.floor(Math.random() * 10)}`.trim() 
  let bawal = `${Math.floor(Math.random() * 10)}`.trim() 
  let buntal = `${Math.floor(Math.random() * 10)}`.trim() 
  let udang = `${Math.floor(Math.random() * 10)}`.trim()
  let paus = `${Math.floor(Math.random() * 10)}`.trim() 
  let kepiting = `${Math.floor(Math.random() * 10)}`.trim()
          
  let _psepick= `${pickRandom([1, 0, 0, 1])}`
  let psepick = (_psepick * 1)
  let _psenjata = `${pickRandom([1, 0, 0, 0])}`
  let psenjata = (_psenjata * 1)
             
  let pesca1 = `
  ${rpgg.emoticon('fishingrod')} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙎𝙐 𝙋𝙀𝙎𝘾𝘼  ${pescarUsuario}
          
  🌊🐟🌊 Pez : Fish » ${ikan}
  🌊🐟🌊 Super Pez : Fish Super » ${lele}
  🌊🦭🌊 Foca : Sea Lion » ${nila}
  🌊🐡🌊 Pez Globo : Blowfish » ${bawal}
  🌊🐡🌊 Super Pez Globo : Blowfish Super » ${buntal}
  🌊🦐🌊 Camarón : Shrimp » ${udang}
  🌊🐳🌊 Ballena : Whale » ${paus}
  🌊🦀🌊 Cangrejo : Crab » ${kepiting}` 
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} 𝙃𝙀𝙔 𝙅𝙐𝙀𝙂𝘼 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 𝙀𝙉 ${rpgg.emoticon('fishingrod')} ${mensajeLugar[0]}`, wm, null, null, null, null, null, [
  [`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊`, '.pescar 1']], null)}, 3600000) 
  
  setTimeout(() => {
  conn.sendButton( m.chat, `${rpgg.emoticon('fishingrod')} ${mensajeLugar[0]}\n` + wm, pesca1, img1, [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], null)}, 35000)
  
  setTimeout(() => {
  if (psepick > 0 ) {
  user.psepick += psepick * 1
  conn.sendButton( m.chat, `🥳 𝘼𝘾𝘼𝘽𝘼𝙎 𝘿𝙀 𝙊𝘽𝙏𝙀𝙉𝙀𝙍 *${psepick}* 𝙏𝙍𝘼𝙅𝙀 𝘾𝙊𝙈𝙐𝙉  🧥`, wm, [[`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕`, `.pescar`], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], fkontak, m)}}, 33000)
  
  setTimeout(() => {
  if  (psenjata > 0 ) {
  user.psenjata += psenjata * 1
  conn.sendButton( m.chat, `🥳 𝘼𝘾𝘼𝘽𝘼𝙎 𝘿𝙀 𝙊𝘽𝙏𝙀𝙉𝙀𝙍 *${psenjata}* 𝙏𝙍𝘼𝙅𝙀 𝙀𝙋𝙄𝘾𝙊  🥷`, wm, [[`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝙊𝙏𝙍𝘼 𝙑𝙀𝙕`, `.pescar`], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], fkontak, m)}}, 30000)
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca3}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 15000)
         
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca2}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 8000)
    
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 0)
  
  user.lastmancingeasy = new Date * 1
  user.ikan += ikan * 1
  user.lele += lele * 1
  user.nila += nila * 1
  user.bawal += bawal * 1
  user.buntal += buntal * 1 
  user.udang += udang * 1
  user.paus += paus * 1
  user.kepiting += kepiting * 1
  user.umpan -= 1
  user.stamina -= 2 * 1
    
  } else conn.sendButton( m.chat, `𝙔𝘼 𝙁𝙐𝙀 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙀`, `𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀𝙇 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊:\n${totalTiempo1}\n\n` + wm, [[`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  } else conn.sendButton( m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 10 𝘾𝘼𝙍𝙉𝘼𝘿𝘼 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 10'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 50 𝘾𝘼𝙍𝙉𝘼𝘿𝘼 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 50'], [`🏪 𝙏𝙄𝙀𝙉𝘿𝘼 𝙋𝘼𝙍𝘼 𝘾𝙊𝙈𝙋𝙍𝘼𝙍`, '.buy']], fkontak,  m)
  } else conn.sendButton(m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('pancing')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 𝘾𝘼Ñ𝘼 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼𝙍 ${rpgshopp.emoticon('pancing')}`, '.buy pancing 1'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 2 𝘾𝘼Ñ𝘼 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼𝙍 ${rpgshopp.emoticon('pancingan')}`, '.buy pancing 2']], fkontak, m)
  } else return conn.sendButton(m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('pancingan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 𝙐𝙉 𝙂𝘼𝙉𝘾𝙃𝙊 ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 1'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 2 𝙂𝘼𝙉𝘾𝙃𝙊 ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 2']], fkontak, m)
  break
         
  case '2':
  let __temporizador2 = user.lastmancingeasy + 3600000 //1 h
  let tiempoTotal2 = clockString(__temporizador2 - new Date() * 1)
  if (user.level <= 3) return conn.sendButton( m.chat, `${fg}𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙏𝙀𝙉𝙀𝙍 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelUser[1]}*`, `𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: *${user.level}*\n` + wm, [[`𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝙍 𝙈𝙄 𝙉𝙄𝙑𝙀𝙇 ${rpgg.emoticon('level')}`, `.nivel`]], fkontak, m)   
  if (user.stamina < 19) return conn.sendButton( m.chat, `${ag}𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝙀𝙉𝙏𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼. 𝙈𝙄𝙉𝙄𝙈𝙊 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼𝙎 𝙐𝙉 *${energia[1]}%* 𝘿𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨`, `𝙀𝙉𝙀𝙍𝙂𝙄𝘼 𝘼𝘾𝙏𝙐𝘼𝙇: ${rpgg.emoticon('stamina')} *${user.stamina}%*\n` + wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${energia[1]}% ${rpgg.emoticon('stamina')}`, '.buy stamina 20'], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`], [`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  ///if (gancho <= 0) return conn.sendButton( m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 10 𝘾𝘼𝙍𝙉𝘼𝘿𝘼 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 10'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 50 𝘾𝘼𝙍𝙉𝘼𝘿𝘼 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 50']], m)
  ///if (canaDePescar <= 0) return conn.sendButton( m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('pancing')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 1 𝘾𝘼Ñ𝘼 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼𝙍 ${rpgshopp.emoticon('pancing')}`, '.buy pancing 1'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 2 𝘾𝘼Ñ𝘼 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼𝙍 ${rpgshopp.emoticon('pancing')}`, '.buy pancing 2']], m)
  ///if (carnadaUser <= 0) return conn.sendButton(m.chat, `𝙉𝙊 𝙏𝙄𝙀𝙉𝙀 *${rpgshop.emoticon('pancingan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 𝙐𝙉 𝙂𝘼𝙉𝘾𝙃𝙊 ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 1'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 2 𝙂𝘼𝙉𝘾𝙃𝙊 ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 2']], m)
  if (new Date - user.lastmancingeasy > 3600000) {
  if (user.pancing > 1) {
  if (user.pancingan > 1) {
  if (user.umpan > 39) {
    
  let resultado1 = `${Math.floor(Math.random() * 20)}`
  let resultado2 = `${Math.floor(Math.random() * 20)}`
  let resultado3 = `${Math.floor(Math.random() * 20)}`
  let resultado4 = `${Math.floor(Math.random() * 20)}`
  let resultado5 = `${Math.floor(Math.random() * 20)}`
  let resultado6 = `${Math.floor(Math.random() * 20)}`
  let resultado7 = `${Math.floor(Math.random() * 20)}`
  let resultado8 = `${Math.floor(Math.random() * 20)}`
  let resultado9 = `${Math.floor(Math.random() * 20)}`
  let resultado10 = `${Math.floor(Math.random() * 20)}`
  let resultado11 = `${Math.floor(Math.random() * 20)}`
  let resultado12 = `${Math.floor(Math.random() * 20)}`
  let resultado13 = `${Math.floor(Math.random() * 20)}`
  
  let total1 = (resultado1 * 1)
  let total2 = (resultado2 * 1) 
  let total3 = (resultado3 * 1)
  let total4 = (resultado4 * 1)
  let total5 = (resultado5 * 1)
  let total6 = (resultado6 * 1)
  let total7 = (resultado7 * 1)
  let total8 = (resultado8 * 1)
  let total9 = (resultado9 * 1)
  let total10 = (resultado10 * 1)
  let total11 = (resultado11 * 1)
  let total12 = (resultado12 * 1)
  let total13 = (resultado13 * 1)
  
  let zero1 = `${total1}`
  let zero2 = `${total2}`
  let zero3 = `${total3}`
  let zero4 = `${total4}`
  let zero5 = `${total5}`
  let zero6 = `${total6}`
  let zero7 = `${total7}`
  let zero8 = `${total8}`
  let zero9 = `${total9}`
  let zero10 = `${total10}`
  let zero11 = `${total11}`
  let zero12 = `${total12}`
  
  let pesca2 = `
  ${htjava} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙎𝙐 𝙋𝙀𝙎𝘾𝘼 ${pescarUsuario} ${htjava}
   🌊🦀🌊 = ${zero2}		   🌊🐠🌊 = ${zero6}
    🌊🦞🌊 = ${zero8}			  🌊🐟🌊 = ${zero11}
   🌊🦐🌊 = ${zero10}			 🌊🐬🌊 = ${zero7}
    🌊🦑🌊 = ${zero4}			  🌊🐳🌊 = ${zero12}
   🌊🐙🌊 = ${zero3}			 🌊🦈🌊 = ${zero9}
    🌊🐡🌊 = ${zero5}			  🌊🐋🌊 = ${zero1} 
    
  𝘽𝙊𝙉𝙊: +1 ${rpgshop.emoticon('tiketcoin')}
  `.trim()
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} 𝙃𝙀𝙔 𝙅𝙐𝙀𝙂𝘼 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 𝙀𝙉 ${rpgg.emoticon('fishingrod')} ${mensajeLugar[1]}`, wm, null, null, null, null, null, [
  [`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊`, '.pescar 2']], null)}, 3600000) 
    
  setTimeout(() => {
  conn.sendButton( m.chat, `${rpgg.emoticon('fishingrod')} ${mensajeLugar[1]}\n` + wm, pesca2, img2, [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], null)}, 35000) 
                                  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca3}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 15000)
         
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca2}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 8000)
    
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 0)
    
  user.lastmancingeasy = new Date * 1
  user.paus += total1
  user.kepiting += total2
  user.gurita += total3
  user.cumi += total4 
  user.buntal += total5
  user.dory += total6
  user.lumba += total7
  user.lobster += total8
  user.hiu += total9
  user.udang += total10
  user.ikan += total1
  user.orca += total2
  user.umpan -= total13
  user.tiketcoin += 1
  user.stamina -= 4 * 1  
    
  } else conn.sendButton( m.chat, `𝙈𝙄𝙉𝙄𝙈𝙊 *${carnada[1]}* 𝘿𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${carnada[1]} ${rpgshopp.emoticon('umpan')}`, '.buy umpan 40'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 100 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 100']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpgshop.emoticon('pancingan')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelDelGancho[1]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[1]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 2'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[2]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 3']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpg.emoticon('fishingrod')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelCanaDePescar[1]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[1]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 2'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[2]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 3']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙔𝘼 𝙁𝙐𝙀 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙀`, `𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀𝙇 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊:\n${tiempoTotal2}\n\n` + wm, [[`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  break
    
  case '3':
  let __temporizador3 = user.lastmancingnormal + 3600000 //1 h
  let tiempoTotal3 = clockString(__temporizador3 - new Date() * 1)
  if (user.level <= 4) return conn.sendButton( m.chat, `${fg}𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙏𝙀𝙉𝙀𝙍 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelUser[2]}*`, `𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: *${user.level}*\n` + wm, [[`𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝙍 𝙈𝙄 𝙉𝙄𝙑𝙀𝙇 ${rpgg.emoticon('level')}`, `.nivel`]], fkontak, m)
  if (user.stamina < 39) return conn.sendButton( m.chat, `${ag}𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝙀𝙉𝙏𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼. 𝙈𝙄𝙉𝙄𝙈𝙊 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼𝙎 𝙐𝙉 *${energia[2]}%* 𝘿𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨`, `𝙀𝙉𝙀𝙍𝙂𝙄𝘼 𝘼𝘾𝙏𝙐𝘼𝙇: ${rpgg.emoticon('stamina')} *${user.stamina}%*\n` + wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${energia[2]}% ${rpgg.emoticon('stamina')}`, '.buy stamina 40'], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`], [`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m)  
  
  if (new Date - user.lastmancingnormal > 3600000) {
  if (user.pancing > 2) {
  if (user.pancingan > 2) {
  if (user.umpan > 79) {
    
  let resultado1 = `${Math.floor(Math.random() * 30)}`
  let resultado2 = `${Math.floor(Math.random() * 30)}`
  let resultado3 = `${Math.floor(Math.random() * 30)}`
  let resultado4 = `${Math.floor(Math.random() * 30)}`
  let resultado5 = `${Math.floor(Math.random() * 30)}`
  let resultado6 = `${Math.floor(Math.random() * 30)}`
  let resultado7 = `${Math.floor(Math.random() * 30)}`
  let resultado8 = `${Math.floor(Math.random() * 30)}`
  let resultado9 = `${Math.floor(Math.random() * 30)}`
  let resultado10 = `${Math.floor(Math.random() * 30)}`
  let resultado11 = `${Math.floor(Math.random() * 30)}`
  let resultado12 = `${Math.floor(Math.random() * 30)}`
  let resultado13 = `${Math.floor(Math.random() * 40)}`
  
  let total1 = (resultado1 * 1)
  let total2 = (resultado2 * 1) 
  let total3 = (resultado3 * 1)
  let total4 = (resultado4 * 1)
  let total5 = (resultado5 * 1)
  let total6 = (resultado6 * 1)
  let total7 = (resultado7 * 1)
  let total8 = (resultado8 * 1)
  let total9 = (resultado9 * 1)
  let total10 = (resultado10 * 1)
  let total11 = (resultado11 * 1)
  let total12 = (resultado12 * 1)
  let total13 = (resultado13 * 1)
  
  let zero1 = `${total1}`
  let zero2 = `${total2}`
  let zero3 = `${total3}`
  let zero4 = `${total4}`
  let zero5 = `${total5}`
  let zero6 = `${total6}`
  let zero7 = `${total7}`
  let zero8 = `${total8}`
  let zero9 = `${total9}`
  let zero10 = `${total10}`
  let zero11 = `${total11}`
  let zero12 = `${total12}`
  
  let pescar3 = `
  ${htjava} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙎𝙐 𝙋𝙀𝙎𝘾𝘼 ${pescarUsuario} ${htjava}
   🌊🦀🌊 = ${zero2}		   🌊🐠🌊 = ${zero6}
    🌊🦞🌊 = ${zero8}			  🌊🐟🌊 = ${zero11}
   🌊🦐🌊 = ${zero10}			 🌊🐬🌊 = ${zero7}
    🌊🦑🌊 = ${zero4}			  🌊🐳🌊 = ${zero12}
   🌊🐙🌊 = ${zero3}			 🌊🦈🌊 = ${zero9}
    🌊🐡🌊 = ${zero5}			  🌊🐋🌊 = ${zero1} 
    
  𝘽𝙊𝙉𝙊: +1 ${rpgshop.emoticon('tiketcoin')}`.trim()
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} 𝙃𝙀𝙔 𝙅𝙐𝙀𝙂𝘼 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 𝙀𝙉 ${rpgg.emoticon('fishingrod')} ${mensajeLugar[2]}`, wm, null, null, null, null, null, [
  [`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊`, '.pescar 3']], null)}, 3600000) 
    
  setTimeout(() => {
  conn.sendButton( m.chat, `${rpgg.emoticon('fishingrod')} ${mensajeLugar[2]}\n` + wm, pescar3, img3, [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], null)}, 35000)
                                  
  setTimeout(() => {
   conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca3}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 15000)
         
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca2}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 8000)
    
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 0)
    
  user.lastmancingnormal = new Date * 1
  user.paus += total1
  user.kepiting += total2
  user.gurita += total3
  user.cumi += total4 
  user.buntal += total5
  user.dory += total6
  user.lumba += total7
  user.lobster += total8
  user.hiu += total9
  user.udang += total10
  user.ikan += total1
  user.orca += total2
  user.umpan -= total13
  user.tiketcoin += 1 
  user.stamina -= 6 * 1     
    
  } else conn.sendButton( m.chat, `𝙈𝙄𝙉𝙄𝙈𝙊 *${carnada[2]}* 𝘿𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${carnada[2]} ${rpgshopp.emoticon('umpan')}`, '.buy umpan 80'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 200 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 200'], [`🏪 𝙏𝙄𝙀𝙉𝘿𝘼 𝙋𝘼𝙍𝘼 𝘾𝙊𝙈𝙋𝙍𝘼𝙍`, '.buy']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpgshop.emoticon('pancingan')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelDelGancho[2]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[2]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 3'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[3]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 4']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpg.emoticon('fishingrod')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelCanaDePescar[2]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[2]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 3'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[3]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 4']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙔𝘼 𝙁𝙐𝙀 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙀`, `𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀𝙇 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊:\n${tiempoTotal3}\n\n` + wm, [[`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  break
   
  case '4':
  let __temporizador4 = user.lastmancinghard + 3600000 
  let tiempoTotal4 = clockString(__temporizador4 - new Date() * 1)
  if (user.level <= 6) return conn.sendButton( m.chat, `${fg}𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙏𝙀𝙉𝙀𝙍 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelUser[3]}*`, `𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: *${user.level}*\n` + wm, [[`𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝙍 𝙈𝙄 𝙉𝙄𝙑𝙀𝙇 ${rpgg.emoticon('level')}`, `.nivel`]], fkontak, m)
  if (user.stamina < 59) return conn.sendButton( m.chat, `${ag}𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝙀𝙉𝙏𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼. 𝙈𝙄𝙉𝙄𝙈𝙊 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼𝙎 𝙐𝙉 *${energia[3]}%* 𝘿𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨`, `𝙀𝙉𝙀𝙍𝙂𝙄𝘼 𝘼𝘾𝙏𝙐𝘼𝙇: ${rpgg.emoticon('stamina')} *${user.stamina}%*\n` + wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${energia[3]}% ${rpgg.emoticon('stamina')}`, '.buy stamina 60'], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`], [`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m)   
  
  if (new Date - user.lastmancinghard > 3600000) {
  if (user.pancing > 3) {
  if (user.pancingan > 3) {
  if (user.umpan > 149) {
    
  let resultado1 = `${Math.floor(Math.random() * 40)}`
  let resultado2 = `${Math.floor(Math.random() * 40)}`
  let resultado3 = `${Math.floor(Math.random() * 40)}`
  let resultado4 = `${Math.floor(Math.random() * 40)}`
  let resultado5 = `${Math.floor(Math.random() * 40)}`
  let resultado6 = `${Math.floor(Math.random() * 40)}`
  let resultado7 = `${Math.floor(Math.random() * 40)}`
  let resultado8 = `${Math.floor(Math.random() * 40)}`
  let resultado9 = `${Math.floor(Math.random() * 40)}`
  let resultado10 = `${Math.floor(Math.random() * 40)}`
  let resultado11 = `${Math.floor(Math.random() * 40)}`
  let resultado12 = `${Math.floor(Math.random() * 40)}`
  let resultado13 = `${Math.floor(Math.random() * 75)}`
  
  let total1 = (resultado1 * 1)
  let total2 = (resultado2 * 1) 
  let total3 = (resultado3 * 1)
  let total4 = (resultado4 * 1)
  let total5 = (resultado5 * 1)
  let total6 = (resultado6 * 1)
  let total7 = (resultado7 * 1)
  let total8 = (resultado8 * 1)
  let total9 = (resultado9 * 1)
  let total10 = (resultado10 * 1)
  let total11 = (resultado11 * 1)
  let total12 = (resultado12 * 1)
  let total13 = (resultado13 * 1)
  
  let zero1 = `${total1}`
  let zero2 = `${total2}`
  let zero3 = `${total3}`
  let zero4 = `${total4}`
  let zero5 = `${total5}`
  let zero6 = `${total6}`
  let zero7 = `${total7}`
  let zero8 = `${total8}`
  let zero9 = `${total9}`
  let zero10 = `${total10}`
  let zero11 = `${total11}`
  let zero12 = `${total12}`
  
  let pescar4 = `
  ${htjava} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙎𝙐 𝙋𝙀𝙎𝘾𝘼 ${pescarUsuario} ${htjava}
   🌊🦀🌊 = ${zero2}		   🌊🐠🌊 = ${zero6}
    🌊🦞🌊 = ${zero8}			  🌊🐟🌊 = ${zero11}
   🌊🦐🌊 = ${zero10}			 🌊🐬🌊 = ${zero7}
    🌊🦑🌊 = ${zero4}			  🌊🐳🌊 = ${zero12}
   🌊🐙🌊 = ${zero3}			 🌊🦈🌊 = ${zero9}
    🌊🐡🌊 = ${zero5}			  🌊🐋🌊 = ${zero1} 
    
  𝘽𝙊𝙉𝙊: +1 ${rpgshop.emoticon('tiketcoin')}
  `.trim()
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} 𝙃𝙀𝙔 𝙅𝙐𝙀𝙂𝘼 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 𝙀𝙉 ${rpgg.emoticon('fishingrod')} ${mensajeLugar[3]}`, wm, null, null, null, null, null, [
  [`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊`, '.pescar 3']], null)}, 3600000) 
    
  setTimeout(() => {
  conn.sendButton( m.chat, `${rpgg.emoticon('fishingrod')} ${mensajeLugar[3]}\n` + wm, pescar4, img4, [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], null)}, 35000)
                                  
  setTimeout(() => {
   conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca3}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 15000)
         
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca2}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 8000)
    
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 0)
    
  user.lastmancinghard = new Date * 1
  user.paus += total1
  user.kepiting += total2
  user.gurita += total3
  user.cumi += total4 
  user.buntal += total5
  user.dory += total6
  user.lumba += total7
  user.lobster += total8
  user.hiu += total9
  user.udang += total10
  user.ikan += total1
  user.orca += total2
  user.umpan -= total13
  user.tiketcoin += 1  
  user.stamina -= 8 * 1  
    
  } else conn.sendButton( m.chat, `𝙈𝙄𝙉𝙄𝙈𝙊 *${carnada[3]}* 𝘿𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${carnada[3]} ${rpgshopp.emoticon('umpan')}`, '.buy umpan 150'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 400 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 400'], [`🏪 𝙏𝙄𝙀𝙉𝘿𝘼 𝙋𝘼𝙍𝘼 𝘾𝙊𝙈𝙋𝙍𝘼𝙍`, '.buy']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpgshop.emoticon('pancingan')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelDelGancho[3]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[3]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 4'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[4]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 5']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpg.emoticon('fishingrod')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelCanaDePescar[3]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[3]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 4'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[4]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 5']], fkontak, m)
  } else return conn.sendButton( m.chat, `𝙔𝘼 𝙁𝙐𝙀 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙀`, `𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀𝙇 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊:\n${tiempoTotal4}\n\n` + wm, [[`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  break
    
  case '5':
  let __temporizador5 = user.lastmancingextreme + 3600000 //1 h
  let tiempoTotal5 = clockString(__temporizador5 - new Date() * 1)
  if (user.level <= 9) return conn.sendButton( m.chat, `${fg}𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙏𝙀𝙉𝙀𝙍 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelUser[4]}*`, `𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: *${user.level}*\n` + wm, [[`𝘼𝘾𝙏𝙐𝘼𝙇𝙄𝙕𝘼𝙍 𝙈𝙄 𝙉𝙄𝙑𝙀𝙇 ${rpgg.emoticon('level')}`, `.nivel`]], fkontak, m)
  if (user.stamina < 90) return conn.sendButton( m.chat, `${ag}𝙉𝙊 𝙏𝙄𝙀𝙉𝙀𝙎 𝙎𝙐𝙁𝙄𝙀𝙉𝙏𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼. 𝙈𝙄𝙉𝙄𝙈𝙊 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼𝙎 𝙐𝙉 *${energia[4]}%* 𝘿𝙀 𝙀𝙉𝙀𝙍𝙂𝙄𝘼 ✨`, `𝙀𝙉𝙀𝙍𝙂𝙄𝘼 𝘼𝘾𝙏𝙐𝘼𝙇: ${rpgg.emoticon('stamina')} *${user.stamina}%*\n` + wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${energia[4]}% ${rpgg.emoticon('stamina')}`, '.buy stamina 90'], [`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`], [`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m)   
  
  if (new Date - user.lastmancingextreme > 3600000) {
  if (user.pancing > 4) {
  if (user.pancingan > 4) {
  if (user.umpan > 199) {
    
  let resultado1 = `${Math.floor(Math.random() * 100)}`
  let resultado2 = `${Math.floor(Math.random() * 100)}`
  let resultado3 = `${Math.floor(Math.random() * 100)}`
  let resultado4 = `${Math.floor(Math.random() * 100)}`
  let resultado5 = `${Math.floor(Math.random() * 100)}`
  let resultado6 = `${Math.floor(Math.random() * 100)}`
  let resultado7 = `${Math.floor(Math.random() * 100)}`
  let resultado8 = `${Math.floor(Math.random() * 100)}`
  let resultado9 = `${Math.floor(Math.random() * 100)}`
  let resultado10 = `${Math.floor(Math.random() * 100)}`
  let resultado11 = `${Math.floor(Math.random() * 100)}`
  let resultado12 = `${Math.floor(Math.random() * 100)}`
  let resultado13 = `${Math.floor(Math.random() * 100)}`
  
  let total1 = (resultado1 * 1)
  let total2 = (resultado2 * 1) 
  let total3 = (resultado3 * 1)
  let total4 = (resultado4 * 1)
  let total5 = (resultado5 * 1)
  let total6 = (resultado6 * 1)
  let total7 = (resultado7 * 1)
  let total8 = (resultado8 * 1)
  let total9 = (resultado9 * 1)
  let total10 = (resultado10 * 1)
  let total11 = (resultado11 * 1)
  let total12 = (resultado12 * 1)
  let total13 = (resultado13 * 1)
  
  let zero1 = `${total1}`
  let zero2 = `${total2}`
  let zero3 = `${total3}`
  let zero4 = `${total4}`
  let zero5 = `${total5}`
  let zero6 = `${total6}`
  let zero7 = `${total7}`
  let zero8 = `${total8}`
  let zero9 = `${total9}`
  let zero10 = `${total10}`
  let zero11 = `${total11}`
  let zero12 = `${total12}`
  
  let pescar5 = `${htjava} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙎𝙐 𝙋𝙀𝙎𝘾𝘼 ${pescarUsuario} ${htjava}
   🌊🦀🌊 = ${zero2}		   🌊🐠🌊 = ${zero6}
    🌊🦞🌊 = ${zero8}			  🌊🐟🌊 = ${zero11}
   🌊🦐🌊 = ${zero10}			 🌊🐬🌊 = ${zero7}
    🌊🦑🌊 = ${zero4}			  🌊🐳🌊 = ${zero12}
   🌊🐙🌊 = ${zero3}			 🌊🦈🌊 = ${zero9}
    🌊🐡🌊 = ${zero5}			  🌊🐋🌊 = ${zero1} 
    
  𝘽𝙊𝙉𝙊: +1 ${rpgshop.emoticon('tiketcoin')}`.trim()
  
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} 𝙃𝙀𝙔 𝙅𝙐𝙀𝙂𝘼 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊 𝘼 𝙋𝙀𝙎𝘾𝘼𝙍 𝙀𝙉 ${rpgg.emoticon('fishingrod')} ${mensajeLugar[4]}`, wm, null, null, null, null, null, [
  [`${rpgg.emoticon('fishingrod')} 𝙋𝙀𝙎𝘾𝘼𝙍 𝘿𝙀 𝙉𝙐𝙀𝙑𝙊`, '.pescar 3']], null)}, 3600000) 
    
  setTimeout(() => {
  conn.sendButton( m.chat, `${rpgg.emoticon('fishingrod')} ${mensajeLugar[4]}\n` + wm, pescar5, img5, [[`🎒 𝙄𝙉𝙑𝙀𝙉𝙏𝘼𝙍𝙄𝙊 : 𝙄𝙉𝙑𝙀𝙉𝙏𝙊𝙍𝙔`, `.inventario`]], null)}, 35000)
                                  
  setTimeout(() => {
   conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca3}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 15000)
         
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca2}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 8000)
    
  setTimeout(() => {
  conn.sendHydrated(m.chat, `${pescarUsuario} ${mensajePesca}`, wm, null, null, null, null, null, [
  [null, null]], null)}, 0)
    
  user.lastmancingextreme = new Date * 1
  user.paus += total1
  user.kepiting += total2
  user.gurita += total3
  user.cumi += total4 
  user.buntal += total5
  user.dory += total6
  user.lumba += total7
  user.lobster += total8
  user.hiu += total9
  user.udang += total10
  user.ikan += total1
  user.orca += total2
  user.umpan -= total13
  user.tiketcoin += 1  
  user.stamina -= 10 * 1  
    
  } else conn.sendButton( m.chat, `𝙈𝙄𝙉𝙄𝙈𝙊 *${carnada[4]}* 𝘿𝙀 *${rpgshop.emoticon('umpan')}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 ${carnada[4]} ${rpgshopp.emoticon('umpan')}`, '.buy umpan 200'], [`𝘾𝙊𝙈𝙋𝙍𝘼𝙍 800 ${rpgshopp.emoticon('umpan')}`, '.buy umpan 800'], [`🏪 𝙏𝙄𝙀𝙉𝘿𝘼 𝙋𝘼𝙍𝘼 𝘾𝙊𝙈𝙋𝙍𝘼𝙍`, '.buy']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpgshop.emoticon('pancingan')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelDelGancho[4]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[4]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 5'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[5]} ${rpgshopp.emoticon('pancingan')}`, '.buy pancingan 6']], fkontak, m)
  } else conn.sendButton( m.chat, `𝙎𝙐 *${rpg.emoticon('fishingrod')}* 𝙉𝙀𝘾𝙀𝙎𝙄𝙏𝘼 𝙀𝙇 𝙉𝙄𝙑𝙀𝙇 *${nivelCanaDePescar[4]}* 𝙋𝘼𝙍𝘼 𝙋𝙀𝙎𝘾𝘼𝙍`, wm, [[`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[4]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 5'], [`𝙎𝙐𝘽𝙄𝙍 𝘼𝙇 𝙉𝙄𝙑𝙀𝙇 ${nivelCanaDePescar[5]} ${rpgg.emoticon('fishingrod')}`, '.buy pancing 6']], fkontak, m)
  } else return conn.sendButton( m.chat, `𝙔𝘼 𝙁𝙐𝙀 𝘿𝙀 𝙋𝙀𝙎𝘾𝘼 𝙋𝙊𝙍 𝙁𝘼𝙑𝙊𝙍 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙀`, `𝙏𝙄𝙀𝙈𝙋𝙊 𝘿𝙀𝙇 𝘿𝙀𝙎𝘾𝘼𝙉𝙎𝙊:\n${tiempoTotal5}\n\n` + wm, [[`𝗠 𝗘 𝗡 𝗨 ☘️`, `.menu`]], fkontak, m) 
  break
   
  default:
  return await conn.sendMessage(m.chat, listMessage, {quoted: fkontak} )}}
  } catch (e) {
  await conn.reply(m.chat, "```ERROR AL INTENTAR PESCAR\n\nREPORTE ESTE COMANDO CON EL COMANDO #REPORTE```", m)
  console.log(e)
  }}
  
  handler.help = ['fishing <args>']
  handler.tags = ['rpg']
  handler.command = /^(fishing|mancing|pescar)$/i
  export default handler
  handler.rowner = true
  function pickRandom(list) {
      return list[Math.floor(Math.random() * list.length)]
  }
  function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000) % 30
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return ['┃⇢ ', d, ' *☀️ Días*\n', '┃⇢ ', h, ' *⏰ Horas*\n', '┃⇢ ', m, ' *🕐 Minutos : Minutes*\n', '┃⇢ ', s, ' *⏱️ Segundoss*'].map(v => v.toString().padStart(2, 0)).join('')
  }