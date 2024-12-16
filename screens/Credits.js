import { View, StyleSheet, Image } from "react-native";
import { useTheme, TextInput, Button, Text } from 'react-native-paper'
import logo from '../assets/modern_and_minimalist_logo.webp';


export default function Credits() {
  const theme = useTheme()
  const image = './assets/modern_minimalist_logo.webp';
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondaryContainer }]}>
      <Image
        source={logo}
        style={styles.picture}
      />
      <View style={styles.toggleText}>
        <Text style={[styles.credits, { color: theme.colors.onSecondaryContainer}]}>Credits:</Text>
        <Text style={[styles.name, { color: theme.colors.onSecondaryContainer }]}>Jarno Tauriainen</Text>
        <Text style={[styles.name, { color: theme.colors.onSecondaryContainer }]}>Johannes Vidkopp</Text>
        <Text style={[styles.name, { color: theme.colors.onSecondaryContainer }]}>Joona Vilponen</Text>
        <Text style={[styles.name, { color: theme.colors.onSecondaryContainer }]}>Tiina Mäntykivi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  picture: {
    width: 140,
    height: 140,
    marginBottom: 20,
    borderRadius: 50,
  },
  credits: {
    alignItems: 'center',
    textAlign: 'center', 
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  name: {
    alignItems: 'center',
    textAlign: 'center', 
    fontSize: 20,
    color: "#555",
  },
});