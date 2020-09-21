import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const firstImage = require('../res/brown.gif');
const secondImage = require('../res/green.gif');
const thirdImage = require('../res/red.gif');
const fourthImage = require('../res/purple.gif');

export function ZoneMenu({nav, onPress}) {
  return (
    <View style={styles.gifImageContainerStyle}>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          nav ? nav.navigate('CampaignMenu', {index: 1}) : onPress(1);
        }}>
        <Image
          style={styles.gifImageStyle}
          source={secondImage}
          resizeMode="cover"
        />
        <Text style={styles.titleStyle}>Living Well</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          nav ? nav.navigate('CampaignMenu', {index: 2}) : onPress(2);
        }}>
        <Image
          style={styles.gifImageStyle}
          source={firstImage}
          resizeMode="cover"
        />
        <Text style={styles.titleStyle}>Caring for the Planet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          nav ? nav.navigate('CampaignMenu', {index: 3}) : onPress(3);
        }}>
        <Image
          style={styles.gifImageStyle}
          source={fourthImage}
          resizeMode="cover"
        />
        <Text style={styles.titleStyle}>Friends and Family</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          nav ? nav.navigate('CampaignMenu', {index: 4}) : onPress(4);
        }}>
        <Image
          style={styles.gifImageStyle}
          source={thirdImage}
          resizeMode="cover"
        />
        <Text style={styles.titleStyle}>Food for Thought</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoTouchableStyle: {
    backgroundColor: 'grey',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 120,
  },
  videoIconStyle: {width: 80, height: 80},
  gifImageContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',

    backgroundColor: 'white',
  },
  gifImageStyle: {width: width / 4, height: 350},
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 25,
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
  },
  videoContainer: {
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    width: width / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'white',
    alignSelf: 'flex-end',
  },
  buttonStyle: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginLeft: 30,
  },
});
