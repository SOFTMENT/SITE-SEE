import { StyleSheet } from "react-native";
import fonts from "../../../../../../assets/fonts";
import { responsiveSize } from "../../../../../common/util";
import { fontSizes, spacing } from "../../../../../common/variables";
import colors from "../../../../../theme/colors";

export default StyleSheet.create({
    container:{
        backgroundColor:"#272729",
        borderColor:colors.borderColor,
        borderWidth:2,
        borderRadius:spacing.small,
        padding:spacing.medium
    },
    name:{
        color:"white",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold
    },
    skill:{
        fontSize:responsiveSize(10.5),
        color:"white",
        fontFamily:fonts.regular
    },
    rating:{
        fontSize:responsiveSize(10),
        color:"black",
        fontFamily:fonts.semiBold
    }
})