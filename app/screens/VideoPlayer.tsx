import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import RNBackgroundDownloader, {
  TaskInfo,
} from 'react-native-background-downloader';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Controller from '../components/Controller';

const {width, height} = Dimensions.get('window');

const introVideo = require('../res/welcome.mp4');

type FormData = {
  userId: string;
  password: string;
};

class Video extends React.Component {
  state = {
    paused: true,
    loading: true,
    fullScreen: false,
    muted: false,
    totalLength: 0,
    currentTime: 0,
    videoWidth: width - 100,
    videoHeight: height - 100,
  };
  onPlay = () => {
    this.setState({paused: !this.state.paused});
  };
  onLoad = (data) => {
    console.log(data);
    this.setState({loading: false, totalLength: data.duration});
  };
  onEnd = () => {
    this.setState({paused: true, currentTime: 0});
  };
  onProgress = (data) => {
    console.log(data);
    this.setState({currentTime: data.currentTime});
  };
  onDrageSeekBar = () => {
    this.setState({paused: true});
  };
  onSliderReleased = (currentTime) => {
    this.setState({paused: false, currentTime});
    this.player.seek(currentTime);
  };

  onToggleFullScreen = () => {
    const {fullScreen} = this.state;
    this.setState({
      videoWidth: fullScreen ? width / 2 : width,
      videoHeight: fullScreen ? height / 2 : height,
      fullScreen: !fullScreen,
    });
  };

  onToggleVolume = () => {
    this.setState({muted: !this.state.muted});
  };

  render() {
    const {
      totalLength,
      currentTime,
      paused,
      fullScreen,
      videoWidth,
      videoHeight,
      muted,
      loading,
    } = this.state;
    if (loading) {
      <ActivityIndicator />;
    }
    return (
      <View>
        <VideoPlayer
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
          source={introVideo}
          onBack
          //source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        />
        {/* <View style={[styles.videoContainer, {width: videoWidth}]}> */}
        {/* <Video
          source={
            introVideo
            // {
            //   // uri: `file://${RNBackgroundDownloader.directories.documents}/${this.props.videoUrl}.mp4`,
            //   // uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            // }
          } // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }}
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
          onError={(e) => console.log(e)}
          paused={paused}
          controls={true}
          fullscreen={fullScreen}
          muted={muted}
          progressUpdateInterval={50.0}
          fullScreenOrientation="landscape"
          ignoreSilentSwitch="ignore"
          playWhenInactive
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          onProgress={this.onProgress}
        /> */}
        {/* <Controller
            totalLength={totalLength}
            seekValue={currentTime && currentTime}
            onSliderReleased={this.onSliderReleased}
            onDragSeekBar={this.onDrageSeekBar}
            onPlay={this.onPlay}
            paused={paused}
            fullScreen={fullScreen}
            muted={muted}
            toggleFullScreen={this.onToggleFullScreen}
            onToggleVolume={this.onToggleVolume}
          /> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'grey',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
  },
  videoContainer: {
    backgroundColor: 'white',
  },
  backgroundVideo: {
    height: height / 2,
    width: width / 2,
  },
});

export default Video;
