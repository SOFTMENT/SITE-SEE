import { Platform, StyleSheet } from "react-native";
import Util from "../../common/util";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    backgroundVideo:{
        // position:"absolute",
        // top:0,
        // right:0,
        // left:0,
        backgroundColor:colors.backgroundColor,
        //backgroundColor:"red",
        width:"100%",
        height:"100%"
    },
    backIcon:{
        position:"absolute",
        top:Platform.OS=="ios"?Util.getHeight(5):10,
        left:10
    }
})