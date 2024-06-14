import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import CenteredLoader from '../../components/CenteredLoader';
import {navigateAndReset} from '../../navigators/RootNavigation';
import {setUserData} from '../../store/userSlice';
import messaging from '@react-native-firebase/messaging';
import AppConstant from '../../config/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, useDisclose} from 'native-base';
import MemberShipActionSheet from '../../components/MembershipActionSheet';
import branch from 'react-native-branch';
import Util from '../../common/util';
const HomeScreen = props => {
  const {route, navigation} = props;
  const dispatch = useDispatch();
  const uid = auth().currentUser.uid;
  const {isOpen, onOpen, onClose} = useDisclose();
  const memberShipCallback = async membershipDetails => {
    let buo = await branch.createBranchUniversalObject(`item/${uid}`, {
      title: 'Hey',
      contentDescription: 'Checkout this seller profile',
      contentMetadata: {
        customMetadata: {
          key1: 'user',
        },
      },
    });
    let linkProperties = {};

    let controlParams = {
      $desktop_url: 'https://example.com/home',
      custom: 'user',
    };
    //   let shareOptions = {
    //     messageHeader: 'Check this out',
    //     messageBody: 'No really, check this out!'
    //   }
    let {url} = await buo.generateShortUrl(linkProperties, controlParams);
    firestore()
      .collection('Suppliers')
      .doc(uid)
      .update({
        membershipActive: true,
        ...membershipDetails,
        shareLink: url,
      })
      .then(async () => {
        const user = await firestore().collection('Suppliers').doc(uid).get();
        dispatch(setUserData({...user.data(), userType: 'Suppliers'}));
        navigateAndReset('VendorBottomTab');
      });
  };
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
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      requestUserPermission();
      const userType = await AsyncStorage.getItem('userType');
      firestore()
        .collection(userType)
        .doc(uid)
        .get()
        .then(async user => {
          if (user.exists) {
            // await messaging().registerDeviceForRemoteMessages()

            const token = await messaging().getToken();
            firestore().collection(userType).doc(user.id).update({
              fcmToken: token,
            });
            if (userType == null || userType == 'Users') {
              if (user.data().profileCompleted) {
                dispatch(setUserData({...user.data(), userType: 'Users'}));
                navigateAndReset('UserBottomTab');
              } else {
                dispatch(setUserData({...user.data(), userType: 'Users'}));
                navigateAndReset('OnBoardPhoto');
              }
            } else if (userType == 'Suppliers') {
              if (user.data().profileCompleted) {
                if (user.data().membershipActive) {
                  dispatch(
                    setUserData({...user.data(), userType: 'Suppliers'}),
                  );
                  navigateAndReset('VendorBottomTab');
                } else {
                  onOpen();
                }
              } else {
                dispatch(setUserData({...user.data(), userType: 'Suppliers'}));
                navigateAndReset('OnBoardPhoto');
              }
            } else {
              auth()
                .signOut()
                .then(() => {
                  navigateAndReset('OnboardingScreen');
                });
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <CenteredLoader />
      <MemberShipActionSheet
        isOpen={isOpen}
        onClose={onClose}
        memberShipCallback={memberShipCallback}
      />
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setUserData: data => dispatch(setUserData(data)),
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);
