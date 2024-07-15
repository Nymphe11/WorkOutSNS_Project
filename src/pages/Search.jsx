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
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {API} from '../apis';
// import FastImage from 'react-native-fast-image';

// function getRandomNumberFeed() {
//   return Math.floor(Math.random() * 300) + 1;
// }

// const dummy_search = [
//   {
//     id: 1,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
//   {
//     id: 2,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: false,
//   },
//   {
//     id: 3,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
//   {
//     id: 4,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: false,
//   },
//   {
//     id: 5,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
//   {
//     id: 6,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: false,
//   },
//   {
//     id: 7,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: false,
//   },
//   {
//     id: 8,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
//   {
//     id: 9,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
//   {
//     id: 10,
//     img: `https://picsum.photos/id/${getRandomNumberFeed()}/130/130`,
//     isMulti: true,
//   },
// ];

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [content, setContent] = useState([]);
  const {width} = useWindowDimensions();
  const imageSize = width / 3;

  // const onTest = () => {
  //   searchAllApi();
  // };

  useEffect(() => {
    searchAllApi();
  }, []);

  useEffect(() => {
    console.log(content);
  }, [content]);

  const searchAllApi = async () => {
    try {
      const res = await API.get(
        '/feed/search?searchTag=all&page=0&pageSize=18',
      );
      if (res.data && res.data.result && res.data.result.content) {
        setContent(res.data.result.content);
      } else {
        console.error('Unexpected API response structure:', res.data);
      }
    } catch (error) {
      console.error('API call failed:', error);
    }
  };

  const renderItem = ({item}) => {
    if (!item || !item.images) {
      console.warn('Invalid item data:', item);
      return null;
    }
    const baseURL = 'http://13.209.27.220:8080';
    const imageUrl = `${baseURL}${item.images}`;

    // console.log(imageUrl);
    return (
      <TouchableOpacity style={{borderWidth: 1, borderColor: '#fff'}}>
        <Image
          source={{uri: imageUrl}}
          style={{width: imageSize - 2, height: imageSize - 2}}
          resizeMode="cover"
          onLoad={() => console.log('Image loaded successfully')}
          onError={e => console.log('Image load error:', e.nativeEvent.error)}
        />
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

          {/* <TouchableOpacity onPress={onTest} style={{backgroundColor: 'black'}}>
            <Text>테스트</Text>
          </TouchableOpacity> */}
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
