import { startCase } from "lodash"
import { Avatar, HStack, Icon, IconButton, Image, Link, ScrollView } from "native-base"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../assets/images"
import { spacing } from "../../../common/variables"
import MyButton from "../../../components/MyButton"
import colors from "../../../theme/colors"
import styles from "./styles"
import firestore from '@react-native-firebase/firestore'
import Util from "../../../common/util"
import auth from '@react-native-firebase/auth'
import { workingTime as workingArr } from "../../../config/appConfig"
var colorss = ['red.500', 'green.500', 'blue.500', 'orange.500', 'yellow.500'];
const TrainerScreen = (props) => {
    const { navigation, route } = props
    const { data } = route.params
    const { thumbnailUrl, videoUrl, name, ratingCount,ratingObj, experience, trainingFee, about, workingTime, uid, profilePic } = data
    const [chatActive,setChatActive] = useState(false)
    const [reviews,setReviews] = useState([])
    useEffect(()=>{
        checkActiveBooking()
        loadReviews()
    },[])
    const loadReviews = () => {
        firestore()
        .collection("Users")
        .doc(uid)
        .collection("Reviews")
        .limit(5)
        .get()
        .then((snapshot)=>{
            const l = []
            snapshot.forEach(doc=>{
                l.push(doc.data())
            })
            setReviews(l)
        })
    }
    const checkActiveBooking = () => {
        try {
            firestore()
            .collection("bookings")
            .where("status","==","Active")
            .where("trainerId","==",uid)
            .where("userId","==",auth().currentUser.uid)
            .get()
            .then((sanpShot)=>{
                if(sanpShot.size>0){
                    setChatActive(true)
                }
            })
            
        } catch (error) {
           
        }
    }
    const handleVideo = () => {
        navigation.navigate("VideoPlayer", { videoUrl })
    }
    const sort = (arr) => {
        return arr.sort((a, b) => a.index - b.index)
    }
    const bookAppointment = () => {
        navigation.navigate("AppointmentScreen",{data})
    }
    const handleChat = () => {
        const lastMessage={
            senderImage:profilePic,
            senderUid:uid,
            senderName:name
        }
        navigation.navigate("ChatScreen",{lastMessage})
    }
    return (
        <ScrollView style={styles.contaienr} bounces={false} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
                style={styles.thumImage}
                onPress={handleVideo}
            >
                <IconButton
                    onPress={() => navigation.goBack(null)}
                    _pressed={{ backgroundColor: "transparent" }}
                    style={styles.backIcon}
                    zIndex={100}
                    icon={
                        <Icon
                            as={MaterialCommunityIcons}
                            size="4xl"
                            name="chevron-left"
                            color={"white"}
                        />
                    }
                />
                 <FastImage
                    source={{ uri: thumbnailUrl }}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="cover"
                    alt="thumbnail"
                    style={{ flex: 1 }}
                    //bgColor={"white"}
                    //tintColor={profileUrl?"none"}
                />
                <Icon
                    name="play-circle"

                    size={"4xl"}
                    as={MaterialCommunityIcons}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
            <View style={{ padding: spacing.medium }}>
                <HStack alignItems={"center"} justifyContent="space-between">
                    <Text style={styles.name}>{startCase(name)}</Text>
                    <Text style={styles.rate}>$ {trainingFee}</Text>
                </HStack>
                <HStack alignItems={"center"} space={1} my={2} justifyContent="space-evenly">
                    <HStack flex={1} alignItems="center">
                        <Icon as={MaterialCommunityIcons}
                            name="star"
                            color={colors.ratingColor}
                            size={5}
                        />
                        <Text style={styles.rating}>{ratingCount == 0 ? " No reviews yet" : ` ${Util.calculateRating(ratingObj,ratingCount)}  ( ${ratingCount} reviews )`}</Text>
                    </HStack>
                    <HStack flex={1} alignItems={"center"}>
                        <Icon as={MaterialCommunityIcons}
                            name="shield-star"
                            color={colors.ratingColor}
                            size={5}
                        />
                        <Text style={styles.rating}> {experience} years of experience</Text>
                    </HStack>
                </HStack>
                <Text style={styles.wTime}>Working time</Text>
                {/* {sort(workingTime).map(time => {
                    return (
                        <HStack key={time.index}>
                            <Text style={[styles.about, { flex: 0.3 }]}>
                                {`${time.day}`}
                            </Text>
                            <Text style={styles.about}>
                                {` ${time.startTime} - ${time.endTime}`}
                            </Text>
                        </HStack>
                    )
                })} */}
                {
                    workingArr.map((item)=>{
                        const time = workingTime.find(w=>w.day == item.day)
                        return(
                            <HStack key={item.index} space={5} my={0.5} alignItems={"center"}>
                                <Text style={[styles.about, { flex: 0.3 }]}>
                                    {time?`${time.day}`:item.day}
                                </Text>
                                {
                                    time?
                                    <Text style={styles.about}>
                                    {`${time.startTime} - ${time.endTime}`}
                                    </Text>:
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        name="cancel"
                                        //alignSelf={"flex-end"}
                                    />
                                }
                            </HStack>
                        )
                    })
                }
                <Text style={styles.wTime}>About</Text>
                <Text style={styles.about}>{about}</Text>
                <Text style={styles.wTime}>Reviews</Text>
                <HStack mx={5} alignItems={"center"} justifyContent="space-between">
                    <Avatar.Group max={5}>
                        {
                            reviews.map(rev=>{
                                return(
                                    <AvatarIcon uri={rev.userPic} size={40}/>
                                )
                            })
                        }
                    </Avatar.Group>
                    <Link
                        onPress={() => navigation.navigate("ReviewScreen",{trainerData:data})}
                        _text={{
                            color: "white",
                            fontWeight: 800
                        }}
                    >
                        View Reviews
                    </Link>
                </HStack>
                <MyButton
                    title={"Book Appointment"}
                    containerStyle={styles.btn}
                    onPress={bookAppointment}
                    icon={
                        <Icon as={MaterialCommunityIcons}
                            name="chevron-right"
                            color={"black"}
                            size={6}
                        />
                    }
                //onPress={handleRegister}
                //loading={loading}
                />
               {
                chatActive &&
                 <MyButton
                 onPress={handleChat}
                 title={"Message"}
                 txtStyle={{color:"white"}}
                 containerStyle={{backgroundColor:"transparent",borderColor:"white",borderWidth:1}}
                 //containerStyle={styles.btn}
                //onPress={handleRegister}
                //loading={loading}
                />
               }
            </View>
        </ScrollView>
    )
}
export default TrainerScreen