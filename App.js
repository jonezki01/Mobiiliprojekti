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


const Stack = createStackNavigator()

export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const theme = useTheme(isDarkTheme)

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme)
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerStyle: { height: 70, backgroundColor: theme.colors.primary },
            headerTitleAlign: 'center',
            headerTitleStyle: { color: theme.colors.tertiary, flex: 1 },
            headerTintColor: theme.colors.tertiary,
          }}>
            <Stack.Screen style={styles.screen} name="Home">
              {props => <Homescreen {...props} toggleTheme={toggleTheme} />}
            </Stack.Screen>
            <Stack.Screen style={styles.screen} name="Weather" component={WeatherScreen} />
            <Stack.Screen style={styles.screen} name="Currency" component={CurrencyCalculator} />
            <Stack.Screen style={styles.screen} name="Lists" component={ListScreen} />
            <Stack.Screen style={styles.screen} name="Items" component={ItemScreen} />
          </Stack.Navigator>
          <Footer style={styles.footer} />
        </SafeAreaView>
      </PaperProvider>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 40,
  },

})
/*-----------Testausta varten-------------- */
