import { Icon } from "native-base"
import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Util from "../../../common/util"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import MyButton from "../../../components/MyButton"
import colors from "../../../theme/colors"
import styles from "./styles"
import { geohashForLocation } from "geofire-common"
import images from "../../../assets/images"
import { Image } from "react-native"
import MyTextInput from "../../../components/MyTextInput"
const ProOnBoardThird = (props) => {
    const { navigation, route } = props
    const { data } = route.params
    const [selectedTab, setSelectedTab] = useState(1)
    const [address, setAddress] = useState({})
    const [fee, setFee] = useState("")
    const handleNavigation = () => {
        if (Object.keys(address).length == 0) {
            Util.showMessage("error","Please add a valid address")
            return
        }
        if(fee<=0){
            Util.showMessage("error","Please add a valid number")
            return
        }
        const hash = geohashForLocation([address.lat, address.lng])
        const newData = {
            ...data,
            address,
            geohash: hash,
            trainingFee:fee,
            trainingType:selectedTab == 1?"offline":"online"
        }
        navigation.navigate("ProOnBoardFourth", { data: newData })
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} back />
            <View style={styles.mainView}>
                <Text style={styles.areYou}>Professional details</Text>
                <Text style={styles.subText}></Text>
                <Text style={styles.title}>Professional Address</Text>
                <GooglePlacesAutocomplete
                    onPress={(data, details) => {
                        setAddress({
                            lat: details.geometry.location.lat,
                            lng: details.geometry.location.lng,
                            address: details.formatted_address
                        })
                    }}
                    renderRightButton={
                        () => <Icon
                            as={MaterialCommunityIcons}
                            size="lg"
                            color={colors.borderColor}
                            name="map-marker-outline"
                            style={{ alignSelf: "center" }}
                        />
                    }
                    fetchDetails={true}
                    placeholder="Address"
                    query={{
                        key: "AIzaSyDiDhePfa6TjIO53RDsCYguUekMQPuJBYU",
                        language: "en"
                    }}
                    textInputProps={{
                        placeholderTextColor: "white"
                    }}
                    styles={
                        {
                            container: { flex: 0 },
                            textInput: styles.autocompleteTxt,
                            textInputContainer: styles.autocomplete
                        }
                    }
                />
                <Text style={styles.title}>Training Type</Text>
                <View style={styles.userTypeView}>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(1)}
                        style={[styles.userBox, selectedTab == 1 && { borderColor: "#D9D9D9" }]}>
                        <Text
                            style={[styles.typeText, selectedTab == 1 && { color: "#D9D9D9" }]}>
                            Offline
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
                            Online
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
                <MyTextInput
                    containerStyle={{ marginTop:spacing.mediumLarge}}
                    iconName={"currency-usd"}
                    //isPass
                    placeholder={"Training Fee (Per Hour)"}
                    placeholderTextColor={"white"}
                    value={fee}
                    onChangeText={(txt) => setFee(txt.replace(/[^0-9.]/g, ''))}
                    keyboardType="number-pad"
                />


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
export default ProOnBoardThird