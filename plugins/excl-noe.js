let handler = async (m) => {
    // Definimos la función pickRandom
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Generamos el mensaje
    let teks = `${pickRandom([
        `Noe, 🌹 eres la flor más hermosa en el jardín de la vida.`,
        `Cada vez que pienso en ti, el mundo parece más brillante. ✨`,
        `Tu sonrisa 💖 ilumina incluso los días más grises.`,
        `Eres la melodía 🎵 que da ritmo a mi corazón.`,
        `Noe, eres como un rayo de sol 🌞 que calienta mi alma.`,
        `Si las estrellas ✨ hablasen, susurrarían tu nombre.`,
        `Eres el arcoíris 🌈 después de cualquier tormenta.`,
        `Noe, cuando apareces, los problemas desaparecen como por arte de magia. 🪄`,
        `Tu dulzura 🍯 no tiene comparación, Noe.`,
        `Eres mi fuente de inspiración 🌟 y alegría.`,
        `Vivo y te pienso, duermo y te sueño. 💭`,
        `Vivo y te tengo, mi niña bonita, mi dulce princesa. 👑`,
        `Eres un 💎 precioso, mi felicidad eterna.`,
        `Pensé que lo tenía todo, pero faltabas vos. ❤️`,
        `Te adoro, querida hermosa, eres el paraíso que quiero vivir cada día. 🌴`
    ])}`.trim();
    // Enviamos el mensaje sin acotar
    await conn.sendMessage(m.chat, { text: teks });
};

handler.help = ['noe'];
handler.tags = ['main'];
handler.command = /^noe$/i;

export default handler;
