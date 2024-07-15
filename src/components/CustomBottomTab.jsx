import {Icon} from '@rneui/themed';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

const CustomBottomTab = ({state, navigation, insets, descriptors}) => {
  return (
    <View style={[styles.BottomTabBarWrapper]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const iconFlag = bool => {
          switch (label) {
            case '홈':
              return bool ? (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="home"
                  type="ionicon"
                />
              ) : (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="home-outline"
                  type="ionicon"
                />
              );
            case '검색':
              return bool ? (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="search"
                  type="ionicon"
                />
              ) : (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="search-outline"
                  type="ionicon"
                />
              );
            case '추가':
              return (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="add-circle-outline"
                  type="ionicon"
                />
              );
            case '스케쥴':
              return bool ? (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="calendar"
                  type="ionicon"
                />
              ) : (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="calendar-outline"
                  type="ionicon"
                />
              );
            default:
              return bool ? (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="person"
                  type="ionicon"
                />
              ) : (
                <Icon
                  size={40}
                  style={{width: 40, height: 40}}
                  name="person-outline"
                  type="ionicon"
                />
              );
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{flex: 1, alignItems: 'center'}}>
            {iconFlag(isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  BottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#EEE',
    backgroundColor: '#fff',
    paddingVertical: 10,
    zIndex: 10,
  },
});

export default CustomBottomTab;
