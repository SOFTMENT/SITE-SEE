import { StyleSheet } from "react-native";
import fonts from "../../../../../assets/fonts";
import Util, { responsiveSize } from "../../../../common/util";
import { fontSizes, spacing } from "../../../../common/variables";

const styles =  StyleSheet.create({
    container:{
        width:Util.getWidth(45),
        borderRadius:spacing.small,
        marginRight:10,
        backgroundColor:"white",
        elevation:0,
        margin:1
    },
    image:{
        width:"100%",
        aspectRatio:16/9
    },
    spaceTitle:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold
    },
    subtitle:{
        color:"rgba(0, 0, 0, 0.5)",
        fontSize:responsiveSize(10),
        fontFamily:fonts.regular
    },
})
export default styles