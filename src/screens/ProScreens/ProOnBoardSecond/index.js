import { find, remove } from "lodash"
import { Icon, ScrollView } from "native-base"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import { proGoals } from "../../../config/appConfig"
import styles from "./styles"
const ProOnBoardSecond = (props) => {
    const { navigation,route} = props
    const [skills, setSkills] = useState([])
    const {data} = route.params
    const handleNavigation = () => {
        if(skills.length == 0){
            Util.showMessage("error","Select atleast one skill")
            return
        }
        const newData = {
            ...data,
            skills:skills
        }
        navigation.navigate("ProOnBoardThird",{data:newData})
    }
    const handleSkill = (name,isSelected) => {
        if(isSelected){
            setSkills((prev)=>{
                let newSkills = prev
                console.log(prev)
                remove(newSkills,(skill)=>skill == name)
                return [...newSkills]
            })
        }
        else{
            setSkills((prev)=>{
                return [...prev,name]
            })
        }
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>Select your best skills</Text>
                <Text style={styles.subText}>This help us to know you better</Text>
                <View style={styles.userTypeView}>
                    {
                        proGoals.map(item => {
                            const isSelected = find(skills,(skill)=>skill == item.name)
                            return (
                                <TouchableOpacity
                                    key={item.index}
                                    onPress={() => handleSkill(item.name,isSelected)}
                                    style={[styles.userBox, isSelected && { borderColor: "#D9D9D9" }]}>
                                    <Text
                                        style={[styles.typeText, isSelected && { color: "#D9D9D9" }]}>
                                        {item.name}
                                    </Text>
                                    {
                                        isSelected &&
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
        </ScrollView>
    )
}
export default ProOnBoardSecond