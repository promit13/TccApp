import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function TitleBar({message, width, backgroundColor}) {
  console.log(message);
  return (
    <View style={[styles.mainContainer, {width, backgroundColor}]}>
      <Text style={styles.textStyle}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 40,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textStyle: {
    fontSize: 18,
  },
});
