import { HttpContext } from '@adonisjs/core/http'
import RespuestaJugadorService from '../services/respuesta_jugador_service.js'

export default class RespuestaJugadorController {
    public async getAll({response}: HttpContext){
        const opcion= await RespuestaJugadorService.getAll()
        return response.ok(opcion)
    }

    public async getById({response, params}: HttpContext){
        const opcion= await RespuestaJugadorService.getById(params.id)
        return response.ok(opcion)
    }

    public async create({response,request}:HttpContext){
        const data= request.only(['usuario_id', 'partida_id', 'pregunta_id', 'opcion_id', 'es_correcto'])
        const opcion= await RespuestaJugadorService.create(data)
        return response.created(opcion)
    }

    public async update({params, request, response}: HttpContext){
        const data= request.only(['usuario_id', 'partida_id', 'pregunta_id', 'opcion_id', 'es_correcto'])
        const opcion= await RespuestaJugadorService.update(params.id, data)
        return response.ok(opcion)
    }

    public async delete({response, params}: HttpContext){
        await RespuestaJugadorService.delete(params.id)
        return response.noContent()
    }
}