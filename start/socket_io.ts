import app from '@adonisjs/core/services/app'
import server from '@adonisjs/core/services/server'
import SocketService from '#start/socket'

app.ready(() => {
  SocketService.boot()
  SocketService.getIo().attach(server.getNodeServer()!)
})
