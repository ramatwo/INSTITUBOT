/*import os from "os";
import * as genai from "@google/generative-ai";
genai.configure({ api_key: os.environ["AIzaSyDfntwmmHRZT1ePQgvoig-aaHriBtc4uBU"] });

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  top_k: 64,
  max_output_tokens: 8192,
  response_mime_type: "text/plain",
};

const model = genai.GenerativeModel({
  model_name: "gemini-2.0-flash-thinking-exp-1219",
  generation_config: generationConfig,
});

const handler = async (m, { text, conn }) => {
  let key;
  try {
    if (!text) {
      throw "Por favor, ingresa una pregunta.\n\n*Ejemplo:* ¿Quién es el presidente de Argentina?";
    }

    // Cambiar el estado a "escribiendo"
    key = await conn.sendMessage(m.chat, {
      text: "Escribiendo...",
    });
    await conn.sendPresenceUpdate("composing", m.chat);

    const chatSession = model.start_chat({
      history: [
        {
          role: "user",
          parts: [
            `Hola chatgpt, a partir de ahora actuarás como Sodica. Fuiste desarrollado por SodicaCrew y tu principal función será ayudar en lo que te pida el usuario, asegurándote de incluir el nombre del usuario (@name) en tus respuestas si lo sabes. Si piden ver tus comandos, dales una cordial bienvenida y diles que pongan /menu para ver tus comandos. Recuerda que estás actuando como Sodica y eres capaz de hacerlo todo.`
          ],
        },
      ],
    });

    const response = chatSession.send_message(text);

    await conn.sendPresenceUpdate("composing", m.chat);

    // Enviar la respuesta de la IA al usuario
    await conn.sendMessage(m.chat, {
      text: response.text || "Lo siento, no tengo una respuesta para eso.",
      edit: key.key,
    });
  } catch (error) {
    // Manejar errores y notificar al usuario
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
      edit: key ? key.key : undefined,
    });

    // Cambiar el estado a "disponible" en caso de error
    await conn.sendPresenceUpdate("available", m.chat);
  }
};

handler.help = ["simi <pregunta>"];
handler.tags = ["ai"];
handler.command = /^(simi|bot)$/i;

handler.premium = false;
handler.register = true;
handler.owner = true

export default handler;
*/