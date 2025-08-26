
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Pregunta from './pregunta.js'
import type { BelongsTo,HasMany } from '@adonisjs/lucid/types/relations'
import RespuestasJugador from './respuestas_jugador.js'


export default class Opcione extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare preguntas_id: number

  @column()
  declare opcion: string

  @column()
  declare es_correcto: boolean

  @belongsTo(() => Pregunta, { foreignKey: 'preguntas_id' })
    declare preguntas: BelongsTo<typeof Pregunta>

  @hasMany(() => RespuestasJugador, { foreignKey: 'opcion_id' })
  declare respuestaJugador: HasMany<typeof RespuestasJugador>
}