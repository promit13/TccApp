import React from 'react';
import {Dimensions} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import RNBackgroundDownloader from 'react-native-background-downloader';

const {width, height} = Dimensions.get('window');

const introVideo = require('../res/welcome.mp4');
const demoVideo = require('../res/demo.mp4');

export function VideoComponent({
  videoUrl,
  videoWidth,
  videoHeight,
  onBack,

  paused,
}) {
  console.log('VIDEO URL', videoUrl);
  return (
    <VideoPlayer
      style={{
        width: videoWidth,
        height: videoHeight,
      }}
      // source={introVideo}
      onBack={onBack}
      paused={paused}
      source={{
        uri: videoUrl,
      }}
    />
  );
}

export default VideoComponent;
