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
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {Icon} from '@rneui/themed';

const TagModal = ({isVisible, setIsVisible, tags, setTags}) => {
  const [textValue, setTextValue] = useState('');
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const deleteTag = useCallback(
    index => {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    },
    [tags, setTags],
  );

  // const renderItem = useCallback(
  //   ({item, index}) => {
  //     return (
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}>
  //         <Text>{item}</Text>
  //         <TouchableOpacity
  //           onPress={() => deleteTag(index)}
  //           style={{borderRadius: 50, borderWidth: 1, borderColor: '#000'}}>
  //           <Icon name="close" type="antdesign" size={12} />
  //         </TouchableOpacity>
  //       </View>
  //     );
  //   },
  //   [tags],
  // );

  const onPress = () => {
    setTags([...tags, textValue]);
    setTextValue('');
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
        Keyboard.dismiss();
        setIsVisible(!isVisible);
        setTextValue('');
      }}
      onBackButtonPress={() => {
        Keyboard.dismiss();
        setIsVisible(!isVisible);
        setTextValue('');
      }}
      hideModalContentWhileAnimating>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 16,
          height: SCREEN_HEIGHT / 1.5,
          backgroundColor: '#fff',
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
        }}>
        {/* <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}>
        </View> */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
              setTextValue('');
            }}>
            <View
              style={{
                width: 30,
                height: 4,
                borderRadius: 4,
                backgroundColor: '#EEE',
                margin: 6,
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <View style={{height: 30, justifyContent: 'center'}}>
            <Text>태그 목록</Text>
          </View>
          {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={tags}
            renderItem={renderItem}
            keyExtractor={(item, idx) => idx}
            ItemSeparatorComponent={() => <View style={{height: 32}} />}
            style={{flex: 1}}
            extraData={tags}
          /> */}
          <ScrollView style={{flex: 1}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {tags.map((tag, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: 5,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text># {tag}</Text>
                  <TouchableOpacity
                    style={{
                      marginLeft: 5,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}
                    onPress={e => {
                      e.stopPropagation;
                      deleteTag(index);
                    }}>
                    <Icon name="close" type="antdesign" size={12} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderColor: '#EEE',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 12,
              marginTop: 16,
              marginBottom: 24,
              minHeight: 40,
              maxHeight: 130,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: '#666',
            }}>
            <TextInput
              style={{
                minHeight: 13,
                maxHeight: 80,
                paddingVertical: 0,
                lineHeight: 18,
                fontSize: 15,
                color: '#3A3A3A',
              }}
              multiline
              maxLength={200}
              placeholder="태그를 입력해주세요"
              placeholderTextColor="#BBB"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              value={textValue}
              onChangeText={text => setTextValue(text)}
            />
          </View>
          <TouchableOpacity
            onPress={onPress}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 28,
            }}>
            <Icon
              name="add-circle-outline"
              type="ionicon"
              size={32}
              style={{width: 32, height: 32}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TagModal;
