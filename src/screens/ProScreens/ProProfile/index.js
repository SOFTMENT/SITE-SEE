import auth from '@react-native-firebase/auth';
import { Image, ScrollView } from 'native-base';
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import FastImage from 'react-native-fast-image';
import { connect, useDispatch } from "react-redux";
import images from '../../../assets/images';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore'
import { ACCOUNT_RETRIVE, RETURN_URL } from '../../../config/Networksettings';
import AppConstant from '../../../config/Constants';
import axios from 'axios';
import { setUserData } from '../../../store/userSlice';
import Util from '../../../common/util';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const ProProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name } = userData
    const dispatch = useDispatch()
    const uid = auth().currentUser.uid
    const handleDynamicLink = async (link) => {
        const response = await firestore().collection("Users").doc(uid).get()
        const accId = response.data().accountId
        console.log(link)
        // Handle dynamic link inside your own application
        if (link.url === RETURN_URL) {
          console.log("hereeee")
          await getAccountInfo(accId)
          //navigation.navigate("Account")
        }
      };
      const getAccountInfo = async (accId) => {
        if (accId) {
          try {
            var body = new FormData()
            body.append('account_id', accId)
            const response = await axios({
              method: AppConstant.POST,
              url: ACCOUNT_RETRIVE,
              data: body,
            })
            const stripeObj = response.data
            console.log(stripeObj)
            console.log("here1")
            if (stripeObj.payouts_enabled) {
              await firestore().collection("Users").doc(uid).update({
                accountStatus: true
              })
    
              const userData = await firestore().collection("Users").doc(uid).get()
              dispatch(setUserData(userData.data()))
            }
          } catch (error) {
            Util.showMessage("error","Error","Something went wrong")
          }
        }
      }
      useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        return () => unsubscribe();
      }, [])
      const logout = async () => {
        try {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "No",
                        onPress: () => {

                        }
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            auth()
                                .signOut()
                                .then(() => navigateAndReset("UserSelectScreen"));
                        }
                    }
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title="My Account"
                rightIcon={"logout"}
                onRightIconPress={logout}
            />
            <View style={styles.topView}>
                <FastImage
                    source={profilePic ? { uri: profilePic } : images.defaultUser}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="contain"
                    style={{ width: 150, height: 150, borderWidth: 5, borderColor: "rgb(99,99,99)", borderRadius: 6 }}
                //alt={name}
                // borderRadius={6}
                // borderWidth={5}
                // borderColor={"rgb(99,99,99)"}
                //bgColor={"white"}
                //tintColor={profileUrl?"none"}
                />
            </View>
            <View style={{ flex: 1 }}>
                <AccountMenuList navigation={navigation} isUser={false} />
            </View>
        </ScrollView>
    )
}
const mapStateToProps = (state) => {
    return {
        state: state,
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(ProProfile)