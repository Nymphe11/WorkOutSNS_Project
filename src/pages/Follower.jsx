import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {API} from '../apis';
import {Icon} from '@rneui/themed';

const Follower = () => {
  const [followerList, setFollowerList] = useState();
  useEffect(() => {
    handleFollowerInfo();
  }, []);

  const followerInfoApi = async () => {
    const res = await API.get('/follower');
    console.log(res?.data.result);
    setFollowerList(res?.data.result);
  };

  const handleFollowerInfo = () => {
    followerInfoApi();
  };

  const renderFollowerList = ({item}) => {
    console.log('item: ', item);
    const Base_Url = 'http://13.209.27.220:8080';
    const profilePath = item.follower.profileImagePath;
    const imageUrl = Base_Url + profilePath;
    const nickName = item.follower.nickName;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 16}}>
        {followerList?.length === 0 ? (
          <View>
            <View>
              <Text>아직 팔로우 한 사람이 없습니다</Text>
            </View>
            <View />
          </View>
        ) : (
          <View>
            {followerList && (
              <FlatList
                data={followerList}
                renderItem={renderFollowerList}
                keyExtractor={item => item.follower.email}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Follower;
