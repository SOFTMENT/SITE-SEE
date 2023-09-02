import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    textArea:{
        backgroundColor:"rgba(217,217,217,0.2)",
        borderRadius:spacing.small,
        padding:spacing.medium,
        paddingTop:20,
        paddingBottom:20,
        height:250,
        color:"white",
        marginBottom:spacing.medium,
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.regular
    },
    ratingView:{
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginBottom:spacing.medium,
        alignItems:"center"
    },
    ratingText:{
        color:colors.backgroundColor,
        fontSize:fontSizes.medium,
        fontFamily:fonts.medium,
    },
    ratingCon:{
        backgroundColor:"#FFC462",
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20
    }
})