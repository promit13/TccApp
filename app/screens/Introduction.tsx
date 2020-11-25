import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {scale, moderateScale} from 'react-native-size-matters';
import Swiper from 'react-native-swiper';
import _ from 'lodash';
import {Icon, Button} from 'react-native-elements';
import VideoComponent from '../components/Video';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';

import { dirs, width, height} from '../config/utils';


let sliderImageArray = [];

export default function Introduction(props) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const {files, introductions} = useDatas();
  
  useEffect(() => {
    sliderImageArray = [];
    // const reverse = _.reverse(introductions);
    const indroductionSorted = introductions.sort((a, b) => a.createdAt - b.createdAt);
    indroductionSorted.map((item) => {
      if (item.Video === '') {
        item.Slideshow.map((slide) => {
          sliderImageArray.push(`file://${dirs}/${slide}.jpeg`);
        });
      }
    });
    setLoading(false);
    console.log('check');
  }, [introductions, files]);

  const onItemPress = (item) => {
    setVideoUrl(`file://${dirs}/${item.video_file}.mp4`);
    setOverlayVisible(true);
    item.Video === ''
      ? setVideoVisible(false)
      : setVideoVisible(true)
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          margin: moderateScale(5),
        }}
        onPress={() => {
          onItemPress(item);
        }}>
        <ImageBackground
          style={{
            height: height / 4,
            width: width / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          source={{
            uri: `file://${dirs}/${item.Thumbnail}.png`
          }}
        >
          {item.Video === '' ? null : (
           <View style={styles.overlay} />
          )}
           
           {item.Video === '' ? null : (
            <Icon
              name="controller-play"
              type="entypo"
              size={moderateScale(50)}
              color="white"
              onPress={() => onItemPress(item)}
            />
          )}
        </ImageBackground>
        <Text style={{color: '#707070', fontSize: moderateScale(15), marginTop: moderateScale(15)}}>{item.Title}</Text>
      </TouchableOpacity>
    );
  };

  const renderSliderContent = () => {
    const slides = sliderImageArray.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={styles.sliderImageStyle}
            source={{
              uri: item,
            }}
          />
        </View>
      );
    });
    return slides;
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  if (loading) return <Loading message="loading" />;
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'absolute', zIndex: 1, elevation: 5}}>
        <Header nav={props.navigation} />
      </View>
      <View
        style={{
          marginTop: moderateScale(50),
          backgroundColor: '#BC955C',
          width: width / 3,
          paddingVertical: moderateScale(10),
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: moderateScale(15)}}>Zone Selector > tcc Introduction</Text>
      </View>
      <View style={{padding: moderateScale(10)}}>
        <FlatList
          data={introductions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      </View>
      <Button
          title="Zone Selector"
          containerStyle={{
            width: width / 4,
            alignSelf: 'center',
            marginTop: moderateScale(10),
          }}
          buttonStyle={{ padding: moderateScale(10), backgroundColor: '#BC955C'}}
          titleStyle={{color: 'white', fontSize: moderateScale(15)}}
          onPress={() => props.navigation.navigate('Zone')}
        />
      <Modal
        style={styles.modalStyle}
        isVisible={overlayVisible}
        coverScreen
        hasBackdrop
        backdropColor="black"
        onBackdropPress={toggleOverlay}
        backdropOpacity={0.9}>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10),
          }}>
          <View style={{height: 1, width: 1, backgroundColor: 'white'}} />
          <Icon
            name="close"
            type="evilicon"
            size={moderateScale(30)}
            color="white"
            onPress={toggleOverlay}
          />
        </View>
        {videoVisible ? (
          <VideoComponent
          videoUrl={videoUrl}
            videoHeight={height}
            videoWidth={width - moderateScale(110)}
            onBack={toggleOverlay}
          />
        ) : (
          <Swiper
            loop={false}
            showsButtons={true}
            showsPagination={true}
            dot={<View style={[styles.dotStyle, {backgroundColor: 'white'}]} />}
            activeDot={<View style={styles.dotStyle} />}
            nextButton={
              <Icon
                name="chevron-thin-right"
                type="entypo"
                size={moderateScale(20)}
                color="white"
              />
            }
            prevButton={
              <Icon
                name="chevron-thin-left"
                type="entypo"
                size={moderateScale(20)}
                color="white"
              />
            }>
            {renderSliderContent()}
          </Swiper>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderImageStyle: {
    height: height - moderateScale(150),
    width: width - moderateScale(200),
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  dotStyle: {
    backgroundColor: '#BC955C',
    width: moderateScale(5),
    height: moderateScale(5),
    margin: 3,
  },
});
