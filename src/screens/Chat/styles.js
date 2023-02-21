import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { spacing } from "../../common/variables";
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
    inputBox:{
        position:'absolute',
        bottom:10,
        margin:spacing.medium,
        borderRadius:spacing.small,
        //padding:spacing.small,
        backgroundColor:"white",
        paddingLeft:spacing.small
    },
    txt:{
        color:"white",
        fontFamily:fonts.semiBold
    },
    rightMsg:{
        padding:spacing.medium,
        backgroundColor:"black",
        width:undefined,
        marginVertical:spacing.small,
        alignSelf:"flex-end",
        borderTopLeftRadius:spacing.medium,
        borderBottomLeftRadius:spacing.medium,
        borderBottomRightRadius:spacing.medium
    },
    leftMsg:{
        padding:spacing.medium,
        backgroundColor:"#313131",
        width:undefined,
        marginVertical:spacing.small,
        alignSelf:"flex-start",
        borderTopRightRadius:spacing.medium,
        borderBottomLeftRadius:spacing.medium,
        borderBottomRightRadius:spacing.medium
    },
    flatList:{
        flex:1,
        padding:spacing.medium,
        marginBottom:80,
        //justifyContent:"flex-end",
        flexDirection:"column-reverse"}
})
export default styles