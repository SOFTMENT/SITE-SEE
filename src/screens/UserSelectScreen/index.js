import { Text, View, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../assets/images';
import MyButton from '../../components/MyButton';
const UserSelectScreen = ({ navigation, route }) => {
  const {type} = route.params
  const handleNavigation = (tab) => {
    if(type == 'login'){
      navigation.navigate("LoginScreen",{tab})
    }
    else{
      navigation.navigate("SignUpScreen",{tab})
    }
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.circleView}>
        <View style={styles.circle} />
        <View style={styles.circle1} />
      </View>
      <View style={styles.logoView}>
        <Image
          source={images.logo}
          style={styles.logo}
        />
      </View>
      <View style={styles.btnView}>
        <MyButton
          title={'Advertiser'}
          onPress={()=>handleNavigation(1)}
        // onPress={validateLogin}
        // containerStyle={styles.btn}
        />
        <MyButton
          title={'Vendor'}
          onPress={()=>handleNavigation(2)}
          // onPress={validateLogin}
          containerStyle={styles.btn}
          txtStyle={styles.text}
        //icon={images.apple}
        />
        <MyButton
          title={'Service Provider'}
          onPress={()=>handleNavigation(3)}
          // onPress={validateLogin}
          containerStyle={styles.btn}
          txtStyle={styles.text}
        //icon={images.facebook}
        />
        {/* <SecBtn
            title={"Register"}
          //  style={[styles.extraStyle]}
            // onPress={() => navigation.navigate('Login')}
           // onPress={validateLogin}
           containerStyle={styles.btn}
          /> */}
      </View>
    </View>
  );
};

export default UserSelectScreen;

