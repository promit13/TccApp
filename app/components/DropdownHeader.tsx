import React from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ModalSelector from 'react-native-modal-selector';
import RNPickerSelect from 'react-native-picker-select';
import {Icon} from 'react-native-elements';

export function DropdownHeader({dataArray}) {
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
    <RNPickerSelect
      placeholder={{label: 'All Sales Directors ', value: null}}
      onValueChange={(value) => console.log(value)}
      itemKey={dataArray.key}
      items={dataArray}
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
    // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black', // to ensure the text is never behind the icon
  },
});
