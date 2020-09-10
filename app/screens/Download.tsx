import React from 'react';
import RNBackgroundDownloader, {
  TaskInfo,
} from 'react-native-background-downloader';
import {Button, View} from 'react-native';
import Header from '../components/Header';

let task: TaskInfo;
console.log(
  'Path',
  `${RNBackgroundDownloader.directories.documents}/video.mp4`,
);
function Download({navigation}) {
  const startDownload = () => {
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

  const pauseDownload = () => {
    task.pause();
  };

  const resumeDownload = () => {
    task.resume();
  };

  const stopDownload = () => {
    task.stop();
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Header nav={navigation} />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button onPress={startDownload} title="Start" color="#841584" />
        <Button onPress={pauseDownload} title="Pause" color="#841584" />
        <Button onPress={resumeDownload} title="Resume" color="#841584" />
        <Button onPress={stopDownload} title="Stop" color="#841584" />
      </View>
    </View>
  );
}

export default Download;
