/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ContactsController from '#controllers/contacts_controller'
import CommandesController from '#controllers/commandes_controller'
import DashboardController from '#controllers/dasboard_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('register', [AuthController, 'register'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

router
  .get('me', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('count', [DashboardController, 'index'])
  })
  .prefix('dashboard')

router.resource('contacts', ContactsController).use('*', middleware.auth())

router.resource('commandes', CommandesController).use('*', middleware.auth())

router
  .put('commandes/:id/operation', [CommandesController, 'updateOperation'])
  .use(middleware.auth())
