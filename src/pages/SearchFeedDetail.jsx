import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import BasicHeader from '../components/BasicHeader';
import {API} from '../apis';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import MyFeedModal from '../components/MyFeedModal';
import CommentsModal from '../components/CommentsModal';
import EmotionModal from '../components/EmotionModal';
import Carousel from 'react-native-snap-carousel';

const SearchFeedDetail = ({route}) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [apiRes, setApiRes] = useState();
  const [isVisible, setIsVisible] = useState(false); // 수정, 삭제 모달
  const [commentIsVisible, setCommentIsVisible] = useState(false);
  const [emotionModalVisible, setEmotionModalVisible] = useState(false);
  const [emotionModalPosition, setEmotionModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const heartIconRef = useRef(null);
  const BASE_URL = 'http://13.209.27.220:8080';

  const profileImageUrl = BASE_URL + `${apiRes?.data.result.profileImagePath}`;

  useEffect(() => {
    feedDetailApi();
  }, []);

  const feedId = route.params.item.id;

  const feedDetailApi = async () => {
    const res = await API.get(`/feed/${feedId}`);
    // console.log(res.data);
    setApiRes(res);
  };

  const handleCommentAdded = () => {
    feedDetailApi(); // 댓글 목록을 새로고침
  };

  const handleHeartPress = () => {
    console.log(heartIconRef);
    if (heartIconRef.current) {
      heartIconRef.current.measure((fx, fy, width, height, px, py) => {
        setEmotionModalPosition({x: px - 30, y: py - 80});
        setEmotionModalVisible(!emotionModalVisible);
      });
    }
  };

  const renderItem = ({item, index}) => {
    const totalLength = apiRes?.data.result.images.length;
    return (
      <View>
        <Image
          source={{
            uri: BASE_URL + item,
          }}
          style={{height: height / 2.5}}
        />
        {totalLength > 1 && (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <Text style={{color: '#fff'}}>
              {index + 1}/{totalLength}
            </Text>
          </View>
        )}
      </View>
    );
  };

  // console.log(apiRes?.data.result.images);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <BasicHeader title={'탐색'} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 8,
            }}>
            {apiRes?.data.result.profileImagePath ? (
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
                <Icon name="person" type="ionicon" color="#fff" />
              </View>
            )}

            <Text style={{fontSize: 18}}>{apiRes?.data.result.nickname}</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: height / 2.5}}>
          <Carousel
            data={apiRes?.data.result.images}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            inactiveSlideScale={1} // 비활성 슬라이드의 크기를 활성 슬라이드와 동일하게
            useScrollView={true}
            enableMomentum={true}
            decelerationRate={0.9}
            snapToInterval={width}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginTop: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 9,
            }}>
            <TouchableOpacity ref={heartIconRef} onPress={handleHeartPress}>
              {apiRes?.data.result.emotions.emotionCheck === null && (
                <Icon
                  name="heart"
                  type="feather"
                  activeOpacity={0.1}
                  size={24}
                  style={{width: 26, height: 26}}
                />
              )}
              {apiRes?.data.result.emotions.emotionCheck === 'FUNNY' && (
                <Icon name="laugh-squint" type="font-awesome-5" />
              )}
              {apiRes?.data.result.emotions.emotionCheck === 'GOOD' && (
                <Icon name="smile" type="font-awesome-5" />
              )}
              {apiRes?.data.result.emotions.emotionCheck === 'SURPRISE' && (
                <Icon name="surprise" type="font-awesome-5" />
              )}
              {apiRes?.data.result.emotions.emotionCheck === 'SAD' && (
                <Icon name="sad-tear" type="font-awesome-5" />
              )}
              {apiRes?.data.result.emotions.emotionCheck === 'ANGRY' && (
                <Icon name="frown" type="font-awesome-5" />
              )}

              {/* <Icon
                name="heart"
                type="feather"
                activeOpacity={0.1}
                size={24}
                style={{width: 26, height: 26}}
              /> */}
            </TouchableOpacity>
            <EmotionModal
              emotionModalVisible={emotionModalVisible}
              setEmotionModalVisible={setEmotionModalVisible}
              position={emotionModalPosition}
              feedId={apiRes?.data.result.id}
              refresh={handleCommentAdded}
            />
            <TouchableOpacity
              onPress={() => setCommentIsVisible(!commentIsVisible)}>
              <Icon
                name="message-reply-outline"
                type="material-community"
                size={26}
                style={{width: 26, height: 26}}
              />
            </TouchableOpacity>
          </View>
          <View>
            {apiRes?.data.result.emotions.total === 0 ? (
              <View style={{marginBottom: 5}}>
                <Text style={{fontSize: 15, color: '#5f5f5f'}}>
                  아직 감정표현이 없습니다
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 4,
                }}>
                {apiRes?.data.result.emotions.funny > 0 && (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="laugh-squint" type="font-awesome-5" />
                    <Text>{apiRes?.data.result.emotions.funny}</Text>
                  </TouchableOpacity>
                )}
                {apiRes?.data.result.emotions.good > 0 && (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="smile" type="font-awesome-5" />
                    <Text>{apiRes?.data.result.emotions.good}</Text>
                  </TouchableOpacity>
                )}
                {apiRes?.data.result.emotions.surprise > 0 && (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="surprise" type="font-awesome-5" />
                    <Text>{apiRes?.data.result.emotions.surprise}</Text>
                  </TouchableOpacity>
                )}
                {apiRes?.data.result.emotions.sad > 0 && (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="sad-tear" type="font-awesome-5" />
                    <Text>{apiRes?.data.result.emotions.sad}</Text>
                  </TouchableOpacity>
                )}
                {apiRes?.data.result.emotions.angry > 0 && (
                  <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="frown" type="font-awesome-5" />
                    <Text>{apiRes?.data.result.emotions.angry}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 6, gap: 12}}>
          <Text style={{fontSize: 16}}>{apiRes?.data.result.content}</Text>
          <ScrollView>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 6}}>
              {apiRes?.data.result.tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  <Text># {tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <MyFeedModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          myFeedDetailRes={apiRes}
        />
        <CommentsModal
          isVisible={commentIsVisible}
          setIsVisible={setCommentIsVisible}
          comments={apiRes?.data.result}
          onCommentAdded={handleCommentAdded}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchFeedDetail;
