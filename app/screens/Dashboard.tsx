import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import _ from 'lodash';
import moment from 'moment';
import {moderateScale} from 'react-native-size-matters';
import {DropdownHeader} from '../components/DropdownHeader';
import Sessions from './Sessions';
import {Loading} from '../components/Loading';
import {TitleBar} from '../components/TitleBar';
import Table from '../components/Table';
import Header from '../components/Header';

import {useDatas} from '../Providers/DataProviders';
import {useAuth} from '../Providers/AuthProvider';
import {width, height} from '../config/utils';

let chartData;
const titleArray = ['SESSION', 'DATE', 'TIME', 'FAVOURITED'];

let directors = [];

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

let countryManagerCountry = null;
function DashboardTestSecond({navigation}) {
  const [country, setCountry] = useState('all');
  const [countryName, setCountryName] = useState('all');
  const [director, setDirector] = useState('all');
  const [directorName, setDirectorName] = useState('all');
  const [days, setDays] = useState('7');
  const [showCountries, setShowCountries] = useState(true);
  const [showDirectors, setShowDirectors] = useState(true);
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(true);

  const {
    sessions,
    favourites,
    campaigns,
    zones,
    users,
    roles,
    countries,
  } = useDatas();
  const {userId} = useAuth();

  // sd 5f08c1656e3da910bbf313a0
  // countr 5f2aa45ce2c95a26ed9cf7b0
  // reg 5f6106a08a93c4614cfd1380
  // global 5f2bc093e2ab65333f822ab9

  useEffect(() => {
    Su = 0;
    Mo = 0;
    Tu = 0;
    We = 0;
    Th = 0;
    Fr = 0;
    Sa = 0;
    numberOfSessionThisWeek = 0;
    const sessionSorted = sessions.sort((a, b) => b.createdAt - a.createdAt);
    const {assign_country, role, region} = users.find(
      (o) =>
        JSON.stringify(o._id) === JSON.stringify('5f2bc093e2ab65333f822ab9'),
    );
    const {type} = roles.find(
      (o) => JSON.stringify(o._id) === JSON.stringify(role),
    );
    if (type === 'sales_director') {
      filteredSessions = _.without(
        _.map(sessionSorted, (item) => {
          if (
            JSON.stringify(item.user) === JSON.stringify(userId) // sales_Director
          ) {
            return onSessionFilter(item);
          }
        }),
        undefined,
      );
      setShowCountries(false);
      setShowDirectors(false);
    } else if (type === 'country_manager') {
      setShowCountries(false);
      // setCountry(assign_country);
      countryManagerCountry = assign_country;

      filteredSessions = _.without(
        _.map(sessions, (item) => {
          if (director === 'all') {
            return onCountryFilter(item, true);
          } else {
            if (JSON.stringify(director) === JSON.stringify(item.user)) {
              return onCountryFilter(item);
            }
          }
        }),
        undefined,
      );
    } else if (type === 'regional_manager') {
      filteredSessions = _.without(
        _.map(sessions, (item) => {
          const sessionUserCountry = users.find((o) => {
            return JSON.stringify(o._id) === JSON.stringify(item.user);
          });
          if (sessionUserCountry === undefined) {
            return;
          }
          const sessionUserRegion = countries.find((o) => {
            return (
              JSON.stringify(o._id) ===
              JSON.stringify(sessionUserCountry.assign_country)
            );
          });
          if (sessionUserRegion === undefined) {
            return;
          }
          if (
            JSON.stringify(region) === JSON.stringify(sessionUserRegion.region)
          ) {
            if (director === 'all') {
              return onCountryFilter(item);
            } else {
              if (JSON.stringify(director) === JSON.stringify(item.user)) {
                return onCountryFilter(item);
              }
            }
          }
        }),
        undefined,
      );
    } else {
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
    }

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

    chartData = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [
        {
          data: [Mo, Tu, We, Th, Fr, Sa, Su],
        },
      ],
    };
    setUserType(type);
    setLoading(false);
  }, [
    campaigns,
    roles,
    sessions,
    users,
    favourites,
    days,
    director,
    userId,
    countries,
    country,
  ]);

  const onCountryFilter = (item, check) => {
    if (country === 'all' && !check) {
      return onSessionFilter(item);
    }
    const obj = users.find((o) => {
      return JSON.stringify(o._id) === JSON.stringify(item.user);
    });
    if (obj === undefined) {
      return;
    }
    if (country === 'all' && check) {
      if (
        JSON.stringify(obj.assign_country) ===
        JSON.stringify(countryManagerCountry)
      ) {
        return onSessionFilter(item);
      }
    } else {
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

  const onDaySelected = (selectedDays) => {
    if (selectedDays === days) {
      return;
    }
    setLoading(true);
    setDays(selectedDays);
  };
  const onCountrySelected = (selectedCountry, selectedCountryName) => {
    if (JSON.stringify(selectedCountry) === JSON.stringify(country)) {
      return;
    }
    setLoading(true);
    setCountry(selectedCountry);
    setCountryName(selectedCountryName);
    setDirector('all');
    setDirectorName('all');
  };
  const onDirectorSelected = (selectedDirector, selectedDirectorName) => {
    if (JSON.stringify(selectedDirector) === JSON.stringify(director)) {
      return;
    }
    setLoading(true);
    setDirector(selectedDirector);
    setDirectorName(selectedDirectorName);
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
    const {title} = zones.find(
      (o) => JSON.stringify(o._id) === JSON.stringify(item.zone),
    );
    const color =
      title.toLowerCase() === 'living well'
        ? '#93b499'
        : title.toLowerCase() === 'caring for the planet'
        ? '#d08332'
        : title.toLowerCase() === 'food for thought'
        ? '#a93a42'
        : '#724e8d';
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderColor: 'grey',
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          width: width / 4,
          padding: moderateScale(10),
        }}
        onPress={() => {
          const campaignsArray = _.without(
            _.map(campaigns, function (campaignItem) {
              if (
                JSON.stringify(campaignItem.zone) === JSON.stringify(item.zone)
              ) {
                return campaignItem;
              }
            }),
            undefined,
          );
          navigation.navigate('PanoramaTest', {
            id: item.campaign,
            campaigns: campaignsArray,
          });
        }}>
        <View
          style={{
            width: moderateScale(22),
            height: moderateScale(22),
            borderRadius: moderateScale(22 / 2),
            backgroundColor: color,
          }}
        />

        <Text style={{marginLeft: 10, fontSize: moderateScale(8)}}>
          {item.campaignName}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loading message="Loading" />;
  }
  return (
    <View style={{flex: 1, padding: moderateScale(10)}}>
      <View style={{position: 'absolute', zIndex: 1, elevation: 5}}>
        <Header nav={navigation} />
      </View>
      <ScrollView
        // scrollEnabled={scroll}
        style={{marginTop: moderateScale(50)}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: moderateScale(15), marginLeft: moderateScale(5)}}>
            DASHBOARD
          </Text>
          <DropdownHeader
            userType={userType}
            showCountries={showCountries}
            showDirectors={showDirectors}
            // countries={countryObjectArray}

            directors={directors}
            dayName={days}
            directorName={directorName}
            country={
              userType === 'country_manager' ? countryManagerCountry : country
            }
            countryName={countryName}
            onDaySelected={onDaySelected}
            onCountrySelected={onCountrySelected}
            onDirectorSelected={onDirectorSelected}
          />
        </View>
        {showAllSessions ? null : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: moderateScale(10),
            }}>
            <View style={{backgroundColor: 'white'}}>
              <TitleBar
                message="SESSIONS"
                width={width / 2}
                backgroundColor="#4778A0"
              />
              <BarChart
                data={chartData}
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
                    borderRadius: moderateScale(10),
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
                    style={{
                      fontSize: moderateScale(20),
                      fontWeight: 'bold',
                      color: '#4778A0',
                    }}>
                    {filteredSessions.length}
                  </Text>
                  <Text style={{fontSize: moderateScale(10)}}>Total</Text>
                </View>
                <View
                  style={{
                    height: moderateScale(30),
                    marginHorizontal: moderateScale(10),
                    width: 1,
                    backgroundColor: 'grey',
                  }}
                />
                <View
                  style={{alignItems: 'center', marginTop: moderateScale(10)}}>
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      fontWeight: 'bold',
                      color: '#4778A0',
                    }}>
                    {numberOfSessionThisWeek}
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(10),
                    }}>{`Sessions\nthis week`}</Text>
                </View>
              </View>
            </View>
            <View style={{marginLeft: moderateScale(5)}}>
              <TitleBar
                message="MOST FAVOURITED CAMPAIGNS"
                width={width / 2}
                backgroundColor="#DE843D"
              />
              <View style={{height: height / 3, backgroundColor: 'white'}}>
                <FlatList
                  // onTouchStart={() => {
                  //   setScroll(false);
                  // }}
                  // onMomentumScrollEnd={() => {
                  //   setScroll(true);
                  // }}
                  data={filteredFavourites}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  numColumns={2}
                />
              </View>
            </View>
          </View>
        )}
        {/* <Button
          containerStyle={{width: moderateScale(120), alignSelf: 'flex-end'}}
          buttonStyle={{
            width: moderateScale(120),
            backgroundColor: 'grey',
            alignSelf: 'flex-end',
            marginTop: moderateScale(12),
          }}
          title={showAllSessions ? 'Back to dashboard' : 'View All'}
          onPress={() => setShowAllSessions(!showAllSessions)}
        /> */}
        <View style={{marginTop: moderateScale(15)}}>
          <Table
            data={titleArray}
            barColor="#50A486"
            barTitle="RECENTLY COMPLETED SESSIONS"
            showTitleBar={true}
          />
          <Sessions data={filteredSessions} />
        </View>
      </ScrollView>
    </View>
  );
}

export default DashboardTestSecond;
