import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import images from '../../../assets/images'
import MyButton from '../../../components/MyButton'
import Purchases, { LOG_LEVEL } from 'react-native-purchases'
import { useDispatch, useSelector } from 'react-redux'
import Util from '../../../common/util'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { setUserData } from '../../../store/userSlice'
import LoaderComponent from '../../../components/LoaderComponent'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../../theme/colors'
import { HStack, Link, ScrollView } from 'native-base'
import linkingUtil from '../../../common/linkingUtil'
export default function BuyMembership(props) {
    const {navigation} = props
    const { userData } = useSelector(state => state.user)
    const { name, profilePic, uid, membershipActive, service, portfolioLink } = userData
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        //Purchases.setDebugLogsEnabled(true);
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
        if (Platform.OS === 'ios') {
            Purchases.configure({ apiKey: "appl_AGXTnibEhuupylpHoJLYyRWVfSy", appUserID: uid });
        }
        else if (Platform.OS === 'android') {
           Purchases.configure({apiKey: "goog_szmkfStptlQRehWCscpwCStOFcn"});
        }
    }, [])
    const handleSubscription = async() => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
               //const packages = offerings.all["service25monthly"].availablePackages
            //    const {customerInfo, productIdentifier} = await Purchases.purchasePackage(packages[0]);
            //     if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
            //         // Unlock that great "pro" content
            //     }
                setLoading(true)
                const res = await Purchases.purchaseProduct("service25monthly")
                await firestore().collection("Users").doc(uid)
                .update({
                    membershipActive:true,
                    subscriptionDate:firebase.firestore.FieldValue.serverTimestamp(),
                })
                await getUserData()
            }
            
            
          } catch (e) {
            console.log(e)
            Util.showMessage("error","Error",e)
          }
          finally{
            setLoading(false)
          }
          
    }
    const getUserData = async() => {
        await firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then(res => {
                dispatch(setUserData(res.data()))
                Util.showMessage("success","Hurray!","Membership activated!")
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <ScrollView style={styles.container} bounces={false}>
            <Header title={"Buy Membership"} back navigation={navigation}/>
            <LoaderComponent visible={loading}/>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                    source={images.logo}
                    resizeMode="contain"
                    style={{ height: 150 }}
                />
                <Text style={styles.title}>Choose Your Plan</Text>
                {/* <MyButton
                    title={'AUD 25'}
                    onPress={()=>handleSubscription()}
                // onPress={validateLogin}
                  containerStyle={{width:"80%",marginTop:40,paddingVertical:30}}
                /> */}
                <TouchableOpacity
                    onPress={()=>handleSubscription()}
                >
                    <LinearGradient
                        colors={["#edcddb","#c96994",colors.appPrimary]}
                        style={styles.card}
                        start={{x:0,y:0}}
                        end={{x:1,y:1}}
                    >
                        <Text style={styles.cardText}>{'AUD 25'}</Text>
                        <Text style={styles.pm}>Per Month</Text>
                        <Text style={styles.pm}>With This subscription, your portfolio will be showcased on our app.</Text>
                        {/* <Text style={styles.cardText}>{'AUD 25 Per Month'}</Text> */}
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.longText}>
                Subscription will automatically renew unless auto-renew is turned off at least 24 hours before the end of the current period. Your account will be charged for renewal.
                </Text>
                <HStack mt={10}>
                    <Link 
                        onPress={()=>{
                            linkingUtil.openBrowser('https://doc-hosting.flycricket.io/appvertise-privacy-policy/8cf54c89-191c-4eda-91ee-d85b4a6916fd/privacy')
                        }}
                        _text={{textDecoration:"none",color:"blue.700"}}>
                        Privacy Policy
                    </Link>
                    <Text style={{color:"black"}}>  |  </Text>
                    <Link 
                        onPress={()=>{
                            linkingUtil.openBrowser('https://www.app-privacy-policy.com/live.php?token=sRuFMb6vbOfZHn2FcIiWRMKotAMdzvld')
                        }}
                        _text={{textDecoration:"none",color:"blue.700"}}>
                            Terms Of Use
                        
                    </Link>
                </HStack>
                {/* <MyButton
                    title={'2 Days Free Trial'}
                    //onPress={()=>handleNavigation(2)}
                    // onPress={validateLogin}
                    containerStyle={styles.btn}
                    txtStyle={styles.text}
                //icon={images.apple}
                /> */}
            </View>
        </ScrollView>
    )
}
