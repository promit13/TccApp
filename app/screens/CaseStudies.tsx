/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import _ from 'lodash';
import Swiper from 'react-native-swiper';
import {moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import VideoPlayer from 'react-native-video-controls';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {dirs, height, width} from '../config/utils';

let casesArray = [];

function CaseStudies(props) {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const {showBackButton} = props.route.params;
  const {cases, files} = useDatas();

  useEffect(() => {
    const sortedCasesArray = cases.sort((a, b) => a.createdAt - b.createdAt);
    casesArray = sortedCasesArray.map((item) => {
      return _.extend(
        {
          imageUrl: `file://file://${dirs}/${item.Thumbnail}.jpeg`,
        },
        item,
      );
    });
    setLoading(false);
  }, [cases, files, loading]);

  const renderSliderContent = () => {
    const {
      slide_ten_video_file,
      slide_seven_file_video,
      slide_eight_file_video,
      slide_nine_file_video,
      slide_six_video_file,
      slide_five_video_file,
      slide_four_video_file,
      slide_three_file_video,
      slide_two_video_file,
      slide_one_file_video,
      slide_one_media,
      slide_two_media,
      slide_three_media,
      slide_four_media,
      slide_five_media,
      slide_six_media,
      slide_seven_media,
      slide_eight_media,
      slide_nine_media,
      slide_ten_media,
    } = itemSelected;
    const mediaArray = [
      slide_one_media,
      slide_two_media,
      slide_three_media,
      slide_four_media,
      slide_five_media,
      slide_six_media,
      slide_seven_media,
      slide_eight_media,
      slide_nine_media,
      slide_ten_media,
    ];
    const videoArray = [
      slide_one_file_video,
      slide_two_video_file,
      slide_three_file_video,
      slide_four_video_file,
      slide_five_video_file,
      slide_six_video_file,
      slide_seven_file_video,
      slide_eight_file_video,
      slide_nine_file_video,
      slide_ten_video_file,
    ];

    const array = _.without(
      _.map(mediaArray, (item, index) => {
        if (item === null) {
          if (videoArray[index] === null) {
            return;
          }
          return {image: false, id: videoArray[index]};
        } else {
          return {image: true, id: item};
        }
      }),
      undefined,
    );

    const slides = array.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          {item.image ? (
            <Image
              resizeMode="contain"
              style={styles.sliderImageStyle}
              source={{
                uri: `file://${dirs}/${item.id}.jpeg`,
              }}
            />
          ) : (
            <VideoPlayer
              style={{
                height: height - moderateScale(150),
                width: width - moderateScale(150),
                alignSelf: 'center',
              }}
              source={{
                uri: `file://${dirs}/${item.id}.mp4`,
              }}
              onBack={toggleOverlay}
            />
          )}
        </View>
      );
    });
    return slides;
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{height: height / 2}}
        onPress={() => {
          setItemSelected(item);
          toggleOverlay();
        }}>
        <Image
          style={{
            width: width / 4 - moderateScale(15),
            height: height / 2,
            marginLeft: moderateScale(8),
          }}
          source={{uri: item.imageUrl}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  if (loading) return <Loading message="Loading" />;
  return (
    <View style={styles.mainContainer}>
      <View style={{position: 'absolute', zIndex: 1, elevation: 5}}>
        <Header nav={props.navigation} />
      </View>
      <View
        style={{
          marginTop: moderateScale(50),
          backgroundColor: '#BC955C',
          width: width / 5,
          padding: moderateScale(10),
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: moderateScale(15)}}>
          Case Studies
        </Text>
      </View>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PanoramaTest')}
          style={{
            margin: moderateScale(10),
            width: width / 4,
          }}>
          <Text
            style={{
              color: '#BC955C',
              fontSize: moderateScale(15),
            }}>
            Back to Campaign
          </Text>
        </TouchableOpacity>
      )}
      <View style={{flex: 1, padding: moderateScale(10)}}>
        <FlatList
          data={casesArray}
          renderItem={renderItem}
          keyExtractor={(item) => JSON.stringify(item._id)}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Modal
        style={styles.modalStyle}
        isVisible={overlayVisible}
        coverScreen
        hasBackdrop
        onBackdropPress={toggleOverlay}
        backdropColor="black"
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

        <Swiper
          showsButtons={true}
          showsPagination={true}
          loop={false}
          dot={<View style={[styles.dotStyle, {backgroundColor: 'white'}]} />}
          activeDot={<View style={styles.dotStyle} />}
          loadMinimal={true}
          loadMinimalSize={0}
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  sliderImageStyle: {
    height: height - moderateScale(150),
    width: width - moderateScale(200),
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: {
    backgroundColor: '#BC955C',
    width: moderateScale(5),
    height: moderateScale(5),
    margin: 3,
  },
});

export default CaseStudies;
