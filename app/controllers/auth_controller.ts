import AuthService from '#services/auth_service'
import type { HttpContext } from '@adonisjs/core/http'

const authService = new AuthService()

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { username, email, password, rol } = request.only([
      'username',
      'email',
      'password',
      'rol',
    ])

    const resultado = await authService.register(username, email, password, rol)

    return response.status(201).json(resultado)
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const resultado = await authService.login(email, password)
    return response.json(resultado)
  }
}
