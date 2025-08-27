
import Categoria from "../models/categoria.js";

export default class CategoriaService{

  public static async getAll(){
      return await Categoria.all()
  }

  public static async create(data:Partial<Categoria>){
    return await Categoria.create(data)
  }


}