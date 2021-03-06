import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

const SubmitButton = ({ children, onClick, borderStyles, textStyles }) => {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={[styles.outline, borderStyles]}>
        <Text style={[styles.text, textStyles]}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 20,
    backgroundColor: 'white',
    width: 120,
    height: 40,
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default SubmitButton;
