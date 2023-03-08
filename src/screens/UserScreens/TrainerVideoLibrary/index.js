import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import firestore from '@react-native-firebase/firestore'
import FastImage from 'react-native-fast-image'
import { FlatList, Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import NoResults from '../../../components/NoResults'
import images from '../../../assets/images'
export default function TrainerVideoLibrary(props) {
    const {navigation, route} = props
    const {trainerId} = route.params
    const [videos,setVideos] = useState([])
    useEffect(()=>{
        getTrainerVideos()
    },[])
    const getTrainerVideos = () => {
        firestore()
        .collection("Users")
        .doc(trainerId)
        .collection("Videos")
        .get()
        .then(snapshot => {
            const localData = []
            snapshot.forEach(doc => {
            localData.push(doc.data())
            })
            setVideos(localData)
        })
        .catch(()=>{
            //console.log
        })
    }
    const navigateToVideo = (videoUrl) => {
        navigation.navigate("VideoPlayer", { videoUrl })
      }
     
    const renderVideos = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => navigateToVideo(item.videoUrl)}>
            <FastImage
              source={{ uri: item.thumbnailUrl }}
              defaultSource={images.imagePlaceholder}
              style={styles.thumbnail}
              resizeMode="cover"
            >
              <View style={styles.titleView}>
                <Text style={styles.videoTitle}>{item.title}</Text>
              </View>
              <Icon
                name="play-circle"
                size={"4xl"}
                as={MaterialCommunityIcons}
                color="white"
              />
            </FastImage>
          </TouchableOpacity>
        )
      }
      const keyExtractor = (item) => {
        return item.title
      }
    return (
        <View style={styles.container}>
            <Header title="Video Library" back navigation={navigation}/>
            <View style={styles.mainView}>
                {
                videos.length == 0 ?
                <NoResults title="You haven't uploaded any content yet" />
                :
                <FlatList
                    //horizontal
                    renderItem={renderVideos}
                    keyExtractor={keyExtractor}
                    bounces={false}
                    data={videos}
                    contentContainerStyle={{ flex: 1,}}
                />
                }
            </View>
        </View>
    )
}
