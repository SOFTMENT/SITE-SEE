import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { HStack, ScrollView, useDisclose, VStack } from 'native-base';
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from "react-redux";
import images from '../../../assets/images';
import Helper from '../../../common/Helper';
import { spacing } from '../../../common/variables';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import PhotoPicker from '../../../components/PhotoPicker';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore'
import Util from '../../../common/util';
import { setUserData } from '../../../store/userSlice';
const VendorProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name,uid } = userData
    const {favorites,orderCount} = useSelector(state => state.user)
    const [profileImage, setProfileImage] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        if (profileImage) {
            uploadImage()
        }
    }, [profileImage])
    const uploadImage = async () => {
        try {
            const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`, profileImage)
            updateUserData({
                profilePic: profileUrl
            })
        } catch (error) {
            console.log(error)
        }
    }
    const updateUserData = (obj) => {
        firestore()
            .collection("Users")
            .doc(uid)
            .update(obj)
            .then(() => {
                Util.showMessage("success", "Success", "Profile updated!")
                getUserData()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getUserData = () => {
        firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then(res => {
                dispatch(setUserData(res.data()))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleProfile = () => {
        onToggle()
    }
    const {
        isOpen,
        onToggle,
        onClose,
        onOpen
    } = useDisclose();
    
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title="Account"
                // rightIcon={"logout"}
                // onRightIconPress={logout}
            />
            <View style={styles.topView}>
                <View style={styles.insideView}>
                    <TouchableOpacity onPress={handleProfile}>
                        <FastImage
                            source={profilePic ? { uri: profilePic } : images.defaultUser}
                            defaultSource={images.imagePlaceholder}
                            resizeMode="cover"
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
            {/* <HStack justifyContent={"space-evenly"} style={styles.orderView}>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("Orders")}>
                    <VStack justifyContent={"center"} flex={1}>
                        <Text style={styles.value}>{orderCount}</Text>
                        <Text style={styles.title}>{"Orders"}</Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onPress={()=>navigation.navigate("FavoritesScreen")}>
                    <VStack justifyContent={"center"} flex={1}>
                        <Text style={styles.value}>{favorites.length}</Text>
                        <Text style={styles.title}>{"Favourites"}</Text>
                    </VStack>
                </TouchableOpacity>
            </HStack> */}
            <View style={{ flex: 1, paddingHorizontal: spacing.small }}>
                <AccountMenuList navigation={navigation} isUser={false} />
            </View>
            <PhotoPicker
                isOpen={isOpen}
                onClose={onClose}
                //isVideo={mode == "video"}
                setImage={setProfileImage}
                //isCover={mode == "image"}
            />
        </ScrollView>
    )
}
const mapStateToProps = (state) => {
    return {
        state: state,
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(VendorProfile)