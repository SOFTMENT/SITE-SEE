import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import CenteredLoader from '../../components/CenteredLoader';
import { navigateAndReset } from '../../navigators/RootNavigation';
import { setUserData } from '../../store/userSlice';
import messaging from '@react-native-firebase/messaging'
import AppConstant from '../../config/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = (props) => {
    const { route, navigation} = props
    const dispatch = useDispatch()
    const uid = auth().currentUser.uid
    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
        messaging()
        .subscribeToTopic('all')
        .then(() => console.log('Subscribed to topic!'));
      }
    useEffect(() => {
        try {
            requestUserPermission()
                firestore()
                .collection("Users")
                .doc(uid)
                .get()
                .then( async user => {
                    if (user.exists) {
                        if (user.data().profileCompleted)
                            {
                                const val = await AsyncStorage.getItem("userType")
                                if(val == null || val == "Advertiser")
                                {
                                    dispatch(setUserData({...user.data(),userType:"Advertiser"}))
                                    navigateAndReset("AdvertiserBottomTab")
                                }
                                else if( val == "Vendor"){
                                    dispatch(setUserData({...user.data(),userType:"Vendor"}))
                                    navigateAndReset("VendorBottomTab")
                                }
                                else if( val == "Service Provider"){
                                    if(user.data().serviceProfileCompleted)
                                    {
                                        dispatch(setUserData({...user.data(),userType:"Service Provider"}))
                                        navigateAndReset("ServiceHomeStack")
                                    }
                                    else{
                                        navigateAndReset("MyServiceProviderOnBoardStack")
                                    }
                                }
                            // if (user.data().userType == AppConstant.advertiser) {
                            //     navigateAndReset("AdvertiserBottomTab")
                            // }
                            // else if(user.data().userType == AppConstant.vendor)
                            //     navigateAndReset("VendorBottomTab")
                            // else
                            //     navigateAndReset("ServiceHomeStack")
                            }
                        else {
                            navigateAndReset("MyAdvertiserOnBoardStack")
                            // if (user.data().userType == AppConstant.advertiser) {
                            //     navigateAndReset("MyAdvertiserOnBoardStack")
                            // }
                            // else if(user.data().userType == AppConstant.vendor)
                            //     navigateAndReset("MyVendorOnBoardStack")
                            // else
                            //     navigateAndReset("MyServiceProviderOnBoardStack")
                        }
                        //setLoading(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return <CenteredLoader />
}
const mapDispatchToProps = (dispatch) => {
    return{
        setUserData:(data)=>dispatch(setUserData(data))
    }
}
export default connect(null,mapDispatchToProps)(HomeScreen)