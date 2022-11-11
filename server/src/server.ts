import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { gameRoutes } from './routes/game'
import { authRoutes } from './routes/auth'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
    // em produção mudar para a url que a aplicação estiver hospedada
  })

  await fastify.register(jwt, {
    secret: 'nlwcopa2022qatar',
  })

  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(gameRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(authRoutes)

  const { NODE_ENV } = process.env

  const port = 3333
  let host: string
  NODE_ENV === 'PROD' ? (host = '0.0.0.0') : (host = 'localhost')

  await fastify.listen({
    port,
    host,
  })
}

bootstrap()
