import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare commandeId: number

  @column()
  declare type: string | null

  @column()
  declare initQte: string | null

  @column()
  declare newQte: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
