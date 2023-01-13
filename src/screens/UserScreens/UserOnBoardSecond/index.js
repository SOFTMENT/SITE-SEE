import { Icon } from "native-base"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import { userGoals } from "../../../config/appConfig"
import styles from "./styles"
import auth from '@react-native-firebase/auth';
const UserOnBoardSecond = (props) => {
    const { navigation,route} = props
    const [selectedTab, setSelectedTab] = useState(0)
    const {data} = route.params
    const handleNavigation = () => {
        const newData = {
            ...data,
            fitnessGoal:userGoals[selectedTab].name
        }
        navigation.navigate("UserOnBoardThird",{data:newData})
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>What's your goal?</Text>
                <Text style={styles.subText}>This help us create your personalized plan</Text>
                <View style={styles.userTypeView}>
                    {
                        userGoals.map(item => {
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
export default UserOnBoardSecond