import bcrypt from 'bcryptjs'
import usuario from '#models/usuario'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

class AuthService {
  async register(username: string, email: string, password: string, rol: string) {
    const hash = await bcrypt.hash(password, 10)

    const user = await usuario.create({
      username,
      email,
      password: hash,
      rol,
    })

    return {
      mensaje: 'Registro correcto',
      user: await usuario.query().where('id', user.id),
    }
  }

  async login(email: string, password: string) {
    if (!email || !password) {
      return { mensaje: 'Campos obligatorios' }
    }

    const user = await usuario.query().where('email', email).first()

    if (!user) return { mensaje: 'El usuario no existe' }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return { mensaje: 'Contraseña incorrecta' }

    const token = jwt.sign(
      {
        id: user.id,
        correoElectronico: user.email,
        timestamp: Date.now(),
      },
      SECRET,
      { expiresIn: '2h' }
    )

    return { mensaje: 'Login correcto', token, user }
  }
}

export default AuthService
