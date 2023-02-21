import { Icon, Select } from "native-base"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import DatePicker from "react-native-date-picker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import colors from "../../../theme/colors"
import styles from "./styles"
const UserOnBoard = (props) => {
    const { navigation ,route} = props
    const {data} = route.params
    const [selectedTab, setSelectedTab] = useState(1)
    const [dob, setDob] = useState(new Date())
    const [weight, setWeight] = useState("60")
    const [height, setHeight] = useState("180")
    const [show, setShow] = useState(false)
    const toggleDateFilter = () => {
        setShow(true)
    }
    const handleNavigation = () => {
        if (!height) {
            Util.showMessage("error", "Please provide height", "")
        }
        else if (!weight) {
            Util.showMessage("error", "Please provide weight")
        }
        else {
            const newData = {
                ...data,
                weight,
                height,
                dob: Util.getFormattedDate(dob),
                gender:selectedTab ==1 ? "female" : "male"
            }
            navigation.navigate("UserOnBoardSecond", { data:newData })
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
                <Text style={[styles.title,{marginTop:spacing.large}]}>Date of Birth</Text>
                <TouchableOpacity style={styles.datePicker} onPress={toggleDateFilter}>
                    <Text style={styles.txt}>{Util.getFormattedDate(dob)}</Text>
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
                <Text style={styles.title}>Your Weight</Text>
                <Select
                    accessibilityLabel="Select Weight"
                    placeholder="Select Weight"
                    p={4}
                    borderRadius={spacing.small}
                    borderWidth={1}
                    borderColor={colors.borderColor}
                    dropdownIcon={<Icon name="weight-kilogram" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                    selectedValue={weight}
                    color={"white"}
                    onValueChange={(itemValue)=>setWeight(itemValue)}
                >
                    {
                        Array.from({length:100},(_,i)=>i+31).map((item,index)=>{
                            return(
                                <Select.Item key={index} value={item.toString()} label={`${item} KG`} />
                            )
                        })
                    }
                </Select>
                 <Text style={styles.title}>Your Height</Text>
                 <Select
                    accessibilityLabel="Select Height"
                    placeholder="Select Height"
                    padding={4}
                    borderRadius={spacing.small}
                    borderWidth={1}
                    borderColor={colors.borderColor}
                    dropdownIcon={<Icon name="human-male-height-variant" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                    selectedValue={height}
                    color={"white"}
                    onValueChange={(itemValue)=>setHeight(itemValue)}
                >
                    {
                        Array.from({length:300},(_,i)=>i+31).map((item,index)=>{
                            return(
                                <Select.Item key={index} value={item.toString()} label={`${item} CM`} />
                            )
                        })
                    }
                </Select>
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
export default UserOnBoard