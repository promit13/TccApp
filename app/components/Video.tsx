import React from 'react';
import VideoPlayer from 'react-native-video-controls';

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
