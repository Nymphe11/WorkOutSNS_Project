import {Icon} from '@rneui/themed';

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {API} from '../apis';
import FastImage from 'react-native-fast-image';

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {width} = useWindowDimensions();
  const imageSize = width / 3;

  useEffect(() => {
    searchAllApi();
  }, []);

  // useEffect(() => {
  //   console.log(content);
  // }, [content]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    searchAllApi().then(() => setRefreshing(false));
  }, []);

  const searchAllApi = async () => {
    try {
      const res = await API.get(
        '/feed/search?searchTag=all&page=0&pageSize=100',
      );
      // console.log(res);
      if (res.data && res.data.result && res.data.result.content) {
        setContent(res.data.result.content);
      } else {
        console.error('Unexpected API response structure:', res.data);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const handleFeedPress = item => {
    navigation.navigate('SearchFeedDetail', {item});
  };

  const renderItem = ({item}) => {
    const baseURL = 'http://13.209.27.220:8080';
    const imageUrl = `${baseURL}${item.images[0]}`;

    return (
      <TouchableOpacity
        onPress={() => handleFeedPress(item)}
        style={{borderWidth: 1, borderColor: '#fff'}}>
        <View>
          <FastImage
            source={{
              uri: imageUrl,
              priority: FastImage.priority.low,
            }}
            style={{width: imageSize - 2, height: imageSize - 2}}
          />
        </View>
        {item.images.length > 1 && (
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              elevation: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              shadowColor: '#000',
              shadowOffset: {width: 1, height: 1},
              shadowOpacity: 0.7,
              shadowRadius: 3.84,
              zIndex: 10,
            }}>
            <Icon
              name="checkbox-multiple-blank"
              type="material-community"
              size={30}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchList')}
              style={styles.searchWrapper}>
              <TouchableOpacity style={styles.searchIconStyle}>
                <Icon
                  name="search"
                  type="ionicon"
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={styles.inputStyle}>
                검색어를 입력하세요.
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={content}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            numColumns={3}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 68,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
  },
  searchIconStyle: {
    marginLeft: 16,
    marginRight: 2,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: '400',
    color: '#828282',
    paddingRight: 12,
  },
});

export default Search;
