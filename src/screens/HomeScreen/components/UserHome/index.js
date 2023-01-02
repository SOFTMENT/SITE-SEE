import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { Menu, MenuItem } from 'react-native-material-menu';
import images from "../../../../assets/images";
import Util from '../../../../common/util';
import { spacing } from '../../../../common/variables';
import Header from '../../../../components/Header';
import MyButton from '../../../../components/MyButton';
import { navigateAndReset } from "../../../../navigators/RootNavigation";
import styles from "./styles";
import firestore from '@react-native-firebase/firestore';
const UserHome = (props) => {
    const { user, navigation } = props
    const [code,setCode] = useState(user.uniqueCode)
    const [resetLoading,setResetLoading] = useState(false)
    const logout = async () => {
        try {
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text:"No",
                        onPress:()=>{

                        }
                    },
                    {
                        text:"Yes",
                        onPress:async()=>{
                            if (auth().currentUser.providerData[0].providerId == "google.com") {
                                await GoogleSignin.revokeAccess();
                                await GoogleSignin.signOut();
                            }
                            auth()
                                .signOut()
                                .then(() => navigateAndReset("UserSelectScreen"));
                        }
                    }
                ]
            )
        } catch (error) {
            console.log(error)
        }
    }
    const copyCode = () => {
        Clipboard.setString(user.uniqueCode)
        Util.showMessage("success", "Unique Code Copied!", "s")
    }
    const resetCode = async() => {
        try {
            setResetLoading(true)
            const uniqueCode =  Util.genRandomId()
            await firestore()
            .collection('Users')
            .doc(user.uid)
            .update({
                uniqueCode
            })
            .then(()=>setCode(uniqueCode))
        } catch (error) {
            Util.showMessage("error","Error",error.message)
        }
        finally{
            setResetLoading(false)
        }
    }
   const deleteAccount = async() => {
       try {
        const uid = auth().currentUser.uid
        await auth().currentUser.delete()
        await firestore()
        .collection("Users")
        .doc(uid)
        .delete()
        Util.showMessage("success","Account Deleted")
        navigateAndReset("UserSelectScreen")
       } catch (error) {
            Util.showMessage("error","Error",error.message)
       }
   }
    const [visible, setVisible] = useState(false);

    const hideMenu = (val) => {
        if(val == "logout"){
            logout()
        }
        else if(val == "account"){
            navigation.navigate("ProAccount")
        }
        setVisible(false);
    }

    const showMenu = () => setVisible(true);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleView}>
                <Text style={styles.logoutText}>{user.name ? `Hello, \n${user.name}` : ""}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MyButton
                        title={"News"}
                        containerStyle={{ width: "auto", borderRadius: spacing.large, padding: spacing.small, opacity: 1 }}
                        onPress={() => navigation.navigate("WebViewScreen")}
                    />
                    <TouchableOpacity style={styles.logContainer} onPress={showMenu}>
                        <Image
                            source={images.menu}
                            resizeMode="contain"
                            style={styles.logout}
                        />
                    </TouchableOpacity>
                    <Menu
                        visible={visible}
                        //anchor={<Text onPress={showMenu}>Show menu</Text>}
                        onRequestClose={hideMenu}
                    >
                        <MenuItem  textStyle={{color:"#333"}} style={{maxWidth:"auto",}} onPress={()=>hideMenu("account")}>My Account</MenuItem>
                        <MenuItem  textStyle={{color:"#333"}} onPress={()=>hideMenu("logout")}>Logout</MenuItem>
                    </Menu>
                </View>
            </View>
            <View style={styles.topView}>
                <View style={styles.logoView}>
                    <Image
                        resizeMode="contain"
                        style={styles.image}
                        source={images.logo}
                    />
                </View>
            </View>
            <View style={styles.midView}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Your Unique Code</Text>
                    <MyButton
                        title={"Reset code"}
                        loading={resetLoading}
                        containerStyle={{ width: "auto", borderRadius: spacing.large, padding: spacing.small}}
                        onPress={resetCode}
                    />
                </View>
                <View style={styles.codeView}>
                    <Text style={styles.codeText}>{code}</Text>
                    <TouchableOpacity onPress={copyCode}>
                        <Image
                            style={styles.copyIcon}
                            source={images.copy}
                            resizeMode={"contain"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default UserHome