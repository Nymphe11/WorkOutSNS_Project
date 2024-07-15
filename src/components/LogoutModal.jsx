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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import {API} from '../apis';

const LogoutModal = ({isVisible, setIsVisible, email, profileImageUrl}) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const navigation = useNavigation();

  const logOutApi = async () => {
    const res = await API.delete('/auth');
    console.log(res);
  };

  const logOutPress = () => {
    logOutApi();
    navigation.navigate('Login');
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
        <View style={{justifyContent: 'center', alignItems: 'center', gap: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
            }}>
            {profileImageUrl ? (
              <Image
                source={{uri: profileImageUrl}}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#aaaaaa',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="camera" type="font-awesome-5" color="#fff" />
              </View>
            )}

            <Text style={{fontSize: 24}}>{email}</Text>
          </View>
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
              로그아웃
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
