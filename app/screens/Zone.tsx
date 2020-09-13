import React, {useState} from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import VideoPlayer from './VideoPlayer';

const {width, height} = Dimensions.get('window');

const firstImage = require('../res/brown.gif');
const secondImage = require('../res/green.gif');
const thirdImage = require('../res/red.gif');
const fourthImage = require('../res/purple.gif');
const videoImage = require('../res/video.png');

function Zone({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(Image.resolveAssetSource(earthImage));
  return (
    <View style={styles.mainContainer}>
      <Header nav={navigation} />
      <View style={styles.videoTouchableStyle}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            resizeMode="contain"
            style={styles.videoIconStyle}
            source={videoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gifImageContainerStyle}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => console.log('Pressed')}>
          <Image
            style={styles.gifImageStyle}
            source={secondImage}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>Living Well</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableStyle}>
          <Image
            style={styles.gifImageStyle}
            source={firstImage}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>Caring for the Planet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableStyle}>
          <Image
            style={styles.gifImageStyle}
            source={fourthImage}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>Friends and Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchableStyle}>
          <Image
            style={styles.gifImageStyle}
            source={thirdImage}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>Food for Thought</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
  },
  videoIconStyle: {width: 80, height: 80},
  gifImageContainerStyle: {
    marginTop: height / 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  gifImageStyle: {width: 300, height: 350},
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
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
});

export default Zone;
