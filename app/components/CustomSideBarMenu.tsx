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
    screenToNavigate: 'Test',
  },
  {
    navOptionThumb: 'heart-outlined',
    navOptionName: 'Living Well',
    type: 'entypo',
    screenToNavigate: 'Notifications',
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
    screenToNavigate: 'Test',
  },
  {
    navOptionThumb: 'user-friends',
    type: 'font-awesome-5',
    navOptionName: 'Friends and Family',
    screenToNavigate: 'Notifications',
  },
];

export function CustomSidebarMenu(props) {
  //Setting up the Main Top Large Image of the Custom Sidebar
  //Array of the sidebar navigation option with icon and screen to navigate
  //This screens can be any screen defined in Drawer Navigator in App.js
  //You can find the Icons from here https://material.io/tools/icons/

  return (
    <View style={styles.sideMenuContainer}>
      {/*Top Large Image */}
      {/* <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#e2e2e2',
          marginTop: 15,
        }}
      /> */}
      {/*Setting up Navigation Options from option array using loop*/}
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
