import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
    contentContainerStyle: {
      // fontSize: 50,
      flex: 1,
    // alignItems:"center",
      // justifyContent:"s",
      backgroundColor: '#242424',
      //spadding: 5,
    },
    heading:{
      //kuch bhi view bana rakhe seriously
      //flex:1,
    alignItems:"center",
   // margin:15
    },
    container: {
      flex:1,
   //  height: '75%',
      width: '100%',
      alignItems:"center",
      // justifyContent:"space-around",
      paddingVertical: 20,
     paddingHorizontal:50,
    // backgroundColor:"blue"
    },
     Txt:{
      color:"#dedcde",
      marginBottom:2
     },
  
     mainTxt: {
      fontSize: 26,
      fontWeight:"bold",
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor:""
      color: 'white',
      //lineHeight:10
    },
    smallTxt: {
      fontSize: 16,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor:""
      color: '#fce3fc',
      //lineHeight:15
    },
    vsmallTxt: {
      fontSize: 13,
      alignItems: 'center',
      justifyContent: 'center',
     // backgroundColor:"red",
      color: 'grey',
      marginTop: 15,
      // fontWeight:"lighter"
    },
  
    btnContainer: {
      // fontSize: 50,
      flexDirection:"row",
      alignItems: 'center',
      justifyContent: 'space-between',
      //backgroundColor: '#fce3fc',
      height: 50,
      width: '100%',
     // borderRadius: 10,
      marginTop: 15,
    },
    smallBtn: {
      // fontSize: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#424242',
      height: 55,
      borderRadius: 10,
     // marginTop: 15,
     // marginHorizontal:8,
      width:"48%"
    },
    smallbtnTxt: {
      fontSize: 16,
      //fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor:""
      color: '#fce3fc',
    },
    txtContainer: {
      // fontSize: 50,
      flexDirection:"row",
  
      alignItems: 'center',
      justifyContent:'center',
      //backgroundColor: 'red',
      //height: 40,
      width: '80%',
     // borderRadius: 10,
     marginTop:15,
    },
    linkTxt:{
      color:"white",
      fontWeight:"bold",
      borderBottomWidth:0.8,
      borderColor:"white"
    },
    link1Txt:{
      color:"grey",
     // fontWeight:"bold",
      borderBottomWidth:0.8,
      borderColor:"grey",
      justifyContent:"flex-end",
      alignItems:"flex-end"
    },
    forgot:{
     // backgroundColor:"red",
     marginVertical:5,
      justifyContent:"center",
      alignItems:"flex-end",
      width:'100%'
    
    },
    vvsmallTxt:{
      justifyContent:"center",
      color:"#fce3fc",
      fontSize:14,
      marginRight:5,
      //backgroundColor:"red"
    }
  });
  
  export default styles
