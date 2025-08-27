import Usuarios from '#models/usuario'

export default class UsuarioService {
  // Your code here
  public static async getAll() {
    return await Usuarios.all()
  }

  public static async getById(id: number) {
    return await Usuarios.findOrFail(id)
  }

<<<<<<< HEAD
=======
  public static async create(data: Partial<Usuarios>) {
    return await Usuarios.create(data)
  }
>>>>>>> 715d62c (socket)

  public static async update(id: number, data: Partial<Usuarios>) {
    const user = await Usuarios.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await Usuarios.findOrFail(id)
    await user.delete()
    return user
  }
}
