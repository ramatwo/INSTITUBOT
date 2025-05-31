import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = './codes/gmailmanager/token.json'; // Cambia la ruta según tu estructura de carpetas
const CREDENTIALS_PATH = './codes/gmailmanager/credentials.json'; // Asegúrate de que este archivo esté en el directorio correcto

async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
    } catch (error) {
        console.log('Token no encontrado. Generando uno nuevo...');
        await getAccessToken(oAuth2Client); // Genera un nuevo token si no existe
    }

    // Si el token de acceso ha expirado, usa el token de renovación para obtener uno nuevo
    if (oAuth2Client.isTokenExpiring()) {
        try {
            const { credentials } = await oAuth2Client.refreshAccessToken();
            oAuth2Client.setCredentials(credentials);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials)); // Guarda el nuevo token
            console.log('Token renovado y almacenado.');
        } catch (error) {
            console.error('Error al renovar el token', error);
        }
    }

    return oAuth2Client;
}

async function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Permite obtener el refresh token
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    
    // Agrega el código de autorización aquí
    const authCode = '4/0AVG7fiT2SnMbg4wgFFB_v8bQIiS6iziE2UsgpZsDnmh30MuOtwramq1KR0T1mMeVIymGlg'; // Reemplaza esto con el código real
    const { tokens } = await oAuth2Client.getToken(authCode);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens)); // Guarda el token en token.json
    console.log('Token almacenado en', TOKEN_PATH);
}

async function getNetflixCode(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'from:info@account.netflix.com', // Filtra por el correo de Netflix
        maxResults: 1, // Solo buscamos el último correo
    });

    const messages = res.data.messages;
    if (messages && messages.length) {
        const message = await gmail.users.messages.get({
            userId: 'me',
            id: messages[0].id,
        });

        const data = message.data.payload.parts[0].body.data;
        const emailBody = Buffer.from(data, 'base64').toString('utf-8');
        const codeMatch = emailBody.match(/(\d{4})/); // Busca el código de 4 dígitos

        if (codeMatch) {
            return codeMatch[0]; // Retorna el código encontrado
        }
    }

    throw new Error('No se encontró el código de Netflix.');
}

let handler = async (m, { isROwner }) => {
    if (!isROwner) {
    let chat = m.chat; 
    if (chat !== '120363197086485243@g.us') {
        return await m.reply('*⫹⫺ ➭⛔ ∫* Este comando solo se puede usar en el grupo autorizado.');
    }
}
    await m.reply('📧 Buscando el último correo de Netflix con el código...');
    
    try {
        const auth = await authorize();
        const code = await getNetflixCode(auth);
        await m.reply(`El código de Netflix es: ${code}`);
    } catch (error) {
        await m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^getncode$/i; // El comando para activar este handler
handler.premium = true;
export default handler;
