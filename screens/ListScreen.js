import React, { useEffect, useState } from 'react'
import { addList, deleteList, firestore } from '../firestore/config'
import { onSnapshot, collection } from "firebase/firestore"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme, TextInput, Button, Portal, Modal } from 'react-native-paper'
import ListModal from '../components/ListModal'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


export default function ListScreen({ navigation }) {

  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')
  const [userId, setUserId] = useState(null)

  const theme = useTheme()
  const [visible, setVisible] = useState(false)
  const showModal = () => setVisible(true)

  const hideModal = () =>
    Alert.alert('Varoitus', 'Haluatko keskeyttää listan luomisen', [
      {
        text: 'En',
        style: 'cancel',
      },
      { text: 'Kyllä', onPress: () => setVisible(false) },
    ])

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem('userEmail')
      if (!id) {
        return
      }
      setUserId(id)
    }

    fetchUserId()
  }, [])

  useEffect(() => {
    if (!userId) return

    const listsRef = collection(firestore, 'users', userId, 'lists')
    const unsubscribe = onSnapshot(listsRef, (snapshot) => {
      const fetchedLists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setLists(fetchedLists)
    })

    return () => unsubscribe()
  }, [userId])

  const createList = async () => {
    if (!userId) return
    if (newListName.trim()) {
      const listData = {
        name: newListName,
        timestamp: new Date(),
      }
      await addList(userId, listData)
      setNewListName('')
    }
  }

  const handleDeleteList = async (listId) => {
    if (!userId) return
    try {
      await deleteList(userId, listId)
    } catch (error) {
      console.log("Failed to delete list:", error)
    }
  }

  return (

    <View style={[styles.listContent, { backgroundColor: theme.colors.secondaryContainer }]}>
      {userId ? (
        <>
          <Portal>
            <Modal contentContainerStyle={styles.listmodal} visible={visible} onDismiss={hideModal} >
              <ListModal userId={userId} hideModal={hideModal} setVisible={setVisible} />
            </Modal>
          </Portal>
          <Button theme={{ colors: { primary: theme.colors.primary } }}
            mode='elevated'
            textColor='black'
            onPress={showModal} >
            create list
          </Button>
          <FlatList
            data={lists}
            keyExtractor={(list) => list.id}
            renderItem={({ item }) => (
              <View style={styles.listContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Items', { listId: item.id, userId, listMetaData: item})}>
                  <Text style={styles.listText}>{item.name}</Text>
                  <Text style={styles.listDetail}>{item.matkaLuokka}</Text>
                  <Text style={styles.listDetail}>Kohde: {item.matkanKohde}</Text>
                  <Text style={styles.listDetail}>{item.range.startDate.toDate().toLocaleDateString()} - {item.range.endDate.toDate().toLocaleDateString()} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
      )}
          />
        </>
      ) : (
        <Text>Log in to see your lists</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  listInput: {
    width: '100%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  listText: {
    fontSize: 18
  },
  listmodal: {
    position: 'absolute',
    top: 30,
    right: 0,
    left: 0,
  },
  listDetail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
})


