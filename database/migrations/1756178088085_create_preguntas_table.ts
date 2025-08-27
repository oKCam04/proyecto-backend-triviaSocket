import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'preguntas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('categoria_id')
        .unsigned()
        .references('id')
        .inTable('categorias')
        .onDelete('CASCADE')
        .notNullable()
      table.text('pregunta').notNullable()
      table.enu('dificultad', ['fácil', 'medio', 'dificil']).notNullable()
      table.integer('tiempo_pregunta').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
