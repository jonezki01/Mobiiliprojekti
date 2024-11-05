import { Colors } from './Colors'


const useTheme = (isDarkTheme) => {
  
    const theme = isDarkTheme
      ? {
          colors: {
            ...Colors.dark,
          },
        }
      : {
          colors: {
            ...Colors.light,
          },
        };
  
    return theme;
  };
  
  export default useTheme;