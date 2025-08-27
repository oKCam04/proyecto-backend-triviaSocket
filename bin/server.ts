import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'
import { createServer } from 'node:http'

const APP_ROOT = new URL('../', import.meta.url)

const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

const ignitor = new Ignitor(APP_ROOT, { importer: IMPORTER }).tap((app) => {
  app.booting(async () => {
    await import('#start/env')
  })
  app.listen('SIGTERM', () => app.terminate())
  app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
})

async function startServer() {
  try {
    const httpServer = ignitor.httpServer()
    const socketModule = await import('#start/socket')
    const SocketService = socketModule.default

    // 1. Inicia el servicio de socket (pero no lo adjunta todavía)
    SocketService.boot(httpServer)

    // 2. Inicia el servidor HTTP y adjunta Socket.IO en el callback
    await httpServer.start((handler) => {
      const nodeServer = createServer(handler)
      // Adjunta el servidor de Socket.IO al servidor de Node
      SocketService.getIo().attach(nodeServer)
      return nodeServer
    })
    
  } catch (error) {
    process.exitCode = 1
    prettyPrintError(error)
  }
}

startServer()