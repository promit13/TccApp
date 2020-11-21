import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useAuth} from '../Providers/AuthProvider';

export default function Logout({navigation}) {
  const {logOut} = useAuth();
  useEffect(() => {
    logOut();
  });
  return <View />;
}
