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

const titleArray = [
  'SESSION',
  'DATE',
  'TIME',
  'COMPLETED SESSIONS',
  'FAVOURITED',
];

const data = [
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
let countries = [];
let countryObjectArray = [];
let directors = [];
let directorsObjectArray = [];

const daysArray = [
  {label: '30 Days', value: '30', key: '2'},
  {label: '90 Days', value: '90', key: '3'},
  {label: '365 Days', value: '365', key: '4'},
  {label: 'All', value: 'all', key: '5'},
];

export default class Sessions extends React.Component {
  state = {
    selectedIndex: 0,
    showDetail: false,
    country: 'all',
    director: 'all',
    days: '7',
    showCountries: true,
    showDirectors: true,
    loading: true,
  };
  componentDidMount() {
    // this.setState({loading: false, showCountries: true, showDirectors: true});
    testData.map((item, index) => {
      if (countries.includes(item.country)) {
        return;
      } else {
        const countryObject = {label: item.country, value: item.country};
        countries.push(item.country);
        countryObjectArray.push(countryObject);
      }
    });
    this.setState({loading: false});
    console.log(countryObjectArray);
  }
  renderScrollView = () => {
    const {selectedIndex, showDetail} = this.state;
    return data.map((item, index) => {
      return (
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: 'grey',
              backgroundColor: 'white',
              alignItems: 'center',
              padding: 20,
              justifyContent: 'space-between',
            }}
            onPress={() => {
              this.setState({
                selectedIndex: index,
                showDetail: !showDetail,
              });
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={
                  index === selectedIndex && showDetail
                    ? 'chevron-small-down'
                    : 'chevron-small-right'
                }
                type="entypo"
              />
              <Text>{item.sessionId}</Text>
            </View>
            <Text>{item.date}</Text>
            <Text>{item.time}</Text>
            {/* <Text style={{marginLeft: width / 6}}>
              {item.completedSessions}
            </Text> */}
            <Text>{item.favourited}</Text>
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

  onDaySelected = (days) => {
    this.setState({days});
  };
  onCountrySelected = (country) => {
    this.setState({country, director: 'all'});
  };
  onDirectorSelected = (director) => {
    this.setState({director});
  };
  // 75 70 120 150
  render() {
    const {country, showCountries, showDirectors, loading} = this.state;
    directorsObjectArray = [];

    if (country === 'all') {
      testData.map((item, index) => {
        const directorObject = {label: item.name, value: item.uid};
        directorsObjectArray.push(directorObject);
      });
    } else {
      _.filter(testData, function (item) {
        if (item.country === country) {
          const directorObj = {label: item.name, value: item.uid};
          directorsObjectArray.push(directorObj);
        }
      });
    }
    if (loading) {
      return <Loading message="Loading" />;
    }
    return (
      <View style={{flex: 1}}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginLeft: 10}}>SESSIONS</Text>
          <DropdownHeader
            showCountries={showCountries}
            showDirectors={showDirectors}
            countries={countryObjectArray}
            directors={directorsObjectArray}
            days={daysArray}
            onDaySelected={this.onDaySelected}
            onCountrySelected={this.onCountrySelected}
            onDirectorSelected={this.onDirectorSelected}
          />
        </View> */}
        {/* <Table
          data={titleArray}
          barColor="#4778A0"
          barTitle="RECENTLY COMPLETED SESSIONS"
          showTitleBar={true}
        /> */}
        {this.renderScrollView()}
      </View>
    );
  }
}
