import { startCase } from "lodash"
import { HStack, VStack } from "native-base"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import fonts from "../../../../../../assets/fonts"
import images from "../../../../../assets/images"
import Util from "../../../../../common/util"
import MyButton from "../../../../../components/MyButton"
import { hours } from "../../../../../config/appConfig"
import styles from "./styles"
const BookingCard = (props) => {
    const { item, disabled, navigation } = props
    const { bookingId, trainerPic, amount, appointmentDate, appointmentTime, createTime, status, trainerId, trainingType, userId, trainerName, reviewDone, userName, amountCredited } = item
    const handleNav = () => {
        navigation.navigate("WriteReview", { bookingData: item })
    }
    const handleWithdraw = () => {
        if (!isWithdrawable) {
            Util.showMessage("error", "Oops!", "You can withdraw money after 7 days from the date of training completion")
        }
    }
    return (
        <TouchableOpacity style={styles.container} disabled={disabled}>
            <HStack space={2} justifyContent="space-evenly" alignItems={"center"}>
                <FastImage
                    source={{ uri: trainerPic }}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="cover"
                    style={{ borderRadius: 6, width: 70, height: 70 }}
                //borderWidth={5}
                //borderColor={"rgb(99,99,99)"}
                //bgColor={profileUrl?"none":"white"}
                //tintColor={profileUrl?"none"}
                />
                <VStack space={1} flex={1}>
                    <HStack space={1}>
                        <Text style={styles.name}>{startCase(userName)}</Text>
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
                    <Text style={styles.status}>AED {amount}</Text>
                    {/* <Text style={styles.skill}>{status}</Text> */}
                </VStack>
            </HStack>
            {
                status == "Completed" && !amountCredited &&
                <Text style={styles.info}>Your money will be credited to your balance 7 days after the appointment completion.</Text>
            }
             {
                status == "Completed" && amountCredited &&
                <Text style={styles.info}>Amount credited to your balance.</Text>
            }
            <HStack justifyContent={"space-evenly"} space={2}>
                {
                    status == "Completed" && !reviewDone &&
                    <MyButton
                        title={"Write a review"}
                        containerStyle={{ padding: 8, marginTop: 8, flex: 1 }}
                        onPress={handleNav}
                        txtStyle={{ fontFamily: fonts.medium }}
                    //onPress={handleRegister}
                    //loading={loading}
                    />
                }
                {/* {
                status == "Completed" && 
                <MyButton
                    title={"Withdraw"}
                    containerStyle={{padding:8,marginTop:8,flex:1}}
                    onPress={handleWithdraw}
                    txtStyle={{fontFamily:fonts.medium}}
                //onPress={handleRegister}
                //loading={loading}
                />
            } */}
            </HStack>
        </TouchableOpacity>
    )
}
export default BookingCard