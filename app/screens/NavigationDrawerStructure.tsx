//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomSidebarMenu} from '../components/CustomSideBarMenu';

//Import all the screens
import Zone from './Zone';
import Test from './Test';
import Home from './Home';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const SignedIn = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
      drawerPosition="right">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Zone" component={Zone} />
      <Drawer.Screen name="Test" component={Test} />
    </Drawer.Navigator>
  );
};
export default function NavigationDrawerStructure() {
  return (
    <View style={{flex: 1}}>
      <SignedIn />
    </View>
  );
}
