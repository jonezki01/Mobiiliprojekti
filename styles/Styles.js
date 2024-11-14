import { StyleSheet } from 'react-native'
//Stack.Navigator tyylit:
const navigatorStyles = (theme) => ({
    headerStyle: {
      height: 70,
      backgroundColor: theme.colors.primary,
    },
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: theme.colors.tertiary,
    },
    headerTintColor: theme.colors.tertiary,
  })

//App.js tyylit:
  const appStyles = StyleSheet.create({
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

  export {
    navigatorStyles,
    appStyles
  }