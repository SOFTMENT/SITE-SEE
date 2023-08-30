import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(255,255,255,1)',
        padding:spacing.medium,
    },
    buyMemb:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium
    },
    card:{
        padding:spacing.small,
        height:250,
        borderRadius:spacing.small,
        width:250,
        justifyContent:"center",
        alignItems:"center",
        marginTop:10
    },
    longText:{
        fontSize:fontSizes.extraExtraSmall,
        color:"gray",
        fontFamily:fonts.regular,
        textAlign:"center",
        marginTop:30,
        marginHorizontal:10
    },
    title:{
        fontSize:fontSizes.small,
        color:"black",
        fontFamily:fonts.semiBold,
        //marginTop:spacing.extraLarge
    },
    cardText:{
        fontSize:fontSizes.large,
        color:"white",
        fontFamily:fonts.semiBold,
    },
    pm:{
        fontSize:fontSizes.extraExtraSmall,
        color:"white",
        fontFamily:fonts.regular,
        textAlign:"center",
        marginTop:10
    },
    btn: {
        borderColor: colors.btnColor,
        borderWidth: 2,
        alignItems: 'center',
        backgroundColor: colors.white,
        width:"80%",
        marginTop:20,
        paddingVertical:30
      },
      text: {
        color: colors.btnColor,
        //fontFamily:fonts.semiBold
      },
})
export default styles