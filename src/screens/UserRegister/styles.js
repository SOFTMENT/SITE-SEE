import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor,
        padding:spacing.large
    },
    // onboardImage:{
    //     width:"80%",
    //    // height:"80%",
    //    // backgroundColor:"red"
    // },
    // imageView:{
    //     width:Util.getWidth(100),
    //     height:Util.getHeight(40), 
    //     justifyContent:'center',
    //     alignItems:'center'
    // },
    // bottomView:{
    //     flex:1,
    //     borderTopLeftRadius:spacing.extraExtraLarge,
    //     borderTopRightRadius:spacing.extraExtraLarge,
    //     backgroundColor:'white',
    //     padding:spacing.extraLarge
    // },
    areYou:{
        fontFamily:fonts.bold,
        fontSize:fontSizes.medium,
        textAlign:'center',
        color:"#333",
        //marginBottom:spacing.large
    },
    subText:{
        fontFamily:fonts.semiBold,
        marginTop:spacing.semiMedium,
        marginBottom:spacing.extraExtraLarge,
        fontSize:responsiveSize(11.5),
        textAlign:'center',
        color:"grey",
    },
    btn:{
        marginTop:spacing.medium
    },
    or:{
        color:"grey",
        textAlign:"center",
        marginVertical:spacing.extraExtraLarge,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall
    },
    forgot:{ 
        marginVertical:spacing.small,
        marginHorizontal: spacing.small, 
        color: colors.appPrimaryDark ,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        textAlign:"right"
    },
    socialView:{
        flexDirection:"row",
        justifyContent:"center"
    },
    btnContainer:{ 
        marginHorizontal: spacing.extraLarge,
        backgroundColor:"white",
        padding:spacing.semiMedium,
        borderRadius:spacing.small
    }
})