import firestore, { firebase } from '@react-native-firebase/firestore'
import axios from "axios"
import React, { useState } from "react"
import { Alert, Image, Linking, Text, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import linkingUtil from "../../common/linkingUtil"
import { ACCOUNT_LINK, CREATE_ACCOUNT, PAYMENT_TRANSFER, SOFTMENT } from "../../config/Networksettings"
import AppConstant from "../../config/Constants"
import styles from "./styles"
import Util from '../../common/util'
import { Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import LoaderComponent from '../LoaderComponent'
import PopupMessage from '../PopupMessage'
import { setUserData } from '../../store/userSlice'
import colors from '../../theme/colors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { navigateAndReset } from '../../navigators/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const { accountStatus, accountId, balance,userType } = useSelector(state => state.user.userData)
    const uid = auth().currentUser.uid
    const dispatch = useDispatch()
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
                           await AsyncStorage.removeItem("userType")
                            await firestore()
                            .collection("Users")
                            .doc(uid)
                            .update({
                               isDeleted:true,
                               status:"deleted"
                            })
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                //await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            await auth()
                                .signOut()
                            Util.showMessage("success","Account Deleted")
                            navigateAndReset("UserSelectScreen")
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
                                .then(() => navigateAndReset("LogOrRegister"));
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
            Linking.openURL(`market://details?id=in.softment.appvertise`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `itms-apps://itunes.apple.com/us/app/apple-store/6448141803?mt=8`
            ).catch(err => alert('Please check for the App Store'));
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    
    
    const bankFlow = async () => {
        if (accountStatus)
            return
        else {
            if (!accountId) {
                var newId
                setLoaderVisibility(true)
                try {
                    const response = await createAccountId()
                    console.log("accountid",response.account_id)
                    newId = response.account_id
                    await updateAccountId(response.account_id)
                } catch (error) {
                    console.log("account id error",error)
                    Util.showMessage("error", "Something went wrong", "")
                }
                setLoaderVisibility(false)
            }
            setLoaderVisibility(true)
            try {
                const linkResponse = await createAccountLink(accountId ? accountId : newId)
                console.log("linkresponse,",linkResponse)
                linkingUtil.openBrowser(linkResponse.url)
            } catch (error) {
                console.log("here",error)
                Util.showMessage("error", "Something went wrong", "")
            }
            setLoaderVisibility(false)
        }
    }
    const createAccountId = async () => {
        try {
            const response = await axios({
                method: AppConstant.GET,
                url: CREATE_ACCOUNT,
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            throw error
        }
    }
    const createAccountLink = async (value) => {
        try {
            var body = new FormData()
            body.append('account_id', value)
            const response = await axios({
                method: AppConstant.POST,
                url: ACCOUNT_LINK,
                data: body,
                headers: {
                    "content-type": "multipart/form-data",
                  },
            })
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    const updateAccountId = async (id) => {
        try {
            await firestore().collection("Users").doc(uid)
                .update({
                    accountId: id
                })

        } catch (error) {
            throw error
        }

    }
    const handleSwitch = async(type)=>{
        await AsyncStorage.setItem("userType",type)
        navigateAndReset("SplashScreen")
    }
    const driverMenu = [
        {
            id: "account",
            label: "Account",
            subMenu: [
                // {
                //     label: "Profile",
                //     icon: "account-outline",
                //     onClick: () => {
                //         navigation.navigate("EditProProfile")
                //     }
                // },
                {
                    label: "Bank Details",
                    icon: "bank",
                    subLabel: accountStatus ? "Verified" : "Not Verified",
                    subImage: accountStatus ? "check-circle-outline" : "cancel",
                    status: accountStatus,
                    onClick: () => {
                        bankFlow()
                    }
                },
                {
                    label: "Balance",
                    icon: "wallet-outline",
                    subLabel: `$ ${balance?.toString() ?? 0}`,
                    onClick: () => {
                        navigation.navigate("VendorAccountDetail")
                    },
                    //disabled: true
                },
                {
                    label: "Switch to Advertiser",
                    icon: "swap-horizontal",
                    onClick: () => {
                            handleSwitch("Advertiser")
                    }
                },
                {
                    label: "Switch to Service Provider",
                    icon: "swap-horizontal",
                    onClick: () => {
                            handleSwitch("Service Provider")
                    }
                }
                // {
                //     label: "Withdraw",
                //     icon: "cash",
                //     //subLabel:`AED ${balance?.toString()}`,
                //     onClick: () => {
                //         handleWithdraw()
                //     },
                //     //disabled:true
                // },
            ]
        },
        // {
        //     id: "about",
        //     label: "About Us",
        //     subMenu: [
        //         // {
        //         //     label:"Privacy Policy",
        //         //     icon:images.privacyPolicy
        //         // },
        //         // {
        //         //     label: "Terms & Conditions",
        //         //     icon: "file-document-outline",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser("https://www.softment.in/about-us/")
        //         //     }
        //         // },
        //         // {
        //         //     label: "App Developer",
        //         //     icon: "code-tags",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser(SOFTMENT)
        //         //     }
        //         // }
        //     ]
        // },
        {
            id: "other",
            label: "Others",
            subMenu: [
                {
                    label: "Rate Us",
                    icon: "star-check-outline",
                    onClick: rateUs
                },
                {
                    label: "Contact Us",
                    icon: "email-outline",
                    onClick: () => {
                        linkingUtil.openMail(AppConstant.MAIL)
                    }
                },
                {
                    label: "Logout",
                    icon: "logout",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "Delete Account",
                    icon: "delete-outline",
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        deleteAccount()
                    },
                    //disabled:true
                },
            ]
        },


    ]
    const menu = [
        {
            id: "account",
            label: "Account",
            subMenu: [
                {
                    label: userType == "Advertiser"?"Switch to Vendor":"Switch to Advertiser",
                    icon: "swap-horizontal",
                    onClick: () => {
                        if(userType == "Advertiser")
                            handleSwitch("Vendor")
                        else
                            handleSwitch("Advertiser")
                    }
                },
                {
                    label: userType == "Advertiser"?"Switch to Service Provider":"Switch to Vendor",
                    icon: "swap-horizontal",
                    onClick: () => {
                        if(userType == "Advertiser")
                            handleSwitch("Service Provider")
                        else
                            handleSwitch("Vendor")
                    }
                }
                // {
                //     label: "Profile",
                //     icon: "account-outline",
                //     onClick: () => {
                //         navigation.navigate("EditUserProfile")
                //     }
                // }
            ]
        },
        // {
        //     id: "about",
        //     label: "About Us",
        //     subMenu: [
        //         // {
        //         //     label:"Privacy Policy",
        //         //     icon:images.privacyPolicy
        //         // },
        //         {
        //             label: "Terms & Conditions",
        //             icon: "file-document-outline",
        //             onClick: () => {
        //                 //linkingUtil.openBrowser("https://www.cheap-skate.us/")
        //             }
        //         },
        //         // {
        //         //     label: "App Developer",
        //         //     icon: "code-tags",
        //         //     onClick: () => {
        //         //         linkingUtil.openBrowser(SOFTMENT)
        //         //     }
        //         // }
        //     ]
        // },
        {
            id: "other",
            label: "Others",
            subMenu: [
                {
                    label: "Rate Us",
                    icon: "star-check-outline",
                    onClick: rateUs
                },
                {
                    label: "Contact Us",
                    icon: "email-outline",
                    onClick: () => {
                        linkingUtil.openMail(AppConstant.MAIL)
                    }
                },
                {
                    label: "Logout",
                    icon: "logout",
                    onClick: () => {
                        logout()
                    }
                },
                {
                    label: "Delete Account",
                    icon: "delete-outline",
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        deleteAccount()
                    },
                    //disabled:true
                },
            ]
        },

    ]
    const activeMenu = isUser ? menu : driverMenu
    return (
        <View>
            {
                activeMenu.map((item) => {
                    return (
                        <View key={item.id}>
                            <Text style={styles.settingsText}>{item.label}</Text>
                            {
                                item.subMenu.map(subItem => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.subMenu}
                                            onPress={subItem.onClick}
                                            key={subItem.label}
                                            disabled={loaderVisibility || subItem.disabled}
                                        >
                                            <Icon
                                                // style={styles.subMenuImage}
                                                name={subItem.icon}
                                                as={MaterialCommunityIcons}
                                                size={"md"}
                                                color={colors.appPrimary}
                                            />
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
                                                                name={subItem.subImage}
                                                                as={MaterialCommunityIcons}
                                                                size={"sm"}
                                                                color="gray.500"
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