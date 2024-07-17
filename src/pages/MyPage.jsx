import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {API} from '../apis';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import LogoutModal from '../components/LogoutModal';

const MyPage = ({route}) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [data, setData] = useState();
  const [myFeed, setMyFeed] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      myPageApi();
    }, []),
  );

  const myPageApi = async () => {
    const res = await API.get('/accounts/info/mypage');
    // console.log(res.data.result.accountInfoResponse);
    // console.log(res.data.result.feedList);
    setData(res.data.result.accountInfoResponse);
    setMyFeed(res.data.result.feedList);
  };

  function extractEmailUsername(email) {
    const regex = /(.*?)@/;
    const match = email?.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  const handleFeedPress = item => {
    navigation.navigate('MyFeedDetail', {item});
  };

  const renderMyFeed = ({item}) => {
    const BASE_URL = 'http://13.209.27.220:8080';
    const imageUrl = item.images[0] ? `${BASE_URL}${item.images[0]}` : null;
    // console.log(item.images);
    return (
      <TouchableOpacity
        onPress={() => handleFeedPress(item)}
        style={{borderWidth: 1, borderColor: '#fff'}}>
        <Image
          source={{uri: imageUrl}}
          resizeMode="cover"
          style={{width: width / 3 - 2, height: width / 3 - 2}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, marginBottom: 260}}>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
            <Icon name="link" type="antdesign" size={20} />
            <Text style={{fontSize: 24, fontWeight: '400'}}>
              {extractEmailUsername(data?.email)}
            </Text>
            <Icon name="down" type="antdesign" size={12} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Icon name="navicon" type="evilicon" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data?.profileImagePath ? (
              <Image
                source={data?.profileImagePath}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#aaaaaa',
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="camera" type="font-awesome-5" color="#fff" />
              </View>
            )}
            <Text numberOfLines={1} style={{maxWidth: 52}}>
              {data?.nickName}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {data?.feedCount}
            </Text>
            <Text>게시물</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FollowTab', {screen: 'Follower'})
            }
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {data?.followerCount}
            </Text>
            <Text>팔로워</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FollowTab', {screen: 'Following'})
            }
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {data?.followingCount}
            </Text>
            <Text>팔로잉</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#dddddd',
              width: width * 0.5,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, paddingVertical: 4}}>프로필 편집</Text>
          </TouchableOpacity>
        </View>
        {data?.feedCount === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            <Text style={{fontSize: 24}}>첫 운동의 순간을 남겨보세요</Text>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: '#0a6eff'}}>
                게시물 작성하러 가기
              </Text>
            </TouchableOpacity>
            <View style={{height: height * 0.2}} />
          </View>
        ) : (
          <View>
            <FlatList
              data={myFeed}
              renderItem={renderMyFeed}
              keyExtractor={item => item.id}
              numColumns={3}
              removeClippedSubviews
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        <LogoutModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          email={data?.email}
          profileImageUrl={data?.profileImagePath}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPage;
