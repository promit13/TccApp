// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import Home from '../screens/Home';

// const Drawer = createDrawerNavigator();

// export function SignedIn() {
//   return (
//     <Drawer.Navigator
//       drawerPosition="right"
//       openByDefault
//       drawerType="back"
//       overlayColor="transparent"
//       drawerStyle={{backgroundColor: '#c6cbef', width: 240}}>
//       <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
//   );
// }

import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import Zone from '../screens/Zone';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon color="black" size={40} name="heart" type="entypo" />}
        label="Home"
        onPress={() => alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export function SignedIn() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="back"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Home} />
      <Drawer.Screen name="Article" component={Home} />
    </Drawer.Navigator>
  );
}
