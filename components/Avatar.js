
import { StyleSheet, Text, View } from "react-native";



export default function LetterAvatar({ content }) {
    return (
        <View style={styles.avatar}>
            <Text style={styles.letter}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,          
        height: 40,
        borderRadius: 20,     
        backgroundColor: '#cf8888', 
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      letter: {
        fontSize: 18,
        color: '#ffffff',
      },
}
);