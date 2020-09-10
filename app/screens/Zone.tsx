import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import VideoPlayer from './VideoPlayer';

const {width, height} = Dimensions.get('window');

const earthImage = require('../res/earth.gif');

function Zone({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(Image.resolveAssetSource(earthImage));
  return (
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      <Header nav={navigation} />
      {/* <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} /> */}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => console.log('Pressed')}>
          <Image style={{width: 200, height: 200}} source={earthImage} />
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <Image
            style={{width: 200, height: 200}}
            source={require('../res/sun.jpeg')}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Image
            style={{width: 200, height: 200}}
            source={require('../res/sun.jpeg')}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Image
            style={{width: 200, height: 200}}
            source={require('../res/sun.jpeg')}
          />
        </TouchableWithoutFeedback>
      </View>
      <View
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
          iconStyle={{color: 'white', marginLeft: 20}}
        />
      </View>
      <Modal
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        isVisible={modalVisible}
        coverScreen
        hasBackdrop
        backdropColor="grey"
        backdropOpacity={1}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              width: width / 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: 1, height: 1}} />
            <Text
              style={{
                color: 'grey',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              INTRODUCTION VIDEO
            </Text>
            <Icon
              name="cross"
              type="entypo"
              size={40}
              onPress={() => setModalVisible(false)}
              iconStyle={{
                color: 'grey',
                alignSelf: 'flex-end',
              }}
            />
          </View>
          {/* <VideoPlayer videoUrl="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" /> */}
          <VideoPlayer videoUrl="video" />
        </View>
      </Modal>
    </View>
  );
}

export default Zone;
