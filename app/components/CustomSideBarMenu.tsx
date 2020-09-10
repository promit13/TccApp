//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
const items = [
  {
    navOptionThumb: 'home',
    navOptionName: 'Home',
    screenToNavigate: 'Home',
  },
  {
    navOptionThumb: 'bar-chart-2',
    type: 'feather',
    navOptionName: 'Zones',
    screenToNavigate: 'Zone',
  },
  {
    navOptionThumb: 'heart-outlined',
    navOptionName: 'Living Well',
    type: 'entypo',
    screenToNavigate: 'Test',
  },
  {
    navOptionThumb: 'leaf',
    type: 'entypo',
    navOptionName: 'Caring for the Environment',
    screenToNavigate: 'Home',
  },
  {
    navOptionThumb: 'food-drumstick',
    type: 'material-community',
    navOptionName: 'Food for Thought',
    screenToNavigate: 'Zone',
  },
  {
    navOptionThumb: 'user-friends',
    type: 'font-awesome-5',
    navOptionName: 'Friends and Family',
    screenToNavigate: 'Test',
  },
];

export function CustomSidebarMenu(props) {
  return (
    <View style={styles.sideMenuContainer}>
      <View style={{width: '100%'}}>
        {items.map((item, key) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 20,
            }}
            key={key}
            onPress={() => {
              props.navigation.navigate(item.screenToNavigate);
            }}>
            <View style={{marginRight: 10, marginLeft: 20}}>
              <Icon
                type={item.type}
                name={item.navOptionThumb}
                size={40}
                color="#fff"
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}>
              {item.navOptionName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#758592',
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
