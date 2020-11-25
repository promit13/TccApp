import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import RNFetchBlob from 'rn-fetch-blob';
import {useDatas} from '../Providers/DataProviders';
import {moderateScale} from 'react-native-size-matters';
import Header from '../components/Header';
import {dirs, width, height} from '../config/utils';

let count = 0;

function Download({navigation}) {
  const [percentage, setPercentage] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const {files} = useDatas();

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
      IOSBackgroundTask: true,
      path: `${dirs}/${_id}${ext}`,
    })
      .fetch('GET', `https://admin.tcccampaignportal.com${url}`, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        const downloaded = (count++ / files.length) * 100;
        setPercentage(downloaded);
        console.log('Download is done!');
        if (files.length === index + 1) {
          setDownloading(false);
          return;
        }
        download(index + 1);
      })
      .catch((err) => {
        RNFetchBlob.fs.unlink(`${dirs}/${_id}${ext}`);
        Alert.alert(err.message);
        setDownloading(false);
        setPercentage(0);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{position: 'absolute', zIndex: 1, elevation: 1}}>
        <Header nav={navigation} />
      </View>
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
        {downloading ? null : (
          <Button
            buttonStyle={{
              borderColor: 'grey',
              borderWidth: 1,
              backgroundColor: 'transparent',
              paddingHorizontal: moderateScale(40),
              marginTop: moderateScale(10),
            }}
            onPress={() => {
              setDownloading(true);
              download(0);
            }}
            title="Sync Files"
            titleStyle={{color: 'grey'}}
          />
        )}
      </View>
    </View>
  );
}

export default Download;
