/* eslint-disable react-native/no-inline-styles */
//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useState} from 'react';
//import react in our code.
import {View} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {moderateScale} from 'react-native-size-matters';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomDrawerMenu} from '../components/CustomDrawerMenu';
import {SessionStartDialog} from '../components/SessionStartDialog';

//Import all the screens
import Zone from './Zone';
import Campaign from './Campaign';

import Dashboard from './Dashboard';
import Panorama from './Panorama';
import Download from './Download';
import Login from './Login';
import Logout from './Logout';
import Help from './Help';
import CampaignSingle from './CampaignSingle';
import CaseStudies from './CaseStudies';
import Introduction from './Introduction';
import CaseSingle from './CaseSingle';
import {useDatas} from '../Providers/DataProviders';

import {width, height} from '../config/utils';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerMenu {...props} />}
      drawerPosition="right"
      initialRouteName="Zone"
      drawerStyle={{width: width / 4}}
      drawerContentOptions={{
        activeTintColor: 'grey',
      }}
      overlayColor="transparent">
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Zone" component={Zone} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Panorama" component={Panorama} />
      <Drawer.Screen name="Download" component={Download} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Campaign" component={Campaign} />
      <Drawer.Screen name="CampaignSingle" component={CampaignSingle} />
      <Drawer.Screen name="CaseStudies" component={CaseStudies} />
      <Drawer.Screen name="Introduction" component={Introduction} />
      <Drawer.Screen name="CaseSingle" component={CaseSingle} />
    </Drawer.Navigator>
  );
};

function SignedIn() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
      initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={HomeStack} />
    </Stack.Navigator>
  );
}

export default function NavigationDrawerStructure() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const {sessionId} = useDatas();
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View style={{flex: 1}}>
      <SignedIn />
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
        <SessionStartDialog toggleOverlay={toggleOverlay} />
      </Overlay>
      {sessionId && (
        <Button
          title="End Session"
          containerStyle={{
            width: width / 4,
            position: 'absolute',
            bottom: moderateScale(15),
          }}
          buttonStyle={{
            backgroundColor: 'lightgrey',
            padding: moderateScale(10),
            marginLeft: moderateScale(20),
          }}
          titleStyle={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: moderateScale(12),
          }}
          onPress={toggleOverlay}
        />
      )}
    </View>
  );
}
