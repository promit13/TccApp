import React from 'react';
// import {LineChart, BarChart, XAxis, Grid} from 'react-native-svg-charts';
import {View, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');

class Dashboard extends React.PureComponent {
  render() {
    const data = {
      labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43, 120],
        },
      ],
    };
    return (
      <View style={{flex: 1}}>
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
      </View>
    );
  }
}

export default Dashboard;
