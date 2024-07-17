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
import {API} from '../apis';

function getTimeAgo(createDate) {
  const now = new Date();
  const createdAt = new Date(createDate);

  // 서버시간은 한국기준이고 now는 협정 세계시 기준
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  const nowKorea = new Date(now.getTime() + koreaTimeDiff);

  const diffInSeconds = Math.floor((nowKorea - createdAt) / 1000);

  if (diffInSeconds < 60) {
    return '방금';
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} 분 전`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} 시간 전`;
  } else if (diffInSeconds < 2592000) {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} 일 전`;
  } else if (diffInSeconds < 31536000) {
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths} 개월 전`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears} 년 전`;
  }
}

const CommentItem = ({item, index}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        columnGap: 6,
      }}>
      <View style={{flex: 1, rowGap: 3}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 8}}>
          <Text style={{fontSize: 13}}>{item.nickname}</Text>
          <Text style={{fontSize: 12, color: '#333'}}>
            {getTimeAgo(item.createDate)}
          </Text>
        </View>
        <Text style={{color: '#333', fontSize: 15}}>{item.reply}</Text>
      </View>
      <TouchableOpacity>
        <Icon
          name="more-horizontal"
          type="feather"
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
    </View>
  );
};

const CommentsModal = ({isVisible, setIsVisible, comments, onCommentAdded}) => {
  const [textValue, setTextValue] = useState('');
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();

  const renderItem = useCallback(({item, index}) => {
    return <CommentItem item={item} index={index} />;
  }, []);

  const addReplyApi = async () => {
    const requestBody = {reply: textValue};
    const res = await API.post(`/feed/${comments.id}/reply`, requestBody);
    console.log(res);
  };

  const handleAddReply = async () => {
    await addReplyApi();
    onCommentAdded();
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
      {/* 지금 코드에 KeyboardAvoidingView, KeyboardAwareScrollView 둘 다 들어가 있고 KeyboardAwareScrollView의 경우 FlatList와 중첩피하기 위해 아래에 배치 되어있음
        ios 호환을 위해 나중에 체크해야함
        */}
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={8}
        style={{width: '100%'}}> */}
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 16,
          height: SCREEN_HEIGHT / 1.5,
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
        <View style={{flex: 1}}>
          <View style={{height: 30, justifyContent: 'center'}}>
            <Text>댓글</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={comments?.replys}
            renderItem={renderItem}
            keyExtractor={item => item.replyId}
            // ListEmptyComponent={}
            ItemSeparatorComponent={() => <View style={{height: 32}} />}
            style={{flex: 1}}
          />
        </View>
        {/* <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          style={{width: '100%'}}> */}
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
              placeholder="댓글을 입력해주세요"
              placeholderTextColor="#BBB"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              value={textValue}
              onChangeText={text => setTextValue(text)}
            />
          </View>
          <TouchableOpacity
            onPress={() => handleAddReply()}
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
        {/* </KeyboardAwareScrollView> */}
      </View>

      {/* </KeyboardAvoidingView> */}
    </Modal>
  );
};

export default CommentsModal;
