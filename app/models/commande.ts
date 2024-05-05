import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Operation from './operation.js'

export default class Commande extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare date: string | null

  @column()
  declare article: string | null

  @column()
  declare qantity: string | null

  @column()
  declare delivery: string | null

  @column()
  declare prixAch: string

  @column()
  declare prixDouane: string

  @column()
  declare prixAchatTot: string | null

  @column()
  declare prixTot: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Operation)
  declare operations: HasMany<typeof Operation>
}
