import { Platform } from 'react-native'
import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from '@expo/vector-icons'

import { Icon, useTheme } from "native-base"

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import ScheduleSvg from '@assets/workouts.svg'

import { Home } from "@screens/Home"
import { History } from "@screens/History"
import { Profile } from "@screens/Profile"
import { Exercise } from "@screens/Exercise"
import { CreateExercise } from '@screens/CreateExercise'
import { Workouts } from '@screens/Workouts'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: { exerciseId: string }
  createExercise: undefined
  workouts: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.green[500],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[600],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10],
        paddingTop: sizes[7]
      }
    }}>
      <Screen 
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name="workouts"
        component={Workouts}
        options={{ 
          tabBarIcon: ({ color }) => (
            <ScheduleSvg fill={color} width={iconSize} height={iconSize} />
          )
        }}
      />

      <Screen 
        name="createExercise"
        component={CreateExercise}
        options={{
          tabBarButton: () => null
        }}
      />

      <Screen 
        name="exercise"
        component={Exercise}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}
