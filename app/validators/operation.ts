import vine from '@vinejs/vine'

export const createOperationsValidator = vine.compile(
  vine.object({
    type: vine.enum(['in', 'out']),
    newQte: vine.number(),
  })
)
