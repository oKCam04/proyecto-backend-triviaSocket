import AuhtService from '#services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

const usuarioService = new AuhtService()

export default class AuhtController {
  async register({ request, response }: HttpContext) {
    const {
      username, email, password, rol
    } = request.only([
      'username','email','password','rol'
    ])

    const resultado = await usuarioService.register(
       username, email, password, rol
    )

    return response.status(201).json(resultado)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only([
      'email',
      'password'
    ])
    const resultado = await usuarioService.login(email, password)
    return response.json(resultado)
  }

  
}