import { Text, TouchableOpacity, View } from "react-native"
import React from "react"
import styles from "./styles"
import { HStack, Icon, IconButton, Image, VStack } from "native-base"
import images from "../../../../../assets/images"
import Util from "../../../../../common/util"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { startCase } from "lodash"
import colors from "../../../../../theme/colors"
import { spacing } from "../../../../../common/variables"
import FastImage from "react-native-fast-image"
const TrainerCard = (props) => {
    const { data,disabled } = props
    const { profilePic, name, skills, experience, ratingObj, ratingCount} = data
    return (
        <TouchableOpacity style={styles.container} disabled={disabled}>
            <HStack space={2} justifyContent="space-evenly" alignItems={"center"}>
                <FastImage
                    source={profilePic ? { uri: profilePic } : images.trainer}
                    defaultSource={images.trainer}
                    resizeMode="cover"
                    style={{borderRadius:6,width:70,height:70}}
                //borderWidth={5}
                //borderColor={"rgb(99,99,99)"}
                //bgColor={profileUrl?"none":"white"}
                //tintColor={profileUrl?"none"}
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
                            {/* <Text style={styles.rating}>{Util.calculateRating(ratingObj,ratingCount)}</Text> */}
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
        </TouchableOpacity>
    )
}
export default TrainerCard