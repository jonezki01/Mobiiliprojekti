import React, { useEffect, useState } from 'react';
import { addList, deleteList, firestore } from '../firestore/config';
import { onSnapshot, collection } from "firebase/firestore";


/*-----------Testausta varten--------------*/
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
/*-----------Testausta varten--------------*/

export default function ListScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const userId = "testUserId"; //user id:n käyttö tulee Jarnolta

  useEffect(() => {
    const listsRef = collection(firestore, 'users', userId, 'lists');
    const unsubscribe = onSnapshot(listsRef, (snapshot) => {
      const fetchedLists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLists(fetchedLists);
    });

    return () => unsubscribe();
  }, []);
  
  const createList = async () => {
    if (newListName.trim()) {
      const listData = {
        name: newListName,
        timestamp: new Date(),
      };
      await addList(userId, listData);
      setNewListName('');
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(userId, listId);
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  return (
  /*   <>
    </> */

    //Tässä alla testausta varten raakile. Poistetaan kun todellinen ulkoasu tehdään
    /*-----------Testausta varten--------------*/
    <View style={styles.container}>
      <Text style={styles.header}>My Lists</Text>
      <TextInput
        style={styles.input}
        placeholder="New List Name"
        value={newListName}
        onChangeText={setNewListName}
      />
      <Button title="Create List" onPress={createList} />
      <FlatList
        data={lists}
        keyExtractor={(list) => list.id}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Items', { listId: item.id, userId })}>
              <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
/*-----------Testausta varten--------------*/

//Testausta varten. poistetaan kun todellinen ulkoasu.
/*-----------Testausta varten--------------*/
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  listContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  listText: { fontSize: 18 },
});
/*-----------Testausta varten--------------*/