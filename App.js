import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import WeatherScreen from './screens/WeatherScreen'
import CurrencyCalculator from './screens/CalculatorScreen'
import Settings from './screens/SettingsScreen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'


const Tab = createBottomTabNavigator()
const ListStack = createStackNavigator

export default function App() {
  
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  
  const toggleTheme = () => setIsDarkTheme((prev) => !prev)

  
  const CustomDefaultTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      headerBackground: '#d3d3d3', // Uusi väri headerille jos halutaan
      secondaryContainer: '#f3f3f3'
    },
  }

  const theme = isDarkTheme ? MD3DarkTheme : CustomDefaultTheme
  //https://m3.material.io/styles/color/static/baseline
  
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.secondaryContainer}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer theme={theme}>
            <Tab.Navigator
              initialRouteName="Weather"
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: theme.colors.secondaryContainer,
                },
                headerTintColor: theme.colors.onSurface,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                tabBarStyle: {
                  backgroundColor: theme.colors.secondaryContainer, 
                },
                tabBarActiveTintColor: theme.colors.tertiary,
                tabBarInactiveTintColor: theme.colors.onSecondaryContainer,
                tabBarIcon: ({ color, size }) => {
                  let iconName

                  switch (route.name) {
                    case 'Weather':
                      iconName = 'weather-cloudy'
                      break
                    case 'Currency':
                      iconName = 'currency-eur'
                      break
                    case 'Settings':
                      iconName = 'cog'
                      break
                    default:
                      iconName = 'question'
                  }

                  return <Icon name={iconName} color={color} size={size} />
                },
              })}
            >
              <Tab.Screen name="Weather" component={WeatherScreen} />
              <Tab.Screen name="Currency" component={CurrencyCalculator} />
              <Tab.Screen name="Settings">
                {(props) => (
                  <Settings
                    {...props}
                    toggleTheme={toggleTheme}
                    isDarkTheme={isDarkTheme}
                  />
                )}
              </Tab.Screen>
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
