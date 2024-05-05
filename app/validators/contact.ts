import vine from '@vinejs/vine'

export const createContactValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    phone: vine.string(),
    city: vine.string(),
  })
)

export const updateContactValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    phone: vine.string(),
    city: vine.string(),
  })
)
