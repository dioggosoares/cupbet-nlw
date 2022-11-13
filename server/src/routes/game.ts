import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { Games } from '../services/games'
import { authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/pools/:id/games',
    { onRequest: [authenticate] },
    async (request, reply) => {
      const getPoolParams = z.object({
        id: z.string(),
      })

      const { id } = getPoolParams.parse(request.params)

      const gameResolver = new Games()

      const { page_size, page }: any = request.query
      const data = await gameResolver.getGames(
        id,
        request.user.sub,
        parseInt(page_size),
        parseInt(page || '0'),
      )
      reply.send(data)
    },
  )
}
