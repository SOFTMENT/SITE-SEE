import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        padding:spacing.medium,
        backgroundColor:colors.backgroundColor
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:30
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
    title:{
        fontSize:fontSizes.extraSmall,
        color:colors.btnColor,
        fontFamily:fonts.semiBold
    }
})
export default styles