import type { Server as IOServer } from 'socket.io'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    'socket.io': IOServer
  }
}
