import React, {useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Icon, Button} from 'react-native-elements';
import Header from '../components/Header';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import VideoPlayer from './VideoPlayer';
import {ZoneMenu} from '../components/ZoneMenu';

const {width, height} = Dimensions.get('window');

const videoImage = require('../res/video.png');

function Zone({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(Image.resolveAssetSource(earthImage));
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={navigation} />
      </View>
      <View style={styles.videoTouchableStyle}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            resizeMode="contain"
            style={styles.videoIconStyle}
            source={videoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.videoTouchableStyle, {marginTop: 10}]}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            resizeMode="contain"
            style={styles.videoIconStyle}
            source={videoImage}
          />
        </TouchableOpacity>
      </View>
      <ZoneMenu nav={navigation} />

      <Button
        title="Share with client"
        containerStyle={{
          width: 300,
          position: 'absolute',
          bottom: 30,
        }}
        buttonStyle={styles.buttonStyle}
        titleStyle={{color: 'black', fontWeight: 'bold', fontSize: 20}}
        onPress={() => console.log('pressed')}
      />
      {/* <View
        style={{
          alignSelf: 'flex-end',
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>A message from our CEO</Text>
        <Icon
          name="ios-play-circle"
          type="ionicon"
          size={60}
          onPress={() => setModalVisible(true)}
          iconStyle={{color: 'grey', marginLeft: 20}}
        />
      </View> */}
      <Modal
        style={styles.modalStyle}
        isVisible={modalVisible}
        coverScreen
        hasBackdrop
        backdropColor="grey"
        backdropOpacity={1}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.iconContainer}>
          <View style={{width: 1, height: 1}} />
          <Icon
            name="cross"
            type="entypo"
            size={60}
            onPress={() => setModalVisible(false)}
            iconStyle={styles.iconStyle}
          />
        </View>
        {/* <VideoPlayer videoUrl="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" /> */}
        <VideoPlayer videoUrl="video" />
      </Modal>
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

export default Zone;
