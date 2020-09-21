import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export function CampaignMenu(props) {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
      horizontal>
      {props.data.map((item) => {
        return (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginLeft: 10,
              height: height / 3,
            }}
            onPress={() =>
              props.navigation
                ? props.navigation.navigate('Panorama', {
                    data: props.data,
                    index: item.id,
                  })
                : props.onPress(item.id)
            }>
            <Image
              style={{width: width / 6, height: height / 3}}
              source={require('../res/sun.jpeg')}
            />
            <Text style={{fontSize: 25}}>{item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
