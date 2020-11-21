import React, {useState} from 'react';
import RNBackgroundDownloader, {
  TaskInfo,
} from 'react-native-background-downloader';
import {Button, View, Text, Dimensions, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';

const {height, width} = Dimensions.get('window');
let task: TaskInfo;
let count = 0;

function Download({navigation}) {
  const [percentage, setPercentage] = useState(0);
  const {files} = useDatas();

  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  console.log(dirs);

  const download = async (index) => {
    const {_id, ext, url} = files[index];
    const exists = await RNFetchBlob.fs.exists(`${dirs}/${_id}${ext}`);
    console.log(exists);
    if (exists || ext === '.zip' || ext === '.pdf' || ext === '.qt') {
      console.log('FILE', exists);
      const downloaded = (count++ / files.length) * 100;
      setPercentage(downloaded);
      if (files.length === index + 1) {
        return;
      }
      download(index + 1);
      return;
    }
    console.log(_id);
    console.log(`https://admin.tcccampaignportal.com${url}`);
    RNFetchBlob.config({
      path: `${dirs}/${_id}${ext}`,
    })
      .fetch('GET', `https://admin.tcccampaignportal.com${url}`, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        const downloaded = (count++ / files.length) * 100;
        setPercentage(downloaded);
        console.log('Download is done!', files.length, index + 1);
        if (files.length === index + 1) {
          return;
        }
        download(index + 1);
      })
      .catch((err) => {
        RNFetchBlob.fs.unlink(`${dirs}/${_id}${ext}`);
        Alert.alert(err);
        setPercentage(0);
      });

    // task = RNBackgroundDownloader.download({
    //   id: JSON.stringify(_id),
    //   url: `https://admin.tcccampaignportal.com${url}`,
    //   destination: `${RNBackgroundDownloader.directories.documents}/${_id}${ext}`,
    // })
    //   .begin((expectedBytes) => {
    //     console.log(`Going to download ${expectedBytes} bytes!`);
    //   })
    //   .progress((percent) => {
    //     console.log(`Downloaded: ${percent * 100}%`);
    //   })
    //   .done(() => {
    //     const downloaded = (count++ / files.length) * 100;
    //     setPercentage(downloaded);
    //     console.log('Download is done!', files.length, index + 1);
    //     if (files.length === index + 1) {
    //       return;
    //     }
    //     download(index + 1);
    //   })
    //   .error((error) => {
    //     console.log('Download canceled due to error: ', error);
    //   });
  };

  // const startDownload = () => {
  //   files.map(async (file) => {
  //     const {_id, ext, url} = file;
  //     const exists = await RNFetchBlob.fs.exists(`${dirs}/${_id}${ext}`);
  //     console.log(exists);
  //     if (exists || ext === '.zip' || ext === '.pdf' || ext === '.qt') {
  //       console.log('FILE', exists);
  //       const downloaded = (count++ / files.length) * 100;
  //       setPercentage(downloaded);
  //       return;
  //     }
  //     console.log(_id);
  //     console.log(`https://admin.tcccampaignportal.com${url}`);
  //     task = RNBackgroundDownloader.download({
  //       id: JSON.stringify(_id),
  //       url: `https://admin.tcccampaignportal.com${url}`,
  //       destination: `${RNBackgroundDownloader.directories.documents}/${_id}${ext}`,
  //     })
  //       .begin((expectedBytes) => {
  //         console.log(`Going to download ${expectedBytes} bytes!`);
  //       })
  //       .progress((percent) => {
  //         console.log(`Downloaded: ${percent * 100}%`);
  //       })
  //       .done(() => {
  //         const downloaded = (count++ / files.length) * 100;
  //         setPercentage(downloaded);
  //         console.log('Download is done!');
  //       })
  //       .error((error) => {
  //         console.log('Download canceled due to error: ', error);
  //       });
  //   });
  // };

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Progress.Bar
          progress={percentage / 100}
          width={width - 200}
          color="green"
        />
        {percentage.toFixed(0) === '100' ? (
          <Icon
            name="md-checkmark-done-circle"
            type="ionicon"
            size={60}
            iconStyle={{color: 'green'}}
          />
        ) : (
          <Text style={{marginTop: 10, fontSize: 20}}>
            {`${percentage.toFixed(0)}%`}
          </Text>
        )}
        <Button onPress={() => download(0)} title="Start" color="#841584" />
        <Button onPress={pauseDownload} title="Pause" color="#841584" />
        <Button onPress={resumeDownload} title="Resume" color="#841584" />
        <Button onPress={stopDownload} title="Stop" color="#841584" />
      </View>
    </View>
  );
}

export default Download;
