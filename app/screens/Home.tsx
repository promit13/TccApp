import React from 'react';
<<<<<<< HEAD
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

type FormData = {
  userId: string;
  password: string;
};

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        buttonStyle={styles.buttonStyle}
        title="LOGIN"
        onPress={() => navigation.navigate('Login')}
        titleStyle={styles.buttonStyle}
      />
=======
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Dashboard from './Dashboard';
import Sessions from './Sessions';
import Header from '../components/Header';

const {width, height} = Dimensions.get('window');

const Drawer = createDrawerNavigator();

//This is an example code for Navigation Drawer with Custom Side bar//
const items = [
  {
    navOptionName: 'Dashboard',
    screenToNavigate: 'Dashboard',
  },
  {
    navOptionName: 'Sessions',
    screenToNavigate: 'Sessions',
  },
  {
    navOptionName: 'Campaigns',
    screenToNavigate: 'Dashboard',
  },
  {
    navOptionName: 'Users',
    screenToNavigate: 'Sessions',
  },
  {
    navOptionName: 'Logout',
    screenToNavigate: 'Dashboard',
  },
];

export function CustomSidebarMenu(props) {
  return (
    <View style={styles.sideMenuContainer}>
      {items.map((item, key) => (
        <TouchableOpacity
          style={{
            padding: 30,
            borderColor: 'grey',
            borderWidth: 0.5,
          }}
          key={key}
          onPress={() => {
            props.navigation.navigate(item.screenToNavigate);
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'grey',
            }}>
            {item.navOptionName}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Home({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <Header nav={navigation} backgroundColor="green" />
      <Drawer.Navigator
        drawerType="permanent"
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        drawerStyle={{
          width: width / 5,
        }}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Sessions" component={Sessions} />
        <Drawer.Screen name="Campaigns" component={Dashboard} />
        <Drawer.Screen name="Users" component={Sessions} />
        <Drawer.Screen name="Logout" component={Dashboard} />
      </Drawer.Navigator>
>>>>>>> feature/videoplayer
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  textStyle: {
    fontSize: 20,
    color: 'grey',
  },
});
=======
  sideMenuContainer: {
    flex: 1,
  },
});

export default Home;
>>>>>>> feature/videoplayer
