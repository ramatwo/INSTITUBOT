// ─────────────────────────────────────────────────────────────────────────────
// plugins/cmd-logout.js — Comando .logout
// ─────────────────────────────────────────────────────────────────────────────

export async function run({ m, numero, db, conn }) {
  const resultado = await db.logoutUsuario(numero)
  await conn.reply(m.chat, resultado.msg, m)
}
