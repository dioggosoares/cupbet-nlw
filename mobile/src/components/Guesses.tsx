import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useToast, FlatList } from 'native-base'

import { GameData } from '../@types/game.d'

import { api } from '../services/api'

import { EmptyMyPoolList } from './EmptyMyPoolList'
import { Game } from './Game'
import { Loading } from './Loading'

interface GuessesProps {
  poolId: string
  code: string
}

export function Guesses({ poolId, code }: GuessesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingConfirmGuess, setIsLoadingConfirmGuess] = useState(false)
  const [games, setGames] = useState<GameData[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      setIsLoadingConfirmGuess(true)

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      const createGuess = await api.post(
        `/pools/${poolId}/games/${gameId}/guesses`,
        {
          firstTeamPoints: Number(firstTeamPoints),
          secondTeamPoints: Number(secondTeamPoints),
        },
      )

      if (createGuess) {
        toast.show({
          title: 'Palpite realizado com sucesso',
          placement: 'top',
          bgColor: 'green.500',
        })

        fetchGames()
      }
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingConfirmGuess(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchGames()
    }, [poolId]),
  )

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
          isLoadingConfirmGuess={isLoadingConfirmGuess}
        />
      )}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{
        pb: 20,
      }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  )
}
