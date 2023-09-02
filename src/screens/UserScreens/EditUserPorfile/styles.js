import { StyleSheet } from "react-native";
import { spacing } from "../../../common/variables";
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
    }
})