import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box, useTheme } from 'native-base'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

export function Routes(){
  const { isAuthenticated } = useContext(AuthContext)

  const { colors } = useTheme()

  const theme = DefaultTheme

  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
