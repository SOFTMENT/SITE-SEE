import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    review:{
        fontFamily:fonts.semiBold,
        color:"white",
    },
    rating:{
        fontSize:responsiveSize(10),
        color:"black",
        fontFamily:fonts.semiBold
    },
    name:{
        color:colors.white,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraSmall,
        marginLeft:spacing.small
    },  
    mainView:{
        padding:spacing.medium,
        flex:1
    },
    listItem:{
        backgroundColor:"#2f2e2e",
        marginVertical:spacing.small,
        borderRadius:spacing.small,
        padding:spacing.medium
    },
    ago:{
        position:'absolute',
        right:0,
        color:colors.white,
        fontFamilyL:fonts.regular,
        fontSize:fontSizes.tiny
    },
    reviewText:{
        color:colors.subText,
        fontFamilyL:fonts.light,
        fontSize:responsiveSize(12),
        marginTop:spacing.small
    },
    left:{
        flex:0.3,
        color:"#FFC462",
        fontSize:fontSizes.extraExtraLarge,
        fontFamily:fonts.medium,
        marginLeft:20
    },
    ratingNum:{
        color:"#FFC462",
        fontSize:fontSizes.tiny,
        fontFamily:fonts.medium,
        flex:0.1,
    }
})
export default styles