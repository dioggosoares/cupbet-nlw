import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { PlusCircle, SoccerBall, User } from 'phosphor-react-native'
import { Flex, useTheme } from 'native-base'

import { Details } from '../screens/Details'
import { FindPool } from '../screens/FindPool'
import { NewPool } from '../screens/NewPool'
import { Pools } from '../screens/Pools'
import { SignIn } from '../screens/SignIn'
import { Profile } from '../screens/Profile'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { colors, sizes } = useTheme()

  const size = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[16],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: 0,
          left: 12,
        },
      }}
      initialRouteName="pools"
    >
      <Screen
        name="new"
        component={NewPool}
        options={{
          tabBarIcon: ({ color }) => (
            <Flex>
              <PlusCircle color={color} size={size} />
            </Flex>
          ),
          tabBarLabel: '',
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({ color }) => (
            <Flex
              bgColor="gray.800"
              borderWidth={2}
              borderColor="gray.700"
              p={3}
              mb={6}
              rounded={99999}
            >
              <SoccerBall color={color} size={36} />
            </Flex>
          ),
          tabBarLabel: '',
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Flex>
              <User color={color} size={size} />
            </Flex>
          ),
          tabBarLabel: '',
        }}
      />

      <Screen
        name="find"
        component={FindPool}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="signin"
        component={SignIn}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
