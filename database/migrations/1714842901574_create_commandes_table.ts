import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commandes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('date').nullable()
      table.string('article').nullable()
      table.string('qantity').nullable()
      table.string('delivery').nullable()
      table.string('prix_ach').nullable()
      table.string('prix_douane').nullable()
      table.string('prix_achat_tot').nullable()
      table.string('prix_tot').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
