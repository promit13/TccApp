/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('window');

type FormData = {
  userId: string;
  password: string;
};

export default function Login({navigation}) {
  console.log('tes');
  const [error, setError] = useState(false);
  const {control, handleSubmit, errors} = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const {userId, password} = data;
    await AsyncStorage.setItem('login', 'loggedIn');
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <Image style={styles.imageStyle} source={require('../res/logo.png')} />
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <View style={styles.inputViewStyle}>
            <Icon name="user" type="antdesign" color="grey" size={40} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="User Id"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </View>
        )}
        name="userId"
        rules={{
          required: 'User Id required',
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
            <Icon name="lock" type="entypo" color="grey" size={40} />
            <TextInput
              secureTextEntry
              style={styles.textInputStyle}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </View>
        )}
        rules={{
          required: 'Password required',
          validate: (value) =>
            value.length >= 6 ? true : 'Password must be at least 6 characters',
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
      <View style={{flexDirection: 'row', marginTop: 40}}>
        <Text style={styles.textStyle}>
          Don't have valid login credentials?
        </Text>
        <TouchableOpacity>
          <Text style={styles.textStyle}> Click here</Text>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginLeft: 1,
              width: 90,
              height: 1,
              backgroundColor: 'grey',
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginVertical: 20,
    flexDirection: 'row',
    width: width / 3,
    height: 80,
    padding: 20,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  textInputStyle: {
    marginLeft: 10,
    fontSize: 25,
    width: width / 4,
  },
  buttonStyle: {
    marginTop: 10,
    paddingHorizontal: 80,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonTitleStyle: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 20,
    color: 'grey',
  },
  imageStyle: {
    height: 200,
    width: width / 3,
    resizeMode: 'contain',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: 18,
  },
});
