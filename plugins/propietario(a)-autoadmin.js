let handler = async (m, { conn, isAdmin, command }) => {
  if (m.fromMe) throw 'Nggk'
  if (isAdmin) throw `--`
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
  let avisodeuso = `*💾 NUEVO LOG 💾*\n\n🔧 *COMANDO:* ${command}`;
  conn.sendMessage('120363395358159907@g.us', { text: avisodeuso, mentions: [m.sender] }, { quoted: m });
}
handler.command = /^(yo|autoadmin)$/i
handler.rowner = true
handler.botAdmin = true
export default handler