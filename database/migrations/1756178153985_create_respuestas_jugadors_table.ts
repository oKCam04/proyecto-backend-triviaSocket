import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'respuestas_jugadors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().references('id').inTable('usuarios').onDelete('CASCADE')
      table.integer('partida_id').unsigned().references('id').inTable('partidas').onDelete('CASCADE')
      table.integer('pregunta_id').unsigned().references('id').inTable('preguntas').onDelete('CASCADE')
      table.integer('opcion_id').unsigned().references('id').inTable('opciones').onDelete('CASCADE')
      table.boolean('es_correcto')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}