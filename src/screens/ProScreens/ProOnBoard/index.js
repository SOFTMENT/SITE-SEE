import { isEmpty } from "lodash"
import { Icon, ScrollView, Select } from "native-base"
import React, { useState } from "react"
import { Image, Platform, Text, TouchableOpacity, View } from "react-native"
import DatePicker from "react-native-date-picker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import WorkingTimeModal from "../../../components/WorkingTimeModal"
import colors from "../../../theme/colors"
import styles from "./styles"
const ProOnBoard = (props) => {
    const { navigation } = props
    const [selectedTab, setSelectedTab] = useState(1)
    const [dob, setDob] = useState(new Date())
    const [weight, setWeight] = useState("60")
    const [height, setHeight] = useState("180")
    const [experience, setExperience] = useState("0")
    const [workingTime,setWorkingTime] = useState({})
    const [show, setShow] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const toggleDateFilter = () => {
        setShow(true)
    }
    const toggleWorkingTime = () => {
        
    }
    const handleWorkingTime = (data) => {
        setWorkingTime(data)
        setShowModal(false)
    }
    const handleNavigation = () => {
        if (!height) {
            Util.showMessage("error", "Please provide height", "")
        }
        else if (!weight) {
            Util.showMessage("error", "Please provide weight")
        }
        else if (!experience) {
            Util.showMessage("error", "Please provide weight")
        }
        else if(isEmpty(workingTime)){
            Util.showMessage("error","Please provide working time","")
        }
        else {
            const data = {
                weight,
                height,
                dob: Util.getFormattedDate(dob),
                experience,
                workingTime:Object.values(workingTime),
                gender:selectedTab ==1 ? "female" : "male"
            }
            navigation.navigate("ProOnBoardSecond", { data })
        }

    }
    return (
        <ScrollView style={styles.container} bounces={false}>
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
                    px={spacing.medium}
                    py={Platform.OS=="ios"?4:2}
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
                                <Select.Item value={item.toString()} label={`${item} KG`} key={index} />
                            )
                        })
                    }
                </Select>
                 <Text style={styles.title}>Your Height</Text>
                 <Select
                    accessibilityLabel="Select Height"
                    placeholder="Select Height"
                    px={spacing.medium}
                    py={Platform.OS=="ios"?4:2}
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
                                <Select.Item value={item.toString()} label={`${item} CM`} key={index} />
                            )
                        })
                    }
                </Select>
                <Text style={styles.title}>Years Of Experience</Text>
                 <Select
                    accessibilityLabel="Select Experience"
                    placeholder="Select Experience"
                    px={spacing.medium}
                    py={Platform.OS=="ios"?4:2}
                    borderRadius={spacing.small}
                    borderWidth={1}
                    borderColor={colors.borderColor}
                    dropdownIcon={<Icon name="calendar-plus" as={MaterialCommunityIcons} size="md" marginRight={3} />}
                    selectedValue={experience}
                    color={"white"}
                    onValueChange={(itemValue)=>setExperience(itemValue)}
                >
                    {
                        Array.from({length:40},(_,i)=>i).map((item,index)=>{
                            return(
                                <Select.Item key={index} value={item.toString()} label={`${item} Years`} />
                            )
                        })
                    }
                </Select>
                <Text style={styles.title}>Working Time</Text>
                <TouchableOpacity style={styles.datePicker} onPress={()=>setShowModal(true)}>
                    <Text style={styles.txt}>{isEmpty(workingTime)?"Choose Working Time":Object.keys(workingTime).length +" days"}</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        name="calendar-clock-outline"
                        size={"md"}
                    />
                </TouchableOpacity>
                <MyButton
                    title={"Next"}
                    txtStyle={{ color: "black" }}
                    containerStyle={{
                        // position: "absolute",
                        // bottom: spacing.large,
                        marginTop:spacing.large
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
            <WorkingTimeModal showModal={showModal} handleWorkingTime={handleWorkingTime}/>
        </ScrollView>
    )
}
export default ProOnBoard