import Contact from '#models/contact'
import { createContactValidator, updateContactValidator } from '#validators/contact'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const contacts = await Contact.all()
    return response.send(contacts)
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createContactValidator)
    const contact = await Contact.create(payload)
    return response.created(contact)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createContactValidator)
    const contact = await Contact.create(payload)
    return response.created(contact)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params
    const contact = await Contact.findByOrFail('id', id)
    return response.send(contact)
  }

  /**
   * Edit individual record
   */
  async edit({ request, params, response }: HttpContext) {
    const { id } = params
    const contact = await Contact.findByOrFail('id', id)
    const payload = await request.validateUsing(updateContactValidator)

    if (!contact) {
      return null
    }
    contact.firstName = payload.firstName
    contact.lastName = payload.lastName
    contact.city = payload.city
    contact.phone = payload.phone
    await contact.save()
    return response.send(contact)
  }

  /**
   * Update individual record
   */
  async update({ request, params, response }: HttpContext) {
    const { id } = params
    const contact = await Contact.findByOrFail('id', id)
    const payload = await request.validateUsing(updateContactValidator)

    if (!contact) {
      return null
    }
    contact.firstName = payload.firstName
    contact.lastName = payload.lastName
    contact.phone = payload.phone
    contact.city = payload.city
    await contact.save()
    return response.send(contact)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const contact = await Contact.findByOrFail('id', id)
    await contact.delete()
    return response.send(id)
  }
}
