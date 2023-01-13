import { Icon } from "native-base"
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
const UserOnBoardThird = (props) => {
    const { navigation,route} = props
    const [selectedTab, setSelectedTab] = useState(0)
    const {data} = route.params
    const uid = auth().currentUser.uid
    const handleNavigation = () => {
        try {
            firestore()
            .collection("Users")
            .doc(uid)
            .update({
                physicalActivityLevel:physicalLevel[selectedTab].name,
                ...data,
                profileCompleted:true
            })  
            .then(()=>{
                navigateAndReset("UserBottomTab")
            })
        } catch (error) {
            
        }
    }
    return (
        <View style={styles.container}>
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
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="chevron-right"
                        color="black"
                        size={"lg"}
                    />}
                    onPress={() => handleNavigation()}
                />
            </View>
        </View>
    )
}
export default UserOnBoardThird