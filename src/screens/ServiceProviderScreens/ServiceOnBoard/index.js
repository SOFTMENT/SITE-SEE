import { Image, Modal, Text, View } from "react-native"
import styles from "./styles"
import React from "react"
import images from "../../../assets/images"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigateAndReset } from "../../../navigators/RootNavigation"
const ServiceOnBoard = (props) => {
    const {navigation} = props
    const handleNavigation = () => {
        navigation.navigate("ServiceOnBoardPhoto")
    }
    return(
        <View style={styles.container}>
            <Header back navigation={navigation} onBackPress={
                async ()=>{
                    await AsyncStorage.setItem("userType","Advertiser")
                    navigateAndReset("SplashScreen")
                }
            }/>
            <View style={styles.container}>
                <Image
                    source={images.serviceProvider}
                />
                <Text style={styles.title}>
                Give a designing service to advertisers.
                </Text>
                {/* <Text style={styles.subtitle}>
                    Your location helps us bring you to better spaces to find.
                </Text> */}
            </View>
            <MyButton
                title={"Post Offering"}
                containerStyle={styles.btn}
                onPress={handleNavigation}
            />
        </View>
    )
}
export default ServiceOnBoard