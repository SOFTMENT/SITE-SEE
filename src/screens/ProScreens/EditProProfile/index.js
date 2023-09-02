import firestore from '@react-native-firebase/firestore';
import { Icon, ScrollView, Select } from 'native-base';
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect, useDispatch } from "react-redux";
import images from '../../../assets/images';
import Helper from '../../../common/Helper';
import Util from '../../../common/util';
import { fontSizes, spacing } from '../../../common/variables';
import Header from '../../../components/Header';
import LoaderComponent from '../../../components/LoaderComponent';
import MyTextInput from '../../../components/MyTextInput';
import SkillSetModal from '../../../components/SkillSetModal';
import WorkingTimeModal from '../../../components/WorkingTimeModal';
import { setUserData } from '../../../store/userSlice';
import colors from '../../../theme/colors';
import styles from "./styles";
const EditProProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name, email, gender, dob, height, weight, uid, thumbnailUrl, skills, workingTime,about, address } = userData
    const [profileImage, setProfileImage] = useState(null)
    const [thumbnailImage,setThumbnailImage] = useState(null)
    const [trainingVideo,setTrainingVideo] = useState(null)
    const [experience,setExperience] = useState(userData.experience)
    const[loaderVisible,setLoaderVisibile] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const[skillModal,setSkillModal] = useState(false)
    const handleSkills = (data) => {
        setSkillModal(false)
        if(data.length == 0)
        return
        try {
            updateUserData({
                skills:data,
            })
        } catch (error) {
            
        }
    }
    const handleWorkingTime = (data) => {
        //setNewWorkingTime(data)
        setShowModal(false)
        if(Object.keys(data).length == 0)
        return
        try {
            updateUserData({
                workingTime:Object.values(data),
            })
        } catch (error) {
            
        }
    }
    const dispatch = useDispatch()
    const editPress = () => {
        // logout()
    }
    // const updateProfile(uid,data) => {

    // }
    const handleExperience = (value) => {
        updateUserData({
            experience:value
        })
        setExperience(value)
    }
    const handleImageEdit = () => {
        Helper.pickDocument(true)
            .then(res => {
                setProfileImage(res)
                uploadImage()
                //updateUserData()
            })
            .catch((error) => {
                Util.showMessage("error", error, "")
            })
    }
    const uploadImage = async() => {
        try {
            const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profileImage)
            updateUserData({
                profilePic:profileUrl
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getUserData = () => {
        firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then(res => {
            dispatch(setUserData(res.data()))
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const updateUserData = (obj)=> {
        firestore()
        .collection("Users")
        .doc(uid)
        .update(obj)
        .then(()=>{
            Util.showMessage("success","Success","Profile updated!")
            getUserData()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const handleThumbnail = () => {
        Helper.pickDocument(true)
            .then(async res => {
                setThumbnailImage(res)
                try {
                    setLoaderVisibile(true)
                    const thumDownloadedUrl = await Helper.uploadImage(`ShortVideoThumbnail/${uid}`, res)
                    setLoaderVisibile(false)
                    updateUserData({
                        thumbnailUrl:thumDownloadedUrl
                    })
                } catch (error) {
                    console.log(error)
                }
                finally{
                    setLoaderVisibile(false)
                }
            })
            .catch((error) => {
                Util.showMessage("error", error, "")
            })
    }
    const handleVideo = () => {
        Helper.pickDocument(false)
            .then(async res => {
                setTrainingVideo(res)
                try {
                    setLoaderVisibile(true)
                    const videoDownloadUrl = await Helper.uploadImage(`ShortVideo/${uid}`, res)
                    updateUserData({
                        videoUrl:videoDownloadUrl
                    })
                } catch (error) {
                    console.log(error)
                }
                finally{
                    setLoaderVisibile(false)
                }
            })
            .catch((error) => {
                Util.showMessage("error", error, "")
            })
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header back navigation={navigation} title="Profile"
                // rightIcon={"square-edit-outline"}
                // onRightIconPress={editPress}
            />
            <View style={styles.topView}>
                <FastImage
                    source={{uri:profileImage?profileImage.uri:profilePic}}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="cover"
                    alt={name}
                    style={styles.image}
                >
                    <TouchableOpacity style={styles.imageEdit} onPress={handleImageEdit}>
                        <Icon
                            as={MaterialCommunityIcons}
                            name="pencil-outline"
                            color={"white"}
                            size="lg"
                        />
                    </TouchableOpacity>
                </FastImage>
            </View>
            <View style={{ flex: 1, padding: spacing.mediumLarge }}>
                <Text style={styles.heading}>Personal Details</Text>
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"account-outline"}
                    placeholder={"Name"}
                    value={name}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"email-outline"}
                    placeholder={"Email"}
                    value={email}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"gender-male-female"}
                    placeholder={"Gender"}
                    value={gender}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"calendar-range"}
                    placeholder={"Date of Birth"}
                    value={dob}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"human-male-height-variant"}
                    placeholder={"Height"}
                    value={height + " CM"}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"weight-kilogram"}
                    placeholder={"Weight"}
                    value={weight + " KG"}
                    lowerBorder
                    nonEditable={true}
                //onChangeText={(txt) => setLastName(txt)}
                />
                <Text style={[styles.heading,{marginTop:spacing.medium}]}>Professional Details</Text>
                <Text style={styles.subTitle}>Short Video</Text>
                <FastImage
                    source={{uri:thumbnailImage?thumbnailImage.uri: thumbnailUrl}}
                    resizeMode="cover"
                    defaultSource={images.imagePlaceholder}
                    style={styles.thumbnail}
                >
                    <TouchableOpacity>
                        <Icon
                            as={MaterialCommunityIcons}
                            name="play-circle"
                            size={"4xl"}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.videoText} onPress={handleVideo}>
                        <Text style={styles.labelText}>Change Video</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.thumbnailText} onPress={handleThumbnail}>
                        <Text style={styles.labelText}>Change Thumbnail</Text>
                    </TouchableOpacity>
                </FastImage>
                <Text style={styles.subTitle}>About</Text>
                <TouchableOpacity style={styles.subView} disabled>
                    <Text style={styles.subText}>{about}</Text>
                </TouchableOpacity>
                <Text style={styles.subTitle}>Address</Text>
                <TouchableOpacity style={styles.subView} disabled>
                    <Text style={styles.subText}>{address.address}</Text>
                </TouchableOpacity>
                <Text style={styles.subTitle}>Years Of Experience</Text>
                 <Select
                    accessibilityLabel="Select Experience"
                    placeholder="Select Experience"
                    placeholderTextColor={"white"}
                    px={1.5}
                    pb={Platform.OS=="ios"?3:1}
                    mx={2}
                    borderRadius={0}
                    // borderBottomWidth={1}
                    borderWidth={0}
                    borderBottomWidth={0.2}
                    borderBottomColor={colors.borderColor}
                    dropdownIcon={<Icon name="chevron-down" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                    selectedValue={experience}
                    color={"white"}
                    fontSize={fontSizes.extraExtraSmall}
                    fontWeight={"bold"}
                    onValueChange={(itemValue)=>handleExperience(itemValue)}
                >
                    {
                        Array.from({length:40},(_,i)=>i).map((item,index)=>{
                            return(
                                <Select.Item key={index} value={item.toString()} label={`${item} Years`} />
                            )
                        })
                    }
                </Select>
                <Text style={styles.subTitle}>Skills</Text>
                <TouchableOpacity style={styles.subView} onPress={()=>setSkillModal(true)}>
                    <Text style={styles.subText}>{skills.join(", ")}</Text>
                </TouchableOpacity>
                <Text style={styles.subTitle}>Working Time</Text>
                <TouchableOpacity style={styles.subView} onPress={()=>setShowModal(true)}>
                    <Text style={styles.subText}>{Object.keys(workingTime).length +" days"}</Text>
                </TouchableOpacity>
            </View>
            <LoaderComponent visible={loaderVisible} title="Uploading ..."/>
            <WorkingTimeModal showModal={showModal} handleWorkingTime={handleWorkingTime}/>
            <SkillSetModal showModal={skillModal} handleSkills={handleSkills}/>
        </ScrollView>
    )
}
const mapStateToProps = (state) => {
    return {
        state: state,
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(EditProProfile)