import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

function CovidForm(props) {
  const [] = useState('');

  return (
    <View style={styles.formContainer}>
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'aliceblue',
    flex: 1
  }
});

export default CovidForm;
