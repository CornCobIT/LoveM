import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
// import firebase from 'firebase/app';
// import 'firebase/storage';

import { storage } from '../../config';
import {STYLES, COLORS} from '../../theme/style';

const ImageList = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Retrieve image URLs from Firebase Storage
    const fetchImageUrls = async () => {
      const storageRef = storage.ref();
      const imagesRef = storageRef.child('images');

      const imageList = await imagesRef.listAll();
      const urls = await Promise.all(
        imageList.items.map(async (item) => {
          const url = await item.getDownloadURL();
          return url;
        })
      );

      setImageUrls(urls);
    };

    fetchImageUrls();
  }, []);

  // useEffect(() => {
  //   // Retrieve image URLs from Firebase Storage
  //   const fetchImageUrls = async () => {
  //     const storageRef = storage.ref();
  //     const imagesRef = storageRef.child('images');
  
  //     const imageList = await imagesRef.listAll();
  
  //     // Create an array of promises to fetch download URLs and creation timestamps
  //     const urlPromises = imageList.items.map(async (item) => {
  //       const url = await item.getDownloadURL();
  //       const metadata = await item.getMetadata();
  //       return { url, timestamp: metadata.timestamp };
  //     });
  
  //     // Wait for all promises to resolve
  //     const urls = await Promise.all(urlPromises);
  
  //     // Get the current timestamp
  //     const currentTime = Date.now();
  
  //     // Sort the URLs based on the time difference from the current time in ascending order
  //     urls.sort((a, b) => Math.abs(a.timestamp - currentTime) - Math.abs(b.timestamp - currentTime));
  
  //     // Extract the URLs from the sorted array
  //     const sortedUrls = urls.map((item) => item.url);
  
  //     setImageUrls(sortedUrls);
  //   };
  
  //   fetchImageUrls();
  // }, []);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <SafeAreaView style={[
      STYLES.container,
      { justifyContent: "center", position: "relative", padding: 10, },
    ]}>
      <View style={[styles.header, { marginTop: 30, alignItems: 'center' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='caret-up' size={40} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={toggleFriendList}
          style={styles.toggleButton}
        >
          <Text style={STYLES.title}>Friends</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={imageUrls}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={3}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    margin: 1,
    borderColor: COLORS.white,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
  },
  toggleButton: {
    backgroundColor: COLORS.darkGray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 80,
  },
  flatList: {
    marginTop: 20,
  },
});

export default ImageList;