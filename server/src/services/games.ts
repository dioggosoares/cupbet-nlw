import { prisma } from '../lib/prisma'

class Games {
  async getGames(id: string, sub: string, pageSize: number, page: number) {
    const page_size = pageSize
    const games = await prisma.game.findMany({
      orderBy: {
        date: 'asc',
      },
      skip: page_size * page,
      take: page_size,
      include: {
        guesses: {
          where: {
            participant: {
              userId: sub,
              poolId: id,
            },
          },
        },
      },
    })

    const items = await prisma.game.count()
    const pages = Math.ceil(items / page_size)

    return {
      games: games.map((game) => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
          pages,
        }
      }),
    }
  }
}

export default new Games()
