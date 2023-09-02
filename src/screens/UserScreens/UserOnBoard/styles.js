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
        padding:spacing.medium,
        //flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
       // marginBottom:spacing.small
        //backgroundColor:"white"
    },
    title:{
        color:colors.greyText,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.tiny,
        marginTop:spacing.medium,
        marginBottom:spacing.extraExtraSmall
    },
    txt:{
        color:"white",
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
    }
})
export default styles