import auth from '@react-native-firebase/auth';
import { Image } from 'native-base';
import React from "react";
import {Alert, View } from "react-native";
import { connect } from "react-redux";
import images from '../../../assets/images';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
const UserProfile = (props)=> {
    const {navigation,userData,state} = props
    const {profilePic,name} = userData
    const logout = async () => {
        try {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text:"No",
                        onPress:()=>{

                        }
                    },
                    {
                        text:"Yes",
                        onPress:async()=>{
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
    const handleLogout = () => {
        logout()
    }
    return(
        <View style={styles.container}>
        <Header back navigation={navigation} title="My Account"
            rightIcon={"logout-variant"}
            onRightIconPress={logout}
        />
        <View style={styles.topView}>
            <Image
               source={profilePic?{uri:profilePic}:images.defaultUser}
                defaultSource={images.imagePlaceholder}
                resizeMode="contain"
                size={150}
                alt={name}
                borderRadius={6}
                borderWidth={5}
                borderColor={"rgb(99,99,99)"}
                //bgColor={"white"}
                //tintColor={profileUrl?"none"}
            />
        </View>
        <View style={{flex:1}}>
            <AccountMenuList navigation={navigation} isUser={true}/>
        </View>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        state:state,
        userData:state.user.userData
    }
}
export default connect(mapStateToProps)(UserProfile)