import auth from '@react-native-firebase/auth';
import { Image, ScrollView } from 'native-base';
import React, { useState } from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import images from '../../../assets/images';
import Util from '../../../common/util';
import { spacing } from '../../../common/variables';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import MyTextInput from '../../../components/MyTextInput';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore'
const EditUserProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name, email, gender, dob, height, weight } = userData
    const [myName,setName] = useState(name)
    const [editable,setEditable] = useState(false)
    const logout = () => {
        auth().signOut()
            .then(() => {
                navigateAndReset("UserSelectScreen")
            }
            )
    }
    const editPress = () => {
        setEditable(true)
       // logout()
    }
    const onSubmitEdit = () => {
        if(myName.trim().length == 0){
            Util.showMessage("error","Please enter a valid name")
            return
        }
        const data = {
            name:myName.trim()
        }
        updateProfile(auth().currentUser.uid,data)
        setEditable(false)
    }
    const updateProfile = (uid,data) => {
        try {
            firestore()
            .collection("Users")
            .doc(uid)
            .update(data)
            .then(()=>Util.showMessage("success","Profile updated successfully"))
        } catch (error) {
            Util.showMessage("error","Somthing went wrong")
        }
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header back navigation={navigation} title="Profile"
                rightIcon={editable?"check":"square-edit-outline"}
                onRightIconPress={editable?onSubmitEdit:editPress}
            />
            <View style={styles.topView}>
                <FastImage
                    source={profilePic ? { uri: profilePic } : images.defaultUser}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="contain"
                    alt={name}
                    style={styles.image}
                //bgColor={"white"}
                //tintColor={profileUrl?"none"}
                />
            </View>
            <View style={{ flex: 1,padding:spacing.mediumLarge }}>
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"account-outline"}
                    placeholder={"Name"}
                    value={myName}
                    lowerBorder
                    onChangeText={(txt)=>{setName(txt)}}
                    nonEditable={!editable}
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
                    value={height+" CM"}
                    lowerBorder
                    nonEditable={true}
                    //onChangeText={(txt) => setLastName(txt)}
                />
                 <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"weight-kilogram"}
                    placeholder={"Weight"}
                    value={weight+" KG"}
                    lowerBorder
                    nonEditable={true}
                    //onChangeText={(txt) => setLastName(txt)}
                />
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
export default connect(mapStateToProps)(EditUserProfile)