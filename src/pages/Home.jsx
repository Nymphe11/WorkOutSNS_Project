import {Icon} from '@rneui/themed';
import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import CommentsModal from '../components/CommentsModal';

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}
function getRandomNumberFeed() {
  return Math.floor(Math.random() * 1000) + 1;
}

const dummy_data = [
  {
    nickName: 'Bong',
    email: 'Bong@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Jeon',
    email: 'Jeon@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Park',
    email: 'Park@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Cha',
    email: 'Cha@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Baek',
    email: 'Baek@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Baek2',
    email: 'Baek2@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Baek3',
    email: 'Baek3@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Baek4',
    email: 'Baek4@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
  {
    nickName: 'Baek5',
    email: 'Baek5@gmail.com',
    introduce: 'string',
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
    followingCount: 0,
    followerCount: 0,
    feedCount: 0,
  },
];

// const dummy_data = [
//   {
//     nickName: 'Bong',
//     email: 'Bong@gmail.com',
//     introduce: 'string',
//     profileImagePath: 'https://avatar.iran.liara.run/public',
//     followingCount: 0,
//     followerCount: 0,
//     feedCount: 0,
//   },
//   {
//     nickName: 'Jeon',
//     email: 'Jeon@gmail.com',
//     introduce: 'string',
//     profileImagePath: 'https://avatar.iran.liara.run/public',
//     followingCount: 0,
//     followerCount: 0,
//     feedCount: 0,
//   },
//   {
//     nickName: 'Park',
//     email: 'Park@gmail.com',
//     introduce: 'string',
//     profileImagePath: 'https://avatar.iran.liara.run/public',
//     followingCount: 0,
//     followerCount: 0,
//     feedCount: 0,
//   },
//   {
//     nickName: 'Cha',
//     email: 'Cha@gmail.com',
//     introduce: 'string',
//     profileImagePath: 'https://avatar.iran.liara.run/public',
//     followingCount: 0,
//     followerCount: 0,
//     feedCount: 0,
//   },
//   {
//     nickName: 'Baek',
//     email: 'Baek@gmail.com',
//     introduce: 'string',
//     profileImagePath: 'https://avatar.iran.liara.run/public',
//     followingCount: 0,
//     followerCount: 0,
//     feedCount: 0,
//   },
// ];

const dummy_feed = [
  {
    id: 0,
    content: '좋네 좋아',
    nickname: 'Bong',
    tags: ['string'],
    images: [
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
    ],
    emotions: {
      emotionCheck: 'GOOD',
      total: 13,
      good: 13,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'aaa',
        reply: 'aaaaaa',
        createDate: '2024-07-12T20:42:00.598Z',
      },
      {
        replyId: 1,
        nickname: 'bbb',
        reply: 'bbbbbb',
        createDate: '2024-07-12T20:42:00.598Z',
      },
    ],
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
  },
  {
    id: 1,
    content: '좋네 좋아',
    nickname: 'Bong',
    tags: ['string'],
    images: [
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
    ],
    emotions: {
      emotionCheck: 'GOOD',
      total: 13,
      good: 13,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'ccc',
        reply: 'cccccc',
        createDate: '2024-07-12T20:42:00.598Z',
      },
    ],
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
  },
  {
    id: 2,
    content: '좋네 좋아',
    nickname: 'Bong',
    tags: ['string'],
    images: [
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
    ],
    emotions: {
      emotionCheck: 'GOOD',
      total: 13,
      good: 13,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'ddd',
        reply: 'dddddd',
        createDate: '2024-07-12T20:42:00.598Z',
      },
      {
        replyId: 1,
        nickname: 'eee',
        reply: 'eeeeee',
        createDate: '2024-07-12T20:42:00.598Z',
      },
    ],
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
  },
  {
    id: 3,
    content: '좋네 좋아',
    nickname: 'Bong',
    tags: ['string'],
    images: [
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
      `https://picsum.photos/id/${getRandomNumberFeed()}/400/400`,
    ],
    emotions: {
      emotionCheck: 'GOOD',
      total: 13,
      good: 13,
      funny: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
    },
    replys: [
      {
        replyId: 0,
        nickname: 'fff',
        reply: 'ffffff',
        createDate: '2024-07-12T20:42:00.598Z',
      },
    ],
    profileImagePath: `https://avatar.iran.liara.run/public/${getRandomNumber()}`,
  },
];

const {width} = Dimensions.get('window');

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const commentsRef = useRef();

  const renderStory = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          index === 0 ? {marginHorizontal: 16} : {marginRight: 16},
          {alignItems: 'center'},
        ]}>
        <Image
          source={{uri: item.profileImagePath}}
          style={{width: 52, height: 52, marginBottom: 2}}
        />
        <Text
          numberOfLines={1}
          style={{
            maxWidth: 52,
            fontSize: 13,
            fontWeight: '400',
            lineHeight: 16.22,
            color: '#4f4f4f',
          }}>
          {item.nickName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFeed = ({item, index}) => {
    return (
      <View style={{paddingVertical: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 16,
            marginBottom: 8,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}>
            <Image
              source={{uri: item.profileImagePath}}
              style={{width: 32, height: 32}}
            />
            <Text style={{fontSize: 16, fontWeight: '400', lineHeight: 19.97}}>
              {item.nickname}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              name="more-horizontal"
              type="feather"
              size={24}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={{uri: item.images[0]}}
          style={{width, height: width, marginBottom: 8}}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 32,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity>
              <Icon
                name="heart"
                type="feather"
                activeOpacity={0.1}
                size={24}
                style={{width: 32, height: 32}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                commentsRef.current = item.replys;
                setIsVisible(!isVisible);
              }}>
              <Icon
                name="message-square"
                type="feather"
                size={24}
                style={{width: 32, height: 32}}
              />
            </TouchableOpacity>
          </View>
          <Text>외 {item.emotions.total}이 좋아합니다.</Text>
        </View>
        <View style={{marginHorizontal: 16, gap: 4}}>
          <Text>{item.nickname}</Text>
          <Text style={{fontWeight: '400', color: '#4f4f4f'}}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff', marginBottom: 60}}>
        <FlatList
          data={dummy_feed}
          renderItem={renderFeed}
          keyExtractor={item => item.id}
          removeClippedSubviews
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              <View
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{width: 88, height: 21.91, backgroundColor: 'red'}}
                />
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                  <TouchableOpacity>
                    <Icon
                      name="bulb1"
                      type="antdesign"
                      activeOpacity={0.1}
                      size={24}
                      style={{width: 32, height: 32}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      name="message-square"
                      type="feather"
                      size={24}
                      style={{width: 32, height: 32}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <FlatList
                  data={dummy_data}
                  renderItem={renderStory}
                  keyExtractor={item => item.email}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  removeClippedSubviews
                />
              </View>
            </View>
          )}
        />
        <CommentsModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          comments={commentsRef.current}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
