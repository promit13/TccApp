import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

function Campaign({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 40}}>Campaign</Text>
    </View>
  );
}

export default Campaign;
