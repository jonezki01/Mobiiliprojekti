import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button, TextInput, useTheme } from 'react-native-paper'
import { Dropdown } from 'react-native-paper-dropdown'
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates'
import { addList } from '../firestore/config'


const ListModal = ({ userId, hideModal, setVisible }) => {
  const [listName, setListName] = useState('')
  const [matkaLuokka, setMatkaluokka] = useState(null)
  const [matkanKohde, setMatkanKohde] = useState('')
  const [range, setRange] = useState({ startDate: undefined, endDate: undefined })
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  registerTranslation('fi', {
    save: 'Tallenna',
    selectSingle: 'Valitse päivä',
    selectMultiple: 'Valitse päivät',
    selectRange: 'Valitse aikaväli',
    notAccordingToDateFormat: (inputFormat) =>
      `Ei vastaa muotoa ${inputFormat}`,
    mustBeHigherThan: (date) => `Täytyy olla myöhempi kuin ${date}`,
    mustBeLowerThan: (date) => `Täytyy olla aikaisempi kuin ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Täytyy olla ${startDate} ja ${endDate} välillä`,
    dateIsDisabled: 'Päivä ei ole sallittu',
    previous: 'Edellinen',
    next: 'Seuraava',
    typeInDate: 'Kirjoita päivämäärä',
    pickDateFromCalendar: 'Valitse päivä kalenterista',
    close: 'Sulje',
  })

  const onDismiss = useCallback(() => {
    setOpen(false)
  }, [])

  const onConfirm = useCallback(({ startDate, endDate }) => {
    setOpen(false)
    setRange({ startDate, endDate })
  }, [])

  const OPTIONS = [
    { label: 'Vacation', value: 'Vacation' },
    { label: 'Hiking', value: 'Hiking' },
    { label: 'Hunting', value: 'Hunting' },
    { label: 'Fishing', value: 'Fishing' },
  ]

  const handleCreateList = async () => {
    if (!listName || !matkaLuokka || !matkanKohde || !range.startDate || !range.endDate) {
      console.log('Please complete all fields.')
      return
    }

    const listData = {
      name: listName,
      matkaLuokka,
      matkanKohde,
      range,
    }

    await addList(userId, listData) // Save list to Firestore
    setListName('')
    setMatkaluokka(null)
    setMatkanKohde('')
    setRange({ startDate: undefined, endDate: undefined })
    setOpen(false)
    setVisible(false)
  }

  return (
    <View style={[styles.roundedView, { backgroundColor: theme.colors.tertiaryContainer }]}>

      <View /* style={styles.modal} */>
        <Text style={styles.title}>Luo uusi lista</Text>
        <TextInput
          theme={{ colors: { primary: theme.colors.primary } }}
          mode="outlined"
          label="List name"
          value={listName}
          onChangeText={setListName}
          style={styles.input}
          autoCorrect={false}
        />
        <Dropdown
          theme={{ colors: { primary: theme.colors.primary } }}
          mode="outlined"
          label="Travel class"
          placeholder="Valitse matka"
          options={OPTIONS}
          value={matkaLuokka}
          onSelect={setMatkaluokka}
          style={styles.dropdown}
        />
        <TextInput
          theme={{ colors: { primary: theme.colors.primary } }}
          style={styles.input}
          mode="outlined"
          label="Travel destination"
          value={matkanKohde}
          onChangeText={setMatkanKohde}
        />
        <Button
          labelStyle={{ color: theme.colors.onPrimaryContainer }}
          onPress={() => setOpen(true)}
          uppercase={false}
          mode="outlined"
          style={styles.button}
        >
          {range.startDate && range.endDate
            ? `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`
            : 'Choose date range'}
        </Button>
        
        <DatePickerModal
          locale="fi"
          mode="range"
          visible={open}
          onDismiss={onDismiss}
          startDate={range.startDate}
          endDate={range.endDate}
          onConfirm={onConfirm}
        />
        
        <Button
          theme={{ colors: { primary: theme.colors.primaryContainer } }}
          labelStyle={{ color: theme.colors.onPrimaryContainer }}
          mode="contained"
          onPress={handleCreateList}
          style={styles.button}
        >
          Create list
        </Button>
      
        <Button
          theme={{ colors: { primary: theme.colors.primary } }}
          mode="contained-tonal"
          onPress={hideModal}
          style={styles.button}
     
        >
          Cancel
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  title: {
    paddingBottom: 10,
    fontSize: 16,
  },
  input: {
    /* marginBottom: 15, */
  },
  button: {
    marginTop: 15,
  },
  dropdown: {
    marginBottom: 15,
  },
  roundedView: {
    borderRadius: 20,
    padding: 20,
    margin:20,
  },
})

export default ListModal
