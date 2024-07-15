import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const SearchList = () => {
  const [keyword, setKeyword] = useState('');

  const handleCancelButton = () => {
    setKeyword('');
    Keyboard.dismiss();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1}}>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <View style={styles.searchSection}>
                <TouchableOpacity style={styles.searchIconStyle}>
                  <Icon
                    name="search"
                    type="ionicon"
                    style={{width: 24, height: 24}}
                  />
                </TouchableOpacity>
                <TextInput
                  spellCheck={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={keyword}
                  onChangeText={text => setKeyword(text)}
                  allowFontScaling={false}
                  style={styles.inputStyle}
                  autoFocus
                  onSubmitEditing={() => console.log('검색 api 호출')}
                />
              </View>
              <TouchableOpacity onPress={() => handleCancelButton()}>
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.recentKeywordContainer}>
              <Text style={styles.recentKeywordLabel}>최근 검색</Text>
              <TouchableOpacity>
                <Text style={styles.allDeleteLabel}>전체삭제</Text>
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.recentKeywordRow}>
                <TouchableOpacity style={styles.recentKeywordUser}>
                  <Image
                    source={{uri: 'https://picsum.photos/130/130'}}
                    style={{width: 40, height: 40, borderRadius: 20}}
                  />
                  <Text>Lucymartin_3</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name="close"
                    type="antdesign"
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 68,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    marginBottom: 24,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F8F8F8',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 4,
    gap: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
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
    backgroundColor: '#F8F8F8',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F80ED',
  },
  recentKeywordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  recentKeywordLabel: {
    fontSize: 16,
    color: '#333',
  },
  allDeleteLabel: {
    fontSize: 16,
    color: '#828282',
  },
  recentKeywordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  recentKeywordUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
});

export default SearchList;
