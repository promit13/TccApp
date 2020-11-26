import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import _ from 'lodash';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {width, height} from '../config/utils';

import {useDatas} from '../Providers/DataProviders';

let titleArray = [];
let rangeArray = [];
let rewardsArray = [];
let newArray = [];

export default HeaderBar = ({nav}) => {
  const [searchLens, setSearchLens] = useState(false);
  const [itemSelected, setItemSelected] = useState('Search...');
  const [reset, setReset] = useState(false);

  const {campaigns, rewards} = useDatas();

  useEffect(() => {
    titleArray = [];
    rangeArray = [];
    rewardsArray = [];
    newArray = [];
    titleArray = _.map(campaigns, (o) =>
      _.extend({name: o.title, campaigns: [o._id]}, o),
    );
    rangeArray = _.map(campaigns, (o) =>
      _.extend({name: o.range, campaigns: [o._id]}, o),
    );
    rewardsArray = _.map(rewards, (o) => _.extend({name: o.Title}, o));
    // newArray = [...titleArray, ...rangeArray, ...rewardsArray];
    newArray = titleArray.concat(rangeArray, rewardsArray);
  });

  return (
    <View style={styles.headerStyle}>
      <Image
        style={{width: moderateScale(150), height: moderateScale(50)}}
        source={require('../res/logo.png')}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {searchLens ? (
          <SearchableDropdown
            onItemSelect={(item) => {
              // setItemSelected('');
              nav.navigate('CampaignSingle', {
                selectedCampaign: item.campaigns,
              });
            }}
            containerStyle={{
              width: moderateScale(150),
              backgroundColor: '#F5F5F5',
            }}
            itemStyle={{
              padding: 10,
              backgroundColor: 'white',
              borderColor: '#bbb',
              borderWidth: 0.2,
              borderRadius: 5,
            }}
            itemTextStyle={{color: '#222', fontSize: moderateScale(15)}}
            itemsContainerStyle={{
              maxHeight: moderateScale(250),
              position: 'absolute',
              zIndex: 1,
              marginTop: moderateScale(30),
            }}
            textInputStyle={{fontSize: moderateScale(10), color: 'grey'}}
            items={newArray}
            defaultIndex={0}
            resetValue={false}
            textInputProps={{
              placeholder: 'Search...',
              placeholderTextColor: 'grey',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                fontSize: moderateScale(15),
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
          size={moderateScale(20)}
          onPress={() => setSearchLens(!searchLens)}
          iconStyle={{color: 'grey', marginRight: moderateScale(20)}}
        />
        <View
          style={{
            backgroundColor: '#BC955C',
            width: moderateScale(45),
            height: moderateScale(50),
            justifyContent: 'center',
          }}>
          <Icon
            name="menu"
            type="feather"
            size={moderateScale(25)}
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
    flex: 1,
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(20),
    backgroundColor: '#F5F5F5',
  },
});
