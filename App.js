import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import useTheme from './hooks/Theme'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Footer from './components/Footer'
import Homescreen from './screens/HomeScreen'
import WeatherScreen from './screens/WeatherScreen'
import ListScreen from './screens/ListScreen'
import ItemScreen from './screens/ChosenListScreen'
import CurrencyCalculator from './screens/CalculatorScreen'
import CheckCredentials from './screens/CheckCredentials'
import { navigatorStyles, appStyles as styles } from './styles/Styles'


const Stack = createStackNavigator()

export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [logged, setLogged] = useState(false)
  const theme = useTheme(isDarkTheme)

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          {logged ? (
          <Stack.Navigator initialRouteName='Lists' screenOptions={navigatorStyles(theme)}>
            <Stack.Screen style={styles.screen} name="Lists" component={ListScreen} />
            <Stack.Screen style={styles.screen} name="Items" component={ItemScreen} />
            <Stack.Screen style={styles.screen} name="Home">
              {props => <Homescreen {...props} toggleTheme={toggleTheme} />}
            </Stack.Screen>
            <Stack.Screen style={styles.screen} name="Weather" component={WeatherScreen} />
            <Stack.Screen style={styles.screen} name="Currency" component={CurrencyCalculator} />           
          </Stack.Navigator>
          ) : (
            <CheckCredentials setLogged={setLogged} />
          )}
          <Footer style={styles.footer} />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  )
}

