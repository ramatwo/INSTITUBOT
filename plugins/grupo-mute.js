/** By @MoonContentCreator || https://github.com/MoonContentCreator/BixbyBot-Md **/
import _0x15ca36 from 'node-fetch';
const handler = async (m, {
  conn,
  command,
  text,
  isAdmin
}) => {
  if (command === "mute") {
    const _0x1facb5 = global.owner[0x0][0x0] + "@s.whatsapp.net";
    if (m.mentionedJid[0x0] === _0x1facb5) {
      throw "no";
    }
    let _0x8acb16 = m.mentionedJid[0x0] ? m.mentionedJid[0x0] : m.quoted ? m.quoted.sender : text;
    if (_0x8acb16 === conn.user.jid) {
      throw "❌️ *No podes mutear al bot*";
    }
    const _0x4015bf = await conn.groupMetadata(m.chat);
    const _0x2dc357 = _0x4015bf.owner || m.chat.split`-`[0x0] + "@s.whatsapp.net";
    if (m.mentionedJid[0x0] === _0x2dc357) {
      throw "❌️ *No podes mutear el creador del grupo*";
    }
    let _0x2c1dd9 = global.db.data.users[_0x8acb16];
    let _0x571e77 = {
      'key': {
        'participants': "0@s.whatsapp.net",
        'fromMe': false,
        'id': "Halo"
      },
      'message': {
        'locationMessage': {
          'name': "Usuario muteado",
          'jpegThumbnail': await (await _0x15ca36('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      'participant': '0@s.whatsapp.net'
    };
    if (!m.mentionedJid[0x0] && !m.quoted) {
      return conn.reply(m.chat, "Mencioná a alguien", m);
    }
    if (_0x2c1dd9.muto === true) {
      throw " ❌️ Usuario ya muteado";
    }
    conn.reply(m.chat, "*Usuario muteado*", _0x571e77, null, {
      'mentions': [_0x8acb16]
    });
    global.db.data.users[_0x8acb16].muto = true;
    //global.db.data.users[_0x8acb16].banned = true;
  } else {
    if (command === 'unmute') {

      let _0x581bd4 = m.mentionedJid[0x0] ? m.mentionedJid[0x0] : m.quoted ? m.quoted.sender : text;
      let _0x5e6d75 = global.db.data.users[_0x581bd4];
      let _0x55c898 = {
        'key': {
          'participants': "0@s.whatsapp.net",
          'fromMe': false,
          'id': "Halo"
        },
        'message': {
          'locationMessage': {
            'name': "Usuario desmuteado",
            'jpegThumbnail': await (await _0x15ca36('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
          }
        },
        'participant': "0@s.whatsapp.net"
      };
      if (_0x581bd4 === m.sender) {
        throw "👑 *Sólo otro administrador puede desmutearte*";
      }
      if (!m.mentionedJid[0x0] && !m.quoted) {
        return conn.reply(m.chat, "Mencioná a alguien", m);
      }
      if (_0x5e6d75.muto === false) {
        throw "😼 *Este usuario no ha sido muteado*";
      }
      global.db.data.users[_0x581bd4].muto = false;
      conn.reply(m.chat, "*Tus mensajes no serán eliminados*", _0x55c898, null, {
        'mentions': [_0x581bd4]
      });
      //global.db.data.users[_0x8acb16].banned = false;
    }
  }
};
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.rowner = true
export default handler;
