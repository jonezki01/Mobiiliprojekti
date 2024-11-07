import React, { useEffect, useState } from 'react';
import { addItemToList, deleteItem, firestore } from '../firestore/config';
import { onSnapshot, collection } from "firebase/firestore";


/*-----------Testausta varten--------------*/
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
/*-----------Testausta varten--------------*/

export default function ItemScreen({ route }) {
  const { userId, listId } = route.params;
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const itemsRef = collection(firestore, 'users', userId, 'lists', listId, 'items');
    const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
      const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(fetchedItems);
    });

    return () => unsubscribe();
  }, [userId, listId]);

  const addItem = async () => {
    if (newItem.trim()) {
      const itemData = {
        name: newItem,
        timestamp: new Date(),
      };
      await addItemToList(userId, listId, itemData);
      setNewItem('');
    }
  };

  const removeItem = async (itemId) => {
    await deleteItem(userId, listId, itemId);
  };

  return (
/*     <>
    </> */

/*-----------Testausta varten--------------*/
    <View style={styles.container}>
      <Text style={styles.header}>Items in List</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
/*-----------Testausta varten--------------*/


/*-----------Testausta varten--------------*/
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ddd', borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 18 },
});
/*-----------Testausta varten--------------*/