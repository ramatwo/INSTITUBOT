let handler = async (m) => {
    // Definimos la función pickRandom
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Generamos el mensaje
    let teks = `${pickRandom([
        `No importa lo que lleves vestido princesa,con tu linda sonrisa siempre estarás preciosa`,
        `Anoche soñé contigo y vos y era un cuento de hadas,vos eras mi princesa encantada y yo tu príncipe azul`,
        `No te hace falta ser princesa para reinar en mi corazón 
Para mí no hay nadie mejor con quién compartir mi amor`,
      
    ])}`.trim();
    // Enviamos el mensaje sin acotar
    await conn.sendMessage(m.chat, { text: teks });
};

handler.help = ['noe'];
handler.tags = ['main'];
handler.command = /^princesa$/i;

export default handler;
