/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CategoriaController from '#controllers/categorias_controller'
import router from '@adonisjs/core/services/router'
import AuthJwt from '#middleware/jwt_auth'
import AuhtController from '#controllers/auth_controller'
import UsuariosController from '#controllers/usuarios_controller'
import OpcionesController from '#controllers/opciones_controller'
import PartidasController from '#controllers/partidas_controller'
import PreguntaController from '#controllers/preguntas_controller'
import RespuestaJugadorController from '#controllers/respuestas_jugadors_controller'


//rutas de AUTH usuario públicas
router.post('/auth/register', [AuhtController, 'register'])
router.post('/auth/login', [AuhtController, 'login'])

//rutas protegidas con JWT

//usuarios
router
  .group(() => {
    router.get('/',  [UsuariosController, 'getAll'])
    router.post('/', [UsuariosController, 'create'])
    router.put('/:id', [UsuariosController, 'update'])
    router.delete('/:id', [UsuariosController, 'delete'])
  })
  .prefix('/user')
  .use(new AuthJwt().handle)

  
//categoria

router
  .group(() => {
    router.get('/',  [CategoriaController, 'getAll'])
    router.post('/', [CategoriaController, 'create'])
    router.put('/:id', [CategoriaController, 'update'])
    router.delete('/:id', [CategoriaController, 'delete'])
  })
  .prefix('/categoria')
  .use(new AuthJwt().handle)

//opciones

router
  .group(() => {
    router.get('/',  [OpcionesController, 'getAll'])
    router.post('/', [OpcionesController, 'create'])
    router.put('/:id', [OpcionesController, 'update'])
    router.delete('/:id', [OpcionesController, 'delete'])
  })
  .prefix('/opciones')
  .use(new AuthJwt().handle)

//partida
router
  .group(() => {
    router.get('/',  [PartidasController, 'getAll'])
    router.post('/', [PartidasController, 'create'])
    router.put('/:id', [PartidasController, 'update'])
    router.delete('/:id', [PartidasController, 'delete'])
  })
  .prefix('/partida')
  .use(new AuthJwt().handle)


//pregunta

router
  .group(() => {
    router.get('/',  [PreguntaController, 'getAll'])
    router.post('/', [PreguntaController, 'create'])
    router.put('/:id', [PreguntaController, 'update'])
    router.delete('/:id', [PreguntaController, 'delete'])
  })
  .prefix('/pregunta')
  .use(new AuthJwt().handle)


//respuesta jugador

router
  .group(() => {
    router.get('/',  [RespuestaJugadorController, 'getAll'])
    router.post('/', [RespuestaJugadorController, 'create'])
    router.put('/:id', [RespuestaJugadorController, 'update'])
    router.delete('/:id', [RespuestaJugadorController, 'delete'])
  })
  .prefix('/respuestaJugador')
  .use(new AuthJwt().handle)