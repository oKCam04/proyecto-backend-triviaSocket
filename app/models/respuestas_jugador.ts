import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Opcione from './opcione.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Partida from './partida.js'
import Pregunta from './pregunta.js'
import Usuario from './usuario.js'

export default class RespuestasJugador extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare partida_id: number

  @column()
  declare pregunta_id: number

  @column()
  declare opcion_id: number

  @column()
  declare es_correcto: boolean

  @belongsTo(() => Opcione, { foreignKey: 'opcion_id' })
  declare opciones: BelongsTo<typeof Opcione>

  @belongsTo(() => Partida, { foreignKey: 'partida_id' })
  declare Partidas: BelongsTo<typeof Partida>

  @belongsTo(() => Pregunta, { foreignKey: 'pregunta_id' })
  declare categorias: BelongsTo<typeof Pregunta>

  @belongsTo(() => Usuario, { foreignKey: 'usuario_id' })
  declare usuarios: BelongsTo<typeof Usuario>
}
