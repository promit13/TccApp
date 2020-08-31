//This is an example code for Navigation Drawer with Custom Side bar//
import React, {Component} from 'react';
//import react in our code.
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  Text,
} from 'react-native';
// import all basic components
import {createDrawerNavigator} from '@react-navigation/drawer';
//Import React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {CustomSidebarMenu} from '../components/CustomSideBarMenu';

//Import all the screens
import Home from './Home';
import Test from './Test';

function Feed({navigation}) {
  return (
    <View style={{flex: 1, padding: 40}}>
      <Icon
        name="menu"
        type="entypo"
        size={40}
        onPress={() => navigation.toggleDrawer()}
        iconStyle={{alignSelf: 'flex-end'}}
      />
      <Text>Feed Screen</Text>
      {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} /> */}
    </View>
  );
}

function Notifications({navigation}) {
  return (
    <View style={{flex: 1, padding: 40}}>
      <Icon
        name="menu"
        type="entypo"
        size={40}
        onPress={() => navigation.toggleDrawer()}
        iconStyle={{alignSelf: 'flex-end'}}
      />
      <Text>Notifications Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: (props) => (
            <Icon
              name="menu"
              type="entypo"
              size={40}
              onPress={() => props.navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Feed" component={Feed} />
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
      <Drawer.Screen name="Test" component={Test} />
      <Drawer.Screen name="Notifications" component={Notifications} />
    </Drawer.Navigator>
  );
};
export default class NavigationDrawerStructure extends React.Component {
  static navigationOptions = function (props) {
    return {
      title: 'Welcome',
      headerLeft: (
        <Button
          onPress={() => props.navigation.navigate('DrawerOpen')}
          title="="
        />
      ),
    };
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <Icon
          name="menu"
          type="entypo"
          size={40}
          onPress={() => navigation.toggleDrawer()}
        /> */}
        <SignedIn />
      </View>
    );
  }
}

// import * as React from 'react';
// import {View, Text, Button} from 'react-native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import {Icon} from 'react-native-elements';

// function Feed({navigation}) {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Feed Screen</Text>
//       <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
//       <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Notifications Screen</Text>
//     </View>
//   );
// }

// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawer"
//         onPress={() => props.navigation.navigate('Notifications')}
//         icon={() => <Icon name="menu" type="entypo" color="#808080" />}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.navigate('Feed')}
//       />
//     </DrawerContentScrollView>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function NavigationDrawerStructure() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Feed" component={Feed} />
//       <Drawer.Screen name="Notifications" component={Notifications} />
//     </Drawer.Navigator>
//   );
// }
