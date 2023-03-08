import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
        padding:spacing.medium,
       // paddingTop:insets.top
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    hello:{
        color:"white",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium
    },
    name:{
        color:"white",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold
    },
    searchBox:{
        // borderWidth:1,
        // borderColor:colors.borderColor,
        borderRadius:spacing.small,
        padding:spacing.medium,
        marginVertical:spacing.medium,
        flexDirection:"row",
        alignItems:"center",
    },
    placeholder:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    }
})
export default styles