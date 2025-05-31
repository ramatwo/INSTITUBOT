let handler = m => m;
handler.before = async function (m, { conn, isBotAdmin }) {
    if (!m.isGroup) return !1;
    let chat = global.db.data.chats[m.chat];
    if (isBotAdmin && chat.antifake) {
        const prefijos = new Set([
            '2', '7', '20', '21', '27', '30', '31', '32', '33', '40', '41', '43', '44', 
            '45', '46', '47', '48', '49', '63', '65', '66', '81', '82', '84', '86', 
            '91', '92', '93', '94', '95', '96', '211', '213', '220', '221', '222', 
            '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', 
            '234', '237', '239', '240', '241', '243', '246', '247', '249', '251', 
            '255', '257', '260', '262', '263', '265', '266', '267', '298', '299', 
            '350', '351', '357', '358', '359', '372', '375', '377', '378', '380', 
            '381', '386', '387', '389', '420', '421', '677', '678', '679', '680', 
            '681', '682', '683', '684', '686', '687', '688', '689', '690', '691', 
            '692', '850', '852', '853', '855', '856', '886', '960', '961', '962', 
            '963', '964', '965', '966', '967', '968', '971', '972', '976', '977'
        ]);

        const senderPrefix = m.sender.split('@')[0];
        for (let i = 1; i <= senderPrefix.length; i++) {
            if (prefijos.has(senderPrefix.slice(0, i))) {
                global.db.data.users[m.sender].block = true;
                await conn.reply(m.chat, `*🛡️➭⛔ ∫ SISTEMA DE SEGURIDAD: El número +${senderPrefix} podría ser un usuario no deseado.*\n> Modulo de seguridad -AntiFake-`, m);
                await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                break;
            }
        }
    }
};
export default handler;