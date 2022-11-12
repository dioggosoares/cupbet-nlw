import { Heading, VStack } from 'native-base'
import { Header } from '../components/Header'

export function Profile() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Perfil" />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="lg"
          mb={8}
          textAlign="center"
        >
          Profile
        </Heading>
      </VStack>
    </VStack>
  )
}
