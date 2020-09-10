import React from 'react';
import {View, Text} from 'react-native';
import PureChart from 'react-native-pure-chart';

let sampleData = [
  {x: '2018-01-01', y: 30, color: '#fff'},
  {x: '2018-01-02', y: 200, color: 'blue'},
  {x: '2018-01-03', y: 170, color: 'blue'},
  {x: '2018-01-04', y: 250, color: 'blue'},
  {x: '2018-01-05', y: 10, color: 'blue'},
];

let sampleDataTwo = [
  [
    {seriesName: 'series1', data: [30, 200, 170, 250, 10], color: '#297AB1'},
    {seriesName: 'series2', data: [20, 100, 150, 130, 15], color: 'yellow'},
  ],
];

let sampleDataThree = [
  {
    seriesName: 'series1',
    data: [
      {x: '2018-02-01', y: 30},
      {x: '2018-02-02', y: 200},
      {x: '2018-02-03', y: 170},
      {x: '2018-02-04', y: 250},
      {x: '2018-02-05', y: 10},
    ],
    color: '#297AB1',
  },
  {
    seriesName: 'series2',
    data: [
      {x: '2018-02-01', y: 20},
      {x: '2018-02-02', y: 100},
      {x: '2018-02-03', y: 140},
      {x: '2018-02-04', y: 550},
      {x: '2018-02-05', y: 40},
    ],
    color: 'yellow',
  },
];
function GraphDemo() {
  return (
    <View style={{flex: 1}}>
      <PureChart data={sampleDataThree} type="bar" height={200} />
    </View>
  );
}

export default GraphDemo;
