import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';

import BasicHeader from '../components/BasicHeader';
import {Icon} from '@rneui/themed';
import TagModal from '../components/TagModal';
import {API} from '../apis';

const UploadFeed = ({route}) => {
  const {width, height} = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const {selectedPhoto} = route?.params;

  const handleUploadAndNavigate = () => {
    handleUpload();
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       {
    //         name: 'MainTab',
    //         state: {
    //           routes: [{name: '마이페이지'}],
    //           index: 4,
    //         },
    //       },
    //     ],
    //   }),
    // );
    navigation.reset({index: 0, routes: [{name: '마이페이지'}]});
  };

  const uploadFeedApi = async () => {
    const formData = new FormData();

    // feedRequest 부분 추가
    formData.append(
      'feedRequest',
      JSON.stringify({
        content: content,
        tags: tags,
      }),
    );

    // 이미지 파일 추가
    const imageUri =
      Platform.OS === 'ios'
        ? selectedPhoto.uri.replace('file://', '')
        : selectedPhoto.uri;
    const imageName = imageUri.split('/').pop();
    const imageType =
      'image/' + (imageName.split('.').pop() === 'png' ? 'png' : 'jpeg');

    formData.append('image', {
      uri: imageUri,
      name: imageName,
      type: imageType,
    });

    try {
      const res = await API.post('/feed', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
    } catch (error) {
      console.error('Error uploading feed:', error);
    }
    // console.log(formData);
  };

  const handleUpload = () => {
    if (!selectedPhoto) {
      alert('이미지가 존재하지 않습니다');
      return;
    }
    if (content.length === 0) {
      alert('게시물 내용을 작성해주세요');
      return;
    }
    uploadFeedApi();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <BasicHeader title={'게시물 작성'} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
            }}>
            {selectedPhoto && (
              <Image
                source={{uri: selectedPhoto.uri}}
                resizeMethod="contain"
                style={{width, height: height / 3}}
              />
            )}
          </View>
          <View
            style={{
              minHeight: 110,
              backgroundColor: '#f0f0f0',
              paddingHorizontal: 6,
            }}>
            <TextInput
              placeholder="게시물 내용을 써주세요."
              multiline
              value={content}
              onChangeText={text => setContent(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => setIsVisible(!isVisible)}
            style={{
              padding: 16,
              borderWidth: 1,
              borderColor: '#f0f0f0',
              marginTop: 12,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{gap: 4}}>
                <Text>태그 목록</Text>
                {tags.length === 0 ? (
                  <Text style={{color: '#808080'}}>작성된 태그가 없습니다</Text>
                ) : (
                  <ScrollView>
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
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                )}
              </View>
              <Icon
                name="right"
                type="antdesign"
                style={{width: 30, height: 30}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <TouchableOpacity
              onPress={handleUploadAndNavigate}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0064ff',
                width: width / 2,
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <Text style={{fontSize: 20, color: '#fff'}}>등록하기</Text>
            </TouchableOpacity>
          </View>
          <TagModal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            tags={tags}
            setTags={setTags}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UploadFeed;
