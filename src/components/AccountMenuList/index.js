import firestore from '@react-native-firebase/firestore'
import axios from "axios"
import React, { useState } from "react"
import { Image, Linking, Text, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import linkingUtil from "../../common/linkingUtil"
import { ACCOUNT_LINK, CREATE_ACCOUNT, SOFTMENT } from "../../config/Networksettings"
import AppConstant from "../../config/Constants"
import styles from "./styles"
import Util from '../../common/util'
import { Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
export default AccountMenuList = (props) => {
    const { navigation, isUser } = props
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const rateUs = () => {
        if (Platform.OS != 'ios') {
            //To open the Google Play Store
            Linking.openURL(`market://details?id=com.cheapskate`).catch(err =>
                alert('Please check for the Google Play Store')
            );
        } else {
            //To open the Apple App Store
            Linking.openURL(
                `itms://itunes.apple.com/in/app/apple-store/1605414265`
            ).catch(err => alert('Please check for the App Store'));
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
                showTopPopup("error", "Something went wrong", "")
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
            await firestore().collection("drivers").doc(uid)
                .update({
                    accountId: id
                })

        } catch (error) {
            throw error
        }

    }
    const getDocStatus = () => {
        switch (docsStatus) {
            case "approved":
                return userProfileLocalization.verified
            case "pending":
                return userProfileLocalization.notVerified
            case "rejected":
                return userProfileLocalization.rejected
            case "reupload":
                return userProfileLocalization.reuploadNeeded
        }
    }
    const driverMenu = [
        {
            id: "about",
            label: "About Us",
            subMenu: [
                {
                    label: "Privacy Policy",
                    icon: images.privacyPolicy,
                    onClick: () => {
                        linkingUtil.openBrowser("https://www.cheap-skate.us/")
                    }
                },
                // {
                //     label:"Terms & Conditions",
                //     icon:images.tAndC
                // },
                {
                    label: "App Development",
                    icon: images.development,
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
                    icon: images.rating,
                    onClick: rateUs
                },
                {
                    label: "Contact Us",
                    icon: images.contactUs,
                    onClick: () => {
                        linkingUtil.openMail(AppConstant.MAIL)
                    }
                }
            ]
        },

    ]
    const menu = [
        {
            id: "settings",
            label: "Settings",
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
                                        >
                                            <Icon
                                                // style={styles.subMenuImage}
                                                name={subItem.icon}
                                                as={MaterialCommunityIcons}
                                                size={"lg"}
                                                color="white"
                                            />
                                            <View style={styles.subMenuContainer}>
                                                <Text style={styles.subMenuTitle}>{subItem.label}</Text>
                                                {
                                                    subItem.subLabel &&
                                                    <View style={styles.subsubView}>
                                                        <Text style={styles.subsubtitle}>{subItem.subLabel}</Text>
                                                        <Image
                                                            source={subItem.subImage}
                                                            style={[styles.subImage]}
                                                            resizeMode="contain"
                                                        />
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
        </View>
    )
}