import { Button, HStack, Text, useTheme, VStack } from 'native-base'
import { X, Check } from 'phosphor-react-native'
import { getName, overwrite } from 'country-list'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import { FirstTeam } from './FirstTeam'
import { SecondTeam } from './SecondTeam'
import { GameData } from '../@types/game'

interface GameProps {
  data: GameData
  isLoadingConfirmGuess: boolean
  onGuessConfirm: () => void
  setFirstTeamPoints: (value: string) => void
  setSecondTeamPoints: (value: string) => void
}

overwrite([
  {
    code: 'QA',
    name: 'Catar',
  },
  {
    code: 'EC',
    name: 'Equador',
  },
  {
    code: 'GB-ENG',
    name: 'Inglaterra',
  },
  {
    code: 'IR',
    name: 'Iran',
  },
  {
    code: 'SN',
    name: 'Senegal',
  },
  {
    code: 'NL',
    name: 'Holanda',
  },
  {
    code: 'US',
    name: 'Estados Unidos',
  },
  {
    code: 'GB-WLS',
    name: 'País de Gales',
  },
  {
    code: 'AR',
    name: 'Argentina',
  },
  {
    code: 'SA',
    name: 'Arábia Saudita',
  },
  {
    code: 'DK',
    name: 'Dinamarca',
  },
  {
    code: 'TN',
    name: 'Tunísia',
  },
  {
    code: 'MX',
    name: 'México',
  },
  {
    code: 'PL',
    name: 'Polônia',
  },
  {
    code: 'FR',
    name: 'França',
  },
  {
    code: 'AU',
    name: 'Austrália',
  },
  {
    code: 'MA',
    name: 'Marrocos',
  },
  {
    code: 'HR',
    name: 'Croácia',
  },
  {
    code: 'DE',
    name: 'Alemanha',
  },
  {
    code: 'JP',
    name: 'Japão',
  },
  {
    code: 'ES',
    name: 'Espanha',
  },
  {
    code: 'CR',
    name: 'Costa Rica',
  },
  {
    code: 'BE',
    name: 'Bélgica',
  },
  {
    code: 'CA',
    name: 'Canadá',
  },
  {
    code: 'CH',
    name: 'Suíça',
  },
  {
    code: 'CM',
    name: 'Camarões',
  },
  {
    code: 'UY',
    name: 'Uruguai',
  },
  {
    code: 'KR',
    name: 'Coreia do Sul',
  },
  {
    code: 'PT',
    name: 'Portugal',
  },
  {
    code: 'GH',
    name: 'Gana',
  },
  {
    code: 'BR',
    name: 'Brasil',
  },
  {
    code: 'RS',
    name: 'Sérvia',
  },
])

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
  isLoadingConfirmGuess,
}: GameProps) {
  const { colors, sizes } = useTheme()

  const when = dayjs(data.date)
    .locale(ptBR)
    .format('DD [de] MMMM [de] YYYY [às] HH:00[h]')

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {getName(data.firstTeamCountryCode)} vs.{' '}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {when}
      </Text>

      <HStack
        mt={4}
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <FirstTeam
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          teamPoint={data.guess ? String(data?.guess?.firstTeamPoints) : ''}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <SecondTeam
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          teamPoint={data.guess ? String(data?.guess?.secondTeamPoints) : ''}
        />
      </HStack>

      {!data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={onGuessConfirm}
          isLoading={isLoadingConfirmGuess}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  )
}
