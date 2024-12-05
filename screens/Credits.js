 
 import React from "react";
 import { View, Text, StyleSheet, Image } from "react-native";
 
 export default function Credits() {
 
     const image = './assets/modern_minimalist_logo.webp'; 
   return (
     <View style={styles.container}>
       <Image 
         source="./assets/modern_minimalist_logo.webp"
         style={styles.picture}
       />
       <Text style={styles.credits}>Credits:</Text>
       <Text style={styles.name}>Jarno Tauriainen</Text>
       <Text style={styles.name}>Johannes Vidkopp</Text>
       <Text style={styles.name}>Joona Vilponen</Text>
       <Text style={styles.name}>Tiina Mäntykivi</Text>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
   },
   picture: {
     width: 140,
     height: 140,
     marginBottom: 20,
     borderRadius: 50, 
   },
   credits: {
     fontSize: 24,
     fontWeight: "bold",
     marginBottom: 10,
     color: "#333",
   },
   name: {
     fontSize: 20,
     color: "#555",
   },
 });