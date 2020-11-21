import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {Loading} from './Loading';

// import DropDownPicker from 'react-native-dropdown-picker';
// import ModalSelector from 'react-native-modal-selector';

import {useDatas} from '../Providers/DataProviders';

const {height, width} = Dimensions.get('window');

const daysArray = [
  {label: '30 Days', value: '30', key: '2'},
  {label: '90 Days', value: '90', key: '3'},
  {label: '365 Days', value: '365', key: '4'},
  {label: 'All', value: '10000', key: '5'},
];

// const countriesArray = [
//   {label: 'UK', value: 'uk', key: '2'},
//   {label: 'Australia', value: 'au', key: '3'},
//   {label: 'Africa', value: 'af', key: '4'},
// ];

let filteredCountries = [];
let filteredDirectors = [];

export function DropdownHeader({
  showCountries,
  showDirectors,
  directorName,
  dayName,
  country,
  countryName,
  onDaySelected,
  onCountrySelected,
  onDirectorSelected,
}) {
  const {countries, users} = useDatas();
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    filteredCountries = _.map(countries, (o, i) => {
      return _.extend({label: o.title, key: JSON.stringify(o._id)}, o);
    });

    if (country === 'all') {
      filteredDirectors = _.map(users, (o) => {
        return _.extend(
          {label: o.username, value: o.username, key: JSON.stringify(o._id)},
          o,
        );
        //creturn {...o, label: o.username, key: o._id, value: o._id};
      });
    } else {
      filteredDirectors = _.without(
        _.map(users, (o) => {
          if (JSON.stringify(country) === JSON.stringify(o.assign_country)) {
            return _.extend(
              {
                label: o.username,
                value: o.username,
                key: JSON.stringify(o._id),
              },
              o,
            );
          }
        }),
        undefined,
      );
    }
    // console.log('FILT Directors', filteredDirectors);
    // console.log('FILT Countries', filteredCountries);
    setLoading(false);
  });
  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      {showCountries ? (
        <RNPickerSelect
          placeholder={{label: 'All Countries ', value: 'all'}}
          onValueChange={(value, index) => {
            console.log('VALUE', value);
            if (index === 0) {
              onCountrySelected('all', 'all');
              return;
            }
            // setSelectedCountry(filteredCountries[index - 1]._id);
            onCountrySelected(filteredCountries[index - 1]._id, value);
          }}
          value={countryName}
          itemKey={filteredCountries.key}
          items={filteredCountries}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          Icon={() => (
            <Icon
              name="chevron-small-down"
              type="entypo"
              iconStyle={{color: 'grey', marginTop: 12, marginRight: 5}}
            />
          )}
        />
      ) : null}
      {showDirectors ? (
        <RNPickerSelect
          placeholder={{label: 'All Directors ', value: 'all'}}
          onValueChange={(value, index) => {
            console.log('FILT D INDEX', index);
            if (index === 0) {
              onDirectorSelected('all', 'all');
              return;
            }
            onDirectorSelected(
              filteredDirectors[index - 1]._id,
              filteredDirectors[index - 1].username,
            );
          }}
          itemKey={filteredDirectors.key}
          items={filteredDirectors}
          value={directorName}
          useNativeAndroidPickerStyle={false}
          style={pickerSelectStyles}
          Icon={() => (
            <Icon
              name="chevron-small-down"
              type="entypo"
              iconStyle={{color: 'grey', marginTop: 12, marginRight: 5}}
            />
          )}
        />
      ) : null}
      <RNPickerSelect
        placeholder={{label: 'Last 7 Days ', value: '7'}}
        onValueChange={(value) => onDaySelected(value)}
        itemKey={daysArray.key}
        items={daysArray}
        value={dayName}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        Icon={() => (
          <Icon
            name="chevron-small-down"
            type="entypo"
            iconStyle={{color: 'grey', marginTop: 12, marginRight: 5}}
          />
        )}
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 200,
    fontSize: 16,
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    color: 'black',
    marginLeft: 10,
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    marginLeft: 10,
    color: 'black', // to ensure the text is never behind the icon
  },
});
