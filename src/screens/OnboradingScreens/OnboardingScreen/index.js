import { HStack } from 'native-base';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../assets/images';
import { spacing } from '../../../common/variables';
import MyButton from '../../../components/MyButton';
import styles from './styles';
export default function OnboardingScreen(props) {
  const {navigation} = props;
  const inset = useSafeAreaInsets();
  const handleNavigation = tab => {
    navigation.navigate("LoginScreen",{tab})
  }
  return (
    <View style={[styles.container, {paddingTop: inset.top + spacing.medium}]}>
      <View style={styles.logoView}>
        <Image source={images.logo} style={styles.logo} resizeMode="contain" />
        <Image
          source={images.siteSeeText}
          style={styles.siteSee}
          resizeMode="contain"
        />
      </View>
      <View style={styles.btnView}>
        <Text style={styles.areyou}>Are you?</Text>
        <HStack width={"100%"} justifyContent={"space-between"}>
          <MyButton 
            title={"User"} 
            containerStyle={styles.btn}
            icon={"account-outline"}
            onPress={()=>handleNavigation(0)}
          />
          <MyButton 
            icon={"cart-variant"}
            title={"Supplier"} 
            containerStyle={styles.btn}
            onPress={()=>handleNavigation(1)}
            />
        </HStack>
      </View>
    </View>
  );
}
