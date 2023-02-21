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
    mainView:{
        padding:spacing.medium
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
    amount:{
        color:"white",
        fontFamily:fonts.medium,
        fontSize:responsiveSize(12),
    },
    cardView:{
        width:"100%",
        height:Util.getHeight(7),
        // borderWidth:1,
        // borderColor:colors.borderColor,
         borderRadius:spacing.small,
         borderWidth:1,
         borderColor:colors.borderColor,
    },
     cardInner:{
        backgroundColor:colors.backgroundColor,
        textColor:colors.appPrimaryLight,
        borderRadius:spacing.small,
        fontSize:responsiveSize(13),
        fontFamily:fonts.textMedium,
        placeholderColor:colors.appPrimaryLight,
       
    },
    title:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.tiny,
        marginTop:spacing.medium,
        marginBottom:spacing.extraExtraSmall
    },
    hour:{
        flex:1,
        margin:spacing.extraSmall,
        backgroundColor:"#272729",
        borderColor:colors.borderColor,
        borderWidth:1,
        borderRadius:spacing.extraSmall,
        paddingHorizontal:spacing.extraExtraSmall,
        paddingVertical:spacing.semiMedium,
        justifyContent:"center",
        alignItems:"center"
    },

})
export default styles