import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalSelector from 'react-native-modal-selector';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';
import {Value} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

export function DropdownHeader({
  showCountries,
  showDirectors,
  countries,
  directors,
  days,
  onDaySelected,
  onCountrySelected,
  onDirectorSelected,
}) {
  return (
    // <DropDownPicker
    //   items={dataArray}
    //   defaultValue={'uk'}
    //   containerStyle={{height: 60, width: 200}}
    //   style={{
    //     elevation: 20,
    //     backgroundColor: '#fafafa',
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    //     borderBottomLeftRadius: 10,
    //     borderBottomRightRadius: 10,
    //   }}
    //   itemStyle={{
    //     elevation: 20,
    //     justifyContent: 'flex-start',
    //   }}
    //   dropDownStyle={{backgroundColor: '#fafafa'}}
    //   onChangeItem={(item) => {}}
    // />
    // <ModalSelector
    //   style={{backgroundColor: 'white', borderRadius: 80}}
    //   data={dataArray}
    //   initValue="Country name"
    //   onChange={(option) => {
    //     alert(`${option.label} (${option.key}) nom nom nom`);
    //   }}
    // />
    <View
      style={{
        width: width / 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      {showCountries ? (
        <RNPickerSelect
          placeholder={{label: 'All Countries ', value: 'all'}}
          onValueChange={(value) => onCountrySelected(value)}
          itemKey={countries.key}
          items={countries}
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
          onValueChange={(value) => onDirectorSelected(value)}
          itemKey={directors.key}
          items={directors}
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
        itemKey={days.key}
        items={days}
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
