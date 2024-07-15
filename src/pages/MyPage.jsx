import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import LogoutModal from '../components/LogoutModal';

function getRandomNumberFeed() {
  return Math.floor(Math.random() * 300) + 1;
}

const dummy_myfeed = [
  {
    id: 0,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 1,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 2,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 3,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 4,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 5,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 6,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 7,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 8,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 9,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 10,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 11,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 12,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 13,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 14,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 15,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 16,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 17,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 18,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 19,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 20,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
  {
    id: 21,
    content: 'string',
    nickname: 'string',
    profileImagePath: 'string',
    tags: ['string'],
    images: [`https://picsum.photos/id/${getRandomNumberFeed()}/600/600`],
    emotions: {
      emotionCheck: 'GOOD',
      total: 0,
      good: 0,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'string',
        reply: 'string',
        createDate: '2024-07-14T23:01:56.212Z',
      },
    ],
  },
];

const MyPage = () => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [data, setData] = useState();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    myPageApi();
  }, []);

  const myPageApi = async () => {
    const res = await API.get('/accounts/info/mypage');
    console.log(res.data.result.accountInfoResponse);
    setData(res.data.result.accountInfoResponse);
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

  const renderMyFeed = ({item}) => {
    console.log(item.images);
    return (
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#fff'}}>
        <Image
          source={{uri: item.images[0]}}
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
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {data?.followerCount}
            </Text>
            <Text>팔로워</Text>
          </TouchableOpacity>
          <TouchableOpacity
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
              data={dummy_myfeed}
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
