import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import images from "../../../assets/images"
import Header from "../../../components/Header"
import styles from "./styles"
import { Icon, Select } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-date-picker"
import MyTextInput from "../../../components/MyTextInput"
import { spacing } from "../../../common/variables"
import MyButton from "../../../components/MyButton"
import Util from "../../../common/util"
const UserOnBoard = (props) => {
    const { navigation } = props
    const [selectedTab, setSelectedTab] = useState(1)
    const [dob, setDob] = useState(new Date())
    const [weight,setWeight] = useState("")
    const [height,setHeight] = useState("")
    const [show, setShow] = useState(false)
    const toggleDateFilter = () => {
        setShow(true)
    }
    const handleNavigation = ()=> {
        if(!height){
            Util.showMessage("error","Please provide height","")
        }
        else if(!weight){
            Util.showMessage("error","Please provide weight")
        }
        else{
            const data = {
                weight,
                height,
                dob:dob.toDateString()
            }
            navigation.navigate("UserOnBoardSecond",{data})
        }
        
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>Let's complete your profile</Text>
                <Text style={styles.subText}>It will help us to know more about you</Text>
                <Text style={styles.gender}>Choose Gender</Text>
                <View style={styles.userTypeView}>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(1)}
                        style={[styles.userBox, selectedTab == 1 && { borderColor: "#D9D9D9" }]}>
                        <Text
                            style={[styles.typeText, selectedTab == 1 && { color: "#D9D9D9" }]}>
                            Female
                        </Text>
                        {
                            selectedTab == 1 &&
                            <Image
                                source={images.checked}
                                style={styles.checked}
                                resizeMode="contain"
                            />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(2)}
                        style={[styles.userBox, selectedTab == 2 && { borderColor: "#D9D9D9" }]}>
                        <Text
                            style={[styles.typeText, selectedTab == 2 && { color: "#D9D9D9" }]}>
                            Male
                        </Text>
                        {
                            selectedTab == 2 &&
                            <Image
                                source={images.checked}
                                style={styles.checked}
                                resizeMode="contain"
                            />
                        }
                    </TouchableOpacity>

                </View>
                <Text style={styles.title}>Date of Birth</Text>
                <TouchableOpacity style={styles.datePicker} onPress={toggleDateFilter}>
                    <Text style={styles.txt}>22/22/22</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        name="calendar-range-outline"
                        size={"md"}
                    />
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={show}
                    date={dob}
                    onConfirm={(date) => {
                        setShow(false)
                        setDob(date)
                    }}
                    onCancel={() => {
                        setShow(false)
                    }}
                    maximumDate={new Date()}
                    mode="date"
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"weight-kilogram"}
                    placeholder={"Your Weight"}
                    subPlace="In KG"
                    value={weight}
                    onChangeText={(txt) => setWeight(txt)}
                    keyboardType="numeric"
                />
                 <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    iconName={"human-male-height-variant"}
                    placeholder={"Your Height"}
                    subPlace="In CM"
                    value={height}
                    onChangeText={(txt) => setHeight(txt)}
                    keyboardType="numeric"
                />
                <MyButton
                    title={"Next"}
                    txtStyle={{color:"black"}}
                    containerStyle={{
                        position:"absolute",
                        bottom:spacing.large
                    }}
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
export default UserOnBoard