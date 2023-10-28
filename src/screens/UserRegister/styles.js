import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
       // paddingBottom:20
        //padding:spacing.large
    },
    loginBack:{
        flexDirection:"row",
        height:Util.getHeight(25),
        alignItems:"center",
        marginHorizontal:25,
    },
    siteSee:{
        height:"100%"
    },
    login:{
        fontFamily:fonts.medium,
        color:colors.black,
        fontSize:fontSizes.extraExtraLarge,
        marginLeft:30
    },
    borderViewTop:{
        height:"75%",
        width:2,
        marginLeft:30,
        backgroundColor:colors.appDefaultColor
    },
    logo:{
        //height:Util.getHeight(30),
        width:Util.getWidth(70)
    },
    mainView:{ 
        padding: spacing.extraExtraLarge,
        paddingTop:0,
        minHeight:Util.getHeight(70) 
    },
    areYou:{
        fontFamily:fonts.bold,
        fontSize:fontSizes.large,
        textAlign:'left',
        color:"black",
        marginBottom:spacing.large  
       // marginTop:spacing.extraExtraLarge,
    },
    subText: {
        fontFamily: fonts.semiBold,
        marginTop: spacing.semiMedium,
        marginBottom: spacing.extraExtraLarge,
        fontSize: responsiveSize(11.5),
        textAlign: 'center',
        color: "white",
    },
    btn: {
        marginTop: spacing.extraExtraLarge,
        borderRadius:spacing.large
    },
    borderViewContainer: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",   
        //backgroundColor:'red'
    },
    borderView: {
        height: 0.5,
        flex: 1,
        // width:"100%",
        backgroundColor:"white",
    },
    or:{
        color:colors.white,
        textAlign:"center",
        marginVertical:spacing.large,
        fontFamily:fonts.bold,
        fontSize:fontSizes.extraExtraSmall,
        marginHorizontal:spacing.extraExtraSmall
    },
    register: {
        color: colors.btnColor,
        textAlign: "center",
        marginVertical: spacing.extraExtraLarge,
        fontFamily: fonts.medium,
        fontSize: fontSizes.extraExtraSmall,
        marginHorizontal: spacing.small
    },
    forgot: {
        marginVertical: spacing.small,
        marginHorizontal: spacing.small,
        color: colors.appPrimaryDark,
        fontFamily: fonts.semiBold,
        fontSize: fontSizes.extraExtraSmall,
        textAlign: "right"
    },
    socialView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    btnContainer: {
        marginHorizontal: spacing.extraLarge,
        backgroundColor: "white",
        padding: spacing.semiMedium,
        borderRadius: spacing.small
    },
    icon: {
        width: itemSizes.item15,
        height: itemSizes.item15
    },
})