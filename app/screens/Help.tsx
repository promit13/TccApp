import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import VideoComponent from '../components/Video';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {dirs, height, width} from '../config/utils';

export default function Help(props) {
  const [openedIndex, setOpenedIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortedTutorialsArray, setSortedTutorialsArray] = useState([]);
  const [sortedFaqsArray, setSortedFaqsArray] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const {faqs, tutorials} = useDatas();
  useEffect(() => {
    const sortedTutorials = tutorials.sort((a, b) => a.createdAt - b.createdAt);
    const sortedFaqs = faqs.sort((a, b) => a.createdAt - b.createdAt);
    setSortedTutorialsArray(sortedTutorials);
    setSortedFaqsArray(sortedFaqs);
    setLoading(false);
  }, [faqs, tutorials]);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const renderTutorialItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          margin: moderateScale(5),
        }}
        onPress={() => {
          setVideoUrl(`file://${dirs}/${item.video_file}.mp4`);
          toggleOverlay();
        }}>
        <ImageBackground
          style={{
            width: width / 3 - moderateScale(20),
            height: height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
          source={{
            uri: `file://${dirs}/${item.Thumbnail}.jpeg`,
          }}>
          <View style={styles.overlay} />
          <Icon
            name="controller-play"
            type="entypo"
            size={moderateScale(50)}
            color="white"
            onPress={() => {
              setVideoUrl(`file://${dirs}/${item.video_file}.mp4`);
              toggleOverlay();
            }}
          />
        </ImageBackground>
        <Text
          style={{
            color: '#707070',
            fontSize: moderateScale(15),
            marginTop: moderateScale(10),
            marginBottom: moderateScale(5),
            width: width / 3 - moderateScale(20),
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFaqsItem = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setOpenedIndex(index + 1);
          setShowDetail(openedIndex === index + 1 ? !showDetail : true);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: moderateScale(20),
          }}>
          <Text style={{fontSize: moderateScale(18)}}>{item.title}</Text>
          <Icon
            size={moderateScale(20)}
            name={
              openedIndex === index + 1 && showDetail
                ? 'remove-sharp'
                : 'ios-add-sharp'
            }
            type="ionicon"
          />
        </View>

        {index + 1 === openedIndex && showDetail ? (
          <Text
            style={{
              margin: moderateScale(20),
              fontSize: moderateScale(15),
              color: '#707070',
            }}>
            {item.content}
          </Text>
        ) : null}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'lightgrey',
          }}
        />
      </TouchableWithoutFeedback>
    );
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
          width: width / 8,
          padding: moderateScale(10),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(15),
          }}>
          Help
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}>
        <View
          style={{
            backgroundColor: 'white',
            marginTop: moderateScale(10),
            padding: moderateScale(10),
          }}>
          <Text
            style={{
              fontSize: moderateScale(25),
              marginBottom: moderateScale(10),
            }}>
            Tutorials
          </Text>
          <FlatList
            data={sortedTutorialsArray}
            renderItem={renderTutorialItem}
            keyExtractor={(item) => JSON.stringify(item._id)}
            numColumns={3}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: moderateScale(30),
            backgroundColor: 'white',
          }}>
          <View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 'lightgrey',
                padding: moderateScale(20),
              }}>
              <Text style={{fontSize: moderateScale(25)}}>FAQs</Text>
            </View>
            <FlatList
              data={sortedFaqsArray}
              renderItem={renderFaqsItem}
              keyExtractor={(item) => JSON.stringify(item._id)}
            />
          </View>
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
          <VideoComponent
            videoUrl={videoUrl}
            videoHeight={height}
            videoWidth={width - moderateScale(100)}
            onBack={toggleOverlay}
          />
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
