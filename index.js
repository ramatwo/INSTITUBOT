import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';

import { EventEmitter } from 'events';
import chalk from 'chalk';

import os from 'os';
import { promises as fsPromises } from 'fs';
import http from 'http';
import { exec } from 'child_process';
import createBackup from './lib/auto-backup.js';

// Aumentar límite de listeners
EventEmitter.defaultMaxListeners = 50;

// Definir __dirname en ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));

// Interfaz de consola
const rl = createInterface(process.stdin, process.stdout);

// Banner de bienvenida
cfonts.say('Institu\nBot', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
});



// Mostrar información del sistema y versión
async function mostrarInfo() {
  // Servidor HTTP de estado
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('sodicabot en línea.\n');
});
server.listen(5657, 'localhost', () => {
  console.log('El servidor está corriendo en http://localhost:5657/');
});

// Ejecutar ngrok automáticamente (mantener configuración original)
[  `ngrok config add-authtoken 2bvHiBG6YpjgXkzyU8qacryaSfi_8a5EeDupCCKryrYGz97Xg`,  `ngrok http --domain=pigeon-steady-quail.ngrok-free.app 5657`]
  .forEach(cmd => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return console.error(`Error: ${err.message}`);
      if (stderr) return console.error(`ngrok stderr: ${stderr}`);
      console.log(`ngrok: ${stdout}`);
    });
  });

  const ramInGB = os.totalmem() / (1024 * 1024 * 1024)
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024)
  const packageJsonPath = './package.json';
  try {
      const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
      const packageJsonObj = JSON.parse(packageJsonData);
      const currentTime = new Date().toLocaleString();
      let lineM = '⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》';
  
      console.log(chalk.yellow(`╭${lineM}
  ┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ┊${chalk.blueBright('┊')}${chalk.yellow(`🖥️ ${os.type()}, ${os.release()} - ${os.arch()}`)}
  ┊${chalk.blueBright('┊')}${chalk.yellow(`💾 RAM total: ${ramInGB.toFixed(2)} GB`)}
  ┊${chalk.blueBright('┊')}${chalk.yellow(`💽 RAM libre: ${freeRamInGB.toFixed(2)} GB`)}
  ┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ┊${chalk.blueBright('┊')} ${chalk.blue.bold(`ℹ️ INFORMACIÓN :`)}
  ┊${chalk.blueBright('┊')} ${chalk.blueBright('┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')} 
  ┊${chalk.blueBright('┊')}${chalk.cyan(`📌 Versión: ${packageJsonObj.version}`)}
  ┊${chalk.blueBright('┊')}${chalk.cyan(`👤 Autor: ${packageJsonObj.author.name}`)}
  ┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ┊${chalk.blueBright('╭┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ┊${chalk.blueBright('┊')}${chalk.cyan(`⏰ Hora Actual :`)}
  ┊${chalk.blueBright('┊')}${chalk.cyan(`${currentTime}`)}
  ┊${chalk.blueBright('╰┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅')}
  ╰${lineM}`));
    } catch (err) {
      console.error(chalk.red(`❌ No se pudo leer el archivo package.json: ${err}`));
    }
}

// Función principal de arranque
let isRunning = false;
async function start(file) {
  if (isRunning) return;
  isRunning = true;
  const args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });
  const child = fork();

  child.on('message', msg => {
    if (msg === 'reset') {
      child.process.kill();
      isRunning = false;
      start(file);
    }
    if (msg === 'uptime') child.send(process.uptime());
  });

  child.on('exit', code => {
    isRunning = false;
    console.error('⚠️ ERROR ⚠️ >>', code);
    if (code !== 0) {
      watchFile(args[0], () => {
        unwatchFile(args[0]);
        start(file);
      });
    }
  });

  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
  if (!opts.test && !rl.listenerCount('line')) {
    rl.on('line', line => child.emit('message', line.trim()));
  }
}

// Antes de iniciar, preguntar por backup

rl.question('¿Deseas hacer backup de la base de datos? (s/n / y/n): ', async answer => {
  const ans = answer.trim().toLowerCase();
  if (['s', 'si', 'y', 'yes'].includes(ans)) {
    console.log('Creando respaldo, aguarda...');
    try {
      await createBackup();
      console.log('Respaldo completado.');
    } catch (e) {
      console.error('Error creando respaldo:', e);
    }
  } else {
    console.log('Continuando sin crear respaldo...');
  }

  // Mostrar info y arrancar el bot como antes
  await mostrarInfo();
  start('main.js');
});
