import { startCase } from "lodash"
import { HStack, Icon, Image, VStack } from "native-base"
import React from "react"
import { Pressable, Text } from "react-native"
import FastImage from "react-native-fast-image"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import images from "../../../../../assets/images"
import Util from "../../../../../common/util"
import colors from "../../../../../theme/colors"
import styles from "./styles"
const TrainerCard = (props) => {
    const { data, navigation } = props
    const { profilePic, name, skills, experience, ratingObj, ratingCount } = data
    const handleNavigation = () => {
        navigation.navigate("TrainerProfile",{data})
    }
    return (
        <Pressable style={styles.container} onPress={handleNavigation}>
            <HStack space={2} justifyContent="space-evenly" alignItems={"center"}>
                <FastImage
                    source={profilePic ? { uri: profilePic } : images.trainer}
                    defaultSource={images.imagePlaceholder}
                    resizeMode="cover"
                    style={{borderRadius:6,width:70,height:70}}
                />
                <VStack space={1} flex={1}>
                    <HStack space={1}>
                        <Text style={styles.name}>{startCase(name)}</Text>
                        <HStack alignItems={"center"} space={1} py={0.5} px={2} bg={"white"} borderRadius={3}>
                            <Icon as={MaterialCommunityIcons}
                                name="star"
                                color={colors.ratingColor}
                                size={4}
                            />
                            <Text style={styles.rating}>{Util.calculateRating(ratingObj,ratingCount)}</Text>
                        </HStack>
                    </HStack>
                    <Text style={styles.skill}>
                        {skills.join(", ")}
                    </Text>
                    <Text style={styles.skill}>
                        {experience} years experience
                    </Text>
                </VStack>
                <Icon as={MaterialCommunityIcons}
                    size="xl"
                    name="chevron-right"
                    color="gray.300"
                />

            </HStack>
        </Pressable>
    )
}
export default TrainerCard