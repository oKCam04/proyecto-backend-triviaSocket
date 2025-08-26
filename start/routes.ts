/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsuariosController from '#controllers/usuarios_controller'
import router from '@adonisjs/core/services/router'
import AuthJwt from '#middleware/jwt_auth'
import AuhtController from '#controllers/auth_controller'



router.get('/user', [UsuariosController, 'getAll']).use(new AuthJwt().handle)

router.post('/auth/register', [AuhtController, 'register'])
router.post('/auth/login', [AuhtController, 'login'])