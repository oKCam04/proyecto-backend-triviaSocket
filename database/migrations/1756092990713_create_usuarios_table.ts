import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
<<<<<<< HEAD
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.enum('rol',['admin','player']).notNullable().unique()
      table.integer('puntos').nullable()
=======
      table.string('username')
      table.string('email')
      table.string('password')
      table.enum('rol', ['admin', 'player'])

>>>>>>> 715d62c (socket)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
