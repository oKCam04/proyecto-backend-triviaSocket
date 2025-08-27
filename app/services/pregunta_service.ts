import Pregunta from '#models/pregunta'

export default class PreguntaService {
  // Your code here
  public static async getAll() {
    return await Pregunta.all()
  }

  public static async getById(id: number) {
    return await Pregunta.findOrFail(id)
  }

  public static async create(data: Partial<Pregunta>) {
    return await Pregunta.create(data)
  }

  public static async update(id: number, data: Partial<Pregunta>) {
    const user = await Pregunta.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await Pregunta.findOrFail(id)
    await user.delete()
    return user
  }
}
