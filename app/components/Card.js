import {React} from 'react';
import {View, Text} from 'react-native';

export function Card({data, color}) {
  return (
    <View style={{width: 200, height: 200, borderWidth: 2, borderColor: color}}>
      <Text>{data.name}</Text>
    </View>
  );
}
