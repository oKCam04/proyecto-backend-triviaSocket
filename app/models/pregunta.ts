import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Categoria from './categoria.js'
import Opcione from './opcione.js'
import RespuestasJugador from './respuestas_jugador.js'

export default class Pregunta extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoria_id: number

  @column()
  declare pregunta: string

  @column()
  declare dificultad: string

  @column()
  declare tiempo_pregunta: number

  @belongsTo(() => Categoria, { foreignKey: 'categoria_id' })
  declare categorias: BelongsTo<typeof Categoria>

  @hasMany(() => Opcione, { foreignKey: 'pregunta_id' })
  declare opciones: HasMany<typeof Opcione>

  @hasMany(() => RespuestasJugador, { foreignKey: 'pregunta_id' })
  declare respuestaJugador: HasMany<typeof RespuestasJugador>
}
