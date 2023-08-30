import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:colors.backgroundColor,
        padding:spacing.medium,
       // paddingTop:insets.top
    },
    noSpaces:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    topView:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    hello:{
        color:"black",
        fontSize:fontSizes.small,
        fontFamily:fonts.medium
    },
    name:{
        color:"black",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold
    },
    searchBox:{
        borderWidth:1,
        borderColor:colors.borderColor,
        borderRadius:spacing.small,
        padding:spacing.medium,
        marginVertical:spacing.medium,
        flexDirection:"row",
        alignItems:"center",
        flex:1,
    },
    placeholder:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    filterView:{
        justifyContent:"center",
        alignItems:"center",
        padding:spacing.medium,
        borderRadius:spacing.small,
        borderWidth:1,
        borderColor:colors.borderColor,
    },
    imageStyle:{
        width:Util.getWidth(90),
        aspectRatio:16/9,
        borderRadius:spacing.small,
        marginRight:10
    },
    detailsView:{
        alignSelf:"baseline",
        backgroundColor:"rgba(255, 255, 255, 0.9)",
        margin:10,
        padding:spacing.small,
        borderRadius:spacing.extraSmall,
        maxWidth:"80%"
    },
    spaceTitle:{
        color:"black",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold
    },
    subtitle:{
        color:"black",
        fontSize:fontSizes.tiny,
        fontFamily:fonts.regular
    },
    category:{
        color:"rgba(0, 0, 0, 0.5)",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold,
        textAlign:'center'
    },
    categoryView:{
        borderWidth:1,
        borderColor:"rgba(0, 0, 0, 0.26)",
        width:Util.getWidth(27),
        marginHorizontal:spacing.small,
        paddingHorizontal:spacing.extraExtraSmall,
        paddingVertical:spacing.medium,
        borderRadius:spacing.small,
        justifyContent:"center",
        alignContent:"center"
    }
})
export default styles