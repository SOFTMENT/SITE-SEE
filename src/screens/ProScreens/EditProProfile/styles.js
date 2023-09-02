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
       backgroundColor:"#202020",
       width:"60%",
       alignSelf:"center",
       justifyContent:"center",
       alignItems:"center",
       paddingVertical:20,
       borderRadius:spacing.small
    },
    image:{
        width:150,
        height:150,
        borderRadius:spacing.small,
        borderWidth:spacing.extraSmall,
        borderColor:"rgb(99,99,99)"
    },
    imageEdit:{
        position:"absolute",
        bottom:5,
        right:5
    },
    subTitle:{
        fontSize: fontSizes.tiny,
        color: "rgba(255, 255, 255, 0.6)",
        fontFamily: fonts.semiBold,
        marginBottom:spacing.extraExtraSmall,
        marginLeft:spacing.semiMedium,
        marginTop:spacing.small
    },
    thumbnail:{
        // width:"100%",
        // height:100,
       width:"100%",
       height:Util.getHeight(25),
      // backgroundColor:"red",
       borderRadius:spacing.small,
       justifyContent:"center",
       alignItems:"center",
       marginVertical:spacing.extraSmall
    },
    thumbnailText:{
        position:"absolute",
        right:10,
        bottom:10,
        backgroundColor:colors.modalBackgraound,
        padding:spacing.extraSmall,
        borderRadius:spacing.small
    },
    videoText:{
        position:"absolute",
        left:10,
        bottom:10,
        backgroundColor:colors.modalBackgraound,
        padding:spacing.extraSmall,
        borderRadius:spacing.small
    },
    labelText:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium,
    },
    heading:{
        color:"white",
        fontFamily:fonts.bold,
        marginBottom:spacing.medium
    },
    subView:{
        paddingHorizontal:spacing.extraSmall,
        paddingVertical:spacing.extraSmall,
        paddingBottom:spacing.semiMedium,
        marginHorizontal:spacing.small,
        borderBottomWidth:0.3,
        borderBottomColor:colors.borderColor
    },
    subText:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall
        //marginBottom:spacing.medium
    }
})