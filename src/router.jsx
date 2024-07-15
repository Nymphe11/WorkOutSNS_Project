import React from 'react';
import {View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = props => <CustomBottomTab {...props} />;

const SearchTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchList" component={SearchList} />
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
      <Tab.Screen name="추가" component={Add} />
      <Tab.Screen name="스케쥴" component={Schedule} />
      <Tab.Screen name="마이페이지" component={MyPage} />
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
