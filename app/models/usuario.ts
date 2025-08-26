import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import RespuestasJugador from './respuestas_jugador.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare username: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare rol: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => RespuestasJugador, { foreignKey: 'usuario_id' })
  declare respuestaJugador: HasMany<typeof RespuestasJugador>
}