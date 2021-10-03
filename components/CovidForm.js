import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Checkbox from './FormEntities/Checkbox';
import SubmitButton from './FormEntities/SubmitButton';

function CovidForm({ children, handleSubmit }) {
  const [sex, setSex] = useState(0);
  const [houseMembers, setHouseMembers] = useState(0);
  const [socialDistance, setSocialDistance] = useState(0);
  const [usesMask, setUsesMask] = useState(0);
  const [contactFreq, setContactFreq] = useState(0);

  const [infectedContact, setInfectedContact] = useState(false);
  const [didWearMask, setDidWearMask] = useState(0);

  const [useDisinfecting, setUsesDisinfecting] = useState(false);
  const [bigCity, setBigCity] = useState(false);
  const [covidMember, setCovidMember] = useState(false);

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
          defaultValueByIndex={sex}
        />
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
          defaultValueByIndex={houseMembers}
        />
      </View>

      <View style={styles.rowContainer}>
        <View>
          <Text>How much of social </Text>
          <Text>distance do you keep?</Text>
        </View>
        <SelectDropdown
          data={[
            `${String.fromCharCode(8805)}1 meters`,
            `${String.fromCharCode(8805)}2 meters`,
            'None'
          ]}
          onSelect={(selected, index) => setSocialDistance(index)}
          buttonStyle={styles.selectDropdown}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={socialDistance}
        />
      </View>

      <View style={styles.rowContainer}>
        <View>
          <Text>Do u wear a </Text>
          <Text>mask in public?</Text>
        </View>
        <SelectDropdown
          data={['Yes (certified)', 'Yes', 'No']}
          onSelect={(selected, index) => setUsesMask(index)}
          buttonStyle={styles.selectDropdown}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={usesMask}
        />
      </View>

      <View style={styles.rowContainer}>
        <View>
          <Text>How often do you</Text>
          <Text>meet other people?</Text>
        </View>
        <SelectDropdown
          data={[
            'Hardly ever',
            'Once a week',
            '2-3 times a week',
            `${String.fromCharCode(8805)}4 times a week`
          ]}
          onSelect={(selected, index) => setContactFreq(index)}
          buttonStyle={styles.selectDropdown}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={contactFreq}
        />
      </View>

      <View style={styles.rowContainer}>
        <Text>
          Have you had a contact with anyone infected with COVID lately?
        </Text>
      </View>

      <View style={[styles.rowContainer, { marginTop: 0, marginBottom: 5 }]}>
        <Checkbox
          initial={infectedContact}
          callback={(val) => setInfectedContact(val)}
          outsideStyles={{
            marginLeft: 10,
            marginRight: 10
          }}
        />
        <Text>Yes</Text>

        <SelectDropdown
          data={['They had a mask', "They didn't had a mask"]}
          onSelect={(selected, index) => setDidWearMask(index === 0)}
          buttonStyle={[
            styles.selectDropdown,
            { opacity: !infectedContact ? 0.3 : 1 },
            { width: '70%' }
          ]}
          rowStyle={styles.optionDropdown}
          dropdownStyle={styles.dropdownDropdown}
          defaultValueByIndex={didWearMask}
          disabled={!infectedContact}
        />
      </View>

      <View style={styles.rowContainer}>
        <Checkbox
          initial={covidMember}
          callback={(val) => setCovidMember(val)}
          outsideStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <Text>I have a sick household member</Text>
      </View>

      <View style={styles.rowContainer}>
        <Checkbox
          initial={bigCity}
          callback={(val) => setBigCity(val)}
          outsideStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <View>
          <Text>I live in a big city (min. 1 million residents)</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <Checkbox
          initial={useDisinfecting}
          callback={(val) => setUsesDisinfecting(val)}
          outsideStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <Text>I use disinfecting agents (min. 3 times a day)</Text>
      </View>

      <SubmitButton
        borderStyles={styles.button}
        onClick={() =>
          handleSubmit(
            sex,
            houseMembers,
            socialDistance,
            usesMask,
            contactFreq,
            { infectedContact, didWearMask },
            useDisinfecting,
            bigCity,
            covidMember
          )
        }
      >
        Submit
      </SubmitButton>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 15,
    marginBottom: 20
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'left',
    alignItems: 'center',
    marginTop: 20
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
