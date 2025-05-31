import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `no se usa asi.`
const prohibited = ['pinga','jordy','gang','maduros','rentai','cola','cerditas','xhamster','chochox','gentai','tragando','gangbang','desnudota','desnudita','sin ropa','fentai','nudista','concha','papo','ano','tits','x videos','videos x','brazers','brazzers','orgia','milf','por no','pórno','lentai','rule','34','rúlé','rúle','rulé','sentai','penetracion','henta','tet4s','ñentai','jentay','hentay','jentai','hentai', 'caca', 'polla', 'porno', 'porn', 'gore', 'cum', 'semen', 'puta', 'puto', 'culo', 'putita', 'putito','pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia', 'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos', 'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may', 'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx', 'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga', 'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari', 'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob', 'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation', 'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin', 'lana rhoades', 'cepesito', 'hot', 'buceta', 'xxx', 'Violet Myllers', 'Violet Myllers pussy', 'Violet Myllers desnuda', 'Violet Myllers sin ropa', 'Violet Myllers culo', 'Violet Myllers vagina', 'Pornografía', 'Pornografía infantil', 'niña desnuda', 'niñas desnudas', 'niña pussy', 'niña pack', 'niña culo', 'niña sin ropa', 'niña siendo abusada', 'niña siendo abusada sexualmente' , 'niña cogiendo', 'niña fototeta', 'niña vagina', 'hero Boku no pico', 'Mia Khalifa cogiendo', 'Mia Khalifa sin ropa', 'Mia Khalifa comiendo polla', 'Mia Khalifa desnuda']
if (prohibited.some(word => m.text.toLowerCase().includes(word))) return m.reply('no.')      
const res = await googleImage(text)
let image = res.getRandom()
let link = image
conn.sendFile(m.chat, link, 'error.jpg', `*Resultado de: ${text}*`, m)
}
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['internet', 'tools']
handler.command = /imagen/i
handler.premium = true
export default handler