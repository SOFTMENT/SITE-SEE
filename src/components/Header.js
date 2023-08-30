import { Icon, IconButton } from "native-base"
import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import fonts from "../../assets/fonts"
import { fontSizes, itemSizes, spacing } from "../common/variables"
import { navigateAndReset } from "../navigators/RootNavigation"
const Header = ({navigation,title,extraStyle,back, rightIcon,onRightIconPress,rightIconColor,onBackPress}) => {
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
        <View style={[styles.container,extraStyle,{paddingTop:insets.top}]}>
            {back?
                <IconButton 
                    onPress={ onBackPress ? onBackPress : handleBack}
                    _pressed={{backgroundColor:"transparent"}}
                    icon={
                        <Icon
                        as={MaterialCommunityIcons}
                        size="2xl"
                        name="chevron-left"
                        color={"gray.700"}
                        />
                    }
                />
                    :
                <View/>
            }
            <Text style={[styles.title,back&&{marginLeft:-5}]}>{title}</Text>
            {
                rightIcon?
                <IconButton 
                    //bgColor={"red.100"} 
                    onPress={onRightIconPress}
                    _pressed={{backgroundColor:"transparent"}}
                    icon={
                        <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name={rightIcon}
                        color={rightIconColor?rightIconColor:"gray.700"}
                    />
                    }
                />
                :
                <View style={{margin:18}}/>
            }
        </View>
    )
}
export default Header
const styles = StyleSheet.create({
    container:{
        backgroundColor:"transparent",
        padding:spacing.medium,
        //paddingTop: Platform.OS == 'ios' ? Util.getHeight(5) :spacing.medium,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-evenly"
    },
    title:{
        //flex:1,
        //textAlign:"center",
        color:"rgba(0, 0, 0, 0.77)",
        fontFamily:fonts.bold,
        fontSize:fontSizes.medium,
        flex:1,
        marginLeft:40,
        textAlign:"center",
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