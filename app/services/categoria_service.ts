import Categoria from '#models/categoria'

export default class CategoriaService {
  public static async getAll() {
    return await Categoria.all()
  }

  public static async getById(id: number) {
    return await Categoria.findOrFail(id)
  }

  public static async create(data: Partial<Categoria>) {
    return await Categoria.create(data)
  }

  public static async update(id: number, data: Partial<Categoria>) {
    const categoria = await Categoria.findOrFail(id)
    categoria.merge(data)
    await categoria.save()
    return categoria
  }

  public static async delete(id: number) {
    const categoria = await Categoria.findOrFail(id)
    await categoria.delete()
    return categoria
  }
}
