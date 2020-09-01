import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Controller from '../components/Controller';

const {width, height} = Dimensions.get('window');

type FormData = {
  userId: string;
  password: string;
};

class VideoPlayer extends React.Component {
  state = {
    paused: true,
    loading: true,
    fullScreen: false,
    muted: false,
    totalLength: 0,
    currentTime: 0,
    videoWidth: width / 2,
    videoHeight: height / 2,
  };
  onPlay = () => {
    this.setState({paused: !this.state.paused});
  };
  onLoad = (data) => {
    this.setState({loading: false, totalLength: data.duration});
  };
  onEnd = () => {
    this.setState({paused: true, currentTime: 0});
  };
  onProgress = (data) => {
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
    } = this.state;
    return (
      <View>
        {/* <View style={[styles.videoContainer, {width: videoWidth}]}> */}
        <Video
          source={{
            uri:
              'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
          }} // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref;
          }}
          style={{
            width: videoWidth,
            height: videoHeight,
          }}
          paused={paused}
          controls={true}
          fullscreen={fullScreen}
          muted={muted}
          progressUpdateInterval={50.0}
          playInBackground
          ignoreSilentSwitch="ignore"
          playWhenInactive
          onLoad={this.onLoad}
          onEnd={this.onEnd}
          onProgress={this.onProgress}
        />
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

export default VideoPlayer;
