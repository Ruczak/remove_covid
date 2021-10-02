import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Checkbox = ({
  insideStyles,
  outsideStyles,
  callback,
  initial = false
}) => {
  const [checked, setChecked] = useState(initial);

  const handlePress = (wasChecked) => {
    setChecked(!wasChecked);
    if (callback) callback(!wasChecked);
    return !wasChecked;
  };

  return (
    <TouchableOpacity onPress={() => handlePress(checked)}>
      <View style={[styles.outline, outsideStyles]}>
        {checked ? <View style={[styles.inside, insideStyles]} /> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outline: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000'
  },
  inside: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff7712',
    alignSelf: 'center',
    marginTop: 4
  }
});

export default Checkbox;
