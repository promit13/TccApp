/* eslint-disable react-native/no-inline-styles */
//This is an example code for Navigation Drawer with Custom Side bar//
import React, {useState} from 'react';
//import react in our code.
import {View, Dimensions} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {scale, moderateScale} from 'react-native-size-matters';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomSidebarMenu} from '../components/CustomSideBarMenu';
import {SessionStart} from '../components/SessionStart';

//Import all the screens
import Zone from './Zone';
import Campaign from './Campaign';
import CampaignTest from './CampaignTest';
import Home from './Home';
import Dashboard from './Dashboard';

import DashboardTest from './DashboardTest';
import DashboardTestSecond from './DashboardTestSecond';
import PanoramaTest from './PanoramaTest';
import Panorama from './Panorama';
import Download from './Download';
import GraphDemo from './GraphDemo';
import Login from './Login';
import Logout from './Logout';
import Help from './Help';
import CampaignSingleTest from './CampaignSingleTest';
import CaseStudies from './CaseStudies';
import Introduction from './Introduction';
import CaseSingle from './CaseSingle';
import {useDatas} from '../Providers/DataProviders';

const {height, width} = Dimensions.get('window');

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function ZoneStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Zone" component={Zone} />
    </Stack.Navigator>
  );
}

const HomeStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomSidebarMenu {...props} />}
      drawerPosition="right"
      initialRouteName="Zone"
      drawerStyle={{width: width / 4}}
      drawerContentOptions={{
        activeTintColor: 'grey',
      }}
      overlayColor="transparent">
      <Drawer.Screen name="Home" component={DashboardTestSecond} />
      <Drawer.Screen name="Zone" component={Zone} />
      <Drawer.Screen name="Help" component={Help} />
      <Drawer.Screen name="Panorama" component={Panorama} />
      <Drawer.Screen name="PanoramaTest" component={PanoramaTest} />
      <Drawer.Screen name="Download" component={Download} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Campaign" component={Campaign} />
      <Drawer.Screen name="CampaignTest" component={CampaignTest} />
      <Drawer.Screen name="CampaignSingleTest" component={CampaignSingleTest} />
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
        <SessionStart toggleOverlay={toggleOverlay} />
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
