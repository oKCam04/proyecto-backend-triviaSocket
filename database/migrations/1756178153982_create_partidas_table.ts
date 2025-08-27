import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'partidas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo').notNullable()
      table.enu('status',['Esperando','Iniciado','Finalizado']).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}