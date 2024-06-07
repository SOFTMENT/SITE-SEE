import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Icon } from 'native-base'
import React, { useEffect, useState } from "react"
import { Alert, Linking, Platform, Text, TouchableOpacity, View } from "react-native"
import Share from 'react-native-share'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import linkingUtil from "../../common/linkingUtil"
import Util from '../../common/util'
import { SOFTMENT } from "../../config/Networksettings"
import { navigateAndReset } from '../../navigators/RootNavigation'
import LoaderComponent from '../LoaderComponent'
import PopupMessage from '../PopupMessage'
import styles from "./styles"
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const { membershipActive } = useSelector(state => state.user.userData)
    const uid = auth().currentUser.uid
    const [userType,setUserType] = useState("User")
    useEffect(()=>{
        AsyncStorage.getItem("userType")
        .then(val=>{
            if(val!=null)
            setUserType(val)
        })
    },[])
    const deleteAccount = async() => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to Delete your account?",
            [
                {
                    text: "No",
                    onPress: () => {

                    }
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            const uid = auth().currentUser.uid
                           //  await auth().currentUser.delete()
                            const val = await AsyncStorage.removeItem("userType")
                            console.log(val)
                            // await firestore()
                            // .collection("Users")
                            // .doc(uid)
                            // .delete()
                            // await auth().currentUser.delete()
                            // // if (auth().currentUser.providerData[0].providerId == "google.com") {
                            // //     //await GoogleSignin.revokeAccess();
                            // //     await GoogleSignin.signOut();
                            // // }
                            // // await auth()
                            // //     .signOut()
                            // Util.showMessage("success","Account Deleted")
                            // navigateAndReset("OnboardingScreen")
                           } catch (error) {
                                Util.showMessage("error","Error",error.message)
                           }
                    }
                }
            ]
        )
    }
    const logout = async () => {
        try {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "No",
                        onPress: () => {

                        }
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            await AsyncStorage.removeItem("userType")
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                //await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            auth()
                                .signOut()
                                .then(() => navigateAndReset("OnboardingScreen"));
                        }
                    }
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }
    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`market://details?id=in.softment.sitesee`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `itms-apps://itunes.apple.com/us/app/apple-store/6448141803?mt=8`
            ).catch(err => alert('Please check for the App Store'));
        }
    }
    const shareApp = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Share.open({
                title:"SiteSii",
                message:"Download SiteSii to explore diverse listings from suppliers, perform image searches, and effortlessly connect for purchases. With SiteSii, finding and buying products is simple, secure, and convenient.",
                url:"https://play.google.com/store/apps/details?id=in.softment.sitesee"
            })
        } else {
            Share.open({
                title:"SiteSii",
                message:"Download SiteSii to explore diverse listings from suppliers, perform image searches, and effortlessly connect for purchases. With SiteSii, finding and buying products is simple, secure, and convenient.",
                url:"https://apps.apple.com/us/app/sitesii/id6468927601"
            })
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    
   
    const supplierMenu = [
        {
            id: "Settings",
            label: "",
            subMenu: [
                {
                    label: "Pre Populated Questions / Response",
                    icon: "message",
                    //onClick: rateUs,
                    asMaterial:true,
                    onClick:()=>{
                        navigation.navigate("AddQuestionsSupplier")
                    }
                },
                {
                    label: "Notifications",
                    icon: "bell",
                    //onClick: rateUs,
                    asMaterial:true,
                    onClick:()=>{
                        navigation.navigate("NotificationScreen")
                    }
                },
                {
                    label: "Share App",
                    icon: "share-circle",
                    onClick: shareApp,
                    asMaterial:true
                },
               
                {
                    label: "Rate App",
                    icon: "star-half-full",
                    onClick: rateUs,
                    asMaterial:true
                },
            ]
        },
        {
            id: "other",
            label: "Legal Agreements",
            subMenu: [
                {
                    label: "Privacy Policy",
                    icon: "file-document-edit",
                    asMaterial:true,
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                },
                {
                    label: "Terms & Conditions",
                    icon: "text-box",
                    asMaterial:true,
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                },
                {
                    label: "Logout",
                    icon: "log-out",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "Delete Account",
                    icon: "delete",
                    asMaterial:true,
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        deleteAccount()
                    },
                    //disabled:true
                },
            ]
        }

    ]
    const menu = [
        {
            id: "Settings",
            label: "",
            subMenu: [
                
                {
                    label: "Notifications",
                    icon: "bell",
                    //onClick: rateUs,
                    asMaterial:true,
                    onClick:()=>{
                        navigation.navigate("NotificationScreen")
                    }
                },
                {
                    label: "Share App",
                    icon: "share-circle",
                    onClick: shareApp,
                    asMaterial:true
                },
               
                {
                    label: "Rate App",
                    icon: "star-half-full",
                    onClick: rateUs,
                    asMaterial:true
                },
            ]
        },
        {
            id: "other",
            label: "Legal Agreements",
            subMenu: [
                {
                    label: "Privacy Policy",
                    icon: "file-document-edit",
                    asMaterial:true,
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                },
                {
                    label: "Terms & Conditions",
                    icon: "text-box",
                    asMaterial:true,
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                },
                {
                    label: "Logout",
                    icon: "log-out",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "Delete Account",
                    icon: "delete",
                    asMaterial:true,
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        deleteAccount()
                    },
                    //disabled:true
                },
            ]
        }

    ]
    const activeMenu = userType == "User"?menu:supplierMenu
    return (
        <View>
            {
                activeMenu.map((item) => {
                    return (
                        <View key={item.id}>
                            {item.label&& <Text style={styles.settingsText}>{item.label}</Text>}
                            {
                                item.subMenu.map(subItem => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.subMenu}
                                            onPress={subItem.onClick}
                                            key={subItem.label}
                                            disabled={loaderVisibility || subItem.disabled}
                                        >
                                            <View style={{padding:4,justifyContent:"center",alignItems:'center',backgroundColor:'black',borderRadius:30}}>
                                            <Icon
                                                // style={styles.subMenuImage}
                                                name={subItem.icon}
                                                as={subItem.asMaterial?MaterialCommunityIcons: Ionicons}
                                                size={"md"}
                                                color="white"
                                            />
                                            </View>
                                            <View style={styles.subMenuContainer}>
                                                <Text style={styles.subMenuTitle}>{subItem.label}</Text>
                                                {
                                                    subItem.subLabel &&
                                                    <View style={styles.subsubView}>
                                                        <Text style={styles.subsubtitle}>{subItem.subLabel}</Text>
                                                        {
                                                            subItem.subImage &&
                                                            <Icon
                                                                // style={styles.subMenuImage}
                                                                name={"log-out"}
                                                                as={Ionicons}
                                                                size={"sm"}
                                                                color="#414245"
                                                            />
                                                        }
                                                    </View>
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
            <LoaderComponent visible={loaderVisibility} />
            <PopupMessage visible={successPopup} title="Payment Successful" subtitle="Great" onPress={handleSuccess}/>
        </View>
    )
}