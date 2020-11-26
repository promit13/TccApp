import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {TitleBar} from '../components/TitleBar';
import {moderateScale} from 'react-native-size-matters';

export default function Table({data, barColor, barTitle, showTitleBar}) {
  return (
    <View style={{marginTop: showTitleBar ? moderateScale(5) : 0}}>
      <View style={{backgroundColor: 'white'}}>
        {showTitleBar ? (
          <TitleBar backgroundColor={barColor} message={barTitle} />
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#A2A9AD',
            padding: 10,
            margin: 10,
            borderTopLeftRadius: moderateScale(5),
            borderTopRightRadius: moderateScale(5),
            justifyContent: 'space-between',
          }}>
          {data.map((item, index) => {
            return <Text style={styles.headerTextStyle}>{item}</Text>;
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: moderateScale(10),
    color: 'white',
  },
});
