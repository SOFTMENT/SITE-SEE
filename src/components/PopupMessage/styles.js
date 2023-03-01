import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flexGrow:1,
        alignItems:"center",
        justifyContent: 'center',
        backgroundColor:colors.modalBackgraound,
    },
    modal:{
        backgroundColor:colors.backgroundColor,
        padding:spacing.large,
        borderRadius:spacing.semiMedium,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:2,
        borderColor:colors.borderColor
    },
    lottieContainer:{
        width:Util.getWidth(40),
        aspectRatio:1,
        borderRadius:spacing.large,
    },
    txtStyle:{
        color:colors.white,
        fontSize:responsiveSize(20),
        fontFamily:fonts.textBold
    },
    btn:{
        width:Util.getWidth(60),
        alignItems:"center",
        paddingHorizontal:spacing.large,
        paddingVertical:spacing.medium,
        backgroundColor:colors.btnColor,
        borderRadius:spacing.small
    },
    btnText:{
        fontFamily:fonts.textBold,
        color:colors.whiteText,
        fontSize:responsiveSize(14)
    }
})