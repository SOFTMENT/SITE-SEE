import { Platform, StyleSheet } from "react-native";
import fonts from "../../../../../assets/fonts";
import Util, { responsiveSize } from "../../../../common/util";
import { fontSizes, itemSizes, spacing } from "../../../../common/variables";
import colors from "../../../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
        padding:spacing.large,
        paddingTop:0
    },
    topView:{
        backgroundColor:"white",
        borderRadius:spacing.small,
        marginTop:spacing.medium,
       // marginHorizontal:spacing.large
    },
    logoView:{
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:spacing.large
    },
    image:{
        width:150,
        height:150
    },
    title:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        color:"#333",
       // marginLeft:spacing.large
    },
    titleRow:{width:"100%",justifyContent:"space-between",alignItems:"center",flexDirection:"row", marginVertical:spacing.large,
    marginBottom:spacing.small,},
    codeView:{
        marginVertical:spacing.large,
        marginTop:0,
        backgroundColor:'white',
        padding:spacing.medium,
        borderRadius:spacing.small,
        flexDirection:"row",
        alignItems:'center',
    },
    codeText:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.large,
        textAlign:'center',
        color:"#333",
        flex:1,
    },
    copyIcon:{
        width:itemSizes.item30,
        height:itemSizes.item30,
        tintColor:colors.appSecondary
    },
    logout:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        tintColor:"#333"
    },
    logoutText:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        color:"#333",
        marginRight:spacing.small
    },
    logContainer:{
        flexDirection:'row',
        marginLeft:spacing.medium
       // alignItems:"center"
    },
    titleView:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        //backgroundColor:"yellow"
    },
})