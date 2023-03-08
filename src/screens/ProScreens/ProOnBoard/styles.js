import { Platform, StyleSheet } from "react-native";
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
        //marginTop: spacing.extraExtraLarge,
    },
    textArea:{
        //backgroundColor:"rgba(217,217,217,0.2)",
        borderRadius:spacing.small,
        padding:spacing.medium,
        paddingTop:20,
        paddingBottom:20,
        height:100,
        color:"white",
        //marginBottom:spacing.medium,
        fontSize:responsiveSize(11.5),
        fontFamily:fonts.regular,
        borderColor:"#686767",
        borderWidth:2,
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
        //marginTop: spacing.small,
        marginBottom: spacing.large,
        fontSize: fontSizes.extraExtraSmall,
        textAlign: 'center',
        color: "white",
    },
    placeholderText: {
        fontSize: fontSizes.tiny,
        color: "white",
        fontFamily: fonts.semiBold,
        marginBottom:spacing.extraExtraSmall,
        marginTop:10
    },
    mainView:{
        padding: spacing.extraExtraLarge,
        paddingTop:0,
        flex:1,
    },
    userTypeView:{
        width:"100%",
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
    },
    userBox:{
        padding:10,
        width:Util.getWidth(38),
        height:Util.getWidth(25),
        borderColor:"#686767",
        borderWidth:2,
        borderRadius:spacing.large,
        justifyContent:'center',
        alignItems:'center',
    },
    typeText:{
        color:"#686767",
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(12),
        marginTop:spacing.small
    },
    checked:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        position:"absolute",
        top:8,
        right:8,
        tintColor:"#D9D9D9"
    },
    datePicker:{
        borderRadius:spacing.small,
        borderColor:colors.borderColor,
        borderWidth:1,
       // marginTop:spacing.small,
        //paddingVertical: Platform.OS == "ios" ? spacing.medium : spacing.small,
        padding:spacing.medium,
        //flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
       // marginBottom:spacing.small
        //backgroundColor:"white"
    },
    txt:{
        color:"white",
        fontFamily:fonts.regular,
        fontSize:responsiveSize(11),
    },
    title:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.tiny,
        marginTop:spacing.medium,
        marginBottom:spacing.extraExtraSmall
    },
})
export default styles