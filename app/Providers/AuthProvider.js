import React, {useContext, useState, useEffect} from 'react';
import Realm from 'realm';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {getRealmApp} from '../config/getRealmApp';
import {loginUrl, logoutUrl} from '../config/appUrls';
// Access the Realm App.
const app = getRealmApp();

// Create a new Context object that will be provided to descendants of the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // You can await here
      const {currentUser} = app;
      setUser(currentUser);
      const savedUser = await AsyncStorage.getItem('userId');
      // setUser(savedUser);
      setUserId(savedUser);
      // ...
    }
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const {currentUser} = app;
  //   setUser(currentUser);
  // }, []);

  // The log in function takes an email and password and uses the Email/Password
  // authentication provider to log in.
  const logIn = async (email, password) => {
    console.log(`Logging in as ${email}...`);
    try {
      const response = await axios.post(loginUrl, {
        identifier: email,
        password: password,
      });
      const userId = response['data']['user']._id;
      console.log('LOGIN RESPONSE', userId);
      await AsyncStorage.setItem('userId', userId);
      const creds = Realm.Credentials.emailPassword('a@a.com', '111111');
      const newUser = await app.logIn(creds);
      setUserId(userId);
      setUser(newUser);
      console.log(`Logged in as ${newUser.id}, ${newUser.state}`);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  // Log out the current user.
  const logOut = async () => {
    if (user == null) {
      console.warn("Not logged in -- can't log out!");
      return;
    }
    console.log('Logging out...');
    await AsyncStorage.removeItem('userId');
    // await axios.get(logoutUrl);
    user.logOut();
    setUser(null);
  };

  // The register function takes an email and password and uses the emailPassword
  // authentication provider to register the user.
  const registerUser = async (email, password) => {
    console.log(`Registering as ${email}...`);
    try {
      await app.emailPasswordAuth.registerUser(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        registerUser,
        user,
        userId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to access
// the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error('useAuth() called outside of a AuthProvider?');
  }
  return auth;
};

export {AuthProvider, useAuth};
