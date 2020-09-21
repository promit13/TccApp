//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const items = [
  {
    fontSize: 30,
    navOptionThumb: 'home',
    navOptionName: 'Home',
    screenToNavigate: 'Home',
  },
  {
    fontSize: 30,
    navOptionThumb: 'bar-chart-2',
    type: 'feather',
    navOptionName: 'Zones',
    screenToNavigate: 'Zone',
  },
  {
    fontSize: 20,
    navOptionThumb: 'user-friends',
    type: 'font-awesome-5',
    navOptionName: 'Friends and Family',
    screenToNavigate: 'CampaignMenu',
    index: 1,
  },
  {
    fontSize: 20,
    navOptionThumb: 'food-drumstick',
    type: 'material-community',
    navOptionName: 'Food for Thought',
    screenToNavigate: 'CampaignMenu',
    index: 2,
  },
  {
    fontSize: 20,
    navOptionThumb: 'heart-outlined',
    navOptionName: 'Living Well',
    type: 'entypo',
    screenToNavigate: 'CampaignMenu',
    index: 3,
  },
  {
    fontSize: 20,
    navOptionThumb: 'leaf',
    type: 'entypo',
    navOptionName: 'Caring for the Planet',
    screenToNavigate: 'CampaignMenu',
    index: 4,
  },
  {
    fontSize: 30,
    navOptionThumb: 'logout',
    type: 'material-community',
    navOptionName: 'Help',
    screenToNavigate: 'GraphDemo',
  },
  {
    fontSize: 30,
    navOptionThumb: 'logout',
    type: 'material-community',
    navOptionName: 'Logout',
    screenToNavigate: 'Logout',
  },
];

export function CustomSidebarMenu(props) {
  const [index, setIndex] = useState(1);
  return (
    <View style={styles.sideMenuContainer}>
      <View style={{width: '100%'}}>
        <Icon
          iconStyle={{alignSelf: 'flex-end', marginRight: 10}}
          type="evilicon"
          name="close"
          size={50}
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
                paddingVertical: 20,
              }}
              key={key}
              onPress={() => {
                setIndex(key);
                props.navigation.navigate(item.screenToNavigate, {
                  index: item.index,
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
                  marginLeft: 30,
                  color: key === index ? '#848484' : 'white',
                }}>
                {item.navOptionName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4F4F4F',
    alignItems: 'center',
    paddingTop: 40,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
});
