import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

type FormData = {
  userId: string;
  password: string;
};

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button
        buttonStyle={styles.buttonStyle}
        title="LOGIN"
        onPress={() => navigation.navigate('Login')}
        titleStyle={styles.buttonStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: 10,
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  textStyle: {
    fontSize: 20,
    color: 'grey',
  },
});
