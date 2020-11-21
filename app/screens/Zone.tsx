import React, {useEffect, useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {scale, moderateScale} from 'react-native-size-matters';
import {Icon, Button, Overlay} from 'react-native-elements';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Video from '../components/Video';
import {ZoneMenu} from '../components/ZoneMenu';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {SessionStart} from '../components/SessionStart';

const {width, height} = Dimensions.get('window');

const caseStudyImage = require('../res/casestudy.png');
const infoImage = require('../res/information.png');

function Zone({navigation}) {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const {zones, sessionId} = useDatas();
  useEffect(() => {
    if (zones.length !== 0) {
      setLoading(false);
    }
  }, [zones.length]);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  if (loading) return <Loading message="Loading" />;
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={navigation} />
      </View>
      <View style={styles.videoTouchableStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('Introduction')}>
          <Image
            resizeMode="contain"
            style={styles.videoIconStyle}
            source={infoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.videoTouchableStyle, {marginTop: moderateScale(5)}]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CaseStudies', {showBackButton: false})
          }>
          <Image
            resizeMode="contain"
            style={styles.videoIconStyle}
            source={caseStudyImage}
          />
        </TouchableOpacity>
      </View>
      <ZoneMenu nav={navigation} zones={zones} />
      <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
        <SessionStart toggleOverlay={toggleOverlay} />
      </Overlay>
      {!sessionId && (
        <Button
          title="Share"
          containerStyle={{
            width: width / 4,
            position: 'absolute',
            bottom: moderateScale(15),
          }}
          buttonStyle={styles.buttonStyle}
          titleStyle={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: moderateScale(12),
          }}
          onPress={toggleOverlay}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoTouchableStyle: {
    backgroundColor: '#4F4F4F',
    width: moderateScale(45),
    height: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: moderateScale(60),
  },
  videoIconStyle: {width: moderateScale(30), height: moderateScale(60)},
  gifImageContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',

    backgroundColor: 'white',
  },
  gifImageStyle: {width: width / 4, height: moderateScale(200)},
  buttonStyle: {
    backgroundColor: 'lightgrey',
    padding: moderateScale(10),
    marginLeft: moderateScale(20),
  },
});

export default Zone;
