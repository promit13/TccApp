import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export function Loading({message}) {
  console.log(message);
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
