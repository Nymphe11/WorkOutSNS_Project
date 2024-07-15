import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {API} from '../apis';

const Splash = ({navigation}) => {
  const myInfoApi = async () => {
    const res = await API.get('/accounts/info');
    console.log(res.status);
    if (res.status == 200) {
      navigation.replace('MainTab');
    } else {
      navigation.replace('Login');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      myInfoApi();
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Splash</Text>
    </View>
  );
};

export default Splash;
