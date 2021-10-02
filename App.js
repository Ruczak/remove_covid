import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [locServiceEnabled, setLocServiceEnabled] = useState(false); // boolean
  const [pos, setPos] = useState({}); // { latitude: number, longitude: number }
  const [countryCode, setCountryCode] = useState(''); // string
  const [countryPopulation, setCountryPopulation] = useState(0); // fetch (people)
  const [countryDensity, setCountryDensity] = useState(0); // fetch (people/km^2)
  const [covidCases, setCovidCases] = useState(0); // fetch (number)
  const [todayCases, setTodayCases] = useState(0); // fetch (number)

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
    let { status } = await Location.requestForegroundPermissionsAsync();
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

  const fetchInfo = async (code) => {
    if (code === '') return;
    try {
      const responseCovid = await fetch(
        `https://sedac.ciesin.columbia.edu/repository/covid19/json/${code}_admin0_covid_trend.json`
      );
      const responseCountry = await fetch(
        `https://sedac.ciesin.columbia.edu/repository/covid19/json/${code}_admin0_age_distribution.json`
      );

      const covidData = await responseCovid.json();
      const countryData = await responseCountry.json();

      setCountryPopulation(
        Math.ceil(
          countryData.results[0].value.estimates[
            'gpw-v4-basic-demographic-characteristics-rev10_atotpopbt-count'
          ].SUM
        )
      );
      setCountryDensity(
        countryData.results[0].value.estimates[
          'gpw-v4-population-density-adjusted-to-2015_2020'
        ].MEAN
      );

      setTodayCases(covidData['cases'][covidData.cases.length - 2]);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchInfo(countryCode);
  }, [countryCode]);

  useEffect(() => {
    console.log('Population:', countryPopulation);
  }, [countryPopulation]);

  useEffect(() => {
    console.log('Today cases:', todayCases);
  }, [todayCases]);

  return (
    <View style={styles.container}>
      <Text>Statistics</Text>
      <Text>Country: {countryCode}</Text>
      <Text>Country Population: {countryPopulation}</Text>
      <Text>
        Population Density:{' '}
        {countryDensity === 'NoData'
          ? 'Unknown'
          : parseFloat(countryDensity).toFixed(2) + ' people / sq. kilometre'}
      </Text>
      <Text>Latest number of COVID cases: {todayCases}</Text>
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