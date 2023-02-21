import { startCase } from "lodash"
import { Avatar, HStack, Icon, IconButton, Image, Link } from "native-base"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { spacing } from "../../../common/variables"
import MyButton from "../../../components/MyButton"
import colors from "../../../theme/colors"
import styles from "./styles"
var colorss = ['red.500', 'green.500', 'blue.500', 'orange.500', 'yellow.500'];
const TrainerScreen = (props) => {
    const { navigation, route } = props
    const { data } = route.params
    const { thumbnailUrl, videoUrl, name, rating, ratedBy, experience, rate = 0, about, workingTime, uid, profilePic } = data

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
        <View style={styles.contaienr}>
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
                <Image
                    source={{ uri: thumbnailUrl }}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                    alt="thumbnail"
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
                    <Text style={styles.rate}>$ {rate}</Text>
                </HStack>
                <HStack alignItems={"center"} space={1} my={2} justifyContent="space-evenly">
                    <HStack flex={1} alignItems="center">
                        <Icon as={MaterialCommunityIcons}
                            name="star"
                            color={colors.ratingColor}
                            size={5}
                        />
                        <Text style={styles.rating}>{rating == 0 ? " No reviews yet" : `${rating} (${ratedBy} reviews)`}</Text>
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
                {sort(workingTime).map(time => {
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
                })}
                <Text style={styles.wTime}>About</Text>
                <Text style={styles.about}>{about}</Text>
                <Text style={styles.wTime}>Reviews</Text>
                <HStack mx={5} alignItems={"center"} justifyContent="space-between">
                    <Avatar.Group max={5}>
                        {Array(10).fill().map((value, index) => {
                            //const color = colorss[Math.floor(Math.random() * colorss.length)];
                            return (
                                <Avatar bg={colorss[index]}>Aj</Avatar>
                            )
                        })}
                    </Avatar.Group>
                    <Link
                        //onPress={() => navigation.navigate("UserLogin", { tab })}
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
                <MyButton
                    onPress={handleChat}
                    title={"Message"}
                    txtStyle={{color:"white"}}
                    containerStyle={{backgroundColor:"transparent",borderColor:"white",borderWidth:1}}
                    //containerStyle={styles.btn}
                //onPress={handleRegister}
                //loading={loading}
                />
            </View>
        </View>
    )
}
export default TrainerScreen