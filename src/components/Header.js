import React from "react"
import { Platform, StyleSheet, Text, View } from "react-native"
import fonts from "../../assets/fonts"
import Util from "../common/util"
import { fontSizes, itemSizes, spacing } from "../common/variables"
import { Back } from "./ExportedComponents"
const Header = (props) => {
    const {navigation,title,extraStyle,back, signout} = props
    return(
        <View style={[styles.container,extraStyle]}>
            {back&&<Back navigation={navigation}/>}
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
export default Header
const styles = StyleSheet.create({
    container:{
        backgroundColor:"transparent",
        padding:Platform.OS == "ios"?spacing.medium:spacing.medium,
        paddingTop: Platform.OS == 'ios' ? Util.getHeight(5) :spacing.medium,
        flexDirection:"row",
        alignItems:'center'
    },
    title:{
        //flex:1,
        //textAlign:"center",
        color:"#333",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraSmall,
        flex:1,
        marginLeft:spacing.medium
    },
    backArrow:{
        width:itemSizes.item30,
        height:itemSizes.item30,
        tintColor:"white"
    },
})