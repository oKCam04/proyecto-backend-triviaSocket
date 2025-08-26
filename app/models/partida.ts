
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import RespuestasJugador from './respuestas_jugador.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'


export default class Partida extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare codigo: string

  @column()
  declare status : string

  @hasMany(() => RespuestasJugador, { foreignKey: 'partida_id' })
  declare RespuestaJugador: HasMany<typeof RespuestasJugador>
  
}