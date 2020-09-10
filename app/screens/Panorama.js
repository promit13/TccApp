import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {PanoramaView} from 'react-native-panorama-view';
import RNBackgroundDownloader from 'react-native-background-downloader';

const Panorama = () => (
  <View style={styles.container}>
    <PanoramaView
      style={{flex: 1}}
      dimensions={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
      }}
      inputType="mono"
      //imageUrl={`${RNBackgroundDownloader.directories.documents}/panorama.jpg`}
      imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
    />
    <View
      style={{
        width: 50,
        height: 50,
        backgroundColor: 'red',
        position: 'absolute',
      }}
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
