import {MD3LightTheme, MD3DarkTheme } from 'react-native-paper'

    const CustomLightTheme = {
      ...MD3LightTheme,
      colors: {
        ...MD3LightTheme.colors,
        headerBackground: '#d3d3d3',
        secondaryContainer: '#e3c8e6',
      },
    }
    
    const CustomDarkTheme = {
      ...MD3DarkTheme,
      colors: {
        ...MD3DarkTheme.colors,
        headerBackground: '#1e1e1e',
        secondaryContainer: '#121212',
      },
    }
    
    export default function useTheme(isDarkTheme) {
      return isDarkTheme ? CustomDarkTheme : CustomLightTheme
    }