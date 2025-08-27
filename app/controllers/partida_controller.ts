import type { HttpContext } from '@adonisjs/core/http'
import Partida from '#models/partida'
import { v4 as uuidv4 } from 'uuid'

export default class PartidaController {
  public async create({ response }: HttpContext) {
    try {
      const newPartida = await Partida.create({
        codigo: uuidv4(),
        status: 'pendiente',
      })

      return response.created(newPartida)
    } catch (error) {
      return response.badRequest({ error: 'Failed to create partida' })
    }
  }
}
