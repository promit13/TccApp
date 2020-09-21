import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import {PanoramaView} from 'react-native-panorama-view';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Header from '../components/Header';
import {CampaignMenu} from '../components/CampaignMenu';

const {width, height} = Dimensions.get('window');
const activationImage = require('../res/360.png');
const gameImage = require('../res/game.png');
const productInformationImage = require('../res/trolley.png');
const sunImage = require('../res/sun.jpeg');

const data = [
  {image: 'sun', title: 'Fresh Take', id: 1},
  {image: 'sun', title: 'Love My Garden Chef', id: 2},
  {image: 'sun', title: 'Nava', id: 3},
  {image: 'sun', title: 'Zyliss', id: 4},
  {image: 'sun', title: 'Guzzini Venice', id: 5},
  {image: 'sun', title: 'Kappa Active Life', id: 6},
  {image: 'sun', title: 'Nerf', id: 7},
];

function Panorama(props) {
  console.log(props);
  const [menuVisible, setMenuVisible] = useState(false);
  const [index, setIndex] = useState(props.route.params.index);
  const [overLayVisible, setOverLayVisible] = useState(false);

  const renderSliderContent = () => {
    return data.map((item) => {
      return (
        <Image
          resizeMode="contain"
          source={sunImage}
          style={styles.sliderImageStyle}
        />
      );
    });
  };

  const onCampaignChange = (i: number) => {
    setIndex(i);
    setMenuVisible(false);
  };
  console.log(index);

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <PanoramaView
        style={{flex: 1}}
        dimensions={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
        inputType="mono"
        imageUrl="http://reznik.lt/wp-content/uploads/2017/09/preview3000.jpg"
        //imageUrl={`${RNBackgroundDownloader.directories.documents}/panorama.jpg`}
        // imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
      />
      <Overlay
        isVisible={overLayVisible}
        onBackdropPress={() => setOverLayVisible(false)}>
        <View
          style={{
            height: height / 2,
            width: width - 300,
          }}>
          <Swiper
            containerStyle={{backgroundColor: 'transparent'}}
            showsButtons={true}
            showsPagination={false}
            nextButton={
              <Icon name="chevron-thin-right" type="entypo" size={40} />
            }
            prevButton={
              <Icon name="chevron-thin-left" type="entypo" size={40} />
            }>
            {renderSliderContent()}
          </Swiper>
        </View>
      </Overlay>
      <View style={styles.sideButtonContainer}>
        <View style={[styles.buttonContainerStyle, {marginTop: 0}]}>
          <TouchableOpacity onPress={() => setOverLayVisible(true)}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={activationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={gameImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity onPress={() => setOverLayVisible(true)}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={productInformationImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          width,
          paddingVertical: 10,
          position: 'absolute',
          bottom: 0,
        }}>
        <Icon
          name="chevron-thin-up"
          type="entypo"
          size={40}
          iconStyle={{color: 'black', marginRight: 40}}
          onPress={() => setMenuVisible(!menuVisible)}
        />
      </View>
      <Animatable.View
        animation={menuVisible ? 'slideInUp' : 'slideOutDown'}
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
            onPress={() => setMenuVisible(!menuVisible)}
          />
        </View>
        {/* {zoneVisible ? <ZoneImages /> : null} */}
        <CampaignMenu
          data={props.route.params.data}
          navigation={null}
          onPress={(index) => onCampaignChange(index)}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: 230,
  },
  sideButtonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 120,
  },
  buttonContainerStyle: {
    backgroundColor: 'grey',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonIconStyle: {width: 80, height: 80},
  wrapper: {},
  sliderImageStyle: {
    height: height - 300,
    width: width - 300,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Panorama;
