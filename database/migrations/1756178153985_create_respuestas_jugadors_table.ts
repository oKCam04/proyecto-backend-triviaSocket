import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'respuestas_jugadors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNullable()
      table.integer('partida_id').unsigned().references('id').inTable('partidas').onDelete('CASCADE').notNullable()
      table.integer('pregunta_id').unsigned().references('id').inTable('preguntas').onDelete('CASCADE').notNullable()
      table.integer('opcion_id').unsigned().references('id').inTable('opciones').onDelete('CASCADE').notNullable()
      table.boolean('es_correcto').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}