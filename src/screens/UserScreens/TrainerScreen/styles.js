import { Platform, StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    contaienr: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    thumImage: {
        width: "100%",
        height: Util.getHeight(30)
    },
    playIcon: {
        position: "absolute",
        alignSelf: "center",
        top: Util.getHeight(13)
    },
    backIcon: {
        position: "absolute",
        top: Platform.OS == "ios" ? Util.getHeight(5) : 10,
        left: 10
    },
    name:{
        color:"white",
        fontSize:fontSizes.small,
        fontFamily:fonts.semiBold
    },
    rate:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.semiBold
    },
    rating:{
        fontSize:responsiveSize(11),
        color:colors.subText,
        fontFamily:fonts.semiBold
    },
    about:{
        fontSize:responsiveSize(11),
        color:colors.subText,
        fontFamily:fonts.medium
    },
    wTime:{
        fontSize:fontSizes.extraExtraSmall,
        color:"white",
        fontFamily:fonts.semiBold,
        marginVertical:spacing.medium
    },
    btn:{
        marginVertical:spacing.large
    }
})
export default styles