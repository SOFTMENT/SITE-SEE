import auth from '@react-native-firebase/auth';
import { Image } from 'native-base';
import React from "react";
import {View } from "react-native";
import { connect } from "react-redux";
import images from '../../../assets/images';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
const ProProfile = (props)=> {
    const {navigation,userData,state} = props
    const {profilePic,name} = userData
    const logout = () => {
        auth().signOut()
        .then(()=>{
            navigateAndReset("UserSelectScreen")
        }
        )
    }
    const editPress = () => {
        logout()
    }
    return(
        <View style={styles.container}>
        <Header back navigation={navigation} title="Profile"
            rightIcon={"square-edit-outline"}
            onRightIconPress={editPress}
        />
        <View style={styles.topView}>
            <Image
                source={profilePic?{uri:profilePic}:images.defaultUser}
                loadingIndicatorSource={images.defaultUser}
                resizeMode="contain"
                size={150}
                alt={name}
                borderRadius={6}
                borderWidth={5}
                borderColor={"rgb(99,99,99)"}
                bgColor={profilePic?"none":"white"}
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
export default connect(mapStateToProps)(ProProfile)