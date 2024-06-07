import { StyleSheet } from "react-native";
import colors from "../../../theme/colors";
import { spacing } from "../../../common/variables";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
    },
    mainView:{
        paddingHorizontal:spacing.medium
    },
    card:{
        padding:10,
        marginVertical:4,
        backgroundColor:"#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1,
        // borderWidth:1,
        // borderColor:colors.borderColor,
        borderRadius:5
    }
})
export default styles