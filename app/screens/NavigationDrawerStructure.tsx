//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomSidebarMenu} from '../components/CustomSideBarMenu';

//Import all the screens
import Zone from './Zone';
import Test from './Test';
import Home from './Home';
import Panorama from './Panorama';
import Download from './Download';
import GraphDemo from './GraphDemo';
import Login from './Login';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
      drawerPosition="right"
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: 'grey',
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Zone" component={Zone} />
      <Drawer.Screen name="GraphDemo" component={GraphDemo} />
      <Drawer.Screen name="Panorama" component={Panorama} />
      <Drawer.Screen name="Download" component={Download} />
    </Drawer.Navigator>
  );
};

function SignedIn() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeStack} />
    </Stack.Navigator>
  );
}

export default function NavigationDrawerStructure() {
  return (
    <View style={{flex: 1}}>
      <SignedIn />
    </View>
  );
}
