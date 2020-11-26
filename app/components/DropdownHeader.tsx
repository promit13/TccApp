import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import {Loading} from './Loading';

import {useDatas} from '../Providers/DataProviders';

import {width, height} from '../config/utils';

const daysArray = [
  {label: '30 Days', value: '30', key: '2'},
  {label: '90 Days', value: '90', key: '3'},
  {label: '365 Days', value: '365', key: '4'},
  {label: 'All', value: '10000', key: '5'},
];

let filteredCountries = [];
let filteredDirectors = [];

export function DropdownHeader({
  userType,
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
  // const {user} = useAuth();

  const {countries, users, roles, regions} = useDatas();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 5f08c1656e3da910bbf313a0
    if (userType === 'regional_manager') {
      filteredCountries = _.without(
        _.map(countries, (o) => {
          if (
            JSON.stringify('5f6c769cce334d1a185e213c') ===
            JSON.stringify(o.region)
          ) {
            return _.extend({label: o.title, key: JSON.stringify(o._id)}, o);
          }
        }),
        undefined,
      );
      if (country === 'all') {
        filteredDirectors = _.without(
          _.map(users, (o) => {
            const obj = filteredCountries.find((c) => {
              return JSON.stringify(c._id) === JSON.stringify(o.assign_country);
            });
            if (obj === undefined) {
              return;
            }
            return _.extend(
              {
                label: o.username,
                value: o.username,
                key: JSON.stringify(o._id),
              },
              o,
            );
          }),
          undefined,
        );
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
    } else {
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
    }

    // if (country === 'all') {
    //   filteredDirectors = _.map(users, (o) => {
    //     return _.extend(
    //       {label: o.username, value: o.username, key: JSON.stringify(o._id)},
    //       o,
    //     );
    //     //creturn {...o, label: o.username, key: o._id, value: o._id};
    //   });
    // } else {
    //   filteredDirectors = _.without(
    //     _.map(users, (o) => {
    //       if (JSON.stringify(country) === JSON.stringify(o.assign_country)) {
    //         return _.extend(
    //           {
    //             label: o.username,
    //             value: o.username,
    //             key: JSON.stringify(o._id),
    //           },
    //           o,
    //         );
    //       }
    //     }),
    //     undefined,
    //   );
    // }
    // console.log('FILT Directors', filteredDirectors);
    // console.log('FILT Countries', filteredCountries);
    setLoading(false);
  }, [countries, country, userType, users]);
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
            console.log('VALUE', value, index);
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
              iconStyle={{
                color: 'grey',
                marginTop: moderateScale(8),
                marginRight: moderateScale(3),
              }}
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
              iconStyle={{
                color: 'grey',
                marginTop: moderateScale(8),
                marginRight: moderateScale(3),
              }}
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
            iconStyle={{
              color: 'grey',
              marginTop: moderateScale(8),
              marginRight: moderateScale(3),
            }}
          />
        )}
      />
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: moderateScale(100),
    fontSize: moderateScale(8),
    padding: moderateScale(8),
    alignItems: 'center',
    borderRadius: moderateScale(8),
    backgroundColor: 'white',
    color: 'black',
    marginLeft: moderateScale(5),
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: moderateScale(110),
    fontSize: moderateScale(8),
    padding: moderateScale(5),
    borderRadius: moderateScale(2),
    backgroundColor: 'white',
    marginLeft: moderateScale(5),
    color: 'black', // to ensure the text is never behind the icon
  },
});
