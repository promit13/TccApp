import React from 'react';
// import {LineChart, BarChart, XAxis, Grid} from 'react-native-svg-charts';
import {View, Dimensions, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Video from 'react-native-video';
import _ from 'lodash';
import Session from './Sessions';
import {DropdownHeader} from '../components/DropdownHeader';
import {Loading} from '../components/Loading';
import {testData} from '../config/testData';
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
    this.setState({country});
  };
  onDirectorSelected = (director) => {
    console.log('Director', director);
    this.setState({director});
  };
  render() {
    const {
      country,
      director,
      days,
      showCountries,
      showDirectors,
      loading,
    } = this.state;

    if (country === 'all') {
      testData.map((item, index) => {
        const directorObject = {label: item.name, value: item.uid};
        directorsObjectArray.push(directorObject);
      });
    } else {
      directorsObjectArray = _.filter(testData, function (item) {
        var directorObj = {};
        if (item.country === country) {
          directorObj = {label: item.name, value: item.uid};
        }
        return directorObj;
      });
    }
    console.log(`${country} ${director} ${days}`);
    console.log(directorsObjectArray);
    if (loading) {
      return <Loading message="Loading" />;
    }
    return (
      <View style={{flex: 1, padding: 10}}>
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
        <BarChart
          style={{marginVertical: 10, padding: 10, width: width / 2}}
          data={data}
          width={width / 3}
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
        <Session hide={true} color="#50A486" />
      </View>
    );
  }
}

export default Dashboard;
