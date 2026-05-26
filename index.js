import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import { createInterface } from 'readline'
import cfonts from 'cfonts'
import chalk from 'chalk'
import os from 'os'

const __dirname = dirname(fileURLToPath(import.meta.url))

cfonts.say('Institu\nBot', {
  font: 'chrome',
  align: 'center',
  gradient: ['cyan', 'blue'],
})

const ramTotal = (os.totalmem() / 1024 ** 3).toFixed(2)
const ramLibre = (os.freemem() / 1024 ** 3).toFixed(2)
const hora = new Date().toLocaleString('es-AR', { hour12: false })

console.log(chalk.cyan(`
  +------------------------------+
  |      InstituBot  v1.2.3      |
  |    Sistema de Comunicados    |
  +------------------------------+
  | OS:   ${os.type()} ${os.arch()}
  | RAM:  ${ramLibre}GB libre / ${ramTotal}GB total
  | HORA: ${hora}
  +------------------------------
`))

let isRunning = false

async function start(file) {
  if (isRunning) return
  isRunning = true

  const args = [join(__dirname, file), ...process.argv.slice(2)]
  setupMaster({ exec: args[0], args: args.slice(1) })
  const child = fork()

  child.on('message', (msg) => {
    if (msg === 'reset') {
      child.kill('SIGTERM')
      isRunning = false
      start(file)
    }
  })

  child.on('exit', (code) => {
    isRunning = false
    if (code !== 0 && code !== null) {
      console.error(chalk.red(`\n[❌] El proceso terminó con código ${code}.`))
      watchFile(args[0], () => {
        unwatchFile(args[0])
        //reiniciar proceso cuando agarra cambios 
        start(file)
      })
    }
  })

  const rl = createInterface(process.stdin, process.stdout)
  rl.on('line', (line) => {
    const trimmed = line.trim()
    if (trimmed) child.emit('message', trimmed)
  })
}

start('main.js')
