import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import _ from 'lodash';
import Header from '../components/Header';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';

const {height, width} = Dimensions.get('window');

let filteredCampaigns = [];

export default function CampaignSingle(props) {
  const [loading, setLoading] = useState(true);
  const [zone, setZone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const {selectedCampaign} = props.route.params;
  const {zones, campaigns, files} = useDatas();

  useEffect(() => {
    filteredCampaigns = _.without(
      _.map(campaigns, function (item) {
        if (JSON.stringify(item.zone) === JSON.stringify(selectedCampaign.zone))
          return item;
      }),
      undefined,
    );
    // const {url, ext} = files.find(
    //   (o) =>
    //     JSON.stringify(o._id) === JSON.stringify(selectedCampaign.thumbnail),
    // );
    const {title} = zones.find(
      (o) => JSON.stringify(o._id) === JSON.stringify(selectedCampaign.zone),
    );
    setZone(title);
    // for offline
    setImageUrl(`file://${dirs}/${selectedCampaign.thumbnail}.jpeg`);
    // for online
    // setImageUrl(`https://admin.tcccampaignportal.com${url}`);
    setLoading(false);
  }, [
    campaigns,
    zones,
    files,
    selectedCampaign.thumbnail,
    selectedCampaign.zone,
  ]);

  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <View style={{position: 'absolute', zIndex: 1}}>
        <Header nav={props.navigation} />
      </View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('PanoramaTest', {
            id: JSON.stringify(selectedCampaign._id),
            // id: selectedCampaign._id,
            campaigns: filteredCampaigns,
          })
        }
        style={{
          backgroundColor: 'white',
          width: width / 4,
          marginTop: 120,
          paddingBottom: 40,
        }}>
        <Image
          style={{
            height: height / 2,
            width: width / 4,
            resizeMode: 'contain',
          }}
          source={{uri: imageUrl}}
        />
        <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 20}}>
          {zone}
        </Text>
        <Text style={{fontSize: 30, alignSelf: 'center', marginTop: 20}}>
          {selectedCampaign.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
