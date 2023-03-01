import { startCase } from "lodash"
import { HStack, Icon, VStack } from "native-base"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import fonts from "../../../../../../assets/fonts"
import images from "../../../../../assets/images"
import MyButton from "../../../../../components/MyButton"
import { hours } from "../../../../../config/appConfig"
import colors from "../../../../../theme/colors"
import styles from "./styles"
const BookingCard = (props) => {
    const { item,disabled, navigation } = props
    const { bookingId,trainerPic,amount,appointmentDate, appointmentTime, createTime, status, trainerId, trainingType,userId, trainerName,reviewDone } = item
    const handleNav = () => {
        navigation.navigate("WriteReview",{bookingData:item})
    }
    return (
        <TouchableOpacity style={styles.container} disabled={disabled}>
            <HStack space={2} justifyContent="space-evenly" alignItems={"center"}>
                <FastImage
                    source={{uri:trainerPic}}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="cover"
                    style={{borderRadius:6,width:70,height:70}}
                //borderWidth={5}
                //borderColor={"rgb(99,99,99)"}
                //bgColor={profileUrl?"none":"white"}
                //tintColor={profileUrl?"none"}
                />
                <VStack space={1} flex={1}>
                    <HStack space={1}>
                        <Text style={styles.name}>{startCase(trainerName)}</Text>
                        {/* <HStack alignItems={"center"} space={1} py={0.5} px={2} bg={"white"} borderRadius={3}>
                            <Icon as={MaterialCommunityIcons}
                                name="star"
                                color={colors.ratingColor}
                                size={4}
                            />
                            <Text style={styles.rating}>{0}</Text>
                        </HStack> */}
                    </HStack>
                    <Text style={styles.status}>
                       {startCase(trainingType)} Training
                    </Text>
                    <Text style={styles.skill}>
                       {appointmentDate}   {hours[appointmentTime].label}
                    </Text>
                </VStack>
                <VStack>
                    <Text style={styles.status}>${amount}</Text>
                    {/* <Text style={styles.skill}>{status}</Text> */}
                </VStack>
            </HStack>
            {
                status == "Completed" && !reviewDone &&
                <MyButton
                    title={"Write a review"}
                    containerStyle={{padding:8,marginTop:8}}
                    onPress={handleNav}
                    txtStyle={{fontFamily:fonts.medium}}
                //onPress={handleRegister}
                //loading={loading}
                />
            }
        </TouchableOpacity>
    )
}
export default BookingCard