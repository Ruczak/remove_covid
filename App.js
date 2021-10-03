import React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import * as Location from 'expo-location';
import CovidForm from './components/CovidForm';
import Debug from './components/Debug';
import { calculateRisk } from './logic/CalculateRisk';
import Outcome from './components/Outcome';
import TopBar from './components/TopBar';

export default function App() {
  const [locServiceEnabled, setLocServiceEnabled] = useState(false); // boolean
  const [pos, setPos] = useState({}); // { latitude: number, longitude: number }
  const [countryCode, setCountryCode] = useState(''); // string
  const [countryPopulation, setCountryPopulation] = useState(0); // fetch (people)
  const [countryDensity, setCountryDensity] = useState(0); // fetch (people/km^2)
  const [covidCases, setCovidCases] = useState(0); // fetch (number)
  const [todayCases, setTodayCases] = useState(0); // fetch (number)
  const [currentCovicCases, setCurrentCovidCases] = useState(0); // fetch (number)
  const [loaded, setLoaded] = useState(false); // boolean
  const [risk, setRisk] = useState(null); // number

  // Checks if location is enabled, if not, it sends an alert
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

  // Gets current location coordinates
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted' || locServiceEnabled) {
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

  // Get country code and convert iso2 -> iso3
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

  const handleSubmit = (
    sex,
    houseMembers,
    socialDistance,
    usesMask,
    contactFreq,
    { infectedContact, didWearMask },
    useDisinfecting,
    bigCity,
    covidMember
  ) => {
    if (loaded) {
      // console.log(
      //   sex,
      //   houseMembers,
      //   socialDistance,
      //   usesMask,
      //   contactFreq,
      //   { infectedContact, didWearMask },
      //   useDisinfecting,
      //   bigCity,
      //   covidMember
      // );
      setRisk(
        calculateRisk(
          currentCovicCases,
          countryPopulation,
          sex,
          socialDistance,
          usesMask,
          bigCity,
          infectedContact,
          didWearMask,
          houseMembers,
          covidMember,
          useDisinfecting,
          contactFreq
        ) * 100
      );
    } else {
      Alert.alert('Wait', 'Geolocation data is loading.', [{ text: 'OK' }], {
        cancelable: false
      });
    }
  };

  // Fetch data
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

      setCovidCases(
        covidData['cases'].reduce(
          (total, currentVal) => total + (currentVal !== null ? currentVal : 0)
        )
      );

      setTodayCases(covidData['cases'][covidData.cases.length - 2]);

      setCurrentCovidCases(
        covidData['cases']
          .slice((start = -16), (end = -2))
          .reduce((total, current) => total + current)
      );
      setLoaded(true);
    } catch (err) {
      Alert.alert('Network Error', 'Sorry, there was an network error.', 'OK', {
        cancelable: false
      });
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchInfo(countryCode);
  }, [countryCode]);

  return (
    <React.Fragment>
      <StatusBar barStyle={'dark-content'} />

      <SafeAreaView style={styles.container}>
        <TopBar />
        {/* <Debug
          tag={countryCode}
          population={countryPopulation}
          density={countryDensity}
          totalCases={covidCases}
          latestCases={todayCases}
          acitveCases={currentCovicCases}
          loaded={loaded}
        /> */}
        <CovidForm handleSubmit={handleSubmit}>
          <Outcome risk={risk} style={{ marginTop: 20 }} />
        </CovidForm>
      </SafeAreaView>
    </React.Fragment>
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
