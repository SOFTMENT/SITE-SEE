import { Icon, useDisclose } from "native-base"
import React, { useState } from "react"
import { Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import Helper from "../../../common/Helper"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import PhotoPicker from "../../../components/PhotoPicker"
import styles from "./styles"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { navigateAndReset } from "../../../navigators/RootNavigation"
import MyTextInput from "../../../components/MyTextInput"
import { TouchableOpacity } from "react-native-gesture-handler"
const ServiceOnBoardPhoto = (props) => {
    const { navigation, route } = props
    //const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(null)
    const [service,setService] = useState("")
    const [portfolioLink,setPortfolioLink] = useState("")
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    const handleNavigation = async() => {
        const uid = auth().currentUser.uid
        // if (profilePic == null) {
        //     Util.showMessage("error", "Please select a profile pic", "")
        // }
        if(service.trim().length == 0){
            Util.showMessage("error", "Please provide your service type", "")
        }
        else if(portfolioLink.trim().length == 0){
            Util.showMessage("error", "Please provide your portfolio website link", "")
        }
        else{
            // Util.showMessage("error", "Something went wrong!", "The server encountered an error and could not complete your request.")
            // return
            try {
                setLoading(true)
                //const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profilePic)
                firestore()
                .collection("Users")
                .doc(uid)
                .update(
                    {
                        //profilePic: profileUrl,
                        serviceProfileCompleted: true,
                        service:service.trim(),
                        portfolioLink:portfolioLink.trim(),
                        membershipActive:false
                    }
                )
                .then(() => {
                    navigateAndReset("HomeScreen")
                })
                .finally(()=>{
                    setLoading(false)
                })
            } catch (error) {
                
            }
        }
    }
    return (
        <View style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title="Let's complete your profile" back />
            {/* <Text style={styles.subText}>Personal Information</Text> */}
            <View style={styles.mainView}>
                {/* <View style={styles.topView}>
                    <View style={styles.insideView}>
                        <TouchableOpacity onPress={onToggle}>
                                <FastImage
                                    source={profilePic?{ uri: profilePic.uri }:images.defaultUser}
                                    defaultSource={images.imagePlaceholder}
                                    resizeMode="cover"
                                    style={styles.image}
                                />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <MyTextInput
                        containerStyle={{ marginVertical: spacing.medium,marginTop:50 }}
                        iconName={"briefcase-outline"}
                        placeholder="Service"
                        //value={}
                        value={service}
                        onChangeText={(txt) => setService(txt)}
                />
                <MyTextInput
                        containerStyle={{ marginVertical: spacing.large }}
                        iconName={"link-variant"}
                        placeholder="Portfolio Website Link"
                        //value={}
                        value={portfolioLink}
                        onChangeText={(txt) => setPortfolioLink(txt)}
                />
                <MyButton
                    title={"Submit"}
                    //txtStyle={{ color: "black" }}
                    loading={loading}
                    containerStyle={{
                        marginTop:32,
                        width:"70%"
                    }}
                    loa
                    //icon={"chevron-right"}
                    onPress={() => handleNavigation()}
                />
            </View>
            {/* <PhotoPicker isOpen={isOpen} onClose={onClose} setImage={setProfilePic} /> */}
        </View>
    )
}
export default ServiceOnBoardPhoto