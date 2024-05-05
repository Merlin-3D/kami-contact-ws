import Commande from '#models/commande'
import Operation from '#models/operation'
import { createCommandesValidator, updateCommandesValidator } from '#validators/commande'
import { createOperationsValidator } from '#validators/operation'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommandesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const commandes = await Commande.query().preload('operations')
    return response.send(commandes)
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCommandesValidator)
    const commande = await Commande.create(payload)
    return response.created(commande)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createCommandesValidator)
    const commande = await Commande.create(payload)
    return response.created(commande)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const { id } = params
    const commande = await Commande.findByOrFail('id', id)
    return response.send(commande)
  }

  /**
   * Edit individual record
   */
  async edit({ request, params, response }: HttpContext) {
    const { id } = params
    const commande = await Commande.findByOrFail('id', id)
    const payload = await request.validateUsing(updateCommandesValidator)

    if (!commande) {
      return null
    }
    commande.date = payload.date
    commande.article = payload.article
    commande.qantity = payload.qantity
    commande.delivery = payload.delivery
    commande.prixAch = payload.prixAch
    commande.prixDouane = payload.prixDouane
    commande.prixAchatTot = payload.prixAchatTot
    commande.prixTot = payload.prixTot

    await commande.save()
    return response.send(commande)
  }

  /**
   * Update individual record
   */
  async update({ request, params, response }: HttpContext) {
    const { id } = params
    const commande = await Commande.findByOrFail('id', id)
    const payload = await request.validateUsing(updateCommandesValidator)

    if (!commande) {
      return null
    }
    commande.date = payload.date
    commande.article = payload.article
    commande.qantity = payload.qantity
    commande.delivery = payload.delivery
    commande.prixAch = payload.prixAch
    commande.prixDouane = payload.prixDouane
    commande.prixAchatTot = payload.prixAchatTot
    commande.prixTot = payload.prixTot
    await commande.save()
    return response.send(commande)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const commande = await Commande.findByOrFail('id', id)
    await commande.delete()
    return response.send(id)
  }

  /**
   * Update Quantity record
   */
  async updateOperation({ request, params, response }: HttpContext) {
    const { id } = params
    const commande = await Commande.findByOrFail('id', id)
    const payload = await request.validateUsing(createOperationsValidator)

    if (!commande) {
      return null
    }

    const initQantity = Number(commande.qantity)
    const operation = new Operation()

    if (payload.type === 'in') {
      operation.commandeId = id
      operation.type = payload.type
      operation.initQte = initQantity.toString()
      operation.newQte = (initQantity + payload.newQte).toString()
      commande.qantity = operation.newQte
      await commande.save()

      const newOperation = await Operation.create(operation)
      return response.created(newOperation)
    }
    operation.commandeId = id
    operation.type = payload.type
    operation.initQte = initQantity.toString()
    operation.newQte = (initQantity - payload.newQte).toString()
    commande.qantity = operation.newQte
    await commande.save()

    const newOperation = await Operation.create(operation)
    return response.created(newOperation)
  }
}
