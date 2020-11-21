import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import RNBackgroundDownloader from 'react-native-background-downloader';
import {scale, moderateScale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {ZoneMenu} from '../components/ZoneMenu';
import {CampaignMenu} from '../components/CampaignMenu';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {DrawerItem} from '@react-navigation/drawer';
import {TitleBar} from '../components/TitleBar';

const {height, width} = Dimensions.get('window');

const data = [
  {image: 'sun', title: 'Fresh Take', id: 1},
  {image: 'sun', title: 'Love My Garden Chef', id: 2},
  {image: 'sun', title: 'Nava', id: 3},
  {image: 'sun', title: 'Zyliss', id: 4},
  {image: 'sun', title: 'Guzzini Venice', id: 5},
  {image: 'sun', title: 'Kappa Active Life', id: 6},
  {image: 'sun', title: 'Nerf', id: 7},
];

let totalCampaigns = [];

export default function CampaignSingleTest(props) {
  const [loading, setLoading] = useState(true);
  const [totalFilteredCampaigns, setTotalFilteredCampaigns] = useState([]);
  // const [imageUrl, setImageUrl] = useState('');
  const {selectedCampaign} = props.route.params;
  const {zones, campaigns, files} = useDatas();

  useEffect(() => {
    totalCampaigns = [];
    selectedCampaign.map((item) => {
      const campaign = campaigns.find(
        (o) => JSON.stringify(o._id) === JSON.stringify(item),
      );
      // const {url, ext} = files.find(
      //   (o) => JSON.stringify(o._id) === JSON.stringify(campaign.thumbnail),
      // );
      const {title} = zones.find(
        (o) => JSON.stringify(o._id) === JSON.stringify(campaign.zone),
      );
      // for offline
      const imageUrl = `${RNBackgroundDownloader.directories.documents}/${campaign.thumbnail}.jpeg`;
      // for online
      //const imageUrl = `https://admin.tcccampaignportal.com${url}`;

      totalCampaigns.push(_.extend({zoneTitle: title, imageUrl}, campaign));
    });
    setTotalFilteredCampaigns(totalCampaigns);
    setLoading(false);
  }, [selectedCampaign, campaigns, files, zones]);

  const onCampaignClick = (campaign) => {
    const filteredCampaigns = _.without(
      _.map(campaigns, function (item) {
        if (JSON.stringify(item.zone) === JSON.stringify(campaign.zone))
          return item;
      }),
      undefined,
    );
    props.navigation.navigate('PanoramaTest', {
      id: campaign._id,
      campaigns: filteredCampaigns,
    });
  };

  const renderCampaigns = () => {
    return totalFilteredCampaigns.map((item, index) => {
      const {title, zoneTitle, imageUrl} = item;
      return (
        <TouchableOpacity
          onPress={() => onCampaignClick(item)}
          style={{
            width: width / 4,
            height: height / 2,
            marginTop: moderateScale(50),
            marginLeft: index === 0 ? 0 : moderateScale(20),
          }}>
          <Image
            style={{
              height: height / 2,
              width: width / 4,
              resizeMode: 'contain',
            }}
            source={{uri: imageUrl}}
          />
          <View
            style={{
              marginTop: moderateScale(-10),
              backgroundColor: 'white',
              paddingVertical: moderateScale(20),
            }}>
            <Text
              style={{
                fontSize: moderateScale(12),
                alignSelf: 'center',
                marginTop: moderateScale(10),
              }}>
              {zoneTitle}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(15),
                alignSelf: 'center',
                marginTop: moderateScale(10),
              }}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        flex: 1,
        padding: moderateScale(15),
      }}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {renderCampaigns()}
      </ScrollView>
    </View>
  );
}
