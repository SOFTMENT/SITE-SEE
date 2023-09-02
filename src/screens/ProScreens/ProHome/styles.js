import { Platform, StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
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
        justifyContent:"space-between"
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
    mainView:{
        paddingTop:spacing.medium,
        flex:1
    },
    updateText:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    updateView:{
        padding:spacing.small,
        backgroundColor:colors.borderColor,
        borderRadius:spacing.small
    },
    title:{
        color:"white",
        fontSize:fontSizes.extraSmall,
        fontFamily:fonts.semiBold,
        marginTop:spacing.small
    },
    videoTitle:{
        color:"white",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium,
    },
    titleView:{
        position:"absolute",
        left:10,
        bottom:10,
        backgroundColor:colors.modalBackgraound,
        padding:spacing.extraSmall,
        borderRadius:spacing.small
    },
    contentView:{
        flex:1,
        //backgroundColor:"green"
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
    }
})
export default styles