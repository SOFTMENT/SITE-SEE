import { Avatar, HStack, Icon, IconButton, Input } from "native-base"
import React from "react"
import { Platform, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import images from "../../../assets/images"
import styles from "./styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { spacing } from "../../../common/variables"
const UserHome = () => {
    const insets = useSafeAreaInsets()
    return (
        <View style={[styles.container, Platform.OS == "ios" && { paddingTop: insets.top }]}>
            <View style={styles.topView}>
                <View>
                    <Text style={styles.hello}>Hello,</Text>
                    <Text style={styles.name}>Vaibhav Sharma</Text>
                </View>
                <Avatar
                    size={"lg"}
                    source={images.home}
                    bg={"gray.700"}
                >
                    VS
                </Avatar>
            </View>
            <HStack space={2} my={5}>
                <Input
                    placeholder="Search" 
                    variant="outlined" 
                    flex={1}
                    borderRadius={10} 
                    py={5}
                    color={"white"}
                    bg={"gray.800"}
                    //borderWidth={0}
                    InputLeftElement={
                        <Icon size={"xl"} 
                            name="magnify" 
                            color="gray.300" 
                            marginLeft={spacing.extraExtraSmall}
                            as={MaterialCommunityIcons} />
                    } 
                />
                <IconButton
                    variant={"solid"}
                    bg={"gray.800"}
                    borderRadius={10}
                    _icon={{
                        size:"xl" ,
                        name:"filter-variant" ,
                        color:"gray.300" ,
                        marginLeft:spacing.extraExtraSmall,
                        as:MaterialCommunityIcons
                    }}
                />
            </HStack>
        </View>
    )
}
export default UserHome