import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {API} from '../apis';

const EmotionModal = ({
  emotionModalVisible,
  setEmotionModalVisible,
  position,
  feedId,
  refresh,
}) => {
  const emotionAddApi = async selectedEmotion => {
    const res = await API.post(
      `/feed/${feedId}/emotion?emotionType=${selectedEmotion}`,
    );
    console.log(res);
  };

  const handleAddEmotion = async selectedEmotion => {
    await emotionAddApi(selectedEmotion);
    refresh();
  };

  return (
    <Modal
      useNativeDriver
      isVisible={emotionModalVisible}
      animationIn={'fadeIn'}
      animationInTiming={'50'}
      animationOutTiming={'50'}
      animationOut={'fadeOut'}
      backdropOpacity={0}
      hideModalContentWhileAnimating
      onBackdropPress={() => setEmotionModalVisible(!emotionModalVisible)}
      onBackButtonPress={() => {
        setEmotionModalVisible(!emotionModalVisible);
      }}>
      <View
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          backgroundColor: '#fff',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {width: 1, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          borderRadius: 17,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}>
          <TouchableOpacity
            onPress={() => handleAddEmotion('FUNNY')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="laugh-squint" type="font-awesome-5" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddEmotion('GOOD')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="smile" type="font-awesome-5" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddEmotion('SURPRISE')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="surprise" type="font-awesome-5" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddEmotion('SAD')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="sad-tear" type="font-awesome-5" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddEmotion('ANGRY')}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="frown" type="font-awesome-5" size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmotionModal;
