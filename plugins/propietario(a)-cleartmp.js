import { tmpdir } from 'os'
import path, { join } from 'path'
import { readdirSync, statSync, unlinkSync } from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => { 
    const tmp = [tmpdir(), join(__dirname, '../tmp')]
    const filename = []
    
    tmp.forEach(dirname => {
        readdirSync(dirname).forEach(file => {
            filename.push(join(dirname, file))
        })
    })
    
    filename.forEach(file => {
        try {
            const stats = statSync(file)
            unlinkSync(file)
        } catch (error) {
            console.error(`Error al eliminar el archivo ${file}:`, error)
        }
    })
    
    conn.reply(m.chat, `Los archivos temporales fueron eliminados.`, m)
}

// NO USAR ESTE COMANDO EN HEROKU | DO NOT USE THIS COMMAND ON HEROKU
handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = /^(cleartmp|cleartemp|borrartmp|eliminartmp|borrartemp|borrartemp)$/i
handler.rowner = true

export default handler
