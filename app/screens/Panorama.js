import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {PanoramaView} from 'react-native-panorama-view';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Header from '../components/Header';

const Panorama = ({navigation}) => (
  <View style={styles.container}>
    <Header nav={navigation} />
    <PanoramaView
      style={{flex: 1}}
      dimensions={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
      inputType="mono"
      imageUrl="http://reznik.lt/wp-content/uploads/2017/09/preview3000.jpg"
      //imageUrl={`${RNBackgroundDownloader.directories.documents}/panorama.jpg`}
      // imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewer: {
    height: 230,
  },
});

export default Panorama;
