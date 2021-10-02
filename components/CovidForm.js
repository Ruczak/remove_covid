import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Checkbox from './FormEntities/Checkbox';
import SubmitButton from './FormEntities/SubmitButton';

function CovidForm() {
  const [usesMask, setUsesMask] = useState(false);
  const [useDisinfecting, setUsesDisinfecting] = useState(false);
  const [houseMembers, setHouseMembers] = useState(0);
  const [sex, setSex] = useState(0);

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.rowContainer}>
        <Text>What is your sex?</Text>
        <SelectDropdown
          data={['Male', 'Female']}
          onSelect={(selected, index) => setSex(index)}
          buttonStyle={styles.selectDropdown}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={0}
        />
      </View>
      <View style={styles.rowContainer}>
        <Checkbox
          initial={usesMask}
          callback={(val) => setUsesMask(val)}
          outsideStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <Text>I wear a mask</Text>
      </View>
      <View style={styles.rowContainer}>
        <Checkbox
          initial={useDisinfecting}
          callback={(val) => setUsesDisinfecting(val)}
          outsideStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <Text>I use disinfecting agents</Text>
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text>How many </Text>
          <Text>household members</Text>
          <Text>do you live with?</Text>
        </View>
        <SelectDropdown
          data={['None', 'One', 'Two', 'Three or more']}
          onSelect={(selected, index) => setHouseMembers(index)}
          buttonStyle={styles.selectDropdown}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={0}
        />
      </View>
      <SubmitButton
        borderStyles={styles.button}
        onClick={() => console.log('clicked!')}
      >
        Submit
      </SubmitButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 15
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'left',
    alignItems: 'center',
    marginTop: 10
  },
  selectDropdown: {
    borderRadius: 18,
    height: 36,
    marginLeft: 10,
    marginRight: 10,
    width: '50%'
  },
  dropdownDropdown: {
    borderRadius: 12
  },
  optionDropdown: {
    height: 36
  },
  button: {
    marginTop: 20,
    alignSelf: 'center'
  }
});

export default CovidForm;
