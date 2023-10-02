import { Platform, StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { fontSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    noData:{
        color:"white",
        fontFamily:fonts.semiBold
    },
    rightImage:{
        alignSelf:"flex-end",
        width:200,
        aspectRatio:16/9,
        borderWidth:2,
        borderColor:colors.appDefaultColor,
        borderRadius:spacing.small
    },
    leftImage:{
        alignSelf:"flex-start",
        width:200,
        aspectRatio:16/9,
        borderWidth:2,
        borderColor:colors.appDefaultColor,
        borderRadius:spacing.small
    },
    inputBox:{
        // position:'absolute',
        // bottom:10,
        margin:spacing.medium,
        marginTop:0,
        borderRadius:spacing.small,
        //padding:spacing.small,
        backgroundColor:"white",
        paddingLeft:spacing.small,
        borderWidth:1,
        borderColor:colors.borderColor,
        marginBottom:20
    },
    txt:{
        color:"black",
        fontFamily:fonts.medium
    },
    timeAgo:{
        color:"white",
        fontFamily:fonts.regular,
        fontSize:fontSizes.tiny,
        marginTop:2
    },
    rightMsg:{
        marginVertical:spacing.small,
        alignSelf:"flex-end",
        maxWidth:"80%"
    },
    rightMsgInner:{
        padding:spacing.medium,
        backgroundColor:colors.white,
        width:undefined,
        borderTopLeftRadius:spacing.medium,
        borderBottomLeftRadius:spacing.medium,
        borderBottomRightRadius:spacing.medium
    },
    leftMsgInner:{
        padding:spacing.medium,
        backgroundColor:colors.white,
        width:undefined,
        borderTopRightRadius:spacing.medium,
        borderBottomLeftRadius:spacing.medium,
        borderBottomRightRadius:spacing.medium
    },
    leftMsg:{
        marginVertical:spacing.small,
        alignSelf:"flex-start",
        maxWidth:"80%"
    },
    flatList:{
        flex:1,
        padding:spacing.medium,
        //marginTop:20,
        paddingBottom:0,
        //marginBottom:80,
        //justifyContent:"flex-end",
        //flexDirection:"column-reverse"
    }
})
export default styles