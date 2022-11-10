interface GuessData {
  id: string
  gameId: string
  createdAt: string
  participantId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export interface GameData {
  id: string
  date: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: null | GuessData
}
