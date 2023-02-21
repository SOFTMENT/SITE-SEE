import auth from '@react-native-firebase/auth';
import { Image } from 'native-base';
import React from "react";
import { View } from "react-native";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import images from '../../../assets/images';
import { spacing } from '../../../common/variables';
import AccountMenuList from '../../../components/AccountMenuList';
import Header from '../../../components/Header';
import MyTextInput from '../../../components/MyTextInput';
import { navigateAndReset } from "../../../navigators/RootNavigation";
import styles from "./styles";
const EditUserProfile = (props) => {
    const { navigation, userData, state } = props
    const { profilePic, name, email, gender, dob, height, weight } = userData
    const logout = () => {
        auth().signOut()
            .then(() => {
                navigateAndReset("UserSelectScreen")
            }
            )
    }
    const editPress = () => {
       // logout()
    }
    return (
        <View style={styles.container}>
            <Header back navigation={navigation} title="Profile"
                rightIcon={"square-edit-outline"}
                onRightIconPress={editPress}
            />
            <View style={styles.topView}>
                <FastImage
                    source={profilePic ? { uri: profilePic } : images.defaultUser}
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
            <View style={{ flex: 1,padding:spacing.mediumLarge }}>
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
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        state: state,
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(EditUserProfile)