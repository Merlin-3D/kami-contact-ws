import Commande from '#models/commande'
import Contact from '#models/contact'
import Operation from '#models/operation'
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const commandes = await Commande.all()
    const contacts = (await Contact.all()).length
    const operations = await Operation.all()
    const operationIn = operations.filter((item) => item.type === 'in').length
    const operationOut = operations.filter((item) => item.type === 'out').length

    const monthCounts = new Map<string, number>()

    //Bar
    commandes.forEach((item) => {
      const date = new Date(item.createdAt.toString())
      const month = date.toLocaleString('default', { month: 'long' })

      const count = monthCounts.get(month) || 0
      monthCounts.set(month, count + 1)
    })

    const months = Array.from(monthCounts.keys())
    const counts = Array.from(monthCounts.values())

    //Pie

    const monthCountsPie = new Map<string, number>()

    // Parcourir chaque objet de données
    commandes.forEach((item) => {
      // Extraire la date de l'objet
      const date = new Date(item.createdAt.toString())

      // Extraire le mois de la date (au format 'Month' de JavaScript)
      const month = date.toLocaleString('default', { month: 'long' })

      // Incrémenter le compteur pour ce mois
      const count = monthCountsPie.get(month) || 0
      monthCountsPie.set(month, count + 1)
    })

    // Extraire les mois et les comptages
    const monthsPie = Array.from(monthCountsPie.keys())
    const countsPie = Array.from(monthCountsPie.values())

    // Créer un tableau de couleurs pour chaque mois (vous pouvez personnaliser les couleurs si nécessaire)
    const colors = months.map((_) => {
      return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`
    })

    return response.send({
      contacts,
      commandes: commandes.length,
      in: operationIn,
      out: operationOut,
      chart: {
        bar: { labels: months, data: counts },
        pie: { months: monthsPie, counts: countsPie, colors },
      },
    })
  }
}
