import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {TitleBar} from '../components/TitleBar';

export default function Table({data, barColor, barTitle, showTitleBar}) {
  return (
    <View style={{marginTop: showTitleBar ? 10 : 0}}>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}> */}
      {/* <DropdownHeader dataArray={testPickerData} />
            <DropdownHeader dataArray={testPickerData} />
            <DropdownHeader dataArray={testPickerData} /> */}
      {/* <DropdownHeader
            dataArray={[
              {
                label: 'LAST 7 DAYS',
                value: 'uk',
              },
              {
                label: 'LAST 6 DAYS',
                value: 'france',
              },
              {
                label: 'LAST 5 DAYS',
                value: 'france',
              },
              {
                label: 'LAST 4 DAYS',
                value: 'france',
              },
              {
                label: 'LAST 3 DAYS',
                value: 'france',
              },
              {
                label: 'LAST 2 DAYS',
                value: 'france',
              },
              {
                label: 'LAST 1 DAYS',
                value: 'france',
              },
            ]}
          />
          <DropdownHeader
            dataArray={[
              {
                label: 'UK',
                value: 'uk',
              },
              {
                label: 'France',
                value: 'france',
              },
            ]}
          /> */}
      {/* </View> */}

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
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'space-between',
          }}>
          {data.map((item, index) => {
            return <Text style={styles.headerTextStyle}>{item}</Text>;
          })}
          {/* <Text style={[styles.headerTextStyle, {marginLeft: 0}]}>
            SESSION ID
          </Text>
          <Text style={styles.headerTextStyle}>DATE</Text>
          <Text style={styles.headerTextStyle}>TIME</Text>
          <Text style={styles.headerTextStyle}>COMPLETED SESSIONS</Text>
          <Text style={styles.headerTextStyle}>FAVOURITED</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: 16,
    color: 'white',
  },
});
