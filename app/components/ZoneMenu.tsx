import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {scale, moderateScale} from 'react-native-size-matters';
import {Loading} from './Loading';

const {width, height} = Dimensions.get('window');

const zoneImages = [
  require('../res/purple.gif'),
  require('../res/red.gif'),
  require('../res/brown.gif'),
  require('../res/green.gif'),
];

export function ZoneMenu({nav, onPress, zones}) {
  const [sortedZone, setSortedZone] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const zoneSorted = zones.sort((a, b) => a.Order - b.Order);
    setSortedZone(zoneSorted);
    // setLoading(false);
  }, [zones]);

  const renderZone = () => {
    const zonesImage = sortedZone.map((item, index) => {
      const {_id, title} = item;
      const id = JSON.stringify(_id);
      return (
        <TouchableOpacity
          key={id}
          style={styles.touchableStyle}
          onPress={() => {
            nav
              ? nav.navigate('CampaignTest', {
                  id,
                })
              : onPress(id);
          }}>
          <Image
            style={styles.gifImageStyle}
            source={zoneImages[index]}
            resizeMode="contain"
          />
          <Text style={styles.titleStyle}>{title}</Text>
        </TouchableOpacity>
      );
    });
    return zonesImage;
  };

  // if (loading) return <Loading message="loading" />;
  return <View style={styles.gifImageContainerStyle}>{renderZone()}</View>;
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  gifImageContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  gifImageStyle: {width: width / 4, height: moderateScale(200)},
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: moderateScale(15),
    color: '#707070',
  },
});
