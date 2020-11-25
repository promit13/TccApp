/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {moderateScale} from 'react-native-size-matters';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';
import {ZoneMenu} from '../components/ZoneMenu';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {usePrevious} from '../components/userPrevious';
import {width, height, dirs, platform} from '../config/utils';

let campaignsFiltered = [];
export default function CampaignTest(props) {
  const {id} = props.route.params;
  const [zoneId, setZoneId] = useState(id);
  const [zoneTitle, setZoneTitle] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [zoneVisible, setZoneVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const previousId = usePrevious(id);

  const testImage = require('../res/iphone.png');

  // console.log('PREV', previousId, id);

  const {zones, campaigns} = useDatas();

  useEffect(() => {
    if (previousId !== id) {
      setZoneId(id);
    }
    campaignsFiltered = _.without(
      _.map(campaigns, function (item) {
        if (JSON.stringify(item.zone) === zoneId) return item;
      }),
      undefined,
    );
    const sortedCampaigns = campaignsFiltered.sort(
      (a, b) => a.position - b.position,
    );
    const {title} = zones.find((o) => JSON.stringify(o._id) === zoneId);

    setZoneTitle(title);
    setFilteredCampaigns(sortedCampaigns);
    setLoading(false);
  }, [campaigns, zoneId, id, previousId, zones]);

  const onImagePress = (selectedZoneId) => {
    if (zoneId === selectedZoneId) {
      setZoneVisible(false);
      return;
    }
    setZoneId(selectedZoneId);
    setZoneVisible(false);
    setLoading(true);
  };

  const renderItem = () => {
    const items = filteredCampaigns.map((item) => {
      console.log(item.Mobile_Campaign_Thumbnail);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: moderateScale(40),
          }}>
          <Image
            resizeMode="cover"
            style={{width: width / 4, height, marginTop: moderateScale(10)}}
            source={{
              uri: `file://${dirs}/${item.Mobile_Campaign_Thumbnail}.jpeg`,
              //uri: `file://${dirs}/${item.Mobile_Campaign_Thumbnail}.jpeg`,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('PanoramaTest', {
                id: item._id,
                campaigns: filteredCampaigns,
              })
            }
            style={{
              backgroundColor: 'transparent',
              height: height / 3,
              width: width / 6,
              position: 'absolute',
              zIndex: 1,
            }}
          />
        </View>
        // <TouchableOpacity
        //   key={item.position}
        //   style={{
        //     alignItems: 'center',
        //     elevation: 1,
        //   }}
        //   onPress={() =>
        //     props.navigation.navigate('PanoramaTest', {
        //       id: item._id,
        //       campaigns: filteredCampaigns,
        //     })
        //   }>
        //   <Image
        //     resizeMode="cover"
        //     style={{width: width / 4, height}}
        //     source={{
        //       uri: `file://${dirs}/${item.Mobile_Campaign_Thumbnail}.jpeg`,
        //       //uri: `file://${dirs}/${item.Mobile_Campaign_Thumbnail}.jpeg`,
        //     }}
        //   />
        // </TouchableOpacity>
      );
    });
    return items;
  };

  if (loading) return <Loading message="Loading" />;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.headerStyle}>
        <Header nav={props.navigation} />
      </View>
      <View style={styles.componentTitle}>
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
          marginTop:
            platform === 'android' ? moderateScale(50) : moderateScale(20),
          marginBottom: moderateScale(40),
          flex: 1,
        }}>
        <View style={styles.zoneTitle}>
          <Text
            style={{
              color: 'grey',
              fontSize: moderateScale(20),
            }}>
            {zoneTitle.toUpperCase()}
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}>
          {renderItem()}
        </ScrollView>
      </View>
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

const styles = StyleSheet.create({
  headerStyle: {position: 'absolute', zIndex: 2, elevation: 4},
  componentTitle: {
    marginTop: moderateScale(50),
    backgroundColor: '#BC955C',
    width: width / 4,
    padding: moderateScale(10),
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
    elevation: 4,
  },
  zoneTitle: {
    marginTop: platform === 'android' ? moderateScale(50) : moderateScale(75),
    borderColor: '#BC955C',
    borderWidth: moderateScale(3),
    backgroundColor: 'white',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(30),
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 4,
  },
});
