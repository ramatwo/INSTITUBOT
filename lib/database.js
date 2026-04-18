// ─────────────────────────────────────────────────────────────────────────────
// lib/database.js — Capa de acceso a NeDB para InstituBot
// NeDB es una base de datos embebida 100% JavaScript (sin compilación nativa)
// Tablas: usuarios, anuncios, config
// ─────────────────────────────────────────────────────────────────────────────

import Datastore from '@seald-io/nedb'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync, existsSync } from 'fs'
import crypto from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')

if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })

// ── Promisificar métodos de NeDB ──────────────────────────────────────────────
function promisify(ds, method, ...args) {
  return new Promise((resolve, reject) => {
    ds[method](...args, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

class InstituDB {
  constructor() {
    // Crear colecciones (archivos .db)
    this.usuarios = new Datastore({
      filename: join(dataDir, 'usuarios.db'),
      autoload: true
    })
    this.anuncios = new Datastore({
      filename: join(dataDir, 'anuncios.db'),
      autoload: true
    })
    this.config = new Datastore({
      filename: join(dataDir, 'config.db'),
      autoload: true
    })

    // Índices únicos
    this.usuarios.ensureIndex({ fieldName: 'numero', unique: true }, () => {})
    this.usuarios.ensureIndex({ fieldName: 'usuario', unique: true }, () => {})
    this.anuncios.ensureIndex({ fieldName: '_id' }, () => {})
    this.config.ensureIndex({ fieldName: 'clave', unique: true }, () => {})

    console.log('[✅] Base de datos NeDB iniciada')
  }

  // ── Utilidades ────────────────────────────────────────────────────────────

  _hashPin(pin) {
    return crypto.createHash('sha256').update(String(pin)).digest('hex')
  }

  _ahora() {
    return new Date().toISOString()
  }

  // Insertar o actualizar (upsert)
  async _upsert(ds, query, doc) {
    return new Promise((resolve, reject) => {
      ds.update(query, { $set: doc }, { upsert: true }, (err, n, upserted) => {
        if (err) reject(err)
        else resolve({ n, upserted })
      })
    })
  }

  // ── USUARIOS ─────────────────────────────────────────────────────────────

  /**
   * Obtener usuario por número
   */
  async getUsuario(numero) {
    return promisify(this.usuarios, 'findOne', { numero: String(numero) })
  }

  /**
   * Verificar si un nombre de usuario ya existe
   */
  async usuarioExiste(nombreUsuario) {
    const doc = await promisify(this.usuarios, 'findOne', { usuario: nombreUsuario })
    return !!doc
  }

  /**
   * Registrar un usuario nuevo
   * @returns {object} { ok, msg }
   */
  async registrarUsuario(numero, nombreUsuario, pin) {
    const numeroStr = String(numero)

    // ¿Ya registrado?
    const existe = await this.getUsuario(numeroStr)
    if (existe) {
      return { ok: false, msg: '⚠️ Ya tenés una cuenta registrada. Usá *.login* para ingresar.' }
    }

    // ¿Nombre tomado?
    if (await this.usuarioExiste(nombreUsuario)) {
      return { ok: false, msg: '❌ Ese nombre de usuario ya está en uso. Elegí otro.' }
    }

    // Validar PIN
    if (!/^\d{4}$/.test(String(pin))) {
      return { ok: false, msg: global.MSG?.pinInvalido || '❌ El PIN debe tener 4 dígitos numéricos.' }
    }

    // Determinar rango
    const esOwner = (global.owner || []).some(([n]) =>
      String(n).replace(/\D/g, '') === numeroStr.replace(/\D/g, '')
    )
    const rango = esOwner ? 'owner' : 'usuario'

    const doc = {
      numero: numeroStr,
      usuario: nombreUsuario,
      pin_hash: this._hashPin(pin),
      rango,
      loggedIn: 1,
      registrado: 1,
      createdAt: this._ahora()
    }

    await promisify(this.usuarios, 'insert', doc)
    return { ok: true, msg: `✅ Cuenta creada exitosamente.\n👤 Usuario: *${nombreUsuario}*\n🎖️ Rango: *${rango}*` }
  }

  /**
   * Login de usuario
   * @returns {object} { ok, msg, usuario? }
   */
  async loginUsuario(numero, nombreUsuario, pin) {
    const user = await promisify(this.usuarios, 'findOne', {
      numero: String(numero),
      usuario: nombreUsuario
    })

    if (!user) return { ok: false, msg: '❌ Usuario o PIN incorrecto.' }
    if (user.pin_hash !== this._hashPin(pin)) return { ok: false, msg: '❌ PIN incorrecto.' }
    if (user.loggedIn) return { ok: false, msg: '⚠️ Ya estás logueado.' }

    await this._upsert(this.usuarios, { numero: String(numero) }, { loggedIn: 1 })
    return {
      ok: true,
      msg: `✅ Bienvenido, *${user.usuario}*!\n🎖️ Rango: *${user.rango}*`,
      usuario: { ...user, loggedIn: 1 }
    }
  }

  /**
   * Logout del usuario
   */
  async logoutUsuario(numero) {
    const user = await this.getUsuario(numero)
    if (!user || !user.loggedIn) return { ok: false, msg: '⚠️ No estás logueado actualmente.' }
    await this._upsert(this.usuarios, { numero: String(numero) }, { loggedIn: 0 })
    return { ok: true, msg: '👋 Sesión cerrada correctamente.' }
  }

  /**
   * Cambiar rango de un usuario
   */
  async setRango(numeroTarget, nuevoRango) {
    const rangosValidos = ['usuario', 'admin']
    if (!rangosValidos.includes(nuevoRango)) {
      return { ok: false, msg: `❌ Rango inválido. Usá: *usuario* o *admin*` }
    }

    const user = await this.getUsuario(numeroTarget)
    if (!user) {
      return { ok: false, msg: `❌ No se encontró ningún usuario registrado con el número *${numeroTarget}*.` }
    }
    if (user.rango === 'owner') {
      return { ok: false, msg: '⛔ No podés cambiar el rango de un owner.' }
    }

    await this._upsert(this.usuarios, { numero: String(numeroTarget) }, { rango: nuevoRango })
    return { ok: true, msg: `✅ Rango de *${user.usuario}* actualizado a *${nuevoRango}*.` }
  }

  // ── ANUNCIOS ─────────────────────────────────────────────────────────────

  /**
   * Crear un anuncio programado
   */
  async crearAnuncio(contenido, fechaEnvio, creadoPor) {
    const doc = {
      contenido,
      fecha_envio: fechaEnvio,
      estado: 'pendiente',
      createdBy: String(creadoPor),
      createdAt: this._ahora()
    }
    const inserted = await promisify(this.anuncios, 'insert', doc)
    return { ok: true, id: inserted._id }
  }

  /**
   * Listar todos los anuncios pendientes
   */
  async listarPendientes() {
    return new Promise((resolve, reject) => {
      this.anuncios
        .find({ estado: 'pendiente' })
        .sort({ fecha_envio: 1, createdAt: 1 })
        .exec((err, docs) => {
          if (err) reject(err)
          else resolve(docs)
        })
    })
  }

  /**
   * Obtener un anuncio por ID
   */
  async getAnuncio(id) {
    return promisify(this.anuncios, 'findOne', { _id: id })
  }

  /**
   * Editar el contenido de un anuncio pendiente
   */
  async editarAnuncio(id, nuevoContenido) {
    const anuncio = await this.getAnuncio(id)
    if (!anuncio) return { ok: false, msg: `❌ No existe ningún anuncio con ID *${id}*.` }
    if (anuncio.estado !== 'pendiente') return { ok: false, msg: `❌ El anuncio *${id}* ya fue enviado y no se puede editar.` }

    await promisify(this.anuncios, 'update', { _id: id }, { $set: { contenido: nuevoContenido } }, {})
    return { ok: true, msg: `✅ Anuncio actualizado correctamente.` }
  }

  /**
   * Eliminar un anuncio pendiente
   */
  async borrarAnuncio(id) {
    const anuncio = await this.getAnuncio(id)
    if (!anuncio) return { ok: false, msg: `❌ No existe ningún anuncio con ID *${id}*.` }
    if (anuncio.estado !== 'pendiente') return { ok: false, msg: `❌ El anuncio *${id}* ya fue enviado y no se puede borrar.` }

    await promisify(this.anuncios, 'remove', { _id: id }, {})
    return { ok: true, msg: `🗑️ Anuncio eliminado correctamente.` }
  }

  /**
   * Marcar un anuncio como enviado
   */
  async marcarEnviado(id) {
    await promisify(this.anuncios, 'update', { _id: id }, { $set: { estado: 'enviado' } }, {})
  }

  /**
   * Obtener anuncios pendientes para una fecha específica (YYYY-MM-DD)
   */
  async getAnunciosPorFecha(fecha) {
    return new Promise((resolve, reject) => {
      this.anuncios
        .find({ estado: 'pendiente', fecha_envio: fecha })
        .sort({ createdAt: 1 })
        .exec((err, docs) => {
          if (err) reject(err)
          else resolve(docs)
        })
    })
  }

  // ── CONFIG ────────────────────────────────────────────────────────────────

  async getConfig(clave) {
    const doc = await promisify(this.config, 'findOne', { clave })
    return doc ? doc.valor : null
  }

  async setConfig(clave, valor) {
    await this._upsert(this.config, { clave }, { clave, valor })
  }

  // ── Cierre ────────────────────────────────────────────────────────────────
  close() {
    // NeDB no necesita cierre explícito, persiste sola
  }
}

// Singleton
let instance = null
export function getDB() {
  if (!instance) instance = new InstituDB()
  return instance
}

export default InstituDB
