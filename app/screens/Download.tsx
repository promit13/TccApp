import React from 'react';
import RNBackgroundDownloader, {
  TaskInfo,
} from 'react-native-background-downloader';
import {Button, View} from 'react-native';

let task: TaskInfo;
console.log(
  'Path',
  `${RNBackgroundDownloader.directories.documents}/video.mp4`,
);
class Download extends React.Component {
  startDownload = () => {
    task = RNBackgroundDownloader.download({
      id: 'Video',
      url:
        'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      destination: `${RNBackgroundDownloader.directories.documents}/video.mp4`,
    })
      .begin((expectedBytes) => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress((percent) => {
        console.log(`Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        console.log('Download is done!');
      })
      .error((error) => {
        console.log('Download canceled due to error: ', error);
      });
  };

  pauseDownload = () => {
    task.pause();
  };

  resumeDownload = () => {
    task.resume();
  };

  stopDownload = () => {
    task.stop();
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={this.startDownload} title="Start" color="#841584" />
        <Button onPress={this.pauseDownload} title="Pause" color="#841584" />
        <Button onPress={this.resumeDownload} title="Resume" color="#841584" />
        <Button onPress={this.stopDownload} title="Stop" color="#841584" />
      </View>
    );
  }
}

export default Download;
