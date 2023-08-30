import { Avatar, Icon, IconButton } from "native-base"
import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import fonts from "../../assets/fonts"
import { fontSizes, itemSizes, spacing } from "../common/variables"
import { navigateAndReset } from "../navigators/RootNavigation"
import colors from "../theme/colors"
import AvatarIcon from "./AvatarIcon"
const AvatarHeader = (props) => {
    const {navigation,title,extraStyle,back, rightIcon,onRightIconPress,icon} = props
    const insets = useSafeAreaInsets()
    const handleBack = () => {
        try {
            if(navigation.canGoBack())
            {
                navigation.goBack()
            }
            else{
                navigateAndReset("UserSelectScreen")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <View style={[styles.container,extraStyle,{paddingTop:insets.top},Platform.OS=="android"&&{paddingTop:spacing.large}]}>
            {back?
                <IconButton 
                    onPress={handleBack}
                    _pressed={{backgroundColor:"transparent"}}
                    icon={
                        <Icon
                        as={MaterialCommunityIcons}
                        size="2xl"
                        name="chevron-left"
                        color={"white"}
                        />
                    }
                />
                    :
                <View/>
            }
            <AvatarIcon
                uri={icon}
                style={{borderWidth:2,borderColor:"white"}}
            />
            <Text style={styles.title}>{title}</Text>
            {
                rightIcon?
                <IconButton 
                    //bgColor={"red.100"} 
                    onPress={onRightIconPress}
                    _pressed={{backgroundColor:"transparent"}}
                    icon={
                        <Icon
                        as={MaterialCommunityIcons}
                        size="xl"
                        name={rightIcon}
                        color={"white"}
                    />
                    }
                />
                :
                <View style={{margin:18}}/>
            }
        </View>
    )
}
export default AvatarHeader
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.btnColor,
        padding:spacing.medium,
        //paddingTop: Platform.OS == 'ios' ? Util.getHeight(5) :spacing.medium,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-evenly",
        borderBottomLeftRadius:spacing.medium,
        borderBottomRightRadius:spacing.medium
    },
    title:{
        //flex:1,
        //textAlign:"center",
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.small,
        flex:1,
        marginLeft:spacing.small
    },
    icon:{
        justifyContent:"center",
        alignItems:"center",
    },
    backArrow:{
        width:itemSizes.item30,
        height:itemSizes.item30,
        tintColor:"white"
    },
})