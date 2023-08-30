import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import Util, { responsiveSize } from "../../common/util";
import { fontSizes, itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:colors.backgroundColor,
        //padding:spacing.large
    },
    loginBack:{
        width:"100%",
        height:Util.getHeight(25),
        //backgroundColor:colors.black,
        justifyContent:"center",
        alignItems:"center"
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
        fontSize:fontSizes.large,
        textAlign:'left',
        color:"black",
        marginBottom:spacing.medium
       // marginTop:spacing.extraExtraLarge,
    },
    subText:{
        fontFamily:fonts.semiBold,
        marginTop:spacing.semiMedium,
        marginBottom:spacing.extraExtraLarge,
        fontSize:responsiveSize(11.5),
        textAlign:'center',
        color:"white",
    },
    btn:{
        marginTop:spacing.medium
    },
    or:{
        color:colors.btnColor,
        textAlign:"center",
        marginVertical:spacing.large,
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        marginHorizontal:spacing.small
    },
    register:{
        color:colors.btnColor,
        textAlign:"center",
        marginVertical:spacing.extraExtraLarge,
        fontFamily:fonts.medium,
        fontSize:fontSizes.extraExtraSmall,
        marginHorizontal:spacing.small
    },
    forgot:{ 
        marginVertical:spacing.small,
        marginHorizontal: spacing.small, 
        color: colors.borderColor ,
        fontFamily:fonts.semiBold,
        fontSize:fontSizes.extraExtraSmall,
        textAlign:"right",
        // borderBottomColor:colors.borderColor,
        // borderBottomWidth:7,
    },
    borderViewContainer:{
     width:"100%",
     alignItems:"center",
     flexDirection:"row",
     //backgroundColor:'red'
    },
    borderView:{
     height:0.5,
     flex:1,
    // width:"100%",
     backgroundColor:"grey",
     
    },
    socialView:{
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    btnContainer:{ 
        marginHorizontal: spacing.extraLarge,
        backgroundColor:"white",
        padding:spacing.semiMedium,
        borderRadius:spacing.small
    },
    icon:{
        width:itemSizes.item15,
        height:itemSizes.item15
    },
    socialBtn:{ backgroundColor: colors.darkGreyBtn, flex: 1 }
})