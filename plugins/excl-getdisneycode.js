import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = './codes/gmailmanager/tokendisney.json'; 
const CREDENTIALS_PATH = './codes/gmailmanager/credentialsdisney.json'; 

async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
        oAuth2Client.setCredentials(token);

        // Renueva el token si está cerca de expirar
        if (oAuth2Client.isTokenExpiring()) {
            const { credentials } = await oAuth2Client.refreshAccessToken();
            oAuth2Client.setCredentials(credentials);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials));
            console.log('Token renovado y almacenado.');
        }
    } catch (error) {
        console.log('Token no encontrado o inválido. Generando uno nuevo...');
        await getAccessToken(oAuth2Client);
    }

    return oAuth2Client;
}

async function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Permite obtener el refresh token
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const authCode = '4/0Ab_5qllx260TQezLvpHL-O1_0Q5IUGCFiTtskEnJxcyOSgQwvCWtvrqB-zkHjjgOlmJz5g';
    const { tokens } = await oAuth2Client.getToken(authCode);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log('Token almacenado en', TOKEN_PATH);
}

async function getDisneyCode(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const res = await gmail.users.messages.list({
        userId: 'me',
        q: 'from:disneyplus@mail2.disneyplus.com',
        maxResults: 1,
    });

    const messages = res.data.messages;
    if (!messages || messages.length === 0) {
        throw new Error('No se encontraron correos recientes de Disney+.');
    }

    const message = await gmail.users.messages.get({
        userId: 'me',
        id: messages[0].id,
    });

    const data =
        message.data.payload.parts?.[0]?.body?.data || 
        message.data.payload?.body?.data;

    if (!data) {
        throw new Error('No se pudo leer el contenido del correo.');
    }

    const emailBody = Buffer.from(data, 'base64').toString('utf-8');
    const lines = emailBody.split('\n');
    const codeMatch = lines.find(line => /^\d{6}$/.test(line.trim()));

    if (codeMatch) {
        return codeMatch.trim();
    } else {
        throw new Error('No se encontró un código de 6 dígitos en el correo.');
    }
}

let handler = async (m, { isROwner }) => {
    if (!isROwner) {
    let chat = m.chat; 
    if (chat !== '120363197086485243@g.us') {
        return await m.reply('*⫹⫺ ➭⛔ ∫* Este comando solo se puede usar en el grupo autorizado.');
    }}
    await m.reply('📧 Buscando el último correo de Disney+ con el código...');
    
    try {
        const auth = await authorize();
        const code = await getDisneyCode(auth);
        await m.reply(`El código de Disney+ es: ${code}`);
    } catch (error) {
        await m.reply(`Error: ${error.message}`);
    }
};

handler.command = /^getdcode$/i;
handler.premium = true;
export default handler;

