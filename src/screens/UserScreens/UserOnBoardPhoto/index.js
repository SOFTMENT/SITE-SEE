import { Icon } from "native-base"
import React, { useState } from "react"
import { Image, Pressable, Text, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Helper from "../../../common/Helper"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import styles from "./styles"

const UserOnBoardPhoto = (props) => {
    const { navigation, route } = props
    const [profilePic,setProfilePic] = useState(null)
    const handleNavigation = () => {
        if(profilePic==null){
            Util.showMessage("error","Please select a profile pic","")
            return
        }
        const newData = {
            profilePic
        }
        navigation.navigate("UserOnBoard", { data: newData })
    }
    const handleImage = () => {
        Helper.pickDocument(true)
        .then(res=>{
            //console.log(res.uri)
            setProfilePic(res)
        })
        .catch((error)=>{
            Util.showMessage("error",error,"")
        })
    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>Choose your profile pic</Text>
                {/* <Text style={styles.subText}>This help us create your personalized plan</Text> */}
                <View style={styles.userTypeView}>
                    <Pressable style={styles.upload} onPress={handleImage}>
                        <View style={styles.center}>
                            {
                                profilePic?
                                <Image
                                    source={{uri:profilePic.uri}}
                                    resizeMode="cover"
                                    style={{width:200,height:200}}
                                />:
                                <Icon
                                    name="image-edit-outline"
                                    as={MaterialCommunityIcons}
                                    size={50}
                                />
                            }
                            {/* <Text style={styles.title}>{"Profile Pic"}</Text> */}
                        </View>
                    </Pressable>
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
export default UserOnBoardPhoto