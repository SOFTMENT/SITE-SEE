import firestore, { firebase } from '@react-native-firebase/firestore'
import axios from "axios"
import React, { useState } from "react"
import { Image, Linking, Text, TouchableOpacity, View } from "react-native"
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
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const { accountStatus, accountId, balance } = useSelector(state => state.user.userData)
    const uid = auth().currentUser.uid
    const dispatch = useDispatch()
    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`market://details?id=in.softment.ktrfitness`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `https://apps.apple.com/us/app/ktr-fitness/id6446055641`
            ).catch(err => alert('Please check for the App Store'));
        }
    }
    const handleSuccess = () => {
        setSuccessPopup(false)
    }
    const getUserData = () => {
        firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then(userData=>{
            if(userData.exists)
            dispatch(setUserData(userData.data()))
        })
    }
    const handleWithdraw = async () => {
        const latestData = await firestore().collection("Users").doc(uid).get()
        const latestBalance = latestData.data().balance
        if (latestBalance <=0) {
            Util.showMessage("error", "Insufficient balance")
        }
        else {
            setLoaderVisibility(true)
            try {
                var body = new FormData()
                body.append('account_id', accountId)
                body.append('amount', Math.round(latestBalance * 100))
                var response = await axios({
                    method: AppConstant.POST,
                    url: PAYMENT_TRANSFER,
                    data: body
                })
                if (response.status === 400)
                    Util.showMessage("error", "Something went wrong", "danger")
                else if(response.data.error == true){
                    Util.showMessage("error", "Something went wrong, try again later.", "danger")
                }
                else {
                    const batch = firestore().batch()
                    const pHistoryRef = firestore().collection("PaymentHistory").doc()
                    batch.set(pHistoryRef,{
                        withdrawDetails: response.data,
                        uid,
                        createTime: firebase.firestore.FieldValue.serverTimestamp(),
                        balance,
                        accountId
                    })
                    const userRef = firestore().collection("Users").doc(uid)
                    batch.update(userRef,{
                        balance : 0
                    })
                    await batch.commit()
                    getUserData()
                    setSuccessPopup(true)
                }
                setLoaderVisibility(false)
            } catch (error) {
                console.log(error)
                Util.showMessage("error", "Something went wrong", "danger")
            }
            finally {
                setLoaderVisibility(false)
            }
        }
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
                    console.log(response.account_id)
                    newId = response.account_id
                    await updateAccountId(response.account_id)
                } catch (error) {
                    console.log(error)
                    Util.showMessage("error", "Something went wrong", "")
                }
                setLoaderVisibility(false)
            }
            setLoaderVisibility(true)
            try {
                const linkResponse = await createAccountLink(accountId ? accountId : newId)
                console.log(linkResponse)
                linkingUtil.openBrowser(linkResponse.url)
            } catch (error) {
                console.log(error)
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
                data: body
            })
            console.log(response)
            return response.data
        } catch (error) {
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
    const driverMenu = [
        {
            id: "account",
            label: "Account",
            subMenu: [
                {
                    label: "Profile",
                    icon: "account-outline",
                    onClick: () => {
                        navigation.navigate("EditProProfile")
                    }
                },
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
                    subLabel: `AED ${balance?.toString()}`,
                    onClick: () => {

                    },
                    disabled: true
                },
                {
                    label: "Withdraw",
                    icon: "cash",
                    //subLabel:`AED ${balance?.toString()}`,
                    onClick: () => {
                        handleWithdraw()
                    },
                    //disabled:true
                },
            ]
        },
        {
            id: "about",
            label: "About Us",
            subMenu: [
                // {
                //     label:"Privacy Policy",
                //     icon:images.privacyPolicy
                // },
                {
                    label: "Terms & Conditions",
                    icon: "file-document-outline",
                    onClick: () => {
                        linkingUtil.openBrowser("https://www.softment.in/about-us/")
                    }
                },
                {
                    label: "App Developer",
                    icon: "code-tags",
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                }
            ]
        },
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
            ]
        },


    ]
    const menu = [
        {
            id: "account",
            label: "Account",
            subMenu: [
                {
                    label: "Profile",
                    icon: "account-outline",
                    onClick: () => {
                        navigation.navigate("EditUserProfile")
                    }
                }
            ]
        },
        {
            id: "about",
            label: "About Us",
            subMenu: [
                // {
                //     label:"Privacy Policy",
                //     icon:images.privacyPolicy
                // },
                {
                    label: "Terms & Conditions",
                    icon: "file-document-outline",
                    onClick: () => {
                        linkingUtil.openBrowser("https://www.cheap-skate.us/")
                    }
                },
                {
                    label: "App Developer",
                    icon: "code-tags",
                    onClick: () => {
                        linkingUtil.openBrowser(SOFTMENT)
                    }
                }
            ]
        },
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
                                                color="white"
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
                                                                color="white"
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