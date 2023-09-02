import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import Helper from '../../../common/Helper'
import Util from '../../../common/util'
import Header from '../../../components/Header'
import styles from './styles'
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { Icon, ScrollView, VStack } from 'native-base'
import MyButton from '../../../components/MyButton'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { spacing } from '../../../common/variables'
import FastImage from 'react-native-fast-image'
export default function ProVideoUpload(props) {
    const [title, setTitle] = useState("")
    const [thumbnail, setThumbnail] = useState(null)
    const [video, setVideo] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const uid = auth().currentUser.uid
    const handleVideo = () => {
        Helper.pickDocument(false)
          .then(res => {
            setVideo(res)
          })
          .catch((error) => {
            Util.showMessage("error", error, "")
          })
      }
      const handleImage = () => {
        Helper.pickDocument(true)
          .then(res => {
            setThumbnail(res)
          })
          .catch((error) => {
            Util.showMessage("error", error, "")
          })
      }
    const resetData = () => {
        setTitle("")
        setThumbnail(null)
        setVideo(null)
      }
      const handleUpload = async () => {
        if (title.trim().length == 0) {
          Util.showMessage("error", "Title required")
          return
        }
        if (!video) {
          Util.showMessage("error", "Please select a video")
          return
        }
        if (!thumbnail) {
          Util.showMessage("error", "Please select a thumbnail for your video")
        }
        try {
          setLoading(true)
          console.log(video)
          console.log(thumbnail)
          const videoUrl = await Helper.uploadImage(`Videos/${uid}`, video)
          const thumbnailUrl = await Helper.uploadImage(`VideosThumbnai;/${uid}`, thumbnail)
          //const videoId = firestore().collection("Users").doc(uid).collection("Videos")
          firestore()
            .collection("Users")
            .doc(uid)
            .collection("Videos")
            .add({
              videoUrl,
              thumbnailUrl,
              createTime: firebase.firestore.FieldValue.serverTimestamp(),
              //videoId,
              title
            })
            .then(() => {
              Util.showMessage("success", "Success", "Video uploaded")
              resetData()
            })
            .catch(err => {
              console.log(err)
            })
            .finally(() => {
              setLoading(false)
            })
        } catch (error) {
          console.log(error)
        }
        finally {
          setLoading(false)
        }
      }
    return (
        <View style={styles.container}>
            <Header back title={"Upload Video"} navigation={props.navigation}/>
            <ScrollView style={styles.bottomView} bounces={false} showsVerticalScrollIndicator={false}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Title"
                    placeholderTextColor={"white"}
                    value={title}
                    onChangeText={(txt) => setTitle(txt)}
                />
                <TouchableOpacity style={styles.thumbnailView} onPress={handleImage}>
                    {
                        thumbnail ?
                        <FastImage
                            source={{uri:thumbnail.uri}}
                            style={{width:"100%",height:"100%"}}
                            resizeMode="cover"
                        />:
                        <VStack alignItems={"center"}>
                            <Text style={styles.updateText} numberOfLines={1}>{thumbnail ? thumbnail.name : "Add Thumbnail"}</Text>
                            <Text style={styles.subtitle}>{"JPEG or PNG, no larger than 10 MB."}</Text>
                        </VStack>
                    }
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadView} onPress={handleVideo}>
                    <Text style={styles.updateText} numberOfLines={1}>{video ? video.name : "Add Video"}</Text>
                    {
                        video &&
                        <Icon
                            as={MaterialCommunityIcons}
                            name="check-circle-outline"
                            color="white"
                            size={"md"}
                            ml={2}
                        />
                    }
                </TouchableOpacity>
                <MyButton
                    title={loading ? "Uploading..." : "Upload"}
                    txtStyle={{ color: "black" }}
                    containerStyle={{
                        marginTop: spacing.large
                    }}
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="tray-arrow-up"
                        color="black"
                        size={"md"}
                        ml={2}
                    />}
                    loading={loading}
                    onPress={() => handleUpload()}
                />
            </ScrollView>
        </View>
    )
}
