import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Header from './components/Header'
import Footer from './components/Footer';
import useTheme from './hooks/Theme'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ChosenListScreen';


//--------------Joonan dark ja light mode---------------//
/* export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = useTheme(isDarkTheme);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            <Header style={styles.header} />

            <View style={[styles.content, { backgroundColor: theme.colors.primary }]}>
              <Text>Open up App.js to start working on your app!</Text>
              <TouchableOpacity onPress={toggleTheme}>
                <Icon name="dark-mode" size={30} color={theme.colors.toggleButtonColor} />
              </TouchableOpacity>
            </View>

            <Footer style={styles.footer} />

          </View>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
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
  header: {
    height: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 40,
  },
  footer: {
    height: 50,
  },
}); */
//--------------Joonan dark ja light mode---------------//

const Stack = createStackNavigator();

/*-----------Testausta varten--------------*/
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lists">
        <Stack.Screen name="Lists" component={ListScreen} />
        <Stack.Screen name="Items" component={ItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  header: {
    height: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginTop: 10,
    marginBottom: 40,
  },
  footer: {
    height: 50,
  },
});
/*-----------Testausta varten--------------*/