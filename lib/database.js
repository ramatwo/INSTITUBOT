// ─────────────────────────────────────────────────────────────────────────────
// lib/database.js — Capa de acceso a SQLite para InstituBot
// Tablas: usuarios, anuncios
// ─────────────────────────────────────────────────────────────────────────────

import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, existsSync } from 'fs'
import crypto from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '..', 'data', 'institubot.db')

// Asegurar que la carpeta data/ exista
const dataDir = join(__dirname, '..', 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

class InstituDB {
  constructor() {
    this.db = new Database(DB_PATH)
    this.db.pragma('journal_mode = WAL')
    this.db.pragma('foreign_keys = ON')
    this._initTables()
    console.log('[✅] Base de datos SQLite iniciada')
  }

  // ── Creación de tablas ────────────────────────────────────────────────────

  _initTables() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS usuarios (
        numero      TEXT PRIMARY KEY,
        usuario     TEXT NOT NULL,
        pin_hash    TEXT NOT NULL,
        rango       TEXT NOT NULL DEFAULT 'usuario',
        loggedIn    INTEGER NOT NULL DEFAULT 0,
        registrado  INTEGER NOT NULL DEFAULT 1,
        createdAt   TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS anuncios (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        contenido   TEXT NOT NULL,
        fecha_envio TEXT NOT NULL,
        estado      TEXT NOT NULL DEFAULT 'pendiente',
        createdBy   TEXT NOT NULL,
        createdAt   TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS config (
        clave TEXT PRIMARY KEY,
        valor TEXT NOT NULL
      );
    `)
  }

  // ── Utilidades internas ───────────────────────────────────────────────────

  _hashPin(pin) {
    return crypto.createHash('sha256').update(String(pin)).digest('hex')
  }

  _ahora() {
    return new Date().toISOString()
  }

  _hoy() {
    // Formato YYYY-MM-DD en Argentina
    return new Date().toLocaleDateString('es-AR', {
      timeZone: 'America/Buenos_Aires',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).split('/').reverse().join('-')  // DD/MM/YYYY → YYYY-MM-DD
  }

  // ── USUARIOS ─────────────────────────────────────────────────────────────

  /**
   * Obtener datos completos de un usuario por número
   */
  getUsuario(numero) {
    return this.db.prepare('SELECT * FROM usuarios WHERE numero = ?').get(numero) || null
  }

  /**
   * Verificar si un nombre de usuario ya está tomado
   */
  usuarioExiste(nombreUsuario) {
    return !!this.db.prepare('SELECT numero FROM usuarios WHERE usuario = ?').get(nombreUsuario)
  }

  /**
   * Registrar un usuario nuevo (rango: usuario por defecto)
   * @returns {object} { ok: bool, msg: string }
   */
  registrarUsuario(numero, nombreUsuario, pin) {
    // No permitir registro si ya existe
    const existe = this.getUsuario(numero)
    if (existe) {
      return { ok: false, msg: '⚠️ Ya tenés una cuenta registrada. Usá *.login* para ingresar.' }
    }
    // Verificar que el nombre no esté tomado
    if (this.usuarioExiste(nombreUsuario)) {
      return { ok: false, msg: '❌ Ese nombre de usuario ya está en uso. Elegí otro.' }
    }
    // Validar PIN
    if (!/^\d{4}$/.test(String(pin))) {
      return { ok: false, msg: global.MSG?.pinInvalido || '❌ El PIN debe tener 4 dígitos numéricos.' }
    }

    // Determinar rango: si el número es owner, darle rango owner
    const esOwner = (global.owner || []).some(([n]) => String(n).replace(/\D/g, '') === String(numero).replace(/\D/g, ''))
    const rango = esOwner ? 'owner' : 'usuario'

    this.db.prepare(`
      INSERT INTO usuarios (numero, usuario, pin_hash, rango, loggedIn, registrado, createdAt)
      VALUES (?, ?, ?, ?, 1, 1, ?)
    `).run(numero, nombreUsuario, this._hashPin(pin), rango, this._ahora())

    return { ok: true, msg: `✅ Cuenta creada exitosamente.\n👤 Usuario: *${nombreUsuario}*\n🎖️ Rango: *${rango}*` }
  }

  /**
   * Login de usuario
   * @returns {object} { ok: bool, msg: string, usuario?: object }
   */
  loginUsuario(numero, nombreUsuario, pin) {
    const user = this.db.prepare('SELECT * FROM usuarios WHERE numero = ? AND usuario = ?').get(numero, nombreUsuario)

    if (!user) {
      return { ok: false, msg: '❌ Usuario o PIN incorrecto.' }
    }
    if (user.pin_hash !== this._hashPin(pin)) {
      return { ok: false, msg: '❌ PIN incorrecto.' }
    }
    if (user.loggedIn) {
      return { ok: false, msg: '⚠️ Ya estás logueado.' }
    }

    this.db.prepare('UPDATE usuarios SET loggedIn = 1 WHERE numero = ?').run(numero)
    return { ok: true, msg: `✅ Bienvenido, *${user.usuario}*!\n🎖️ Rango: *${user.rango}*`, usuario: { ...user, loggedIn: 1 } }
  }

  /**
   * Logout del usuario
   */
  logoutUsuario(numero) {
    const user = this.getUsuario(numero)
    if (!user || !user.loggedIn) {
      return { ok: false, msg: '⚠️ No estás logueado actualmente.' }
    }
    this.db.prepare('UPDATE usuarios SET loggedIn = 0 WHERE numero = ?').run(numero)
    return { ok: true, msg: '👋 Sesión cerrada correctamente.' }
  }

  /**
   * Cambiar rango de un usuario
   * @param {string} numeroTarget - Número del usuario a modificar
   * @param {string} nuevoRango - 'usuario' | 'admin'
   */
  setRango(numeroTarget, nuevoRango) {
    const rangosValidos = ['usuario', 'admin']
    if (!rangosValidos.includes(nuevoRango)) {
      return { ok: false, msg: `❌ Rango inválido. Usá: *usuario* o *admin*` }
    }
    const user = this.getUsuario(numeroTarget)
    if (!user) {
      return { ok: false, msg: `❌ No se encontró ningún usuario registrado con el número *${numeroTarget}*.` }
    }
    if (user.rango === 'owner') {
      return { ok: false, msg: '⛔ No podés cambiar el rango de un owner.' }
    }
    this.db.prepare('UPDATE usuarios SET rango = ? WHERE numero = ?').run(nuevoRango, numeroTarget)
    return { ok: true, msg: `✅ Rango de *${user.usuario}* actualizado a *${nuevoRango}* correctamente.` }
  }

  // ── ANUNCIOS ─────────────────────────────────────────────────────────────

  /**
   * Crear un anuncio programado
   * @param {string} contenido - Texto del comunicado
   * @param {string} fechaEnvio - Formato YYYY-MM-DD
   * @param {string} creadoPor - Número del admin
   */
  crearAnuncio(contenido, fechaEnvio, creadoPor) {
    const info = this.db.prepare(`
      INSERT INTO anuncios (contenido, fecha_envio, estado, createdBy, createdAt)
      VALUES (?, ?, 'pendiente', ?, ?)
    `).run(contenido, fechaEnvio, creadoPor, this._ahora())

    return { ok: true, id: info.lastInsertRowid }
  }

  /**
   * Listar todos los anuncios pendientes
   */
  listarPendientes() {
    return this.db.prepare(`
      SELECT * FROM anuncios WHERE estado = 'pendiente' ORDER BY fecha_envio ASC, id ASC
    `).all()
  }

  /**
   * Obtener un anuncio por ID
   */
  getAnuncio(id) {
    return this.db.prepare('SELECT * FROM anuncios WHERE id = ?').get(id) || null
  }

  /**
   * Editar el contenido de un anuncio pendiente
   */
  editarAnuncio(id, nuevoContenido) {
    const anuncio = this.getAnuncio(id)
    if (!anuncio) return { ok: false, msg: `❌ No existe ningún anuncio con ID *${id}*.` }
    if (anuncio.estado !== 'pendiente') return { ok: false, msg: `❌ El anuncio #${id} ya fue enviado y no se puede editar.` }

    this.db.prepare('UPDATE anuncios SET contenido = ? WHERE id = ?').run(nuevoContenido, id)
    return { ok: true, msg: `✅ Anuncio #${id} actualizado correctamente.` }
  }

  /**
   * Eliminar un anuncio pendiente
   */
  borrarAnuncio(id) {
    const anuncio = this.getAnuncio(id)
    if (!anuncio) return { ok: false, msg: `❌ No existe ningún anuncio con ID *${id}*.` }
    if (anuncio.estado !== 'pendiente') return { ok: false, msg: `❌ El anuncio #${id} ya fue enviado y no se puede borrar.` }

    this.db.prepare('DELETE FROM anuncios WHERE id = ?').run(id)
    return { ok: true, msg: `🗑️ Anuncio #${id} eliminado correctamente.` }
  }

  /**
   * Marcar un anuncio como enviado
   */
  marcarEnviado(id) {
    this.db.prepare("UPDATE anuncios SET estado = 'enviado' WHERE id = ?").run(id)
  }

  /**
   * Obtener anuncios pendientes para una fecha específica (YYYY-MM-DD)
   */
  getAnunciosPorFecha(fecha) {
    return this.db.prepare(`
      SELECT * FROM anuncios WHERE estado = 'pendiente' AND fecha_envio = ?
    `).all(fecha)
  }

  // ── CONFIG ────────────────────────────────────────────────────────────────

  getConfig(clave) {
    const row = this.db.prepare('SELECT valor FROM config WHERE clave = ?').get(clave)
    return row ? row.valor : null
  }

  setConfig(clave, valor) {
    this.db.prepare('INSERT OR REPLACE INTO config (clave, valor) VALUES (?, ?)').run(clave, valor)
  }

  // ── Cierre ────────────────────────────────────────────────────────────────

  close() {
    this.db.close()
  }
}

// Singleton
let instance = null
export function getDB() {
  if (!instance) instance = new InstituDB()
  return instance
}

export default InstituDB
