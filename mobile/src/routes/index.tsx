import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'

import { useAuth } from '../hooks/useAuth'

export function Routes() {
  const { user, token } = useAuth()

  return (
    <Box flex={1} bgColor="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}
