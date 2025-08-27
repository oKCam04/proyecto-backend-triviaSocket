// start/socket_io.ts
import { Server as SocketIOServer } from 'socket.io'
import server from '@adonisjs/core/services/server'

export const io = new SocketIOServer(server.getNodeServer(), {
  cors: { origin: '*' },
  // quita "path" para usar el default '/socket.io/'
})

console.log('[Socket.IO] iniciado sobre el HTTP server')

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id)

  socket.on('join', ({ partidaId, username }) => {
    socket.join(`partida:${partidaId}`)
    socket.to(`partida:${partidaId}`).emit('user_joined', { username })
  })

  socket.on('respuesta', (data) => {
    io.to(`partida:${data.partida_id}`).emit('respuesta_recibida', data)
  })
})
