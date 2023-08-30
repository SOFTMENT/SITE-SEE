import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        
    },
    title:{
        fontSize:fontSizes.large,
        fontFamily:fonts.bold,
        color:"black",
        textAlign:"center",
        marginHorizontal:50,
        marginTop:50
    },
    subtitle:{
        fontSize:fontSizes.small,
        fontFamily:fonts.medium,
        color:"rgba(0, 0, 0, 0.61)",
        textAlign:"center",
        marginHorizontal:50,
        marginTop:spacing.large
    },
    btn:{
        bottom:40,
        position:"absolute",
        width:"80%"
    }
})
export default styles