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
    }
})