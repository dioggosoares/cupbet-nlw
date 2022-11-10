import { Share } from 'react-native'
import { Row, Text, Pressable } from 'native-base'

interface Props {
  code: string
}

export function EmptyMyPoolList({ code }: Props) {
  async function handleCodeShare() {
    await Share.share({
      message: code,
    })
  }

  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" textAlign="center" fontSize="sm">
        Esse bolão ainda não tem participantes, que tal
      </Text>

      <Pressable onPress={handleCodeShare}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
          fontSize="sm"
        >
          compartilhar o código
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        do bolão com alguém?
      </Text>

      <Text color="gray.200" mr={1} fontSize="sm">
        Use o código
      </Text>

      <Text
        color="gray.200"
        fontSize="sm"
        textAlign="center"
        fontFamily="heading"
      >
        {code}
      </Text>
    </Row>
  )
}