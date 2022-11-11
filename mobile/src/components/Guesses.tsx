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
  const [isListItemLoading, setIsListItemLoading] = useState(false)
  const [isLoadingConfirmGuess, setIsLoadingConfirmGuess] = useState(false)
  const [games, setGames] = useState<GameData[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')
  const [page, setPage] = useState(0)

  const toast = useToast()

  const page_size = 3

  async function fetchGames(more: boolean = false) {
    try {
      if (!more) setIsLoading(true)

      setIsListItemLoading(true)
      const response = await api.get(
        `/pools/${poolId}/games?page_size=${page_size}&page=${page} `,
      )
      setGames([...games, ...response.data.games])
      setPage(page + 1)
      setIsListItemLoading(false)
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Não foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
      setIsListItemLoading(false)
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

  const renderItem = ({ item }) => (
    <Game
      data={item}
      setFirstTeamPoints={setFirstTeamPoints}
      setSecondTeamPoints={setSecondTeamPoints}
      onGuessConfirm={() => handleGuessConfirm(item.id)}
      isLoadingConfirmGuess={isLoadingConfirmGuess}
    />
  )

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
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
      onEndReached={() => fetchGames(true)}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isListItemLoading && <Loading />}
      _contentContainerStyle={{
        pb: 20,
      }}
    />
  )
}
