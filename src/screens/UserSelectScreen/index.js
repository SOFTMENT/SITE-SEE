import { Icon, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import images from "../../assets/images";
import MyButton from '../../components/MyButton';
import styles from "./styles";
const UserSelectScreen = (props) => {
    const { navigation } = props
    const [selectedTab, setSelectedTab] = useState(1)
    const handleNavigation = () => {
        navigation.navigate("UserLogin", { selectedTab })
    }
    return (
        <View style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <View
                style={styles.imageView}>
                <Image
                    source={images.userSelect}
                    style={styles.onboardImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.bottomView}>
                <Text style={styles.nowShow}>Select Your Category</Text>
                <View style={styles.userTypeView}>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(1)}
                            style={[styles.userBox, selectedTab == 1 && { borderColor: "#D9D9D9" }]}>
                            <Image
                                source={images.select1}
                                resizeMode="contain"
                                style={[styles.selectImage,selectedTab == 1 && {tintColor:"#D9D9D9"}]}
                            />
                            {
                                selectedTab == 1 &&
                                <Image
                                    source={images.checked}
                                    style={styles.checked}
                                    resizeMode="contain"
                                />
                            }
                        </TouchableOpacity>
                        <Text
                            style={[styles.typeText, selectedTab == 1 && { color: "#D9D9D9" }]}>
                            I am User.
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => setSelectedTab(2)}
                            style={[styles.userBox, selectedTab == 2 && { borderColor: "#D9D9D9" }]}>
                            <Image
                                source={images.select2}
                                resizeMode="contain"
                                style={[styles.selectImage,selectedTab == 2 && {tintColor:"#D9D9D9"}]}
                            />
                            {
                                selectedTab == 2 &&
                                <Image
                                    source={images.checked}
                                    style={styles.checked}
                                    resizeMode="contain"
                                />
                            }
                        </TouchableOpacity>
                        <Text
                            style={[styles.typeText, selectedTab == 2 && { color: "#D9D9D9" }]}>
                            I am Trainer.
                        </Text>
                    </View>
                </View>
                <MyButton
                    title={"Next"}
                    txtStyle={{color:"black"}}
                    icon={<Icon 
                        as={MaterialCommunityIcons} 
                        name="chevron-right" 
                        color="black"  
                        size={"lg"}
                    />}
                    onPress={()=>handleNavigation()}
                />
            </View>
        </View>
    )
}
export default UserSelectScreen