import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Pregunta from './pregunta.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string

  @hasMany(() => Pregunta, { foreignKey: 'categoria_id' })
  declare preguntas: HasMany<typeof Pregunta>
}