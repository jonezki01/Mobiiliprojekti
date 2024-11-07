import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ChosenListScreen';

/* export default function App() {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const theme = useTheme(isDarkTheme);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
} */


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