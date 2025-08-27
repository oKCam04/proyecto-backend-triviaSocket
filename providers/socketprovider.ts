// providers/SocketProvider.ts
import { Server as SocketIOServer } from 'socket.io'
import server from '@adonisjs/core/services/server'

export default class SocketProvider {
  private io?: SocketIOServer

  /**
   * Se ejecuta cuando la app YA está lista (HTTP server levantado)
   */
  public async ready() {
    // Obtén el servidor Node.js de Adonis v6
    const nodeServer = server.getNodeServer()

    // Monta Socket.IO sobre el HTTP server
    this.io = new SocketIOServer(nodeServer, {
      cors: { origin: '*' },
      // path: '/socket.io', // usa el default; déjalo comentado
    })

    console.log('[Socket.IO] iniciado sobre el HTTP server (provider/ready)')

    this.io.on('connection', (socket) => {
      console.log('🟢 Cliente conectado:', socket.id)

      socket.on('join', ({ partidaId, username }) => {
        socket.join(`partida:${partidaId}`)
        socket.to(`partida:${partidaId}`).emit('user_joined', { username })
      })

      socket.on('respuesta', (data) => {
        // { partida_id, usuario_id, pregunta_id, opcion_id }
        this.io!.to(`partida:${data.partida_id}`).emit('respuesta_recibida', data)
      })

      socket.on('disconnect', () => {
        console.log('🔌 Cliente desconectado:', socket.id)
      })
    })
  }

  /**
   * Cierre limpio en apagado/test
   */
  public async shutdown() {
    await this.io?.close()
  }
}
