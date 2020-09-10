import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

export default HeaderBar = ({nav}) => {
  const [searchLens, setSearchLens] = useState(true);
  const [searchValue, setSearchValue] = useState('');

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
        {searchLens ? (
          <Icon
            name="search"
            type="fontisto"
            size={30}
            onPress={() => setSearchLens(false)}
            iconStyle={{color: 'white', marginRight: 40}}
          />
        ) : (
          <SearchBar
            onClear={() => setSearchLens(true)}
            placeholder="Type Here..."
            onChangeText={(search) => setSearchValue(search)}
            value={searchValue}
            containerStyle={{
              backgroundColor: 'white',
              height: 60,
              width: 300,
              borderRadius: 10,
            }}
            inputContainerStyle={{backgroundColor: 'white', borderRadius: 10}}
          />
        )}
        <Icon
          name="menu"
          type="entypo"
          size={40}
          onPress={() => nav.toggleDrawer()}
          iconStyle={{color: 'white'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    backgroundColor: '#758592',
  },
});
