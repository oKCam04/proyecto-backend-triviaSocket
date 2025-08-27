import Partida from '#models/partida'

export default class PartidaService {
  // Your code here
  public static async getAll() {
    return await Partida.all()
  }

  public static async getById(id: number) {
    return await Partida.findOrFail(id)
  }

  public static async create(data: Partial<Partida>) {
    return await Partida.create(data)
  }

  public static async update(id: number, data: Partial<Partida>) {
    const user = await Partida.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await Partida.findOrFail(id)
    await user.delete()
    return user
  }
}
