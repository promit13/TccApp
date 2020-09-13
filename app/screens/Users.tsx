import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

function Users({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40}}>Users</Text>
    </View>
  );
}

export default Users;
