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
                        const val = user.data().userType
                        if (user.data().profileCompleted)
                            {
                                if(val == null || val == "User")
                                {
                                    dispatch(setUserData({...user.data(),userType:"User"}))
                                    navigateAndReset("UserBottomTab")
                                }
                                else if( val == "Supplier"){
                                    dispatch(setUserData({...user.data(),userType:"Supplier"}))
                                    navigateAndReset("VendorBottomTab")
                                }
                            }
                        else {
                            if(val == null || val == "User")
                                {
                                    dispatch(setUserData({...user.data(),userType:"User"}))
                                    navigateAndReset("OnBoardPhoto")
                                }
                                else if( val == "Supplier"){
                                    dispatch(setUserData({...user.data(),userType:"Supplier"}))
                                    navigateAndReset("OnBoardPhoto")
                                }
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