import { HttpContext } from '@adonisjs/core/http'
import PartidaService from '../services/partida_service.js'

export default class PartidasController {
  public async getAll({ response }: HttpContext) {
    const opcion = await PartidaService.getAll()
    return response.ok(opcion)
  }

  public async getById({ response, params }: HttpContext) {
    const opcion = await PartidaService.getById(params.id)
    return response.ok(opcion)
  }

  public async create({ response, request }: HttpContext) {
    const data = request.only(['codigo', 'status'])
    const opcion = await PartidaService.create(data)
    return response.created(opcion)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['codigo', 'status'])
    const opcion = await PartidaService.update(params.id, data)
    return response.ok(opcion)
  }

  public async delete({ response, params }: HttpContext) {
    await PartidaService.delete(params.id)
    return response.noContent()
  }
}
