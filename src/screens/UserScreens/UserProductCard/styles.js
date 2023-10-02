import { StyleSheet } from "react-native";
import { fontSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
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
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall
    }
})
export default styles