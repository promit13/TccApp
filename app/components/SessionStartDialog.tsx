import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {moderateScale} from 'react-native-size-matters';
import {Button} from 'react-native-elements';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from './Loading';

import {width, height} from '../config/utils';

export function SessionStartDialog({toggleOverlay}) {
  const [loading, setLoading] = useState(false);
  const {createSession, sessionId, endSession} = useDatas();
  const {control, handleSubmit, errors} = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      sessionId === null ? createSession(data.sessionName) : endSession();
      toggleOverlay();
    }, 500);
  };
  if (loading)
    return (
      <View style={[styles.container, {height: height / 4}]}>
        <Loading
          message={sessionId ? 'Ending session' : 'Starting session'}
          showMessage={true}
        />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={{fontSize: moderateScale(20)}}>
        {sessionId === null ? 'Present to Client' : 'End Session'}
      </Text>
      {sessionId === null ? (
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter nickname"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={(session) => onChange(session)}
              value={value}
            />
          )}
          name="sessionName"
          rules={{
            required: 'Session name required',
          }}
          defaultValue=""
        />
      ) : (
        <Text style={{fontSize: moderateScale(15), color: 'grey'}}>
          Are you sure you want to complete this session?
        </Text>
      )}
      {errors.sessionName && (
        <Text style={styles.errorTextStyle}>{errors.sessionName.message}</Text>
      )}
      <View style={{flexDirection: 'row', marginTop: moderateScale(10)}}>
        <Button
          buttonStyle={[
            styles.buttonStyle,
            {backgroundColor: '#BC955C', borderWidth: 0},
          ]}
          title={sessionId === null ? 'Start' : 'End'}
          onPress={handleSubmit(onSubmit)}
          titleStyle={[styles.buttonTitleStyle, {color: 'white'}]}
        />
        <Button
          buttonStyle={[styles.buttonStyle, {marginLeft: moderateScale(20)}]}
          title="Cancel"
          onPress={toggleOverlay}
          titleStyle={styles.buttonTitleStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 2 + moderateScale(50),
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: moderateScale(10),
  },
  textInputStyle: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(12),
    width: width / 2,
    padding: moderateScale(10),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  errorTextStyle: {
    color: 'red',
    fontSize: moderateScale(12),
  },
  buttonStyle: {
    marginTop: moderateScale(5),
    paddingHorizontal: moderateScale(40),
    paddingVertical: moderateScale(10),
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  buttonTitleStyle: {
    color: 'grey',
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
});
