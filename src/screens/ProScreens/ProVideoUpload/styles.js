import { Platform, StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    textInput:{
        borderColor:colors.borderColor,
        borderWidth:1,
        borderRadius:spacing.small,
        paddingVertical:Platform.OS == "ios" ?15:10,
        paddingHorizontal:spacing.small,
        marginVertical:spacing.extraSmall,
        marginTop:spacing.small,
        color:"white"
    },
    uploadView:{
        borderColor:colors.borderColor,
        borderWidth:1,
        borderRadius:spacing.small,
        padding:15,
        paddingHorizontal:spacing.small,
        justifyContent:"space-between",
        alignItems:"center",
        marginVertical:spacing.extraSmall,
        flexDirection:"row",
    },
    thumbnailView:{
        borderColor:colors.borderColor,
        borderWidth:1,
        borderRadius:spacing.small,
        height:Util.getWidth(100)-spacing.medium*2,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:spacing.extraSmall,
        overflow:"hidden"
    },
    bottomView:{
        padding:spacing.medium
    },
    updateText:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    subtitle:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        marginTop:spacing.small
    },
    title:{
        color:"white",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold,
        marginTop:spacing.small
    },
})
export default styles