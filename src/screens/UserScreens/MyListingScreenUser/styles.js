import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { fontSizes, spacing } from "../../../common/variables";
import fonts from "../../../../assets/fonts";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    notRight:{
        fontFamily:fonts.bold,
        fontSize:fontSizes.extraSmall,
        color:"white"
    }
})
export default styles