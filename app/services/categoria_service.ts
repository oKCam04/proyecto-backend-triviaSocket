import Categoria from "#models/categoria"


  export default class CategoriaService {
    // Your code here
    public static async getAll(){
      return await Categoria.all()
    }
  
    public static async getById(id: number){
      return await Categoria.findOrFail(id)
    }
  
    public static async create(data: Partial<Categoria>){
      return await Categoria.create(data)
    }
  
    public static async update(id: number, data: Partial <Categoria>){
      const user= await Categoria.findOrFail(id)
      user.merge(data)
      await user.save()
      return user
    }
  
    public static async delete(id:number){
      const user=await Categoria.findOrFail(id)
      await user.delete()
      return user
    }
  }
