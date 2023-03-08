import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    mainView:{
        flex:1,
        padding:spacing.medium
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