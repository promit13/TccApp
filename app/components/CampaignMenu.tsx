import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {dirs, width, height} from '../config/utils';

export function CampaignMenu(props) {
  const renderItem = ({item, index}) => {
    const campaignUrl = `file://${dirs}/${item.thumbnail}.jpeg`;
    return (
      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          props.navigation
            ? props.navigation.navigate('Panorama', {
                id: item._id,
                campaigns: props.campaigns,
              })
            : props.onPress(item._id);
        }}>
        <Image
          style={styles.imageStyle}
          source={{uri: campaignUrl}}
          resizeMode="contain"
        />
        {JSON.stringify(item._id) === JSON.stringify(props.campaignId) && (
          <View style={styles.overlay} />
        )}
        <Text style={styles.textStyle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.campaigns}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableStyle: {
    alignItems: 'center',
    marginLeft: moderateScale(5),
    height: height / 3,
  },
  imageStyle: {
    width: width / 6,
    height: height / 4,
  },
  textStyle: {
    color: '#707070',
    fontSize: moderateScale(15),
    width: width / 6,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
