import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Gauge from './Gauge';

const Outcome = ({ risk, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Gauge risk={risk} />
      <Text style={styles.text}>
        Your risk score score is: {risk !== null ? risk.toFixed(2) : '-'} out of
        100
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500'
  }
});

export default Outcome;
