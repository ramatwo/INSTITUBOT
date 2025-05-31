let handler = async (m, { conn }) => {
    m.react('🎲')
    let dados=[
      './src/game/dado/1.webp',
      './src/game/dado/2.webp',
      './src/game/dado/3.webp',
      './src/game/dado/4.webp',
      './src/game/dado/5.webp',
      './src/game/dado/6.webp',
    ]
    let url = dados[Math.floor(Math.random() * dados.length)]
    conn.sendFile(m.chat, url, 'error.webp', null, m, { asSticker: true, packname: global.packname, author: global.author })
}
handler.command = ['dado', 'dados', 'dadu'] 
handler.owner = false
export default handler