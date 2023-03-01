import { Icon, ScrollView } from "native-base"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import { physicalLevel, userGoals } from "../../../config/appConfig"
import styles from "./styles"
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { navigateAndReset } from "../../../navigators/RootNavigation"
import Helper from "../../../common/Helper"
const UserOnBoardThird = (props) => {
    const { navigation,route} = props
    const [selectedTab, setSelectedTab] = useState(0)
    const {data} = route.params
    const {profilePic} = data
    const uid = auth().currentUser.uid
    const [loading,setLoading] = useState(false)
    const handleNavigation = async() => {
        try {
            setLoading(true)
            const profileUrl = await Helper.uploadImage(`ProfilePic/${uid}`,profilePic)
            firestore()
            .collection("Users")
            .doc(uid)
            .update({
                physicalActivityLevel:physicalLevel[selectedTab].name,
                ...data,
                profileCompleted:true,
                profilePic:profileUrl
            })  
            .then(()=>{
                navigateAndReset("HomeScreen")
            })
            .finally(()=>{
                setLoading(false)
            })
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>{"Your regular physical \nactivity level?"}</Text>
                <Text style={styles.subText}>This help us create your personalized plan</Text>
                <View style={styles.userTypeView}>
                    {
                        physicalLevel.map(item => {
                            return (
                                <TouchableOpacity
                                    key={item.index}
                                    onPress={() => setSelectedTab(item.index)}
                                    style={[styles.userBox, selectedTab == item.index && { borderColor: "#D9D9D9" }]}>
                                    <Text
                                        style={[styles.typeText, selectedTab == item.index && { color: "#D9D9D9" }]}>
                                        {item.name}
                                    </Text>
                                    {
                                        selectedTab == item.index &&
                                        <Image
                                            source={images.checked}
                                            style={styles.checked}
                                            resizeMode="contain"
                                        />
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

                <MyButton
                    title={"Next"}
                    txtStyle={{ color: "black" }}
                    containerStyle={{
                        position: "absolute",
                        bottom: spacing.large
                    }}
                    loading={loading}
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="chevron-right"
                        color="black"
                        size={"lg"}
                    />}
                    onPress={() => handleNavigation()}
                />
            </View>
        </ScrollView>
    )
}
export default UserOnBoardThird