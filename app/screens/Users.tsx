import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {DropdownHeader} from '../components/DropdownHeader';
import {
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {Loading} from '../components/Loading';
import {testData} from '../config/testData';
import {TitleBar} from '../components/TitleBar';
import Table from '../components/Table';

const {height, width} = Dimensions.get('window');

let index = 0;
// const data = [
//   {key: index++, section: true, label: 'Fruits'},
//   {key: index++, label: 'Red Apples'},
//   {key: index++, label: 'Cherries'},
//   {
//     key: index++,
//     label: 'Cranberries',
//     accessibilityLabel: 'Tap here for cranberries',
//   },
//   // etc...
//   // Can also add additional custom keys which are passed to the onChange callback
//   {key: index++, label: 'Vegetable', customKey: 'Not a fruit'},
// ];
// const testPickerData = [
//   {label: 'Football', value: 'football', key: '1'},
//   {label: 'Baseball', value: 'baseball', key: '2'},
//   {label: 'Hockey', value: 'hockey', key: '3'},
// ];

const userTitleArray = ['NAME', 'LAST LOGIN', 'ROLE', 'COUNTRY'];
const countryTitleArray = ['COUNTRY', 'SALES DIRECTOR', 'COUNTRY DIRECTOR'];

const data = [
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
  {
    name: 'Test',
    lastLogin: '2017-10-01',
    role: 'Head of County',
    country: 'UK',
  },
];

export default class Users extends React.Component {
  state = {
    selectedIndex: 0,
    showDetail: false,
    userPressed: true,
  };

  renderUserData = () => {
    const {selectedIndex, showDetail} = this.state;
    return data.map((item, index) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 30,
            justifyContent: 'space-between',
          }}>
          <View style={{width: width / 5}}>
            <Text>{item.name}</Text>
          </View>
          <View style={{width: width / 4}}>
            <Text>{item.lastLogin}</Text>
          </View>
          <View style={{width: width / 4}}>
            <Text>{item.role}</Text>
          </View>
          <View style={{width: width / 6}}>
            <Text>{item.country}</Text>
          </View>
        </View>
      );
    });
  };

  renderCountryData = () => {
    const {selectedIndex, showDetail} = this.state;
    return data.map((item, index) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 30,
            justifyContent: 'space-between',
          }}>
          <Text>{item.country}</Text>
          <Text>{item.role}</Text>
          <Text>{item.name}</Text>
        </View>
      );
    });
  };

  render() {
    const {userPressed} = this.state;
    return (
      <ScrollView style={{flex: 1, padding: 20, marginTop: 100}}>
        <Text style={{fontSize: 20, marginLeft: 10}}>SESSIONS</Text>
        <View
          style={{
            height: 40,
            padding: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: '#694A8C',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={() => this.setState({userPressed: true})}>
            <Text style={{fontWeight: userPressed ? 'bold' : null}}>USERS</Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'black',
              height: 20,
              width: 1,
              marginHorizontal: 10,
            }}
          />
          <TouchableOpacity onPress={() => this.setState({userPressed: false})}>
            <Text style={{fontWeight: !userPressed ? 'bold' : null}}>
              COUNTRY
            </Text>
          </TouchableOpacity>
        </View>
        <Table
          data={userPressed ? userTitleArray : countryTitleArray}
          barColor="#4778A0"
          showTitleBar={false}
        />
        {userPressed ? this.renderUserData() : this.renderCountryData()}
      </ScrollView>
    );
  }
}
