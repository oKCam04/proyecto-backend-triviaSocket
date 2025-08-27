import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'partidas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('codigo')
      table.enu('status',['Esperando','Iniciado','Finalizado'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
