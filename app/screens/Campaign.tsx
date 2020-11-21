/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {scale, moderateScale} from 'react-native-size-matters';
import RNBackgroundDownloader from 'react-native-background-downloader';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {ZoneMenu} from '../components/ZoneMenu';
import {CampaignMenu} from '../components/CampaignMenu';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {usePrevious} from '../components/userPrevious';

const {height, width} = Dimensions.get('window');

let campaignsFiltered = [];
export default function Campaign(props) {
  const {id} = props.route.params;
  const [zoneId, setZoneId] = useState(id);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [zoneVisible, setZoneVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const previousId = usePrevious(id);

  // console.log('PREV', previousId, id);

  const {zones, campaigns} = useDatas();

  useEffect(() => {
    if (previousId !== id) {
      setZoneId(id);
    }
    // const indroductionSorted = introductions.sort((a, b) => a.createdAt - b.createdAt);
    campaignsFiltered = _.without(
      _.map(campaigns, function (item) {
        if (JSON.stringify(item.zone) === zoneId) return item;
      }),
      undefined,
    );

    setFilteredCampaigns(campaignsFiltered);
    setLoading(false);
  }, [campaigns, zoneId, id, previousId]);

  const onImagePress = (i, title) => {
    if (zoneId === i) {
      setZoneVisible(false);
      return;
    }
    setZoneId(i);
    setZoneVisible(false);
    setLoading(true);
  };

  const renderItem = ({item}) => {
    // const campaignId = JSON.stringify(item._id);
    // const {ext, url} = files.find(
    //   (o) => JSON.stringify(o._id) === JSON.stringify(item.thumbnail),
    // );
    // for local
    const campaignUrl = `${RNBackgroundDownloader.directories.documents}/${item.thumbnail}.jpeg`;

    // for online
    // const campaignUrl = `https://admin.tcccampaignportal.com${url}`;
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          marginHorizontal: moderateScale(5),
          marginTop: moderateScale(10),
          width: width / 4 - moderateScale(10),
        }}
        onPress={() =>
          props.navigation.navigate('PanoramaTest', {
            id: item._id,
            campaigns: filteredCampaigns,
          })
        }>
        <Image
          resizeMode="contain"
          style={{width: width / 4 - moderateScale(10), height: height / 2}}
          source={{uri: campaignUrl}}
        />
        <Text
          style={{
            color: '#707070',
            fontSize: moderateScale(15),
            width: width / 6,
            textAlign: 'center',
            marginTop: moderateScale(5),
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  // console.log('FC', filteredCampaigns);

  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <View
        style={{
          marginTop: moderateScale(50),
          backgroundColor: '#BC955C',
          width: width / 4,
          padding: moderateScale(10),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(15),
          }}>
          Campaign Gallery
        </Text>
      </View>
      <View
        style={{
          marginTop: moderateScale(20),
          marginBottom: moderateScale(40),
          flex: 1,
        }}>
        <FlatList
          data={filteredCampaigns}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={4}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* <CampaignMenu
        campaigns={filteredCampaigns}
        navigation={props.navigation}
      /> */}
      <View
        style={{
          backgroundColor: 'white',
          width,
          paddingVertical: moderateScale(5),
          position: 'absolute',
          bottom: moderateScale(5),
        }}>
        <Icon
          name="chevron-thin-up"
          type="entypo"
          size={moderateScale(20)}
          iconStyle={{color: 'black', marginRight: moderateScale(20)}}
          onPress={() => setZoneVisible(true)}
        />
      </View>
      <Animatable.View
        animation={zoneVisible ? 'slideInUp' : 'slideOutDown'}
        style={{
          position: 'absolute',
          bottom: moderateScale(10),
          width,
          backgroundColor: 'white',
        }}
        useNativeDriver={true}>
        <View
          style={{
            backgroundColor: 'white',
            width,
          }}>
          <Icon
            name="chevron-thin-down"
            type="entypo"
            size={moderateScale(20)}
            iconStyle={{color: 'black', marginRight: moderateScale(20)}}
            onPress={() => setZoneVisible(false)}
          />
        </View>
        <ZoneMenu nav={null} zones={zones} onPress={(i) => onImagePress(i)} />
      </Animatable.View>
    </View>
  );
}
