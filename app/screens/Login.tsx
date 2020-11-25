/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Icon, Button} from 'react-native-elements';
import {useAuth} from '../Providers/AuthProvider';
import {Loading} from '../components/Loading';

import {width, height, platform} from '../config/utils';

type FormData = {
  userId: string;
  password: string;
};

export default function Login({navigation}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, errors} = useForm();

  const {logIn} = useAuth();

  useEffect(() => {
    if (platform === 'android') {
      async function requestStorageAccessPermission() {
        try {
          await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);
        } catch (err) {
          console.warn(err);
        }
      }
      requestStorageAccessPermission();
    }
  }, []);

  const onSubmit = async (data) => {
    const {userId, password} = data;
    try {
      setLoading(true);
      await logIn(userId, password);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  if (loading) return <Loading message="loading" />;
  return (
    <KeyboardAvoidingView
      behavior={platform === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Image
          style={styles.imageStyle}
          source={require('../res/logo.png')}
          resizeMode="contain"
        />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.inputViewStyle}>
              <Icon
                name="user"
                type="antdesign"
                color="grey"
                size={moderateScale(15)}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="Email address"
                placeholderTextColor="grey"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                autoCapitalize="none"
              />
            </View>
          )}
          name="userId"
          rules={{
            required: 'Email required',
          }}
          defaultValue=""
        />
        {errors.userId && (
          <Text style={styles.errorTextStyle}>{errors.userId.message}</Text>
        )}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <View style={styles.inputViewStyle}>
              <Icon
                name="lock"
                type="entypo"
                color="grey"
                size={moderateScale(15)}
              />
              <TextInput
                secureTextEntry
                style={styles.textInputStyle}
                placeholder="Password"
                placeholderTextColor="grey"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                autoCapitalize="none"
              />
            </View>
          )}
          rules={{
            required: 'Password required',
            validate: (value) =>
              value.length >= 6
                ? true
                : 'Password must be at least 6 characters',
          }}
          name="password"
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.errorTextStyle}>{errors.password.message}</Text>
        )}
        {error ? (
          <Text style={styles.errorTextStyle}>Invalid user ID or password</Text>
        ) : null}
        <Button
          buttonStyle={styles.buttonStyle}
          title="LOGIN"
          onPress={handleSubmit(onSubmit)}
          titleStyle={styles.buttonTitleStyle}
        />
        {/* <View style={{flexDirection: 'row', marginTop: moderateScale(20)}}>
          <Text style={styles.textStyle}>
            Don't have valid login credentials?
          </Text>
          <TouchableOpacity>
            <Text style={styles.textStyle}> Click here</Text>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginLeft: 1,
                width: moderateScale(50),
                height: 1,
                backgroundColor: 'grey',
              }}
            />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputViewStyle: {
    marginVertical: moderateScale(10),
    flexDirection: 'row',
    width: width / 3,
    height: platform === 'android' ? moderateScale(50) : moderateScale(40),
    padding: moderateScale(10),
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  textInputStyle: {
    marginLeft: moderateScale(5),
    fontSize: moderateScale(12),
    width: width / 4,
  },
  buttonStyle: {
    marginTop: moderateScale(5),
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(10),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonTitleStyle: {
    color: 'grey',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: moderateScale(10),
    color: 'grey',
  },
  imageStyle: {
    height: moderateScale(50),
    width: width / 3,
    resizeMode: 'contain',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: moderateScale(10),
  },
});
