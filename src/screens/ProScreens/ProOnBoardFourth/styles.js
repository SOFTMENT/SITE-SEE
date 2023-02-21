import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    areYou: {
        fontFamily: fonts.bold,
        fontSize: fontSizes.medium,
        textAlign: 'center',
        color: "white",
        //marginBottom:spacing.large
        marginTop: spacing.extraExtraLarge,
    },
    subText: {
        fontFamily: fonts.semiBold,
        marginTop: spacing.semiMedium,
        marginBottom: spacing.extraExtraLarge,
        fontSize: responsiveSize(11.5),
        textAlign: 'center',
        color: "white",
    },
    gender: {
        fontFamily: fonts.semiBold,
        marginTop: spacing.medium,
        marginBottom: spacing.large,
        fontSize: fontSizes.extraExtraSmall,
        textAlign: 'center',
        color: "white",
    },
    mainView:{
        padding: spacing.extraExtraLarge,
        paddingTop:0,
        flex:1,
    },
    userTypeView:{
        flexDirection:'column',
        //justifyContent:"space-between",
        alignItems:'center',
        marginTop:spacing.large
    },
    upload:{
        borderStyle:"dashed",
        borderWidth:2,
        borderColor:colors.borderColor,
        width:"100%",
        height:200,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:spacing.small
    },
    title:{
        color:"white",
        fontFamily: fonts.semiBold,
        marginTop:spacing.small
    },
    center:{
        alignItems:"center"
    }
})
export default styles