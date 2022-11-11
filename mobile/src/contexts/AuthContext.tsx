import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '../services/api'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  token: string
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [token, setToken] = useState('')
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.GOOGLE_API_TOKEN,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('/users', { access_token })
      api.defaults.headers.common.Authorization = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me')

      if (userInfoResponse && tokenResponse) {
        setUser(userInfoResponse.data.user)
        setToken(tokenResponse.data.token)

        await AsyncStorage.setItem(
          '@cupbet-app-1.0.0',
          tokenResponse.data.token,
        )
      }
    } catch (error) {
      console.log(error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function retrieveToken() {
    const storageToken = await AsyncStorage.getItem('@cupbet-app-1.0.0')
    if (storageToken) {
      const userInfoResponse = await api.get('/me')
      api.defaults.headers.common.Authorization = `Bearer ${storageToken}`

      setUser(userInfoResponse.data.user)
      setToken(storageToken)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  useEffect(() => {
    retrieveToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
