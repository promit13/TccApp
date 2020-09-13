import React, {useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Logout({navigation}) {
  useEffect(() => {
    AsyncStorage.removeItem('login');
    navigation.navigate('Login');
  });
  return <View />;
}
