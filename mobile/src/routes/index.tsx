import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'

import { useAuth } from '../hooks/useAuth'

export function Routes() {
  const { token } = useAuth()

  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {!token ? <SignIn /> : <AppRoutes />}
      </NavigationContainer>
    </Box>
  )
}
