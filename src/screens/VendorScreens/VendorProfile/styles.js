import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.backgroundColor,
        flex:1
    },
    topView:{
       //backgroundColor:"#202020",
       width:Util.getWidth(50),
       aspectRatio:1,
       alignSelf:"center",
       justifyContent:"center",
       alignItems:"center",
       padding:20,
       borderRadius:200,
       borderWidth:4,
       borderColor:'rgba(239, 51, 65, 0.03)'
    },
    insideView:{
        width:Util.getWidth(40),
        aspectRatio:1,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        padding:20,
        borderRadius:200,
        borderWidth: 3, 
        borderColor: "rgba(185, 41, 106, 0.17)", 
        borderRadius: 200 
    },
    image:{ 
        width:Util.getWidth(30), 
        aspectRatio:1,
        borderRadius: 200 
    },
    name:{
        textAlign:"center",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold,
        color:"black",
        marginTop:spacing.medium,
        marginBottom:spacing.extraExtraSmall
    },
    email:{
        textAlign:"center",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        color:"gray",
        marginVertical:spacing.extraExtraSmall
    },
    orderView:{
        backgroundColor:colors.appPrimary,
        padding:spacing.medium,
        marginHorizontal:spacing.mediumLarge,
        borderRadius:spacing.small
    },
    value:{
        textAlign:"center",
        fontSize:fontSizes.medium,
        fontFamily:fonts.bold,
        color:"white",
    },
    title:{
        textAlign:"center",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium,
        color:"white",
    }
})