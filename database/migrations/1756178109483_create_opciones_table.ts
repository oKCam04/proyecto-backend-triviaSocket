import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'opciones'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('preguntas_id').unsigned().references('id').inTable('preguntas').onDelete('CASCADE')
      table.text('opcion')
      table.boolean('es_correcto')

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}