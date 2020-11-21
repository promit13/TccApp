import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {Icon, Overlay, Button} from 'react-native-elements';
import {scale, moderateScale} from 'react-native-size-matters';
import {PanoramaView} from 'react-native-panorama-view';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {ObjectId} from 'bson';
import Header from '../components/Header';
import {CampaignMenu} from '../components/CampaignMenu';
import {WebViewComponent} from '../components/WebViewComponent';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {usePrevious} from '../components/userPrevious';
import VideoComponent from '../components/Video';
import Video from 'react-native-video';

const {width, height} = Dimensions.get('window');
const activationImage = require('../res/360.png');
const gameImage = require('../res/game.png');
const productInformationImage = require('../res/trolley.png');
const favouriteImage = require('../res/favourite.png');
const caseStudyImage = require('../res/casestudy.png');
const iphoneImage = require('../res/iphone.png');
const rangeImage = require('../res/range.png');

const panoImage = require('../res/pano.png');

let activationSliderArray = [];
let productInformationArray = [];
let kulaTitleArray = [];
let insightsArray = [];
let objectivesArray = [];
let kvArray = [];
let kulaImageArray = [];

function PanoramaTest(props) {
  const {id, campaigns} = props.route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaignId, setCampaignId] = useState(id);
  const [zoneName, setZoneName] = useState('');
  const [zoneId, setZoneId] = useState(null);
  const [campaignTitle, setCampaignTitle] = useState('');
  const [overLayVisible, setOverLayVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [qrCodeOne, setQRCodeone] = useState(null);
  const [qrCodeTwo, setQRCodeTwo] = useState(null);
  const [swiperVisible, setSwiperVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [laguageOptionVisible, setLanguageOptionVisible] = useState(false);
  const [execution, setExecution] = useState(false);
  const [swiperArray, setSwiperArray] = useState([]);
  const [campaignUrl, setCampaignUrl] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [panoBackground, setPanoBackground] = useState('');

  const previousId = usePrevious(id);

  const {createFavourites, sessionId, files, zones, cases} = useDatas();
  useEffect(() => {
    // async function fetchData() {
    //   // You can await here
    //   const sessId = await AsyncStorage.getItem('sessionId');
    //   setSessionId(sessId);
    //   // ...
    // }
    // fetchData();
    if (previousId !== id) {
      setCampaignId(id);
      setExecution(false);
      // return;
    }
    activationSliderArray = [];
    kulaTitleArray = [];
    kulaImageArray = [];
    productInformationArray = [];
    insightsArray = [];
    kvArray = [];
    objectivesArray = [];
    const campaignObject = campaigns.find(
      (o) => JSON.stringify(o._id) === JSON.stringify(campaignId),
    );
    if (campaignObject === undefined) {
      return;
    }
    const {
      title,
      activation_slider,
      zone,
      kv,
      insights,
      objectives,
      product_information,
      panorama_background,
      panorama_execition_five,
      panorama_execition_four,
      panorama_execition_three,
      panorama_execition_two,
      panorama_execition_one,
      game_video,
      qr_code_one,
      qr_code_two,
      video_english_file,
      kuula_execution_five_title,
      kuula_execution_four_title,
      kuula_execution_three_title,
      kuula_execution_two_title,
      kuula_execution_one_title,
    } = campaignObject;
    kulaTitleArray.push(
      kuula_execution_one_title,
      kuula_execution_two_title,
      kuula_execution_three_title,
      kuula_execution_four_title,
      kuula_execution_five_title,
    );
    kulaImageArray.push(
      `${RNBackgroundDownloader.directories.documents}/${panorama_execition_one}.jpeg`,
      `${RNBackgroundDownloader.directories.documents}/${panorama_execition_two}.jpeg`,
      `${RNBackgroundDownloader.directories.documents}/${panorama_execition_three}.jpeg`,
      `${RNBackgroundDownloader.directories.documents}/${panorama_execition_four}.jpeg`,
      `${RNBackgroundDownloader.directories.documents}/${panorama_execition_five}.jpeg`,
    );
    console.log(kulaTitleArray, kulaImageArray, kulaImageArray.length);

    console.log(panorama_execition_one, panorama_execition_two);
    insightsArray.push(
      `${RNBackgroundDownloader.directories.documents}/${insights}.jpeg`,
    );
    objectivesArray.push(
      `${RNBackgroundDownloader.directories.documents}/${objectives}.jpeg`,
    );

    const game =
      game_video === null
        ? null
        : `${RNBackgroundDownloader.directories.documents}/${game_video}.mp4`;

    activation_slider.map((item, index) => {
      activationSliderArray.push(
        `${RNBackgroundDownloader.directories.documents}/${item}.jpeg`,
      );
    });
    product_information.map((item) => {
      productInformationArray.push(
        `${RNBackgroundDownloader.directories.documents}/${item}.jpeg`,
      );
    });
    kv.map((item, index) => {
      kvArray.push(
        `${RNBackgroundDownloader.directories.documents}/${item}.jpeg`,
      );
    });
    const zoneObject = zones.find(
      (o) => JSON.stringify(zone) === JSON.stringify(o._id),
    );
    // setCampaignUrl(
    //   execution
    //     ? kulaImageArray[imageIndex]
    //     : `${RNBackgroundDownloader.directories.documents}/${panorama_background}.jpeg`,
    // );
    setCampaignUrl(kulaImageArray[imageIndex]);
    console.log('V EN FILE', video_english_file);
    setZoneName(zoneObject.title);
    setZoneId(zoneObject._id);
    setCampaignTitle(title);
    setGameUrl(game);
    setVideoUrl(video_english_file);
    setPanoBackground(
      `${RNBackgroundDownloader.directories.documents}/${panorama_background}.jpeg`,
    );
    setQRCodeone(qr_code_one);
    setQRCodeTwo(qr_code_two);
    setLoading(false);
  }, [
    campaigns,
    id,
    files,
    execution,
    zones,
    campaignId,
    previousId,
    loading,
    imageIndex,
  ]); // Or [] if effect doesn't need props or state

  console.log(campaignUrl);
  const onCampaignChange = (i) => {
    if (campaignId === i) {
      setMenuVisible(false);
      return;
    }
    setLoading(true);
    setCampaignId(i);
    setExecution(false);
    setMenuVisible(false);
  };

  const toggleOverlay = () => {
    setOverLayVisible(false);
    setSwiperVisible(false);
    setGameVisible(false);
    setVideoVisible(false);
    setLanguageOptionVisible(false);
  };

  const renderSliderContent = () => {
    const slides = swiperArray.map((item, index) => {
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
            source={{uri: item}}
          />
        </View>
      );
    });
    return slides;
  };
  const renderItem = ({item, index}) => {
    if (item === null) {
      return;
    }
    return (
      <Button
        title={item}
        containerStyle={styles.languageButtonContainerStyle}
        buttonStyle={[
          styles.languageButtonStyle,
          {
            backgroundColor: index === imageIndex ? '#BC955C' : 'white',
            borderColor: index === imageIndex ? '#BC955C' : 'lightgrey',
          },
        ]}
        titleStyle={[
          styles.text,
          {color: index === imageIndex ? 'white' : 'black'},
        ]}
        onPress={() => {
          setOverLayVisible(false);
          setLanguageOptionVisible(false);
          setLoading(true);
          setImageIndex(index);
          // setVideoVisible(true);
        }}
      />
    );
  };

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      {execution ? (
        <PanoramaView
          style={{flex: 1}}
          dimensions={{
            height: height,
            width: width,
          }}
          inputType="mono"
          imageUrl={campaignUrl}
        />
      ) : (
        <ImageBackground
          style={{
            flex: 1,
          }}
          resizeMode="cover"
          source={{uri: panoBackground}}
          // source={{uri: `https://admin.tcccampaignportal.com${url}`}}
        />
      )}

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Campaign', {
            id: JSON.stringify(zoneId),
          })
        }
        style={{
          marginTop: moderateScale(50),
          backgroundColor: '#BC955C',
          width: width / 2,
          padding: moderateScale(10),
          alignItems: 'center',
          position: 'absolute',
          zIndex: 1,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(15),
          }}>{`${zoneName} > ${
          execution ? 'Campaign Execution' : 'Campaign Background'
        }`}</Text>
      </TouchableOpacity>

      <Modal
        style={styles.modalStyle}
        isVisible={overLayVisible}
        coverScreen
        hasBackdrop
        backdropColor="black"
        backdropOpacity={0.9}>
        <View
          style={{
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(20),
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
        {gameVisible && (
          // <View style={{height: height - 300, width: width / 2}}>
          //   <WebViewComponent gameLink={gameUrl} />
          // </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <ImageBackground
              resizeMode="contain"
              style={{
                height: height - height / moderateScale(3),
                width: width / 3 + moderateScale(90),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              source={iphoneImage}>
              <Video
                style={{
                  height: height - height / 2 + moderateScale(25),
                  width: width / 4,
                }}
                resizeMode="cover"
                controls={true}
                // source={demoVideo}
                source={{uri: gameUrl}}
              />
            </ImageBackground>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: height / 3, width: width / 4}}
                source={{
                  uri: `${RNBackgroundDownloader.directories.documents}/${qrCodeOne}.png`,
                }}
              />
              {qrCodeTwo && (
                <Image
                  resizeMode="contain"
                  style={{
                    height: height / 3,
                    width: width / 4,
                    marginTop: moderateScale(10),
                  }}
                  source={{
                    uri: `${RNBackgroundDownloader.directories.documents}/${qrCodeTwo}.png`,
                  }}
                />
              )}
            </View>
          </View>
        )}
        {swiperVisible && (
          <Swiper
            loop={false}
            showsButtons={swiperArray.length === 1 ? false : true}
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
        {laguageOptionVisible && (
          <View
            style={{
              backgroundColor: 'white',
              width: width - moderateScale(50),
              padding: moderateScale(10),
              marginTop: moderateScale(10),
              justifyContent: 'center',
              height:
                kulaTitleArray[2] === null
                  ? height / 4
                  : height / 3 + moderateScale(60),
            }}>
            <Text
              style={{
                fontSize: moderateScale(20),
                marginLeft: moderateScale(10),
              }}>
              Select Range
            </Text>
            <View
              style={{
                width: width - moderateScale(80),
                height: 1,
                margin: moderateScale(5),
                backgroundColor: 'black',
              }}
            />

            <FlatList
              data={kulaTitleArray}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        {videoVisible && (
          <VideoComponent
            videoUrl={`${RNBackgroundDownloader.directories.documents}/${videoUrl}.mp4`}
            videoHeight={height}
            videoWidth={width - moderateScale(100)}
            onBack={toggleOverlay}
          />
        )}
      </Modal>
      <View style={styles.sideButtonContainer}>
        {sessionId && (
          <View style={[styles.buttonContainerStyle, {marginTop: 0}]}>
            <TouchableOpacity
              onPress={() => {
                createFavourites(
                  JSON.stringify(campaignId),
                  new ObjectId(campaignId),
                );
              }}>
              <Image
                resizeMode="contain"
                style={styles.buttonIconStyle}
                source={favouriteImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              setSwiperArray(activationSliderArray);
              setSwiperVisible(true);
              setOverLayVisible(true);
            }}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={activationImage}
            />
          </TouchableOpacity>
        </View>
        {gameUrl && (
          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                setGameVisible(true);
                setOverLayVisible(true);
              }}>
              <Image
                resizeMode="contain"
                style={styles.buttonIconStyle}
                source={gameImage}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              setSwiperArray(productInformationArray);
              setSwiperVisible(true);
              setOverLayVisible(true);
              // setLanguageOptionVisible(true);
            }}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={productInformationImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              const selectedCase = cases.find(
                (o) =>
                  JSON.stringify(o.campaigns[0]) === JSON.stringify(campaignId),
              );
              selectedCase === undefined
                ? props.navigation.navigate('CaseStudies', {
                    showBackButton: true,
                  })
                : props.navigation.navigate('CaseSingle', {
                    selectedCase,
                    campaignTitle,
                  });
            }}>
            <Image
              resizeMode="contain"
              style={styles.buttonIconStyle}
              source={caseStudyImage}
            />
          </TouchableOpacity>
        </View>
        {execution && kulaTitleArray[0] && (
          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                setOverLayVisible(true);
                setLanguageOptionVisible(true);
              }}>
              <Image
                resizeMode="contain"
                style={styles.buttonIconStyle}
                source={rangeImage}
              />
            </TouchableOpacity>
          </View>
        )}
        {!execution && (
          <View style={styles.buttonContainerStyle}>
            <Icon
              name="chevron-thin-right"
              type="entypo"
              size={40}
              color="white"
              onPress={() => {
                setLoading(true);
                setExecution(true);
                setImageIndex(0);
              }}
            />
          </View>
        )}
        {execution && (
          <View style={styles.buttonContainerStyle}>
            <Icon
              name="chevron-thin-left"
              type="entypo"
              size={40}
              color="white"
              onPress={() => {
                setLoading(true);
                setExecution(false);
              }}
            />
          </View>
        )}
      </View>
      {!execution && (
        <View
          style={{
            position: 'absolute',
            height: height / 2,
            width: width - width / 7,
            paddingBottom: moderateScale(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: height / 4,
            alignItems: 'center',
            marginLeft: moderateScale(60),
          }}>
          {/* <Icon
            name="youtube-play"
            type="font-awesome"
            size={moderateScale(40)}
            iconStyle={{color: 'transparent', marginLeft: moderateScale(50)}}
            onPress={() => {
              setVideoVisible(true);
              setOverLayVisible(true);
            }}
          /> */}
          <TouchableOpacity
            style={[
              styles.buttonContainerStyle,
              {
                backgroundColor: 'transparent',
                height: moderateScale(30),
                width: moderateScale(40),
                marginTop: moderateScale(30),
                marginLeft: moderateScale(30),
              },
            ]}
            onPress={() => {
              setVideoVisible(true);
              setOverLayVisible(true);
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              width: width / 3,
              marginLeft: moderateScale(50),
            }}>
            <TouchableOpacity
              style={[
                styles.buttonContainerStyle,
                {
                  backgroundColor: 'transparent',
                  height: moderateScale(175),
                  width: moderateScale(100),
                  marginTop: moderateScale(20),
                },
              ]}
              onPress={() => {
                setSwiperArray(insightsArray);
                setSwiperVisible(true);
                setOverLayVisible(true);
              }}
            />

            <TouchableOpacity
              style={[
                styles.buttonContainerStyle,
                {
                  backgroundColor: 'transparent',
                  height: moderateScale(175),
                  width: moderateScale(100),
                  marginLeft: moderateScale(40),
                  marginTop: moderateScale(20),
                },
              ]}
              onPress={() => {
                setSwiperArray(objectivesArray);
                setSwiperVisible(true);
                setOverLayVisible(true);
              }}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.buttonContainerStyle,
              {
                backgroundColor: 'transparent',
                height: moderateScale(175),
                width: moderateScale(125),
                marginTop: moderateScale(20),
                marginLeft: moderateScale(30),
                marginRight: moderateScale(20),
              },
            ]}
            onPress={() => {
              setSwiperArray(kvArray);
              setSwiperVisible(true);
              setOverLayVisible(true);
            }}
          />
        </View>
      )}
      <View
        style={{
          backgroundColor: 'white',
          width,
          paddingVertical: moderateScale(8),
          position: 'absolute',
          bottom: moderateScale(0),
        }}>
        <Icon
          name="chevron-thin-up"
          type="entypo"
          size={moderateScale(20)}
          iconStyle={{color: 'black', marginRight: moderateScale(20)}}
          onPress={() => setMenuVisible(true)}
        />
      </View>
      <Animatable.View
        animation={menuVisible ? 'slideInUp' : 'slideOutDown'}
        style={{
          position: 'absolute',
          bottom: moderateScale(10),
          width,
          backgroundColor: 'white',
        }}
        useNativeDriver={true}>
        <View style={{backgroundColor: 'white', width, paddingVertical: 10}}>
          <Icon
            name="chevron-thin-down"
            type="entypo"
            size={moderateScale(20)}
            iconStyle={{color: 'black', marginRight: moderateScale(20)}}
            onPress={() => setMenuVisible(false)}
          />
        </View>
        {/* {zoneVisible ? <ZoneImages /> : null} */}
        <CampaignMenu
          campaigns={campaigns}
          navigation={null}
          campaignId={campaignId}
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
  sideButtonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: moderateScale(60),
  },
  buttonContainerStyle: {
    backgroundColor: '#4F4F4F',
    width: moderateScale(45),
    height: moderateScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(5),
  },
  buttonIconStyle: {width: moderateScale(35), height: moderateScale(35)},
  wrapper: {},
  sliderImageStyle: {
    height: height - moderateScale(100),
    width: width - moderateScale(200),
  },
  text: {
    color: '#fff',
    fontSize: moderateScale(15),
  },
  modalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageButtonStyle: {
    padding: moderateScale(10),
    margin: moderateScale(5),
    borderRadius: moderateScale(2),
    borderWidth: 1,
  },
  languageButtonContainerStyle: {
    width: width / 2 - moderateScale(35),
  },
  dotStyle: {
    backgroundColor: '#BC955C',
    width: moderateScale(5),
    height: moderateScale(5),
    margin: 3,
  },
});

export default PanoramaTest;
