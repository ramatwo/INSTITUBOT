let handler = async (m, { conn }) => {
    try {
      // Mensaje de espera
      const waitMessage = "💾 Acomodando top...";
      await m.reply(waitMessage);
  
      // Obtener todos los usuarios de la base de datos
      let users = Object.entries(global.db.data.users).map(([key, value]) => ({
        ...value,
        jid: key,
      }));
  
      // Ordenar los usuarios por nivel descendente
      let topUsers = users
        .filter(user => user.level) // Filtrar solo usuarios con nivel definido
        .sort((a, b) => b.level - a.level)
        .slice(0, 10); // Obtener los 10 primeros
  
      // Resetear el nivel de los usuarios seleccionados a 1
      for (let user of topUsers) {
        global.db.data.users[user.jid].level = 1;
      }
  
      // Mensaje de confirmación
      const confirmationMessage = "✅ Top acomodado correctamente.";
      await m.reply(confirmationMessage);
  
    } catch (error) {
      // En caso de error
      console.error(error);
      await m.reply("❌ Ocurrió un error al intentar procesar el comando.");
    }
  };
  
  handler.help = ['resetTop'];
  handler.tags = ['xp'];
  handler.command = ['resettop', 'topreset']; // Comandos alternativos
  handler.fail = null;
  handler.exp = 0;
  handler.register = true;
  handler.rowner = true; // Solo el propietario del bot puede usar este comando
  
  export default handler;
  