import { HttpContext } from '@adonisjs/core/http'
import CategoriaService from '../services/categoria_service.js'

export default class CategoriaController {
  public async getAll({ response }: HttpContext) {
    const categorias = await CategoriaService.getAll()
    return response.ok(categorias)
  }

  public async getById({ response, params }: HttpContext) {
    const categoria = await CategoriaService.getById(params.id)
    return response.ok(categoria)
  }

  public async create({ response, request }: HttpContext) {
    const data = request.only(['name'])
    const categoria = await CategoriaService.create(data)
    return response.created(categoria)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['name'])
    const categoria = await CategoriaService.update(params.id, data)
    return response.ok(categoria)
  }

  public async delete({ response, params }: HttpContext) {
    await CategoriaService.delete(params.id)
    return response.noContent()
  }
}
