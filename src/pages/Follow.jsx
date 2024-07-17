import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BasicHeader from '../components/BasicHeader';

const Tab = createMaterialTopTabNavigator();

const followerTab = () => {
  return (
    <View>
      <Text>팔로워</Text>
    </View>
  );
};
const followingTab = () => {
  return (
    <View>
      <Text>팔로잉</Text>
    </View>
  );
};

const Follow = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'Follow'} />
      </View>
      <Tab.Navigator>
        <Tab.Screen name="followerTab" component={followerTab} />
        <Tab.Screen name="followingTab" component={followingTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Follow;
