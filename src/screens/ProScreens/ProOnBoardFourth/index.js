import auth from '@react-native-firebase/auth'
import { Icon, ScrollView, VStack } from "native-base"
import React, { useState } from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Helper from '../../../common/Helper'
import Util from '../../../common/util'
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import SvgIcons from '../../../components/SvgIcons'
import MySvg from '../../../components/SvgIcons/MySvg'
import styles from "./styles"
import firestore from '@react-native-firebase/firestore';
import { navigateAndReset } from '../../../navigators/RootNavigation'
import FastImage from 'react-native-fast-image'
const ProOnBoardFourth = (props) => {
    const { navigation, route } = props
    const [selectedTab, setSelectedTab] = useState(0)
    const { data } = route.params
    const { profilePic } = data
    const uid = auth().currentUser.uid
    const [video, setVideo] = useState(null)
    const [thumbnail, setThumbnail] = useState(null)
    const [loading, setLoading] = useState(false)
    const handleNavigation = async () => {
        const uid = auth().currentUser.uid
        if (!video) {
            Util.showMessage("error", "Please select a short video")
            return
        }
        if (!thumbnail) {
            Util.showMessage("error", "Please select a thumbnail for your video")
        }
        try {
            setLoading(true)
            console.log(video)
            console.log(thumbnail)
            const videoUrl = await Helper.uploadImage(`ShortVideo/${uid}`, video)
            const thumbnailUrl = await Helper.uploadImage(`ShortVideoThumbnail/${uid}`, thumbnail)
            const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profilePic)
            firestore()
                .collection("Users")
                .doc(uid)
                .update({
                    videoUrl,
                    thumbnailUrl,
                    ...data,
                    profileCompleted: true,
                    status: "pending",
                    profilePic: profileUrl
                })
                .then(() => {
                    navigateAndReset("HomeScreen")
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
    return (
        <View style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>{"Upload your short video"}</Text>
                {/* <Text style={styles.subText}>This help us create your personalized plan</Text> */}
                <View style={styles.userTypeView}>
                    <TouchableOpacity style={styles.thumbnailView} onPress={handleImage}>
                        {
                            thumbnail ?
                                <FastImage
                                    source={{ uri: thumbnail.uri }}
                                    style={{ width: "100%", height: "100%" }}
                                    resizeMode="cover"
                                /> :
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
                </View>

                <MyButton
                    title={"Next"}
                    txtStyle={{ color: "black" }}
                    containerStyle={{
                        position: "absolute",
                        bottom: spacing.large
                    }}
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="chevron-right"
                        color="black"
                        size={"lg"}
                    />}
                    loading={loading}
                    onPress={() => handleNavigation()}
                />
            </View>
        </View>
    )
}
export default ProOnBoardFourth