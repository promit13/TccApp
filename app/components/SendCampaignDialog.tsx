import React, {useState} from 'react';
import {ObjectId} from 'bson';
// import emailJs from 'emailjs';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {moderateScale} from 'react-native-size-matters';
import {Button, CheckBox} from 'react-native-elements';
import {useDatas} from '../Providers/DataProviders';
import {Loading} from '../components/Loading';
import {
  emailJsUserId,
  emailJsServiceId,
  emailJsTemplateId,
  client,
} from '../config/emailJsClient';

const {width, height} = Dimensions.get('window');

let campgainIds = [];
let campaignIdsString = [];

export function SendCampaignDialog({
  toggleOverlay,
  favouritedArray,
  sessionId,
}) {
  const {createDownloads} = useDatas();
  const {control, handleSubmit, errors} = useForm();

  const [loading, setLoading] = useState(false);

  const [campOne, setCampOne] = useState(false);
  const [campTwo, setCampTwo] = useState(false);
  const [campThree, setCampThree] = useState(false);
  const [campFour, setCampFour] = useState(false);
  const [campFive, setCampFive] = useState(false);
  const [campSix, setCampSix] = useState(false);
  const [campSeven, setCampSeven] = useState(false);
  const [campEight, setCampEight] = useState(false);
  const [campNine, setCampNine] = useState(false);
  const [campTen, setCampTen] = useState(false);

  const stateArray = [
    {state: campOne, stateFunc: setCampOne},
    {state: campTwo, stateFunc: setCampTwo},
    {state: campThree, stateFunc: setCampThree},
    {state: campFour, stateFunc: setCampFour},
    {state: campFive, stateFunc: setCampFive},
    {state: campSix, stateFunc: setCampSix},
    {state: campSeven, stateFunc: setCampSeven},
    {state: campEight, stateFunc: setCampEight},
    {state: campNine, stateFunc: setCampNine},
    {state: campTen, stateFunc: setCampTen},
  ];

  const renderCampaigns = () => {
    const items = favouritedArray.map((favourite, index) => {
      return (
        <CheckBox
          title={favourite.title}
          textStyle={{fontSize: moderateScale(10), color: 'grey'}}
          checked={stateArray[index].state}
          containerStyle={{
            width: moderateScale(150),
            backgroundColor: 'white',
            borderColor: 'white',
          }}
          onPress={() => {
            stateArray[index].stateFunc(!stateArray[index].state);
            if (!stateArray[index].state) {
              campgainIds.push(favourite._id);
              campaignIdsString.push(JSON.stringify(favourite._id));
            } else {
              const i = campaignIdsString.indexOf(
                JSON.stringify(favourite._id),
              );
              console.log();
              campgainIds.splice(i, 1);
            }
          }}
        />
      );
    });
    return items;
  };

  console.log('CAMPIDS', campgainIds);

  const onSubmit = (data) => {
    setLoading(true);
    const password =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const downloadId = new ObjectId();
    const downloadLink = `https://tcccampaignportal.com/downloads/${downloadId}`;
    createDownloads(
      downloadId,
      campgainIds,
      data.email,
      JSON.stringify(sessionId),
      password,
    );
    toggleOverlay();
    try {
      // emailJs
      //   .sendForm(
      //     emailJsServiceId,
      //     emailJsTemplateId,
      //     {
      //       to: data.email,
      //       to_name: 'tester',
      //       password,
      //       download: downloadLink,
      //     },
      //     emailJsUserId,
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     createDownloads(
      //       downloadId,
      //       campgainIds,
      //       data.email,
      //       JSON.stringify(sessionId),
      //       password,
      //     );
      //     toggleOverlay();
      //     setLoading(false);
      //   });
    } catch (e) {
      setLoading(false);
      console.log('error', e);
    }
  };

  if (loading) return <Loading message="loading" />;
  return (
    <View style={styles.container}>
      <Text style={{fontSize: moderateScale(20)}}>Send campaign assets</Text>
      {renderCampaigns()}
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email address"
            onBlur={onBlur}
            onChangeText={(session) => onChange(session)}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        name="email"
        rules={{
          required: 'Email required',
        }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.errorTextStyle}>{errors.email.message}</Text>
      )}
      <Button
        containerStyle={{width: moderateScale(50), alignSelf: 'flex-end'}}
        buttonStyle={styles.buttonStyle}
        title="Send"
        onPress={handleSubmit(onSubmit)}
        titleStyle={[styles.buttonTitleStyle, {color: 'grey'}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width - 200,
    padding: moderateScale(20),
  },
  textInputStyle: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(12),
    width: width - 250,
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
    marginTop: moderateScale(10),
    backgroundColor: 'lightgrey',
    borderRadius: moderateScale(2),
    width: moderateScale(50),
  },
  buttonTitleStyle: {
    color: 'grey',
    fontSize: moderateScale(10),
  },
});
