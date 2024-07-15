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

import {CameraRoll} from '@react-native-camera-roll/camera-roll';

import {RequestCameraPermission} from '../utils/RequestCameraPermission';
import {Icon} from '@rneui/themed';

const Add = ({navigation}) => {
  const [images, setImages] = useState();
  const [selectedPhoto, setSelectedPhoto] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const setupCamera = async () => {
      const hasPermission = await RequestCameraPermission();
      if (hasPermission) {
        await FetchImages();
      }
    };

    setupCamera();
  }, []);

  const FetchImages = async () => {
    await CameraRoll.getPhotos({
      first: 100,
      assetType: 'Photos',
      groupTypes: 'All',
    }).then(res => {
      if (!selectedPhoto) {
        setSelectedPhoto(res.edges[0].node.image);
        setSelectedIndex(0);
      }
      setImages(res.edges.map(e => e.node.image));
    });
  };

  useEffect(() => {
    console.log('images:', images);
  }, [images]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{borderWidth: 1, borderColor: '#fff'}}
        onPress={() => {
          setSelectedPhoto(item);
          setSelectedIndex(index);
        }}>
        {selectedIndex === index && (
          <View
            style={{
              position: 'absolute',
              right: 8,
              top: 10,
              width: 20,
              height: 20,
              borderRadius: 20,
              backgroundColor: '#0064ff',
              zIndex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="check"
              type="feather"
              color="#fff"
              size={18}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
        )}
        <Image
          source={{uri: item.uri}}
          style={{width: width / 4 - 2, height: width / 4 - 2}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
            X
          </Text> */}
          <Icon name="x-circle" type="feather" color="#fff" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            paddingVertical: 4,
            paddingHorizontal: 6,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, color: '#0064ff'}}>등록</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#000', flex: 0.5}}>
        {selectedPhoto && (
          <Image
            source={{uri: selectedPhoto.uri}}
            style={{width: '100%', height: '100%'}}
          />
        )}
      </View>
      <View style={{flex: 0.5}}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

export default Add;
