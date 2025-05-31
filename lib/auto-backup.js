import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';
import AdmZip from 'adm-zip'; // Importar la biblioteca adm-zip

// Obtener el directorio actual en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databaseDir = path.join(__dirname, '../database'); // Ruta de la carpeta de la base de datos
const backupDir = path.join(__dirname, '../backups'); // Ruta de la carpeta de backups
const maxBackups = 5; // Número máximo de respaldos a mantener

// Crear la carpeta de backups si no existe
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

// Función para realizar el respaldo
const createBackup = () => {
    const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm-ss'); // Fecha y hora del respaldo
    const backupFile = path.join(backupDir, `backup_${timestamp}.zip`);

    try {
        // Crear un archivo ZIP con la carpeta de la base de datos
        const zip = new AdmZip();
        zip.addLocalFolder(databaseDir); // Agregar la carpeta de la base de datos al ZIP
        zip.writeZip(backupFile); // Guardar el archivo ZIP

        console.log(`[✅] Respaldo creado: ${backupFile}`);
    } catch (error) {
        console.error(`[❌] Error al crear el respaldo: ${error.message}`);
    }
};

// Función para eliminar respaldos antiguos
const cleanOldBackups = () => {
    const backups = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('backup_') && file.endsWith('.zip'))
        .sort((a, b) => fs.statSync(path.join(backupDir, b)).mtimeMs - fs.statSync(path.join(backupDir, a)).mtimeMs);

    while (backups.length > maxBackups) {
        const oldestBackup = backups.pop();
        fs.unlinkSync(path.join(backupDir, oldestBackup));
        console.log(`[🗑️] Respaldo eliminado: ${oldestBackup}`);
    }
};

// Realizar el respaldo al 
cleanOldBackups();

// Exportar la función para usarla en otros lugares si es necesario
export default createBackup;