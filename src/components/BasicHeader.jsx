import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';

const BasicHeader = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => NavigationContainer.goBack()}>
        <Icon
          name="left"
          type="antdesign"
          size={32}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.backButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  backButton: {
    width: 32,
    height: 32,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19.97,
    textAlign: 'center',
    color: '#000',
  },
});

export default BasicHeader;
