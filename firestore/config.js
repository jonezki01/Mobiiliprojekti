import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, deleteDoc, doc, writeBatch, getDocs } from "firebase/firestore"
import { initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
} 
console.log("Firebase Config:", firebaseConfig);

let app, firestore
try {
  app = initializeApp(firebaseConfig)
  firestore = getFirestore(app)
} catch (error) {
  console.log("Firebase initialization error:", error)
  if (error.code === 'app/invalid-configuration') {
    console.log("Invalid Firebase configuration. Check your API key and project settings.")
  } else {
    console.log("An unknown error occurred during Firebase initialization.")
  }
}

let auth
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence() })
} catch (error) {
  console.log("Firebase Auth initialization error:", error)
}

const addList = async (userId, listData) => {
  try {
    const listsRef = collection(firestore, 'users', userId, 'lists')
    await addDoc(listsRef, listData)
  } catch (error) {
    console.log("Error adding list: ", error)
  }
}

const addItemToList = async (userId, listId, itemData) => {
  try {
    const itemsRef = collection(firestore, 'users', userId, 'lists', listId, 'items')
    await addDoc(itemsRef, itemData)
  } catch (error) {
    console.log("Error adding item: ", error)
  }
}

const getLists = async (userId) => {
  const lists = []
  const listsRef = collection(firestore, 'users', userId, 'lists')
  const snapshot = await getDocs(listsRef)
  snapshot.forEach(doc => lists.push({ id: doc.id, ...doc.data() }))
  console.log("Fetched lists:", lists)
  return lists
}

const getItems = async (userId, listId) => {
  const items = []
  const itemsRef = collection(firestore, 'users', userId, 'lists', listId, 'items')
  const snapshot = await getDocs(itemsRef)
  snapshot.forEach(doc => items.push({ id: doc.id, ...doc.data() }))
  return items
}

const deleteItem = async (userId, listId, itemId) => {
  try {
    const itemRef = doc(firestore, 'users', userId, 'lists', listId, 'items', itemId)
    await deleteDoc(itemRef)
  } catch (error) {
    console.log("Error deleting item: ", error)
  }
}

export const deleteList = async (userId, listId) => {
  try {
    const listRef = doc(firestore, 'users', userId, 'lists', listId)
    const itemsRef = collection(firestore, 'users', userId, 'lists', listId, 'items')

    const batch = writeBatch(firestore)
    const itemsSnapshot = await getDocs(itemsRef)

    itemsSnapshot.forEach((itemDoc) => {
      batch.delete(itemDoc.ref)
    })

    await batch.commit()
    await deleteDoc(listRef)

    console.log("List and all its items deleted successfully")
  } catch (error) {
    console.log("Error deleting list and its items: ", error)
  }
}

export {
  firestore,
  addList,
  addItemToList,
  getLists,
  getItems,
  deleteItem,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}
