import type { HttpContext } from '@adonisjs/core/http'
import Partida from '#models/partida'
import { v4 as uuidv4 } from 'uuid'

export default class PartidaController {
  /**
   * Muestra todas las partidas en espera
   */
  public async index({ response }: HttpContext) {
    try {
      const partidas = await Partida.query().where('status', 'Esperando')
      return response.ok(partidas)
    } catch (error) {
      return response.internalServerError({ error: 'Failed to fetch partidas' })
    }
  }

  /**
   * Crea una nueva partida
   */
  public async create({ response }: HttpContext) {
    try {
      const newPartida = await Partida.create({
        codigo: uuidv4().slice(0, 6).toUpperCase(),
        status: 'Esperando', // Corregido para coincidir con el enum de la DB
      })

      return response.created(newPartida)
    } catch (error) {
      return response.badRequest({ error: 'Failed to create partida' })
    }
  }
}
