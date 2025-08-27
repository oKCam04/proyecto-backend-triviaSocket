import respuesta_jugador from '#models/respuestas_jugador'

export default class RespuestaJugadorService {
  // Your code here
  public static async getAll() {
    return await respuesta_jugador.all()
  }

  public static async getById(id: number) {
    return await respuesta_jugador.findOrFail(id)
  }

  public static async create(data: Partial<respuesta_jugador>) {
    return await respuesta_jugador.create(data)
  }

  public static async update(id: number, data: Partial<respuesta_jugador>) {
    const user = await respuesta_jugador.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await respuesta_jugador.findOrFail(id)
    await user.delete()
    return user
  }
}
