let handler = m => m;

let bioTimer;  // Variable para almacenar el temporizador

handler.all = async function (m) {
    let setting = global.db.data.settings[this.user.jid];

    let updateBio = async () => {
        let gconly = global.opts['gconly'] ? '❌' : '✅';
        let bio = `⏤͟͞🪀 SodicaBot v${global.vs} 📌 usá .registrar 📂 Chats Privados: ${gconly}`;
        try {
            await this.updateProfileStatus(bio);
            console.log("BIO ACTUALIZADA");
            setting.status = new Date() * 500000;
        } catch (error) {
          //  console.error("Error al actualizar la bio:", error);
        }
    };

    if (!bioTimer) {  // Verifica si ya existe un temporizador
        // Actualiza la bio cada minuto (60000 ms)
        bioTimer = setInterval(updateBio, 120000);
        console.log("BIO ACTUALIZADA");
        // Llama a la función de actualización inmediatamente al iniciar
        //await updateBio();
    }
};

export default handler;
