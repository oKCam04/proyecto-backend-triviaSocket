import Opciones from '#models/opcione'

export default class OpcionesService {
  // Your code here
  public static async getAll() {
    return await Opciones.all()
  }

  public static async getById(id: number) {
    return await Opciones.findOrFail(id)
  }

  public static async create(data: Partial<Opciones>) {
    return await Opciones.create(data)
  }

  public static async update(id: number, data: Partial<Opciones>) {
    const user = await Opciones.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await Opciones.findOrFail(id)
    await user.delete()
    return user
  }
}
