import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {DropdownHeader} from '../components/DropdownHeader';
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

let index = 0;
const data = [
  {key: index++, section: true, label: 'Fruits'},
  {key: index++, label: 'Red Apples'},
  {key: index++, label: 'Cherries'},
  {
    key: index++,
    label: 'Cranberries',
    accessibilityLabel: 'Tap here for cranberries',
  },
  // etc...
  // Can also add additional custom keys which are passed to the onChange callback
  {key: index++, label: 'Vegetable', customKey: 'Not a fruit'},
];
const testPickerData = [
  {label: 'Football', value: 'football', key: '1'},
  {label: 'Baseball', value: 'baseball', key: '2'},
  {label: 'Hockey', value: 'hockey', key: '3'},
];

const testData = [
  {
    sessionId: '1234567890',
    date: '2017-10-01',
    time: '14:10',
    completedSessions: '7',
    favourited: '8',
  },
  {
    sessionId: '1234567890',
    date: '2017-10-01',
    time: '14:10',
    completedSessions: '7',
    favourited: '8',
  },
  {
    sessionId: '1234567890',
    date: '2017-10-01',
    time: '14:10',
    completedSessions: '7',
    favourited: '8',
  },
  {
    sessionId: '1234567890',
    date: '2017-10-01',
    time: '14:10',
    completedSessions: '7',
    favourited: '8',
  },
  {
    sessionId: '1234567890',
    date: '2017-10-01',
    time: '14:10',
    completedSessions: '7',
    favourited: '8',
  },
];
export default function Sessions({navigation}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const renderScrollView = () => {
    return testData.map((item, index) => {
      return (
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              alignItems: 'center',
              padding: 20,
            }}
            onPress={() => {
              setSelectedIndex(index);
              setShowDetail(!showDetail);
            }}>
            <Icon
              name={
                index === selectedIndex && showDetail
                  ? 'chevron-small-down'
                  : 'chevron-small-right'
              }
              type="entypo"
            />
            <Text>{item.sessionId}</Text>
            <Text style={{marginLeft: 75}}>{item.date}</Text>
            <Text style={{marginLeft: 70}}>{item.time}</Text>
            <Text style={{marginLeft: 120}}>{item.completedSessions}</Text>
            <Text style={{marginLeft: 250}}>{item.favourited}</Text>
          </TouchableOpacity>
          {index === selectedIndex && showDetail ? (
            <View style={{flex: 1, backgroundColor: 'grey', padding: 10}}>
              <Text>Hello</Text>
            </View>
          ) : null}
        </View>
      );
    });
  };
  return (
    <ScrollView style={{flex: 1, padding: 20}}>
      <View
        style={{
          elevation: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>NICKNAME HERE</Text>
        <DropdownHeader dataArray={testPickerData} />
        <DropdownHeader dataArray={testPickerData} />
        <DropdownHeader dataArray={testPickerData} />
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
      </View>
      <View style={{backgroundColor: 'white', marginTop: 20}}>
        <View
          style={{
            backgroundColor: 'grey',
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text style={{fontSize: 18}}>RECENTLY COMPLETED SESSIONS</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'grey',
            padding: 10,
            margin: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text style={{fontSize: 16}}>SESSION ID</Text>
          <Text style={{fontSize: 16, marginLeft: 100}}>DATE</Text>
          <Text style={{fontSize: 16, marginLeft: 100}}>TIME</Text>
          <Text style={{fontSize: 16, marginLeft: 100}}>
            COMPLETED SESSIONS
          </Text>
          <Text style={{fontSize: 14, marginLeft: 100}}>FAVOURITED</Text>
        </View>
        {renderScrollView()}
      </View>
    </ScrollView>
  );
}
