import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(255,255,255,0.8)',
        padding:spacing.medium,
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:30,
    },
    hello:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium
    },
    name:{
        color:"black",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold
    },
    msg:{
        fontSize:fontSizes.extraSmall,
        color:colors.white,
        fontFamily:fonts.semiBold
    },
    title:{
        fontSize:fontSizes.small,
        color:colors.btnColor,
        fontFamily:fonts.semiBold,
        marginTop:spacing.extraLarge
    },
    subtitle:{
        fontSize:fontSizes.extraExtraSmall,
        color:"black",
        fontFamily:fonts.semiBold,
        marginTop:spacing.medium
    }
})
export default styles