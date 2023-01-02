import { StyleSheet } from "react-native";
import Util from "../../common/util";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#1C1B1B"
    },
    logo:{
        width:Util.getWidth(30),
        height:Util.getWidth(30)
    }
})