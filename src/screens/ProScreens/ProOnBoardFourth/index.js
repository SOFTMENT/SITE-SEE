import auth from '@react-native-firebase/auth'
import { Icon } from "native-base"
import React, { useState } from "react"
import { Pressable, Text, View } from "react-native"
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
const ProOnBoardFourth = (props) => {
    const { navigation,route} = props
    const [selectedTab, setSelectedTab] = useState(0)
    const {data} = route.params
    const uid = auth().currentUser.uid
    const [video,setVideo] = useState(null)
    const [thumbnail,setThumbnail] = useState(null)
    const [loading,setLoading] = useState(false)
    const handleNavigation = async() => {
        const uid = auth().currentUser.uid
        if(!video){
            Util.showMessage("error","Please select a short video")
            return
        }
        if(!thumbnail){
            Util.showMessage("error","Please select a thumbnail for your video")
        }
        try {
            setLoading(true)
            console.log(video)
            console.log(thumbnail)
            const videoUrl = await Helper.uploadImage(`ShortVideo/${uid}`,video)
            const thumbnailUrl = await Helper.uploadImage(`ShortVideoThumbnail/${uid}`,thumbnail)
            firestore()
            .collection("Users")
            .doc(uid)
            .update({
                videoUrl,
                thumbnailUrl,
                ...data,
                profileCompleted:true,
                rating:0,
                ratedBy:0,
                status:"pending"
            })  
            .then(()=>{
                navigateAndReset("HomeScreen")
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }
    const handleVideo = () => {
        Helper.pickDocument(false)
        .then(res=>{
            setVideo(res)
        })
        .catch((error)=>{
            Util.showMessage("error",error,"")
        })
    }
    const handleImage = () => {
        Helper.pickDocument(true)
        .then(res=>{
            setThumbnail(res)
        })
        .catch((error)=>{
            Util.showMessage("error",error,"")
        })
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>{"Upload your short video"}</Text>
                {/* <Text style={styles.subText}>This help us create your personalized plan</Text> */}
                <View style={styles.userTypeView}>
                   <Pressable style={styles.upload} onPress={handleVideo}>
                        <View style={styles.center}>
                            <MySvg
                                path={SvgIcons.videoPlus}
                                width={66}
                                height={48}
                                color={"gray"}
                            />
                            <Text style={styles.title}>{video?video.name:"Add Video"}</Text>
                        </View>
                   </Pressable>
                   <Pressable style={styles.upload} onPress={handleImage}>
                        <View style={styles.center}>
                            <MySvg
                                path={SvgIcons.imagePlus}
                                width={66}
                                height={60}
                                color={"gray"}
                            />
                            <Text style={styles.title}>{thumbnail?thumbnail.name:"Add Thumbnail"}</Text>
                        </View>
                   </Pressable>
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