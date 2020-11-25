import {Dimensions, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const dirs = RNFetchBlob.fs.dirs.DocumentDir;
export const platform = Platform.OS;
export const {width, height} = Dimensions.get('window');
