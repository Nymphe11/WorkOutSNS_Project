import React, {useCallback, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {API} from '../apis';

const MyFeedModal = ({isVisible, setIsVisible, myFeedDetailRes}) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const navigation = useNavigation();

  const deleteMyFeedApi = async () => {
    const res = await API.delete(`/feed/${myFeedDetailRes.data.result.id}`);
    console.log(res);
  };

  const logOutPress = () => {
    deleteMyFeedApi();
    navigation.replace('MyPage');
  };

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={300}
      backdropColor="#000"
      backdropOpacity={0.4}
      style={{margin: 0, alignContent: 'center', justifyContent: 'flex-end'}}
      onBackdropPress={() => {
        setIsVisible(!isVisible);
      }}
      onBackButtonPress={() => {
        setIsVisible(!isVisible);
      }}
      hideModalContentWhileAnimating>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 16,
          height: SCREEN_HEIGHT / 5,
          backgroundColor: '#fff',
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
        }}>
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 30,
              height: 4,
              borderRadius: 4,
              backgroundColor: '#EEE',
            }}
          />
        </View>
        <View
          style={{
            marginTop: 22,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            style={{
              width: SCREEN_WIDTH / 1.5,
              backgroundColor: '#aaaaaa',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 20, padding: 8}}>
              수정하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logOutPress}
            style={{
              width: SCREEN_WIDTH / 1.5,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 20, padding: 8}}>
              삭제하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MyFeedModal;
