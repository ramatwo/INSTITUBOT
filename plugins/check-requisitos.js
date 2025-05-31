let handler = async (m, { isAdmin, isBotAdmin, groupMetadata }) => {
    let chat = global.db.data.chats[groupMetadata.id];
    
    let modoadmin = chat.modoadmin ? '✅' : '❌ ACTIVAR CON #on modoadmin';
    let botAdmin = isBotAdmin ? '✅' : '❌ HACER ADMINISTRADOR DE INMEDIATO.';
    let minMembers = groupMetadata.participants.length > 80 ? '✅' : '❌';
   // let gconly = global.opts['gconly'] ? '✅' : '❌'
    
    let text = `*Este grupo cumple con los requisitos?:*
- ModoAdmin: ${modoadmin}
- Bot admin: ${botAdmin}
- Miembros mínimos: ${minMembers}`;

    m.reply(text);
}

handler.command = /^chkreq$/i;
handler.group = true;
handler.admin = true;
handler.register = true
export default handler;
