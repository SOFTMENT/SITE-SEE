import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { fontSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    img:{
        width:"100%",
        aspectRatio:1,
        borderRadius:spacing.semiMedium
    },
    title:{
        color:colors.white,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraSmall
    },
    name:{
        color:colors.white,
        fontFamily:fonts.medium,
        fontFamily:fonts.regular
    }
})
export default styles