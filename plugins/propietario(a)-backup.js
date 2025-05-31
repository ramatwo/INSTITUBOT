import createBackup from '../lib/auto-backup.js';

let handler = async (m, { conn }) => {
    await m.reply('⏳ Creando respaldo...');
    createBackup();
    await m.reply('✅ Respaldo creado con éxito.');
};

handler.command = /^(backup|respaldo)$/i;
handler.rowner = true; // Solo el propietario puede usar este comando

export default handler;