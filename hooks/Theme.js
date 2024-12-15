import {MD3LightTheme, MD3DarkTheme } from 'react-native-paper'
import { Colors } from "./BlueLight"

    const CustomLightTheme = {
      ...MD3LightTheme, colors: Colors.light
    }
    
    const CustomDarkTheme = {
      ...MD3DarkTheme, colors: Colors.dark
    }
    
    export default function useTheme(isDarkTheme) {
      return isDarkTheme ? CustomDarkTheme : CustomLightTheme
    }