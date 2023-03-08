import { StyleSheet } from "react-native";
import Util, { responsiveSize } from "../../common/util";
import { itemSizes, spacing } from "../../common/variables";
import colors from "../../theme/colors";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    mainView:{
        flex:1,
       // padding:spacing.medium
    },
    textBack:{
        width:Util.getWidth(100)-spacing.medium*4-itemSizes.item40,
        backgroundColor:"white",
        height:itemSizes.item40,
        borderRadius:spacing.extraSmall,
        padding:spacing.small,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    search:{
        //color:"white",
        //textAlign:"center",
        fontFamily: 'Nunito Sans',
        fontSize: responsiveSize(13),
        flex:1,
       // backgroundColor:"red"
    },
    searchBtn:{
        width:itemSizes.item20,
        height:itemSizes.item20,
       // backgroundColor:"white"
    },
    title:{
        color:"white",
        textAlign:"center",
        fontFamily: 'Nunito Sans',
        fontSize: responsiveSize(13),
    }
})