import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from "react-native";
import images from "../../assets/images";
import { navigateAndReset } from "../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore';
const SplashScreen = (props) => {
    const {navigation} = props
    let authState = true
    useEffect(()=>{
        let subscriber  = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
        // setTimeout(()=>{
        //     navigateAndReset("UserSelectScreen")
        // },2000)
    },[])
    function onAuthStateChanged(user) {
        const timeout = setTimeout(async()=>{
            // if (initializing) setInitializing(false);
            if(authState)
            {
                authState=false
                if(user){
                   // auth().signOut()
                    await firestore()
                    .collection("Users")
                    .doc(user.uid)
                    .get()
                    .then( async doc=>{
                        const userDoc = doc.data()
                        if(!doc.exists)
                        {
                           auth().signOut()
                           .then(()=>{
                            navigateAndReset("UserSelectScreen")
                           })
                           .catch(()=>{
                            navigateAndReset("UserSelectScreen")
                           })

                        }
                        if(userDoc.isAdmin){
                            navigateAndReset("AdminScreen")
                            return
                        }
                        else{
                            if(!user.emailVerified && (user.providerData[0].providerId=="password" || (user.providerData[1]?.providerId=="password" ?? false))){
                                auth().signOut()
                                .then(()=>{
                                    navigateAndReset("UserSelectScreen")
                                })
                                .catch(()=>{
                                    navigateAndReset("UserSelectScreen")
                                })
                            }
                            else{
                                navigateAndReset("HomeScreen",{uid:user.uid})
                            }
                        }
                    })
                }
                else
                    navigateAndReset("UserSelectScreen")
            }
        },2000)
    }
    return(
        <ImageBackground 
            source={images.splashBg}
            style={styles.container}>
            <Image
                source={images.logo}
                style={styles.logo}
                resizeMode="contain"
            />
            {/* {initializing&&<ActivityIndicator color={colors.appSecondary} size="large"/>} */}
        </ImageBackground>
    )
}
export default SplashScreen