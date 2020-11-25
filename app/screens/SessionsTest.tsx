import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, Overlay} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import _ from 'lodash';
import {Icon} from 'react-native-elements';
import {moderateScale} from 'react-native-size-matters';
import moment from 'moment';
import {useDatas} from '../Providers/DataProviders';
import {SendCampaignDialog} from '../components/SendCampaignDialog';

let objectArray = [];

export default function SessionsTest({data}) {
  const {favourites, campaigns, netInfo} = useDatas();

  const [index, setIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const renderScrollView = () => {
    return data.map((item, i) => {
      const favouritedArray = _.filter(favourites, function (o) {
        return JSON.stringify(o.session) == JSON.stringify(item._id);
      });
      const formattedDate = moment(item.createdAt).format('DD/MM/YYYY');
      const formattedTime = moment(item.createdAt).format('hh:mm');
      return (
        <View key={JSON.stringify(item._id)}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              setIndex(i);
              setShowDetail(!showDetail);
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={
                  i === index && showDetail
                    ? 'chevron-small-down'
                    : 'chevron-small-right'
                }
                type="entypo"
              />
              <Text
                style={[
                  styles.textStyle,
                  {
                    marginLeft: moderateScale(1),
                  },
                ]}>
                {item.title}
              </Text>
            </View>
            <Text style={styles.textStyle}>{formattedDate}</Text>
            <Text style={[styles.textStyle, {width: moderateScale(55)}]}>
              {formattedTime}
            </Text>
            {/* <Text style={{marginLeft: width / 6}}>
              {item.completedSessions}
            </Text> */}
            <Text style={styles.textStyle}>{favouritedArray.length}</Text>
          </TouchableOpacity>
          {i === index && showDetail ? (
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'lightgrey',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: moderateScale(10),
                }}>
                <Text style={{fontSize: moderateScale(10), fontWeight: 'bold'}}>
                  Campaigns Favourited
                </Text>
                {favouritedArray.length !== 0 && (
                  <Button
                    containerStyle={{
                      width: moderateScale(75),
                    }}
                    buttonStyle={{
                      width: moderateScale(75),
                      backgroundColor: 'grey',
                      alignSelf: 'flex-end',
                    }}
                    title="Send"
                    onPress={() => {
                      if (!netInfo) {
                        console.log('NETINFO', netInfo);
                        Alert.alert('No internet connection');
                        return;
                      }
                      objectArray = [];
                      favouritedArray.map((favourite) => {
                        const obj = campaigns.find(
                          (o) =>
                            JSON.stringify(o._id) ===
                            JSON.stringify(favourite.campaign),
                        );

                        objectArray.push(obj);
                      });
                      toggleOverlay();
                    }}
                  />
                )}
              </View>
              <View style={{padding: 10}}>
                {favouritedArray.map((favourite, index) => {
                  const obj = campaigns.find(
                    (o) =>
                      JSON.stringify(o._id) ===
                      JSON.stringify(favourite.campaign),
                  );
                  return (
                    <Text
                      key={index}
                      style={{
                        marginVertical: 10,
                        fontSize: moderateScale(8),
                      }}>
                      {obj.title}
                    </Text>
                  );
                })}
              </View>
            </View>
          ) : null}
          <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
            <SendCampaignDialog
              toggleOverlay={toggleOverlay}
              favouritedArray={objectArray}
              sessionId={item._id}
            />
          </Overlay>
        </View>
      );
    });
  };

  return <View style={{flex: 1}}>{renderScrollView()}</View>;
}

const styles = StyleSheet.create({
  touchableStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: moderateScale(10),
    justifyContent: 'space-between',
  },
  textStyle: {
    width: moderateScale(50),
    marginTop: moderateScale(2),
  },
});
