let handler = m => m
export async function all(m) {
let user = global.db.data.users[m.sender]
if (m.chat.endsWith('broadcast')) return
if (user.premiumTime != 0 && user.premium) {
if (new Date() * 1 >= user.premiumTime) {
await m.reply(`*⚠️ ∫ ADVERTENCIA*\n\n*@${m.sender.split`@`[0]}* *¡SE ACABÓ TÚ TIEMPO PREMIUM!* 🎟️`, false, { mentions: [m.sender] })
user.premiumTime = 0
user.premium = false
}}}
