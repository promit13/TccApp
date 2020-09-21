import React from 'react';
// import {LineChart, BarChart, XAxis, Grid} from 'react-native-svg-charts';
import {View, Dimensions, Text, FlatList} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Video from 'react-native-video';
import _ from 'lodash';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Session from './Sessions';
import {DropdownHeader} from '../components/DropdownHeader';
import {Loading} from '../components/Loading';
import {testData} from '../config/testData';
import {TitleBar} from '../components/TitleBar';
import Table from '../components/Table';
import Header from '../components/Header';
import Sessions from './Sessions';

const {width, height} = Dimensions.get('window');

// const countriesArray = [
//   {label: 'UK', value: 'uk', key: '2'},
//   {label: 'Australia', value: 'au', key: '3'},
//   {label: 'Africa', value: 'af', key: '4'},
// ];
const directorsArray = [
  {label: 'Director 0ne', value: 'one', key: '2'},
  {label: 'Director Two', value: 'two', key: '3'},
  {label: 'Director Three', value: 'three', key: '4'},
];
const daysArray = [
  {label: '30 Days', value: '30', key: '2'},
  {label: '90 Days', value: '90', key: '3'},
  {label: '365 Days', value: '365', key: '4'},
  {label: 'All', value: 'all', key: '5'},
];

const data = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 120],
    },
  ],
};

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
  {
    id: 9,
    name: 'C',
  },
  {
    id: 10,
    name: 'C++',
  },
  {
    id: 11,
    name: 'C#',
  },
  {
    id: 12,
    name: 'Redux',
  },
];

const titleArray = ['NICKNAME', 'DATE', 'TIME', 'FAVOURITED'];

let countries = [];
let countryObjectArray = [];
let directors = [];
let directorsObjectArray = [];

class Dashboard extends React.PureComponent {
  state = {
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

  onDaySelected = (days) => {
    console.log('Day', days);
    this.setState({days});
  };
  onCountrySelected = (country) => {
    console.log('Country', country);
    this.setState({country, director: 'all'});
  };
  onDirectorSelected = (director) => {
    console.log('Director', director);
    this.setState({director});
  };
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
    console.log(directorsObjectArray);

    const renderItem = ({item}) => {
      const color = Math.floor(Math.random() * 16777215).toString(16);
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
            style={{flexDirection: 'row'}}
            onPress={() => console.log('PRESSED')}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 44 / 2,
                backgroundColor: `#${color}`,
              }}
            />
            <View style={{marginLeft: 10}}>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </View>
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
          <Header nav={this.props.navigation} />
        </View>
        <ScrollView style={{marginTop: 120}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, marginLeft: 10}}>DASHBOARD</Text>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <TitleBar
                message="SESSIONS"
                width={width / 2}
                backgroundColor="#4778A0"
              />
              <BarChart
                data={data}
                width={width / 2}
                height={height / 3}
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
            </View>
            <View style={{marginLeft: 10}}>
              <TitleBar
                message="MOST FAVOURITED CAMPAIGNS"
                width={width / 2}
                backgroundColor="#DE843D"
              />
              <View style={{height: height / 3}}>
                <FlatList
                  data={items}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                />
              </View>
            </View>
          </View>
          <Table
            data={titleArray}
            barColor="#50A486"
            barTitle="RECENTLY COMPLETED SESSIONS"
            showTitleBar={true}
          />
          <Sessions />
        </ScrollView>
      </View>
    );
  }
}

export default Dashboard;
