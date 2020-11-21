//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {scale, moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const items = [
  {
    fontSize: moderateScale(15),
    navOptionName: 'DASHBOARD',
    screenToNavigate: 'Home',
  },
  {
    fontSize: moderateScale(15),
    navOptionName: 'INTRODUCTION',
    screenToNavigate: 'Introduction',
  },
  {
    fontSize: moderateScale(15),
    navOptionName: 'ZONES',
    screenToNavigate: 'Zone',
  },
  {
    fontSize: moderateScale(10),
    navOptionName: 'FRIENDS AND FAMILY',
    screenToNavigate: 'Campaign',
    index: 1,
    id: '5f08c1f26e3da910bbf313a5',
  },
  {
    fontSize: moderateScale(10),
    navOptionName: 'FOOD FOR THOUGHT',
    screenToNavigate: 'Campaign',
    index: 2,
    id: '5f08c1ea6e3da910bbf313a4',
  },
  {
    fontSize: moderateScale(10),
    navOptionName: 'CARING FOR THE PLANET',
    screenToNavigate: 'Download',
    index: 4,
    id: '5f08c1e46e3da910bbf313a3',
  },
  {
    fontSize: moderateScale(10),
    navOptionName: 'LIVING WELL',
    screenToNavigate: 'Campaign',
    id: '5f08c1d96e3da910bbf313a2',
  },
  {
    fontSize: moderateScale(15),
    navOptionName: 'CASE STUDIES',
    screenToNavigate: 'CaseStudies',
  },
  {
    fontSize: moderateScale(15),
    navOptionName: 'HELP',
    screenToNavigate: 'Help',
  },
  {
    fontSize: moderateScale(15),
    navOptionName: 'LOGOUT',
    screenToNavigate: 'Logout',
  },
];

export function CustomSidebarMenu(props) {
  const [index, setIndex] = useState(2);
  return (
    <View style={styles.sideMenuContainer}>
      <Icon
        iconStyle={{alignSelf: 'flex-end', marginRight: moderateScale(5)}}
        type="evilicon"
        name="close"
        size={moderateScale(30)}
        color="#fff"
        onPress={() => {
          props.navigation.closeDrawer();
        }}
      />
      {items.map((item, key) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: moderateScale(10),
            }}
            key={key}
            onPress={() => {
              setIndex(key);
              props.navigation.navigate(item.screenToNavigate, {
                id: JSON.stringify(item.id),
                showBackButton: false,
              });
            }}>
            {/* <View style={{marginRight: 10, marginLeft: 20}}>
              <Icon
                type={item.type}
                name={item.navOptionThumb}
                size={40}
                color="#fff"
              />
            </View> */}
            <Text
              style={{
                fontSize: item.fontSize,
                marginLeft: moderateScale(18),
                color: key === index ? '#848484' : 'white',
              }}>
              {item.navOptionName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    height: '100%',
    backgroundColor: '#4F4F4F',
    paddingTop: moderateScale(25),
  },
});
