import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider, useAuth} from './app/Providers/AuthProvider';
import {DataProvider} from './app/Providers/DataProviders';
import Login from './app/screens/Login';
import {getRealmApp} from './app/config/getRealmApp';

import NavigationDrawerStructure from './app/screens/NavigationDrawerStructure';

declare const global: {HermesInternal: null | {}};

const app = getRealmApp();
console.log('CURRENT', app.currentUser);

// const App = () => {
//   return (
//     <NavigationContainer>
//       <StatusBar hidden />
//       <NavigationDrawerStructure />
//     </NavigationContainer>
//   );
// };

const App = () => {
  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
};

function AppBody() {
  const {user} = useAuth();
  return (
    <>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar hidden />
          {user == null ? (
            <Login />
          ) : (
            <DataProvider projectId="TCC Mobile">
              <NavigationDrawerStructure />
            </DataProvider>
          )}
        </NavigationContainer>
      </View>
    </>
  );
}
export default App;
