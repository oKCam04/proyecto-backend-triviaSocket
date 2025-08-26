import { HttpContext } from '@adonisjs/core/http'
import PreguntaService from '../services/pregunta_service.js'

export default class PreguntaController {
    public async getAll({response}: HttpContext){
        const opcion= await PreguntaService.getAll()
        return response.ok(opcion)
    }

    public async getById({response, params}: HttpContext){
        const opcion= await PreguntaService.getById(params.id)
        return response.ok(opcion)
    }

    public async create({response,request}:HttpContext){
        const data= request.only(['categoria_id','pregunta', 'dificultad','tiempo_pregunta'])
        const opcion= await PreguntaService.create(data)
        return response.created(opcion)
    }

    public async update({params, request, response}: HttpContext){
        const data= request.only(['categoria_id','pregunta', 'dificultad','tiempo_pregunta'])
        const opcion= await PreguntaService.update(params.id, data)
        return response.ok(opcion)
    }

    public async delete({response, params}: HttpContext){
        await PreguntaService.delete(params.id)
        return response.noContent()
    }
}