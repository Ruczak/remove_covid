import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';

const TopBar = ({ barHeight }) => {
  return (
    <View style={[styles.container, { height: 80 }]}>
      <Text style={styles.text}>COVID-19 Risk calculator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff7712',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white'
  }
});

export default TopBar;
