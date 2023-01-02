import { Platform, StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor
    },
    onboardImage:{
        width:"100%",
        height:"100%"
       // backgroundColor:colors.appSecondary
       // height:"80%",
       // backgroundColor:"red"
    },
    imageView:{
        width:"100%",
        alignSelf:'center',
        height:Util.getHeight(50),
        borderRadius:spacing.large,
        overflow:"hidden"
    },
    bottomView:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        padding:spacing.extraExtraLarge,
        //backgroundColor:"red"
    },
    nowShow:{
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.large,
        textAlign:'center',
        color:"white",
        //backgroundColor:"red",
        padding:10
    },
    userTypeView:{
        width:"100%",
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center',
    },
    userBox:{
        padding:10,
        width:Util.getWidth(38),
        height:Util.getWidth(35),
        borderColor:"#686767",
        borderWidth:2,
        borderRadius:spacing.large,
        justifyContent:'center',
        alignItems:'center',
    },
    userBox1:{
        padding:10,
        width:Util.getWidth(38),
        height:Util.getWidth(35),
        backgroundColor:"transparent",
        borderRadius:spacing.large,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"#686767",
        borderWidth:2,
    },
    typeText:{
        color:"#686767",
        fontFamily:fonts.semiBold,
        fontSize:responsiveSize(12),
        marginTop:spacing.small
    },
    selectImage:{
        // width:60,
        // height:60,
        tintColor:"#686767"
    },
    btn:{
        backgroundColor:colors.appPrimary,
        justifyContent:'center',
        alignItems:"center",
        padding:spacing.medium,
        width:"100%",
        alignSelf:'center',
        borderRadius:spacing.small
    },
    next:{
        color:"white",
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.small
    },
    checked:{
        width:itemSizes.item20,
        height:itemSizes.item20,
        position:"absolute",
        top:8,
        right:8,
        tintColor:"#D9D9D9"
    }
})