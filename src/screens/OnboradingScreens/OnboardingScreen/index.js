import { HStack } from 'native-base';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../assets/images';
import { spacing } from '../../../common/variables';
import MyButton from '../../../components/MyButton';
import styles from './styles';
import colors from '../../../theme/colors';
import firestore from '@react-native-firebase/firestore'
export default function OnboardingScreen(props) {
  const {navigation} = props;
  const inset = useSafeAreaInsets();
  const handleNavigation = tab => {
    // firestore()
    // .collection("Users")
    // .get()
    // .then(res=>{
    //   res.docs.map(doc=>{
    //     if(doc.data().businessName){
    //       firestore()
    //       .collection("Suppliers")
    //       .doc(doc.id)
    //       .set({
    //         ...doc.data()
    //       })
    //       firestore()
    //       .collection("Users")
    //       .doc(doc.id)
    //       .set({
    //         createdAt:doc.data().createdAt,
    //         email:doc.data().email,
    //         fcmToken:doc.data().fcmToken,
    //         name:doc.data().name,
    //         profileCompleted:doc.data().profileCompleted,
    //         uid:doc.data().uid
    //       })
    //     }
    //   })
    // })
    // return
    navigation.navigate("LoginScreen",{tab})
  }
  return (
    <View style={[styles.container, {paddingTop: inset.top + spacing.medium}]}>
      <View style={styles.logoView}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        {/* <Text style={[styles.areyou,{fontSize:30}]}>Site See</Text> */}
        {/* <Image
          source={images.siteSeeText}
          style={styles.siteSee}
          resizeMode="contain"
        /> */}
      </View>
      <View style={styles.btnView}>
        <Text style={styles.areyou}>Are you?</Text>
        <HStack width={"100%"} justifyContent={"space-between"}>
          <MyButton 
            title={"A User"} 
            containerStyle={styles.btn}
            icon={"account-outline"}
            onPress={()=>handleNavigation(1)}
            txtStyle={{color:colors.appDefaultColor}}

          />
          <MyButton 
            icon={"cart-variant"}
            title={"A Supplier"} 
            containerStyle={styles.btn}
            txtStyle={{color:colors.appDefaultColor}}
            onPress={()=>handleNavigation(2)}
            />
        </HStack>
      </View>
    </View>
  );
}
