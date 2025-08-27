import { Server, Socket } from 'socket.io'
import { HttpServer } from '@adonisjs/core/http'

// --- Tipos de Datos para el Juego ---
interface User {
  id: string
  username: string
}

interface Player extends User {
  score: number
  answers: { questionIndex: number; correct: boolean }[]
}

interface Question {
  question: string
  options: string[]
  correctAnswer: number // Índice de la respuesta correcta
}

interface GameState {
  roomId: string
  players: Map<string, Player>
  questions: Question[]
  currentQuestionIndex: number
  status: 'waiting' | 'playing' | 'finished'
}

// --- Preguntas de Ejemplo ---
const sampleQuestions: Question[] = [
  {
    question: '¿Cuál es la capital de Colombia?',
    options: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla'],
    correctAnswer: 0,
  },
  {
    question: '¿En qué año llegó el hombre a la Luna?',
    options: ['1965', '1969', '1972', '1980'],
    correctAnswer: 1,
  },
  {
    question: '¿Quién escribió "Cien años de soledad"?',
    options: ['Julio Cortázar', 'Mario Vargas Llosa', 'Gabriel García Márquez', 'Pablo Neruda'],
    correctAnswer: 2,
  },
]

class SocketService {
  private static io: Server
  private static games: Map<string, GameState> = new Map()

  public static boot(server: HttpServer) {
    this.io = new Server(server.getHttpServer()!, {
      cors: {
        origin: '*',
      },
    })

    this.io.on('connection', async (socket: Socket) => {
      const { default: logger } = await import('@adonisjs/core/services/logger')
      logger.info(`Socket connected: ${socket.id}`)

      // --- Evento: Unirse a una sala (joinRoom) ---
      socket.on('joinRoom', async ({ roomId, user }: { roomId: string; user: User }) => {
        if (!roomId || !user) return

        socket.join(roomId)
        const { default: logger } = await import('@adonisjs/core/services/logger')
        logger.info(`Socket ${socket.id} (${user.username}) joined room ${roomId}`)

        if (!this.games.has(roomId)) {
          this.games.set(roomId, {
            roomId,
            players: new Map(),
            questions: this.getRandomQuestions(),
            currentQuestionIndex: 0,
            status: 'waiting',
          })
        }

        const game = this.games.get(roomId)!
        const player: Player = { ...user, score: 0, answers: [] }
        game.players.set(user.id, player)

        // Guardar info en el socket para desconexión
        ;(socket as any).roomId = roomId
        ;(socket as any).userId = user.id

        // Notificar a todos en la sala sobre el nuevo jugador
        this.io.to(roomId).emit('updatePlayers', Array.from(game.players.values()))

        // Si el juego ya empezó, enviarle la pregunta actual
        if (game.status === 'playing') {
          socket.emit('newQuestion', {
            question: game.questions[game.currentQuestionIndex],
            questionIndex: game.currentQuestionIndex,
            totalQuestions: game.questions.length,
          })
        }
      })

      // --- Evento: Iniciar Partida (startGame) ---
      socket.on('startGame', ({ roomId }: { roomId: string }) => {
        const game = this.games.get(roomId)
        if (game && game.status === 'waiting') {
          game.status = 'playing'
          this.sendQuestion(roomId)
        }
      })

      // --- Evento: Enviar Respuesta (sendAnswer) ---
      socket.on(
        'sendAnswer',
        ({
          roomId,
          userId,
          answerIndex,
        }: {
          roomId: string
          userId: string
          answerIndex: number
        }) => {
          const game = this.games.get(roomId)
          if (!game || game.status !== 'playing') return

          const player = game.players.get(userId)
          const question = game.questions[game.currentQuestionIndex]

          if (player && question) {
            const correct = question.correctAnswer === answerIndex
            player.answers.push({ questionIndex: game.currentQuestionIndex, correct })
            if (correct) {
              player.score += 10
            }
            // Notificar a todos la actualización de puntajes
            this.io.to(roomId).emit('updatePlayers', Array.from(game.players.values()))
          }

          // Comprobar si todos han respondido (lógica simplificada)
          if (game.currentQuestionIndex < game.questions.length - 1) {
            game.currentQuestionIndex++
            setTimeout(() => this.sendQuestion(roomId), 2000) // Pequeña pausa
          } else {
            this.endGame(roomId)
          }
        }
      )

      // --- Evento: Desconexión ---
      socket.on('disconnect', async () => {
        const { default: logger } = await import('@adonisjs/core/services/logger')
        logger.info(`Socket disconnected: ${socket.id}`)
        this.handleDisconnect(socket)
      })
    })
  }

  private static sendQuestion(roomId: string) {
    const game = this.games.get(roomId)
    if (game && game.status === 'playing') {
      const question = game.questions[game.currentQuestionIndex]
      this.io.to(roomId).emit('newQuestion', {
        question,
        questionIndex: game.currentQuestionIndex,
        totalQuestions: game.questions.length,
      })
    }
  }

  private static async endGame(roomId: string) {
    const game = this.games.get(roomId)
    if (!game) return

    game.status = 'finished'
    const players = Array.from(game.players.values())

    this.io.to(roomId).emit('endGame', { players })

    const ranking = players.sort((a, b) => b.score - a.score).slice(0, 3)
    this.io.to(roomId).emit('ranking', ranking)

    const { default: logger } = await import('@adonisjs/core/services/logger')
    setTimeout(() => {
      this.games.delete(roomId)
      logger.info(`Game in room ${roomId} finished and cleaned up.`)
    }, 30000)
  }

  private static async handleDisconnect(socket: Socket) {
    const { roomId, userId } = socket as any
    if (!roomId || !userId) return

    const game = this.games.get(roomId)
    if (game) {
      game.players.delete(userId)
      if (game.players.size === 0) {
        this.games.delete(roomId)
        const { default: logger } = await import('@adonisjs/core/services/logger')
        logger.info(`Room ${roomId} is empty and has been removed.`)
      } else {
        this.io.to(roomId).emit('updatePlayers', Array.from(game.players.values()))
      }
    }
  }

  private static getRandomQuestions(): Question[] {
    return sampleQuestions.sort(() => 0.5 - Math.random()).slice(0, 3)
  }

  public static getIo() {
    return this.io
  }
}

export default SocketService
