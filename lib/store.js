// ─────────────────────────────────────────────────────────────────────────────
// lib/store.js — Store en memoria liviano para Baileys
// ─────────────────────────────────────────────────────────────────────────────

const store = {
  messages: {},

  /**
   * Guardar mensaje en memoria para poder citarlo
   */
  loadMessage(jid, id) {
    return this.messages[jid]?.[id] || null
  },

  /**
   * Vincular al socket de Baileys para escuchar eventos
   */
  bind(ev) {
    ev.on('messages.upsert', ({ messages }) => {
      for (const msg of messages) {
        const jid = msg.key?.remoteJid
        if (!jid || !msg.key?.id) continue
        if (!this.messages[jid]) this.messages[jid] = {}
        this.messages[jid][msg.key.id] = msg

        // Limpiar mensajes viejos (mantener solo los últimos 100 por chat)
        const keys = Object.keys(this.messages[jid])
        if (keys.length > 100) {
          delete this.messages[jid][keys[0]]
        }
      }
    })
  }
}

export default store
