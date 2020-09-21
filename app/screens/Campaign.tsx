import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {ZoneMenu} from '../components/ZoneMenu';
import {CampaignMenu} from '../components/CampaignMenu';

const {height, width} = Dimensions.get('window');

const data = [
  {image: 'sun', title: 'Fresh Take', id: 1},
  {image: 'sun', title: 'Love My Garden Chef', id: 2},
  {image: 'sun', title: 'Nava', id: 3},
  {image: 'sun', title: 'Zyliss', id: 4},
  {image: 'sun', title: 'Guzzini Venice', id: 5},
  {image: 'sun', title: 'Kappa Active Life', id: 6},
  {image: 'sun', title: 'Nerf', id: 7},
];
export default function Campaign(props) {
  const [index, setIndex] = useState(props.route.params.index);
  const [zoneVisible, setZoneVisible] = useState(false);

  // useEffect(() => {
  //   if (index !== props.route.params.index) {
  //     setIndex(props.route.params.index);
  //   }
  // });

  const renderContent = () => {
    return data.map((item) => {
      return (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginLeft: 10,
            height: height / 3,
          }}
          onPress={() => props.navigation.navigate('Panorama')}>
          <Image
            style={{width: width / 6, height: height / 3}}
            source={require('../res/sun.jpeg')}
          />
          <Text style={{fontSize: 25}}>{item.title}</Text>
        </TouchableOpacity>
      );
    });
  };

  const onImagePress = (i: number) => {
    setIndex(i);
    setZoneVisible(false);
  };
  console.log(index);
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <CampaignMenu data={data} navigation={props.navigation} />
      <View
        style={{
          backgroundColor: 'white',
          width,
          paddingVertical: 10,
          position: 'absolute',
          bottom: 10,
        }}>
        <Icon
          name="chevron-thin-up"
          type="entypo"
          size={40}
          iconStyle={{color: 'black', marginRight: 40}}
          onPress={() => setZoneVisible(!zoneVisible)}
        />
      </View>
      <Animatable.View
        animation={zoneVisible ? 'slideInUp' : 'slideOutDown'}
        style={{
          position: 'absolute',
          bottom: 20,
          width,
          backgroundColor: 'white',
        }}>
        <View style={{backgroundColor: 'white', width, paddingVertical: 10}}>
          <Icon
            name="chevron-thin-down"
            type="entypo"
            size={40}
            iconStyle={{color: 'black', marginRight: 40}}
            onPress={() => setZoneVisible(!zoneVisible)}
          />
        </View>
        {/* {zoneVisible ? <ZoneImages /> : null} */}
        <ZoneMenu nav={null} onPress={(index) => onImagePress(index)} />
      </Animatable.View>
    </View>
  );
}

// import React, {Component} from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   PanResponder,
//   StyleSheet,
//   View,
// } from 'react-native';
// import {Card} from '../components/Card';

// const {width, height} = Dimensions.get('window');

// export default class CampaignMenu extends Component {
//   bottomPadding = 10;
//   data = new Array(20).fill({
//     name: 'John Smith',
//     title: 'Marketing Head',
//     address: 'Address',
//     email: 'johnsmith@gmail.com',
//   });
//   colors = ['#ff5252', '#e040fb', '#7c4dff', '#448aff', '#64ffda', '#ff6e40'];
//   translateY = new Animated.Value(-this.bottomPadding);
//   bottoms = this.data.map((_, i) =>
//     Animated.add(
//       Animated.multiply(this.translateY, -1),
//       (i * height) / 8,
//     ).interpolate({
//       inputRange: [0, height - 200, height - 199],
//       outputRange: [0, height - 200, height - 200],
//     }),
//   );

//   panresponder = PanResponder.create({
//     onMoveShouldSetResponderCapture: () => true,
//     onMoveShouldSetPanResponderCapture: () => true,
//     onPanResponderMove: Animated.event([null, {dy: this.translateY}]),
//     onPanResponderRelease: (_, {vy}) => {
//       this.translateY.extractOffset();
//       Animated.timing(this.translateY, {
//         toValue: vy * 1000,
//         duration: 1000,
//         easing: Easing.poly(0.5),
//       }).start(() => {
//         const yOffset = this.bottoms.reduce(
//           (prevVal, x) =>
//             Math.abs(x.__getValue()) < Math.abs(prevVal)
//               ? x.__getValue()
//               : prevVal,
//           Infinity,
//         );
//         this.translateY.extractOffset();
//         Animated.spring(this.translateY, {
//           toValue: yOffset - this.bottomPadding,
//           duration: 100,
//           friction: 5,
//         }).start(this.translateY.extractOffset.bind(this));
//       });
//     },
//   });

//   render() {
//     return (
//       <View
//         style={{
//           width,
//           height,
//           backgroundColor: 'black',
//         }}
//         {...this.panresponder.panHandlers}>
//         {this.data
//           .slice()
//           .reverse()
//           .map((x, index) => {
//             const i = this.data.length - index - 1;
//             const bottom = this.bottoms[i];
//             const pullDown = bottom.interpolate({
//               inputRange: [
//                 this.bottomPadding - 1,
//                 this.bottomPadding,
//                 this.bottomPadding + 1,
//               ],
//               outputRange: [-4, 0, 0],
//               extrapolateLeft: 'extend',
//             });
//             const scale = Animated.multiply(
//               Animated.add(Animated.divide(bottom, height), -1),
//               -1,
//             ).interpolate({
//               inputRange: [0.1, 1, 1.1],
//               outputRange: [0.1, 1, 1],
//               extrapolate: 'clamp',
//             });
//             const perspective = new Animated.Value(0);
//             perspective.__getValue = () => {
//               const x = bottom.__getValue();
//               return x > 0 ? 13 * Math.pow(x, 0.6) : x;
//             };
//             const opacity = bottom.interpolate({
//               inputRange: [this.bottomPadding, height - 200],
//               outputRange: [0, 0.3],
//               extrapolate: 'clamp',
//             });
//             return (
//               <Animated.View
//                 key={i}
//                 style={{
//                   position: 'absolute',
//                   transform: [{scale}],
//                   bottom: Animated.add(perspective, pullDown),
//                 }}>
//                 <Card color={this.colors[i % this.colors.length]} data={x} />
//                 <Animated.View
//                   style={{
//                     ...StyleSheet.absoluteFillObject,
//                     width: '100%',
//                     height: '100%',
//                     backgroundColor: '#4c4c4c',
//                     opacity,
//                   }}
//                 />
//               </Animated.View>
//             );
//           })}
//       </View>
//     );
//   }
// }
