import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [locServiceEnabled, setLocServiceEnabled] = useState(false); // boolean
  const [pos, setPos] = useState({}); // { latitude: number, longitude: number }
  const [countryCode, setCountryCode] = useState(''); // string

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Your location is off',
        'Please enable your location.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else setLocServiceEnabled(true);
  };

  const getCurrentLocation = async () => {
    let { status } = Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Please allow the app to use the location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    let { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;

      setPos({ latitude, longitude });

      const code = await getCountryCode({ latitude, longitude });

      setCountryCode(code);
    }
  };

  const getCountryCode = async ({ latitude, longitude }) => {
    const props = await Location.reverseGeocodeAsync({
      latitude,
      longitude
    });

    const iso2code = props[0].isoCountryCode;

    const response = await fetch('http://country.io/iso3.json');
    const data = await response.json();

    const iso3code = data[iso2code];

    return iso3code;
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
