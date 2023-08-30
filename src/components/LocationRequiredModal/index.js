import { Image, Modal, Text, View } from "react-native"
import styles from "./styles"
import React from "react"
import images from "../../assets/images"
import Header from "../Header"
import MyButton from "../MyButton"
import { HStack } from "native-base"
import colors from "../../theme/colors"
const LocationRequiredModal = (props) => {
    const {visible, closeModal, handleLocation,handleNotNow} = props
    return(
        <Modal visible={visible}>
            <Header/>
            <View style={styles.container}>
                <Image
                    source={images.locationImage}
                />
                <Text style={styles.title}>
                    Explore vendor spaces nearby you.
                </Text>
                <Text style={styles.subtitle}>
                    Your location helps us bring you to better spaces to find.
                </Text>
            </View>
            <HStack bottom={5} px={4} justifyContent="space-evenly">
                <MyButton
                    title={"Enable Location"}
                    containerStyle={styles.btn}
                    onPress={handleLocation}
                />
                <MyButton
                    title={"Not Now"}
                    containerStyle={styles.notNow}
                    onPress={handleNotNow}
                    txtStyle={{color:colors.appPrimary}}
                />
            </HStack>
        </Modal>
    )
}
export default LocationRequiredModal