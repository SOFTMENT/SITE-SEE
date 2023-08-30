import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:spacing.large
    },
    borderView:{
        borderRadius:4,
        height:8,
        backgroundColor:"#D9D9D9",
        flex:0.48
    },
    img:{
        borderTopRightRadius:80,
        borderBottomLeftRadius:80,
        overflow:"hidden",
        width:Util.getWidth(100)-(3*spacing.large),
        height:Util.getWidth(100)-(3*spacing.large),
        zIndex:1000,
    },
    imageView:{
        marginTop:40,
    },
    imageBack:{
        width:Util.getWidth(100)-(3*spacing.large),
        aspectRatio:1,
        backgroundColor:"rgba(185, 41, 106, 0.13)",
        position:'absolute',
        top:30,
        right:0,
        borderTopRightRadius:70,
        borderBottomLeftRadius:70
    },
    bottomView:{
        flex:1,
        marginTop:80,
        paddingHorizontal:spacing.small
    },
    heading:{
        fontFamily:fonts.bold,
        textAlign:"center",
        color:"rgba(0, 0, 0, 0.71)",
        fontSize:fontSizes.large
    },
    subtitle:{
        fontFamily:fonts.semiBold,
        textAlign:"center",
        color:"rgba(0, 0, 0, 0.56)",
        fontSize:fontSizes.small,
        marginTop:spacing.large
    }
})
export default styles