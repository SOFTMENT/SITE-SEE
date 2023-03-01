import auth from '@react-native-firebase/auth';
import { Image, ScrollView } from 'native-base';
import React from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import images from '../../../assets/images';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
const ProProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name } = userData
    const logout = () => {
        auth().signOut()
            .then(() => {
                navigateAndReset("UserSelectScreen")
            }
            )
    }
    const editPress = () => {
        logout()
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} title="My Account"
                rightIcon={"square-edit-outline"}
                onRightIconPress={editPress}
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