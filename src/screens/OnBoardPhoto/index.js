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
import { useSelector } from "react-redux"
const OnBoardPhoto = (props) => {
    const { navigation, route } = props
    const [profilePic, setProfilePic] = useState(null)
    const [loading, setLoading] = useState(null)
    const {userType} = useSelector(state=>state.user.userData)
    const [websiteName,setWebsiteName] = useState("")
    const [webUrl,setWebUrl] = useState("")
    const [businessName,setBusinessName] = useState('')
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    const handleNavigation = async() => {
        const uid = auth().currentUser.uid
        if(userType == "Suppliers"){
            if(businessName.trim().length){
                const res = await checkForDuplicateUsername()
                if(res){
                    Keyboard.dismiss()
                    Toast.show({
                        description:"This business name is already taken."
                    })
                    return
                }
            }
            else{
                Keyboard.dismiss()
                Toast.show({
                    description:"Please enter a valid business name."
                })
            }
            
        }
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
                if(businessName.trim().length){
                    obj.businessName = businessName.trim()
                }
                if(webUrl.trim().length){
                    obj.webUrl = webUrl.trim()
                }
                if(websiteName.trim().length){
                    obj.websiteName = websiteName.trim()
                }
                firestore()
                .collection(userType)
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
    const checkForDuplicateUsername = async() => {
        const docs = await firestore()
          .collection("Suppliers")
          .where("businessName","==",businessName)
          .get()
          if(docs.empty){
            return false
          }
          else{
            return true
          }
      }
    const onBackPress = () => {
        auth().signOut()
        .then(()=>{
            navigateAndReset("OnboardingScreen")
        })
    }
    return (
        <View
            style={styles.container}
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Header back onBackPress={onBackPress} navigation={navigation} title="Let's complete your profile" />
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

                            }}
                            //loa
                            //icon={"chevron-right"}
                            onPress={() => onToggle()}
                        />
                    </VStack>
                </HStack>
                {
                    userType == "Suppliers" &&
                    <MyTextInput
                        containerStyle={{marginTop:15}}
                        placeholder={"Enter Your Business Name"}
                        value={businessName}
                        onChangeText={(txt)=>setBusinessName(txt)}
                    />
                }
                {
                    userType == "Suppliers" &&
                    <MyTextInput
                        containerStyle={{marginTop:15}}
                        placeholder={"Enter Your Website Name"}
                        value={websiteName}
                        onChangeText={(txt)=>setWebsiteName(txt)}
                    />
                }
                {
                    userType == "Suppliers" &&
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