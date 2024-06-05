import { StyleSheet } from "react-native";
import fonts from "../../../../assets/fonts";
import { fontSizes, spacing } from "../../../common/variables";
import colors from "../../../theme/colors";

const styles =  StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor,
    },
    mainView:{
        padding:spacing.medium,
        paddingTop:0
    },
    thumbnailView:{
        // borderColor:colors.borderColor,
        // borderWidth:1,
        borderRadius:spacing.small,
        width:300,
        height:300,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:spacing.extraSmall,
        overflow:"hidden",
        backgroundColor:colors.white,
        alignSelf:"center",
        borderWidth:1,
        borderColor:colors.borderColor
    },
    updateText:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular
    },
    title:{
        color:"black",
        fontFamily: fonts.medium,
        fontSize: fontSizes.extraExtraSmall,
        marginBottom:spacing.small,
        marginTop:20
    },
    subtitle:{
        color:"gray",
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.regular,
        marginTop:spacing.small
    },
    datePicker:{
        borderRadius:spacing.small,
        borderColor:colors.borderColor,
        borderWidth:1,
        padding:12,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    txt:{
        color:"gray",
        fontFamily:fonts.regular,
        fontSize:fontSizes.extraExtraSmall,
        width:"80%"
    },
    addmore:{
        height:100,
        width:100,
        borderRadius:5,
        backgroundColor:colors.whiteDark,
        borderWidth:1,
        borderColor:"gray",
        justifyContent:"center",
        alignItems:'center',
        marginTop:5,
        overflow:"hidden",
        marginRight:10
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})
export default styles