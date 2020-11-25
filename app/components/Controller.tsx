import React from 'react';
import {View, Slider, StyleSheet, Text} from 'react-native';
import {Icon} from 'react-native-elements';

import {width, height} from '../config/utils';

const formatTime = (time: number) => {
  //   let minutes = 0;
  //   const seconds = Math.round(timeToFormat);
  //   if (seconds > 60) {
  //     minutes = Math.floor(seconds / 60);
  //   }
  //   let remainder = seconds % 60;
  //   if (remainder < 10) {
  //     if (remainder < 0) {
  //       remainder = '00';
  //     } else {
  //       remainder = `0${remainder}`;
  //     }
  //   }
  //   const time = `${minutes} : ${remainder}`;
  //   return time;
  const minutes = time >= 60 ? Math.floor(time / 60) : 0;
  const seconds = Math.floor(time - minutes * 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
  }`;
};
export default Controller = ({
  totalLength,
  onDragSeekBar,
  seekValue,
  onSliderReleased,
  onPlay,
  paused,
  fullScreen,
  toggleFullScreen,
  muted,
  onToggleVolume,
}) => {
  return (
    <View style={styles.mainContainer}>
      <Slider
        step={1}
        minimumValue={0}
        maximumValue={totalLength}
        value={seekValue}
        minimumTrackTintColor="#0793DB"
        maximumTrackTintColor="grey"
        onValueChange={(changedValue) => onDragSeekBar(changedValue)}
        onSlidingComplete={(changedValue) => onSliderReleased(changedValue)}
        style={{width: '100%', marginTop: 10}}
      />
      <View style={[styles.controllerContainer, {paddingHorizontal: 20}]}>
        <View style={styles.controllerContainer}>
          <Icon
            name={paused ? 'play-sharp' : 'pause'}
            type="ionicon"
            color="black"
            size={60}
            onPress={onPlay}
          />
          <Text style={styles.textStyle}>{`${formatTime(
            seekValue,
          )} / ${formatTime(totalLength)}`}</Text>
        </View>
        <View style={styles.controllerContainer}>
          <Icon
            name={muted ? 'md-volume-mute' : 'volume-medium'}
            type="ionicon"
            color="black"
            size={60}
            onPress={onToggleVolume}
          />
          <Icon
            name={fullScreen ? 'fullscreen-exit' : 'fullscreen'}
            type="material-community"
            color="black"
            size={60}
            onPress={toggleFullScreen}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width / 2,
  },
  controllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    marginLeft: 20,
    fontSize: 20,
    color: 'black',
  },
});
