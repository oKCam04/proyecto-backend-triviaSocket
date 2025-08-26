import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'preguntas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE')
      table.text('pregunta')
      table.enu('dificultad',['fácil','medio','dificil'])
      table.integer('tiempo_pregunta')

      
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}