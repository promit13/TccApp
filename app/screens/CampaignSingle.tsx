import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {moderateScale} from 'react-native-size-matters';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {dirs, platform, height, width} from '../config/utils';

let totalCampaigns = [];

export default function CampaignSingle(props) {
  const [loading, setLoading] = useState(true);
  const [totalFilteredCampaigns, setTotalFilteredCampaigns] = useState([]);
  const {selectedCampaign} = props.route.params;
  const {zones, campaigns, files} = useDatas();

  useEffect(() => {
    totalCampaigns = [];
    selectedCampaign.map((item) => {
      const campaign = campaigns.find(
        (o) => JSON.stringify(o._id) === JSON.stringify(item),
      );
      const {title} = zones.find(
        (o) => JSON.stringify(o._id) === JSON.stringify(campaign.zone),
      );
      // for offline
      const imageUrl = `file://${dirs}/${campaign.thumbnail}.jpeg`;
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
    props.navigation.navigate('Panorama', {
      id: campaign._id,
      campaigns: filteredCampaigns,
    });
  };

  const renderCampaigns = () => {
    return totalFilteredCampaigns.map((item, index) => {
      const {title, zoneTitle, imageUrl} = item;
      return (
        <TouchableOpacity
          key={index}
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
      <View style={{position: 'absolute', zIndex: 1, elevation: 5}}>
        <Header nav={props.navigation} />
      </View>
      <View
        style={{
          flex: 1,
          marginTop: platform === 'android' ? moderateScale(30) : 0,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderCampaigns()}
        </ScrollView>
      </View>
    </View>
  );
}
