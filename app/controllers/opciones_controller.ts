import { HttpContext } from '@adonisjs/core/http'
import Opciones from '../services/opcione_service.js'

export default class OpcionesController {
    public async getAll({response}: HttpContext){
        const opcion= await Opciones.getAll()
        return response.ok(opcion)
    }

    public async getById({response, params}: HttpContext){
        const opcion= await Opciones.getById(params.id)
        return response.ok(opcion)
    }

    public async create({response,request}:HttpContext){
        const data= request.only(['pregunta_id','opcion','es_correcto'])
        const opcion= await Opciones.create(data)
        return response.created(opcion)
    }

    public async update({params, request, response}: HttpContext){
        const data= request.only(['pregunta_id','opcion','es_correcto'])
        const opcion= await Opciones.update(params.id, data)
        return response.ok(opcion)
    }

    public async delete({response, params}: HttpContext){
        await Opciones.delete(params.id)
        return response.noContent()
    }
}