import React, {useEffect, useState, useRef} from 'react';
import {View, Dimensions, Text, FlatList} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import _ from 'lodash';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {DropdownHeaderTest} from '../components/DropdownHeaderTest';
import SessionsTest from './SessionsTest';
import {Loading} from '../components/Loading';
import {TitleBar} from '../components/TitleBar';
import Table from '../components/Table';
import Header from '../components/Header';

import {useDatas} from '../Providers/DataProviders';

const {width, height} = Dimensions.get('window');

let data;
const titleArray = ['SESSION', 'DATE', 'TIME', 'FAVOURITED'];

let countries = [];
let countryObjectArray = [];
let directors = [];
let directorsObjectArray = [];

let filteredSessions = [];
let filteredFavourites = [];

let Su = 0;
let Mo = 0;
let Tu = 0;
let We = 0;
let Th = 0;
let Fr = 0;
let Sa = 0;
let numberOfSessionThisWeek = 0;

function DashboardTest({navigation}) {
  const [country, setCountry] = useState('all');
  const [countryName, setCountryName] = useState('all');
  const [director, setDirector] = useState('all');
  const [directorName, setDirectorName] = useState('all');
  const [days, setDays] = useState('7');
  const [showCountries, setShowCountries] = useState(true);
  const [showDirectors, setShowDirectors] = useState(true);
  const [loading, setLoading] = useState(true);

  const {sessions, favourites, campaigns, zones, users} = useDatas();

  // useEffect(() => {
  //   testData.map((item, index) => {
  //     if (countries.includes(item.country)) {
  //       return;
  //     } else {
  //       const countryObject = {label: item.country, value: item.country};
  //       countries.push(item.country);
  //       countryObjectArray.push(countryObject);
  //     }
  //   });
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    Su = 0;
    Mo = 0;
    Tu = 0;
    We = 0;
    Th = 0;
    Fr = 0;
    Sa = 0;
    numberOfSessionThisWeek = 0;
    filteredSessions = _.without(
      _.map(sessions, (item) => {
        if (director === 'all') {
          return onCountryFilter(item);
        } else {
          if (JSON.stringify(director) === JSON.stringify(item.user)) {
            return onCountryFilter(item);
          }
        }
      }),
      undefined,
    );

    filteredFavourites = _.uniqBy(
      _.without(
        _.map(favourites, (item) => {
          if (moment().subtract(days, 'd').isBefore(item.createdAt)) {
            const sessionObject = filteredSessions.find(
              (o) => JSON.stringify(o._id) === JSON.stringify(item.session),
            );
            if (sessionObject === undefined) {
              return;
            }
            const obj = campaigns.find(
              (o) => JSON.stringify(o._id) === JSON.stringify(item.campaign),
            );
            return _.extend({campaignName: obj.title, zone: obj.zone}, item);
          }
        }),
        undefined,
      ),
      'campaignName',
    );

    data = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [
        {
          data: [Mo, Tu, We, Th, Fr, Sa, Su],
        },
      ],
    };
    setLoading(false);
  });

  const onCountryFilter = (item) => {
    if (country === 'all') {
      return onSessionFilter(item);
    } else {
      const obj = users.find((o) => {
        return JSON.stringify(o._id) === JSON.stringify(item.user);
      });
      if (obj === undefined) {
        return;
      }

      if (JSON.stringify(obj.assign_country) === JSON.stringify(country)) {
        return onSessionFilter(item);
      }
    }
  };

  const onSessionFilter = (item) => {
    if (moment().subtract(7, 'd').isBefore(item.createdAt)) {
      numberOfSessionThisWeek++;
    }
    if (moment().subtract(days, 'd').isBefore(item.createdAt)) {
      const day = moment(item.createdAt).format('dd');
      if (day === 'Su') {
        Su++;
      } else if (day === 'Mo') {
        Mo++;
      } else if (day === 'Tu') {
        Tu++;
      } else if (day === 'We') {
        We++;
      } else if (day === 'Th') {
        Th++;
      } else if (day === 'Fr') {
        Fr++;
      } else {
        Sa++;
      }
      return item;
    }
  };

  const onDaySelected = (days) => {
    setLoading(true);
    setDays(days);
  };
  const onCountrySelected = (country, countryName) => {
    setLoading(true);
    setCountry(country);
    setCountryName(countryName);
    setDirector('all');
    setDirectorName('all');
  };
  const onDirectorSelected = (director, directorName) => {
    setLoading(true);
    setDirector(director);
    setDirectorName(directorName);
  };

  // if (country === 'all') {
  //   directorsObjectArray = [];
  //   testData.map((item, index) => {
  //     const directorObject = {label: item.name, value: item.uid};
  //     directorsObjectArray.push(directorObject);
  //   });
  // } else {
  //   directorsObjectArray = [];
  //   _.filter(testData, function (item) {
  //     if (item.country === country) {
  //       const directorObj = {label: item.name, value: item.uid};
  //       directorsObjectArray.push(directorObj);
  //     }
  //   });
  // }

  const renderItem = ({item}) => {
    // const color = Math.floor(Math.random() * 16777215).toString(16);
    const {title} = zones.find(
      (o) => JSON.stringify(o._id) === JSON.stringify(item.zone),
    );
    const color =
      title.toLowerCase() === 'living well'
        ? '#93b499'
        : title === 'caring for the planet'
        ? '#d08332'
        : title === 'food for thought'
        ? '#a93a42'
        : '#724e8d';
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'grey',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          width: width / 4,
          padding: 20,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => console.log('PRESSED')}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 44 / 2,
              backgroundColor: color,
            }}
          />

          <Text style={{marginLeft: 10}}>{item.campaignName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return <Loading message="Loading" />;
  }
  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={navigation} />
      </View>
      <ScrollView style={{marginTop: 120}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginLeft: 10}}>DASHBOARD</Text>
          <DropdownHeaderTest
            showCountries={showCountries}
            showDirectors={showDirectors}
            // countries={countryObjectArray}

            directors={directors}
            dayName={days}
            directorName={directorName}
            country={country}
            countryName={countryName}
            onDaySelected={onDaySelected}
            onCountrySelected={onCountrySelected}
            onDirectorSelected={onDirectorSelected}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View style={{backgroundColor: 'white'}}>
            <TitleBar
              message="SESSIONS"
              width={width / 2}
              backgroundColor="#4778A0"
            />
            <BarChart
              data={data}
              width={width / 2}
              height={height / 6}
              fromZero
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              verticalLabelRotation={0}
            />
            <View
              style={{
                flexDirection: 'row',
                width: width / 2,
                height: height / 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontSize: 40, fontWeight: 'bold', color: '#4778A0'}}>
                  {filteredSessions.length}
                </Text>
                <Text style={{fontSize: 20}}>Total</Text>
              </View>
              <View
                style={{
                  height: 60,
                  marginHorizontal: 20,
                  width: 1,
                  backgroundColor: 'grey',
                }}
              />
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text
                  style={{fontSize: 40, fontWeight: 'bold', color: '#4778A0'}}>
                  {numberOfSessionThisWeek}
                </Text>
                <Text style={{fontSize: 20}}>{`Sessions\nthis week`}</Text>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10}}>
            <TitleBar
              message="MOST FAVOURITED CAMPAIGNS"
              width={width / 2}
              backgroundColor="#DE843D"
            />
            <View style={{height: height / 3, backgroundColor: 'white'}}>
              <FlatList
                data={filteredFavourites}
                renderItem={renderItem}
                keyExtractor={(item) => JSON.stringify(item.id)}
                numColumns={2}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Table
            data={titleArray}
            barColor="#50A486"
            barTitle="RECENTLY COMPLETED SESSIONS"
            showTitleBar={true}
          />
          <SessionsTest data={filteredSessions} />
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardTest;
