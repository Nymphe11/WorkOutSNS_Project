import {Icon} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';

const Schedule = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <Text>Schedule</Text>
        <Icon name="sad-tear" type="font-awesome-5" />
      </View>
    </SafeAreaView>
  );
};

export default Schedule;
