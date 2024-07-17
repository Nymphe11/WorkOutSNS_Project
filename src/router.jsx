import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PagerView from 'react-native-pager-view';

import Home from './pages/Home';
import Splash from './pages/Splash';
import CustomBottomTab from './components/CustomBottomTab';
import Search from './pages/Search';
import Add from './pages/Add';
import Schedule from './pages/Schedule';
import MyPage from './pages/MyPage';
import SearchList from './pages/SearchList';
import Login from './pages/Login';
import Join from './pages/Join';
import UploadFeed from './pages/UploadFeed';
import MyFeedDetail from './pages/MyFeedDetail';
import SearchFeedDetail from './pages/SearchFeedDetail';

import BasicHeader from './components/BasicHeader';
import Follower from './pages/Follower';
import Following from './pages/Following';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

const FollowTab = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'Follow'} />

        <TopTab.Navigator>
          <TopTab.Screen name="Follower" component={Follower} />
          <TopTab.Screen name="Following" component={Following} />
        </TopTab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const SearchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchList" component={SearchList} />
      <Stack.Screen name="SearchFeedDetail" component={SearchFeedDetail} />
    </Stack.Navigator>
  );
};

const AddTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="UploadFeed" component={UploadFeed} />
    </Stack.Navigator>
  );
};
const MyPageTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="MyFeedDetail" component={MyFeedDetail} />
      <Stack.Screen name="FollowTab" component={FollowTab} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="홈" component={Home} />
      <Tab.Screen name="검색" component={SearchTab} />
      <Tab.Screen name="추가" component={AddTab} />
      <Tab.Screen name="스케쥴" component={Schedule} />
      <Tab.Screen name="마이페이지" component={MyPageTab} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Join" component={Join} />
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
