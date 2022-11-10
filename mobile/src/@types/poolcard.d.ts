import { Participant } from './participants.d'

export interface PoolCardData {
  id: string
  code: string
  title: string
  ownerId: string
  createdAt: string
  owner: {
    name: string
  }
  participants: Participant[]
  _count: {
    participants: number
  }
}
