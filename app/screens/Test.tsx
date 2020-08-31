import React from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';

function Test({navigation}) {
  return (
    <View>
      <Header nav={navigation} backgroundColor="blue" />
      <Text>Test</Text>
    </View>
  );
}

export default Test;
