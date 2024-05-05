import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string | null

  @column()
  declare lastName: string | null

  @column()
  declare phone: string

  @column()
  declare city: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
