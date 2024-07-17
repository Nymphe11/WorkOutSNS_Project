import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Keyboard,
  FlatList,
  Image,
} from 'react-native';
import {API} from '../apis';
import {Icon} from '@rneui/themed';

const Following = () => {
  const [textValue, setTextValue] = useState('');
  const {width, height} = useWindowDimensions();
  const [followingList, setFollowingList] = useState();

  console.log('log:', followingList);

  useEffect(() => {
    handleFollowingList();
  }, []);
  const followingAddApi = async () => {
    const requestBody = {email: textValue};
    const res = await API.post('/following', requestBody);
    // console.log(res);
  };

  const handleFollowingAdd = async () => {
    // 이메일 검증로직
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!textValue) {
      alert('이메일 아이디를 입력해주세요');
    } else if (!emailRegex.test(textValue)) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    } else {
      await followingAddApi();
      setTextValue('');
      handleFollowingList();
    }
  };

  const followingListApi = async () => {
    const res = await API.get('/following');
    // console.log(res?.data.result);
    setFollowingList(res?.data?.result);
  };

  const handleFollowingList = () => {
    followingListApi();
  };

  const renderFollowingList = ({item}) => {
    console.log('item: ', item);
    const Base_Url = 'http://13.209.27.220:8080';
    const profilePath = item.following.profileImagePath;
    const imageUrl = Base_Url + profilePath;
    const nickName = item.following.nickName;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          {profilePath ? (
            <Image
              source={{uri: imageUrl}}
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
              <Icon name="person" type="ionicon" color="#fff" />
            </View>
          )}
          <Text style={{fontSize: 16}}>{nickName}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{color: 'red', fontWeight: '400'}}>팔로우 취소</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{paddingHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 16,
              gap: 12,
            }}>
            <View
              style={{
                width: width / 1.5,
                backgroundColor: '#f0f0f0',
                paddingHorizontal: 6,
                borderRadius: 10,
              }}>
              <TextInput
                value={textValue}
                onChangeText={text => setTextValue(text)}
                keyboardType="email-address"
                placeholder="팔로우 할 이메일 아이디를 입력하세요"
              />
            </View>
            <TouchableOpacity
              onPress={handleFollowingAdd}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0064ff',
                paddingHorizontal: 12,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 16, color: '#fff'}}>팔로우 등록</Text>
            </TouchableOpacity>
          </View>
          <View>
            {followingList && (
              <FlatList
                data={followingList}
                renderItem={renderFollowingList}
                keyExtractor={item => item.following.email}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Following;
