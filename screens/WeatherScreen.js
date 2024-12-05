import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme, TextInput } from 'react-native-paper'
import * as Location from 'expo-location'

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('')
  const [location, setLocation] = useState(null)

  const apikey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

  const theme = useTheme()

  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true)
    setError(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network error: ' + response.status)
      }
      const data = await response.json()
      setWeatherData(data)
      console.log(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async (city) => {
    setLoading(true)
    setError(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network error: ' + response.status)
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCitySubmit = () => {
    if (city.trim()) {
      fetchWeather(city)
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied')
        return
      }

      try {
        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation)
        fetchWeatherByCoords(currentLocation.coords.latitude, currentLocation.coords.longitude)
      } catch (error) {
        setError('Unable to fetch location')
      }
    })()
  }, [])

  if (loading) {
    return (
      <View style={[styles.weatherContent, { backgroundColor: theme.colors.secondaryContainer }]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (error) {
    if (error == 'Network error: 404') {
      return (
        <View style={[styles.weatherContent, { backgroundColor: theme.colors.secondaryContainer }]}>
          <TextInput
            style={[styles.citySearch, { backgroundColor: theme.colors.surface }]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={handleCitySubmit}
          />
          <Text style={[{ color: theme.colors.tertiary }]}>City not found</Text>
        </View>
      )
    } else if (error == 'Network error: 401') {
      return (
        <View style={[styles.weatherContent, { backgroundColor: theme.colors.secondaryContainer }]}>
          <Text style={[{ color: theme.colors.tertiary }]}>Invalid API key</Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.weatherContent, { backgroundColor: theme.colors.secondaryContainer }]}>
          <Text style={[{ color: theme.colors.tertiary }]}>{error}</Text>
        </View>
      )
    }

  }

  return (
    <View style={[styles.weatherContent, { backgroundColor: theme.colors.secondaryContainer }]}>
      <TextInput
        style={[styles.citySearch, { backgroundColor: theme.colors.surface }]}
        placeholder="City"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleCitySubmit}
      />
      {weatherData && (
        <>
          <Text style={[{ color: theme.colors.tertiary }]}>{weatherData.name}, {weatherData.sys.country}</Text>
          <Text style={[{ color: theme.colors.tertiary }]}>{weatherData.main.temp}°C</Text>
          <Text style={[{ color: theme.colors.tertiary }]}>{weatherData.weather[0].description}</Text>
          <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }} style={styles.weatherIcon} />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  weatherContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  citySearch: {
    width: '60%',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  }
})