import AsyncStorage from "@react-native-async-storage/async-storage"
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { HStack, KeyboardAvoidingView, Toast, useDisclose, VStack } from "native-base"
import React, { useEffect, useState } from "react"
import { Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import FastImage from "react-native-fast-image"
import images from "../../assets/images"
import Helper from "../../common/Helper"
import Util from "../../common/util"
import { fontSizes, spacing } from "../../common/variables"
import Header from "../../components/Header"
import LoaderComponent from "../../components/LoaderComponent"
import MyButton from "../../components/MyButton"
import MyTextInput from "../../components/MyTextInput"
import PhotoPicker from "../../components/PhotoPicker"
import { navigateAndReset } from "../../navigators/RootNavigation"
import styles from "./styles"
const OnBoardPhoto = (props) => {
    const { navigation, route } = props
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(null)
    const [userType,setUserType] = useState("User")
    const [websiteName,setWebsiteName] = useState("")
    const [webUrl,setWebUrl] = useState("")
    useEffect(()=>{
        AsyncStorage.getItem('userType')
        .then(val=>{
            if(val!=null){
                setUserType(val)
            }
        })
    },[])
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    // useEffect(()=>{
    //     if(profilePic){
    //         handleNavigation()
    //     }
    // },[profilePic])
    const handleNavigation = async() => {
        const uid = auth().currentUser.uid
        if (websiteName.trim().length && !webUrl.trim().length) {
            Keyboard.dismiss()
            Toast.show({
                description:"Please provide Website Name with Website Url"
            })
            return
        }
        if (!websiteName.trim().length && webUrl.trim().length) {
            Keyboard.dismiss()
            Toast.show({
                description:"Please provide Website Name with Website Url"
            })
            return
        }
            try {
                setLoading(true)
                const obj = {
                    profileCompleted: true,
                }
                if(profilePic){
                const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profilePic)
                    obj.profilePic = profileUrl
                }
                if(webUrl.trim().length){
                    obj.webUrl = webUrl.trim()
                }
                if(websiteName.trim().length){
                    obj.websiteName = websiteName.trim()
                }
                firestore()
                .collection("Users")
                .doc(uid)
                .update(
                    obj
                )
                .then(() => {
                    setLoading(false)
                    navigateAndReset("HomeScreen")
                })
                
            } catch (error) {
                setLoading(false)
                //console.log(error)
            }
        // }
    }
    // const handleSkip = async() => {
    //     const uid = auth().currentUser.uid
    //     try {
    //         setLoading(true)
    //         firestore()
    //         .collection("Users")
    //         .doc(uid)
    //         .update(
    //             {
    //                 profileCompleted: true,
    //             }
    //         )
    //         .then(() => {
    //             setLoading(false)
    //             navigateAndReset("HomeScreen")
    //         })
            
    //     } catch (error) {
    //         setLoading(false)
    //         //console.log(error)
    //     }
    // }
    return (
        <View
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header navigation={navigation} title="Let's complete your profile" />
            {/* <Text style={styles.subText}>Personal Information</Text> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainView}>
                <HStack>
                    <View style={styles.topView}>
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
                    </View>
                    <VStack mt={5} ml={2}>
                        <Text style={styles.upload}>UPLOAD YOUR PICTURE</Text>
                        <Text style={styles.uploadSub}>Upload a photo under 2 MB</Text>
                        <MyButton
                            title={"Upload"}
                            txtStyle={{ color: "white",fontSize:fontSizes.tiny }}
                            //loading={loading}
                            containerStyle={{
                                paddingVertical:6,
                                paddingHorizontal:10,
                                borderRadius:5,
                                alignSelf:"flex-start",
                                width:"auto",
                                marginTop:16
                                //marginTop:32,
                                //width:"70%"
                                // position: "absolute",
                                // bottom: spacing.large
                            }}
                            //loa
                            //icon={"chevron-right"}
                            onPress={() => onToggle()}
                        />
                    </VStack>
                </HStack>
                {
                    userType == "Supplier" &&
                    <MyTextInput
                        containerStyle={{marginTop:15}}
                        placeholder={"Enter Your Website Name"}
                        value={websiteName}
                        onChangeText={(txt)=>setWebsiteName(txt)}
                    />
                }
                {
                    userType == "Supplier" &&
                    <MyTextInput
                        containerStyle={{marginTop:15}}
                        placeholder={"Enter Your Website URL"}
                        value={webUrl}
                        onChangeText={(txt)=>setWebUrl(txt)}
                        keyboardType={"url"}
                    />
                }
                <MyButton
                    title={"Continue"}
                    txtStyle={{ color: "white" }}
                    //loading={loading}
                    containerStyle={{
                        marginTop:32,
                        width:"50%",
                        backgroundColor:'black',
                        //  position: "absolute",
                        //  bottom: spacing.large
                    }}
                    //loa
                    //icon={"chevron-right"}
                    onPress={() => handleNavigation()}
                />
            </View>
            </TouchableWithoutFeedback>
            <LoaderComponent visible={loading} title="Just a moment..."/>
            <PhotoPicker isOpen={isOpen} onClose={onClose} setImage={setProfilePic} />
        </View>
    )
}
export default OnBoardPhoto