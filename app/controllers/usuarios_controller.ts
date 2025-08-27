import { HttpContext } from '@adonisjs/core/http'
import UsuarioService from '../services/usuarios_service.js'

export default class UsuariosController {
    public async getAll({response}: HttpContext){
        const user= await UsuarioService.getAll()
        return response.ok(user)
    }

    public async getById({response, params}: HttpContext){
        const user= await UsuarioService.getById(params.id)
        return response.ok(user)
    }

    public async update({params, request, response}: HttpContext){
        const data= request.only(['username','email','password','rol'])
        const user= await UsuarioService.update(params.id, data)
        return response.ok(user)
    }

    public async delete({response, params}: HttpContext){
        await UsuarioService.delete(params.id)
        return response.noContent()
    }
}