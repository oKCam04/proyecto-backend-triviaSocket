import { HttpContext } from '@adonisjs/core/http'
import CategoriaService from '../services/categoria_service.js'

export default class CategoriaController{
    public async getAll({response}: HttpContext){
        const categoria= await CategoriaService.getAll()
        return response.ok(categoria)
    }

    public async create({request, response}:HttpContext){
        const data=request.only(['name']);
        const categoria= await CategoriaService.create(data);
        return response.created(categoria)
    }
}