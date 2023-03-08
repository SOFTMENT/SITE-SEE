import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { startCase } from "lodash"
import { HStack, Icon, IconButton } from "native-base"
import React, { useEffect, useState } from "react"
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "react-redux"
import images from "../../../assets/images"
import AvatarIcon from "../../../components/AvatarIcon"
import NoResults from "../../../components/NoResults"
import styles from "./styles"
const ProHome = (props) => {
  console.log(auth().currentUser)
  const insets = useSafeAreaInsets()
  const { userData, navigation } = props
  const { profilePic, name, accountStatus, status } = userData
  const [videos, setVideos] = useState([])
  const uid = auth().currentUser.uid
  useEffect(() => {
    getVideos()
  }, [])
  const getVideos = () => {
    firestore()
      .collection("Users")
      .doc(uid)
      .collection("Videos")
      .onSnapshot(snapshot => {
        const localData = []
        snapshot.forEach(doc => {
          localData.push(doc.data())
        })
        setVideos(localData)
      })
  }
  const navigateToVideo = (videoUrl) => {
    navigation.navigate("ProVideoPlayer", { videoUrl })
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
  const handleNavigation = () => {
    navigation.navigate("ProVideoUpload")
  }
  return (
    <View style={[styles.container, Platform.OS == "ios" && { paddingTop: insets.top }]}>
      <View style={styles.topView}>
        <View>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{startCase(name)}</Text>
        </View>
        <AvatarIcon
          size={60}
          uri={profilePic}
        />
        {/* {Util.getNameInitial(name)}
                </Avatar> */}
      </View>
      <View style={styles.mainView}>
        {
          !accountStatus
          &&
          <TouchableOpacity style={styles.updateView} onPress={() => navigation.navigate("ProProfile")}>
            <Text style={styles.updateText}>Please update your bank details to activate your account</Text>
          </TouchableOpacity>
        }
        {
          status == "pending"
          &&
          <TouchableOpacity style={[styles.updateView, { marginTop: 5 }]} disabled>
            <Text style={styles.updateText}>Your account is under verification, we will let you know onces it has been verified by admin.</Text>
          </TouchableOpacity>
        }
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <Text style={styles.title}>Your Videos</Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Icon
              name="plus-circle-outline"
              size={"lg"}
              as={MaterialCommunityIcons}
              color="white"
            />
          </TouchableOpacity>
        </HStack>
        <View style={styles.contentView}>
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
    </View>
  )
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.userData
  }
}
export default connect(mapStateToProps)(ProHome)