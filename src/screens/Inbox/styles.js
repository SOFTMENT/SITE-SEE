import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { fontSizes } from "../../common/variables";
import colors from "../../theme/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    noData: {
        color: "white",
        fontFamily: fonts.semiBold
    },
    rightBox: {
        flexDirection: "row"
    },
    chatBox: {
        alignItems: "flex-start",
        marginLeft: 14
    },
    item: {
        // backgroundColor: 'pink',
        // padding: 20,
        marginVertical: 3,
        marginHorizontal: 7,
        height: 70,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 13,
        borderBottomWidth: 0.4,
        borderBottomColor: colors.borderColor
    },
    title: {
        fontFamily:fonts.semiBold,
        fontSize: fontSizes.extraSmall,
        color: "black",
    },
    text: {
        color: "gray",
        fontSize: fontSizes.extraExtraSmall,
        fontFamily: fonts.medium,
        letterSpacing: 1,
        width:"60%"
    },
    smallTxt: {
        color: "gray",
        fontSize: 10,
        // fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 10

    },
    header: {
        flexDirection: "row",
        backgroundColor: '#242424',
        width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        //marginTop:5

    },
})
export default styles