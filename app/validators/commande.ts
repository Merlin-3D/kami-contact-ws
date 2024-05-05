import vine from '@vinejs/vine'

export const createCommandesValidator = vine.compile(
  vine.object({
    date: vine.string(),
    article: vine.string(),
    qantity: vine.string(),
    delivery: vine.string(),
    prixAch: vine.string(),
    prixDouane: vine.string(),
    prixAchatTot: vine.string(),
    prixTot: vine.string(),
  })
)

export const updateCommandesValidator = vine.compile(
  vine.object({
    date: vine.string(),
    article: vine.string(),
    qantity: vine.string(),
    delivery: vine.string(),
    prixAch: vine.string(),
    prixDouane: vine.string(),
    prixAchatTot: vine.string(),
    prixTot: vine.string(),
  })
)
