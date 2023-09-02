import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import Util from "../../../common/util";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.large,
        backgroundColor: colors.backgroundColor,
        alignItems: "center",
    },
    logo: {
        height: 300,
        //height: 200,
    },
    siteSee: {
        height: 35,
    },
    logoView: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnView:{
        flex:0.4,
        width:"100%",
        flexDirection:"column",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    btn:{
        flex:0.47,
        backgroundColor:colors.white,
        borderColor:colors.appDefaultColor,
        borderWidth:1
    },
    areyou:{
        color:colors.white,
        fontFamily:fonts.bold,
        fontSize:fontSizes.medium,
        marginBottom:10
    }

})
export default styles