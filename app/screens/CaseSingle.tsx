import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {scale, moderateScale} from 'react-native-size-matters';
import _ from 'lodash';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import Swiper from 'react-native-swiper';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';

const {height, width} = Dimensions.get('window');

let filteredCampaigns = [];

export default function CaseSingle(props) {
  const [loading, setLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const {selectedCase, campaignTitle} = props.route.params;
  const {zones, campaigns, files, cases} = useDatas();

  useEffect(() => {
    // const selectedCase = cases.find(
    //   (o) => JSON.stringify(o.campaigns[0]) === JSON.stringify(campaignId),
    // );

    // const {url, ext} = files.find(
    //   (o) => JSON.stringify(o._id) === JSON.stringify(selectedCase.Thumbnail),
    // );
    // for offline
    setImageUrl(
      `${RNBackgroundDownloader.directories.documents}/${selectedCase.Thumbnail}.jpeg`,
    );
    // for online
    // setImageUrl(`https://admin.tcccampaignportal.com${url}`);
    setLoading(false);
  }, [selectedCase]);

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
    } = selectedCase;
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
          }}>
          {item.image ? (
            <Image
              resizeMode="contain"
              style={styles.sliderImageStyle}
              source={{
                // uri: `${RNBackgroundDownloader.directories.documents}/${item.url}${item.ext}`,
                uri: `${RNBackgroundDownloader.directories.documents}/${item.id}.jpeg`,
              }}
              //source={{uri: `https://admin.tcccampaignportal.com${item.url}`}}
            />
          ) : (
            // <VideoComponent
            //   videoHeight={height - height / 4}
            //   videoWidth={width - moderateScale(150)}
            //   onBack={toggleOverlay}
            //   videoUrl={`${RNBackgroundDownloader.directories.documents}/${item.id}.mp4`}
            // />
            <Video
              controls={true}
              style={{
                height: height - height / 4,
                width: width - moderateScale(150),
              }}
              // source={demoVideo}
              source={{
                uri: `${RNBackgroundDownloader.directories.documents}/${item.id}.mp4`,
              }}
            />
          )}
        </View>
      );
    });
    return slides;
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('PanoramaTest')}
        style={{
          marginTop: moderateScale(50),
          backgroundColor: '#BC955C',
          width: width / 3 + moderateScale(50),
          padding: moderateScale(10),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(15),
          }}>{`Case Studies > ${campaignTitle}`}</Text>
      </TouchableOpacity>
      <View style={{padding: moderateScale(30)}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PanoramaTest')}
          style={{
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
        <TouchableOpacity
          onPress={toggleOverlay}
          style={{
            width: width / 4,
            marginTop: moderateScale(10),
          }}>
          <Image
            style={{
              height: height / 2,
              width: width / 4,
              resizeMode: 'contain',
            }}
            source={{uri: imageUrl}}
          />
        </TouchableOpacity>
      </View>
      <Modal
        style={styles.modalStyle}
        isVisible={overlayVisible}
        coverScreen
        hasBackdrop
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
