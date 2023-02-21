import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util, { responsiveSize } from "../../../common/util";
import { fontSizes, itemSizes, spacing } from "../../../common/variables";
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
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
    },
    userBox:{
        padding:spacing.mediumLarge,
        flex:0.45,
        flexDirection:"row",
        //height:Util.getWidth(25),
        borderColor:"#686767",
        borderWidth:2,
        borderRadius:spacing.medium,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:spacing.medium
    },
    typeText:{
        color:"#686767",
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(12),
        //marginTop:spacing.small
    },
    checked:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        position:"absolute",
        //top:8,
        right:8,
        tintColor:"#D9D9D9"
    },
    autocomplete:{
        borderRadius: spacing.small,
        borderWidth:1,
       // backgroundColor:"green",
        paddingHorizontal:spacing.extraSmall,
        paddingRight:spacing.semiMedium,
        borderColor: colors.borderColor,
        //alignItems: "center",
    },
    autocompleteTxt:{
        backgroundColor: "transparent",
        color:"white",
        fontFamily:fonts.regular,
        fontSize:responsiveSize(11),
    },
    title:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.tiny,
        marginTop:spacing.mediumLarge,
        marginBottom:spacing.extraExtraSmall
    },
})
export default styles