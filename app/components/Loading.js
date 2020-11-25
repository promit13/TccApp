import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export function Loading({message, showMessage}) {
  console.log(message);
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator size="large" color="#BC955C" />
      {showMessage && (
        <Text
          style={{marginTop: moderateScale(10), fontSize: moderateScale(10)}}>
          {message}
        </Text>
      )}
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
