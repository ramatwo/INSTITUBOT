import fetch from 'node-fetch';

const handler = async (m, { text, command }) => {
    if (!text) throw `❌ Ingresa una consulta o petición para usar la función de ChatGPT.\n\nEjemplo:\n- .${command} ¿Cuál es la capital de Francia?\n- .${command} Dame un código en JavaScript para sumar dos números.`;

    // Reaccionar con un reloj de arena
    await m.react('⏳');

    const user = global.db.data.users[m.sender] || {};
    const userName = await conn.getName(m.sender);
    const userNumber = m.sender.split('@')[0];

    // Prompt personalizado para ChatGPT
    const prompt = `
Eres SodicaBot, un asistente desarrollado para WhatsApp(sos argentino, pero no exageres, habla argentino normal). Tu tarea es responder preguntas y ayudar a los usuarios. 
El usuario que te consulta tiene la siguiente información:
- Nombre: ${userName || 'Desconocido'}
- Número: ${userNumber}
- Nivel: ${user.level || 'No registrado'}
- Dinero: ${user.money || 0}
- Diamantes: ${user.diamante || 0}

Responde de manera amigable y útil. Si no puedes responder algo, sé honesto y ofrece ayuda alternativa.
`;

    try {
        const response = await fetch(`https://delirius-apiofc.vercel.app/ia/gptweb?text=${encodeURIComponent(prompt + '\n\n' + text)}`);
        const result = await response.json();
        await m.react('✅');
        if (result.status) {
            await m.reply("*>*"+ result.data);
        } else {
            throw new Error('Error al obtener respuesta de la API.');
        }
    } catch (error) {
        console.error(error);
        await m.reply('❌ Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.');
    }
};

handler.command = /^(openai|chatgpt|ia|ai|bot)$/i;
handler.register = true;
export default handler;
