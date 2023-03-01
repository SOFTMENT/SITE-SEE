import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
        padding:spacing.medium,
       // paddingTop:insets.top
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    hello:{
        color:"white",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium
    },
    name:{
        color:"white",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold
    }
})
export default styles