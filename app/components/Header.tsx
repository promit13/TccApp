/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import SearchableDropdown from 'react-native-searchable-dropdown';

const {width, height} = Dimensions.get('window');

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];

export default HeaderBar = ({nav}) => {
  const [searchLens, setSearchLens] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [itemSelected, setItemSelected] = useState('Search...');

  return (
    <View style={styles.headerStyle}>
      <Image
        style={{width: 100, height: 100}}
        source={require('../res/logo.png')}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* {searchLens ? (
          <SearchBar
            onClear={() => setSearchLens(true)}
            placeholder="Search..."
            onChangeText={(search) => setSearchValue(search)}
            searchIcon={false}
            value={searchValue}
            containerStyle={{
              height: 60,
              width: 300,
              backgroundColor: '#F5F5F5',
              borderBottomColor: '#F5F5F5',
              borderTopColor: '#F5F5F5',
              marginRight: 15,
            }}
            inputContainerStyle={{
              backgroundColor: '#F5F5F5',
            }}
            inputStyle={{fontSize: 25}}
          />
        ) : null} */}
        {searchLens ? (
          <SearchableDropdown
            onItemSelect={(item) => {
              console.log(item);
            }}
            containerStyle={{
              width: 300,
              backgroundColor: '#F5F5F5',
            }}
            itemStyle={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#bbb',
              borderWidth: 0.2,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222', fontSize: 30}}
            itemsContainerStyle={{
              maxHeight: 400,
              position: 'absolute',
              zIndex: 1,
              marginTop: 60,
            }}
            textInputStyle={{fontSize: 30, color: 'red'}}
            items={items}
            defaultIndex={0}
            resetValue={false}
            textInputProps={{
              placeholder: 'Search...',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                fontSize: 30,
              },
              onTextChange: (text) => setItemSelected(text),
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />
        ) : null}
        <Icon
          name="search"
          type="fontisto"
          size={40}
          onPress={() => setSearchLens(!searchLens)}
          iconStyle={{color: 'grey', marginRight: 40}}
        />

        <View
          style={{
            backgroundColor: '#BC955C',
            width: 100,
            height: 100,
            justifyContent: 'center',
          }}>
          <Icon
            name="menu"
            type="entypo"
            size={50}
            onPress={() => nav.toggleDrawer()}
            iconStyle={{color: 'white'}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    backgroundColor: '#F5F5F5',
  },
});
