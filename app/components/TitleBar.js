import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';

export function TitleBar({message, width, backgroundColor}) {
  return (
    <View style={[styles.mainContainer, {width, backgroundColor}]}>
      <Text style={styles.textStyle}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: moderateScale(25),
    padding: moderateScale(5),
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
  textStyle: {
    fontSize: moderateScale(10),
  },
});
