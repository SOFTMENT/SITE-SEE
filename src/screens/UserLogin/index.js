import appleAuth from '@invertase/react-native-apple-authentication';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Button, Link, Stack } from 'native-base';
import React, { useState } from 'react';
import { Image, ImageBackground, Text, View } from "react-native";
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import images from "../../assets/images";
import Util from '../../common/util';
import { spacing } from "../../common/variables";
import MyButton from "../../components/MyButton";
import MyTextInput from "../../components/MyTextInput";
import { navigateAndReset } from '../../navigators/RootNavigation';
import colors from "../../theme/colors";
import styles from "./styles";
GoogleSignin.configure({
    webClientId: '1021031487843-3oejvl3a6ekc7i6bq9pal6mv0qem51u1.apps.googleusercontent.com',
});
const UserLogin = (props) => {
    const { navigation, route } = props
    const tab = route.params?.tab ?? 1
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [loading, setLoading] = useState(false)
    const handleForget = () => {
        if (!email.trim()) {
            Util.showMessage("error", "Please provide email")
        }
        else {
            auth().sendPasswordResetEmail(email)
                .then(() => {
                    Util.showMessage("success", "Email reset link sent")
                })
                .catch(error => {
                    Util.showMessage("success", "Error", error.code.split("/")[1])
                })
        }
    }
    const sendEmailVerificationLink = () => {
        const user = auth().currentUser
        user.sendEmailVerification()
            .then(() => {
                Util.showMessage("success", "Email verification link sent")
            })
    }
    const handleLogin = async () => {
        if (!email.trim()) {
            Util.showMessage("error", "Oops!", "Please Enter Email")
            return
        }
        if (!pass) {
            Util.showMessage("error", "Oops!", "Please Enter Password")
            return
        }
        setLoading(true)
        auth()
            .signInWithEmailAndPassword(email.trim(), pass)
            .then(async () => {
                const user = auth().currentUser
                await firestore()
                    .collection("Users")
                    .doc(user.uid)
                    .get()
                    .then(doc => {
                        const userDoc = doc.data()
                        if (userDoc.isDeleted) {
                            auth().signOut().then(() => {
                                Util.showMessage("This account has been marked as deleted, please register with new email.")
                            })
                        }
                        else if (userDoc.isAdmin) {
                            navigateAndReset("AdminScreen")
                            return
                        }
                        else {
                            if (!user.emailVerified && (user.providerData[0].providerId == "password" || (user.providerData[1]?.providerId == "password" ?? false))) {
                                Util.showMessage("btnToast", "Email Verification Required", "A verification link has been sent to your email.(Check your spam in case the email is not in your inbox", sendEmailVerificationLink)
                            }
                            else {
                                navigateAndReset("HomeScreen", { uid: user.uid })
                            }
                        }
                    })
            })
            .catch(error => {
                Util.showMessage("error", "Error", error.code.split("/")[1])
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const sendNewProEmailAdmin = async (name, email) => {
        try {
            var body = new FormData()
            body.append('name', name)
            body.append('email', 'cyril@boquillon.com')
            body.append('subject', "A New Professional has just Signed Up")
            body.append('body', `<h1>Hello Admin</h1><p>A New Professional ${name}(${email}) has just registered with us.</p>`)
            await axios({
                method: "post",
                url: "https://softment.in/universal/mailer/sendmail.php",
                data: body

            })
            console.log("sent")

        } catch (error) {
            console.log(error)
        }
    }
    const sendUnderReviewEmail = async (name, email) => {
        sendNewProEmailAdmin(name, email)
        try {
            var body = new FormData()
            body.append('name', name)
            body.append('email', email)
            body.append('subject', "Welcome to Now Show")
            body.append('body', `<h1>Hey ${name}</h1><p>Your account is under review, we will let you know once it is approved.</p>`)
            await axios({
                method: "post",
                url: "https://softment.in/universal/mailer/sendmail.php",
                data: body

            })
            console.log("sent")

        } catch (error) {
            console.log(error)
        }
    }
    const fbLogin = async () => {
        try {
            setLoading(true)
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
            if (result.isCancelled) {
                throw { message: 'User cancelled the login process' };
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                throw { message: 'Something went wrong obtaining access token' };
            }
            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            const user = await auth().signInWithCredential(facebookCredential);
            // console.log( user.providerData)
            // console.log( user.providerId)
            handleUser()
        } catch (error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            else
                Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLoading(false)
        }
    }
    const handleUser = async (fullName) => {
        const userData = auth().currentUser
        console.log(userData)
        setLoading(true)
        await firestore()
            .collection("Users")
            .doc(userData.uid)
            .get()
            .then((user) => {
                if (user.exists) {
                    if (user.data().isDeleted) {
                        auth().signOut().then(() => {
                            Util.showMessage("This account has been marked as deleted, please register with new email.")
                        })
                    }
                    else
                        navigateAndReset("HomeScreen", { uid: user.data().uid })
                }
                else {
                    setUserData(fullName)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const setUserData = async (fullName) => {
        const user = auth().currentUser
        console.log(user)
        try {
            setLoading(true)
            await firestore()
                .collection('Users')
                .doc(user.uid)
                .set({
                    name: fullName ? fullName : user.displayName,
                    email: user.providerData[0].email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    //lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                     isUser: tab == 1,
                    profileCompleted:false,
                    // phoneVerified: false,
                    uid: user.uid,
                    ...(tab == 1 && { ratingObj: {1:0,2:0,3:0,4:0,5:0}, ratingCount: 0 }),
                    // status: "pending"
                })
            // if (tab != 1)
            //     sendUnderReviewEmail(fullName ? fullName : user.displayName, user.email ? user.email : user.providerData[0].email)
            navigateAndReset("HomeScreen", { uid: user.uid })
        } catch (error) {
            Util.showMessage("error", "Error", error.message)
        }
        finally {
            setLoading(false)
        }
    }
    const googleLogIn = async () => {
        try {
            // Check if your device supports Google Play
            setLoading(true)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            const user = await auth().signInWithCredential(googleCredential);

            handleUser()
        } catch (error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            else
                Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLoading(false)
        }

    }
    const appleLogin = async () => {
        try {
            setLoading(true)
            // Start the sign-in request
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw new Error('Apple Sign-In failed - no identify token returned');
            }

            // Create a Firebase credential from the response
            const { identityToken, nonce, fullName } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            // Sign the user in with the credential
            await auth().signInWithCredential(appleCredential);
            handleUser(fullName.givenName ? fullName.givenName : "User")
        }
        catch (error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                Util.showMessage("error", "Error", "An account already exists with the same email address")
            }
            else
                Util.showMessage("error", "Error", error?.message)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <KeyboardAwareScrollView
            bounces={false}
            style={{ flex: 1 }}
        // stickyHeaderHiddenOnScroll
        >
            <View
                style={styles.container}>
                {/* <Header navigation={navigation} back /> */}
                <ImageBackground
                    source={images.login}
                    style={styles.loginBack}
                    resizeMode="cover"
                >
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        style={styles.logo}
                    />
                </ImageBackground>
                <View style={styles.mainView}>
                    <Text style={styles.areYou}>Hey, Welcome Back!</Text>
                    <Text style={styles.subText}>Login to your Account</Text>
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        iconName={"email-outline"}
                        placeholder="Email"
                        //value={}
                        value={email}
                        onChangeText={(txt) => setEmail(txt)}
                    />
                    <MyTextInput
                        containerStyle={{ marginVertical: spacing.small }}
                        iconName={"lock-outline"}
                        isPass
                        placeholder={"Password"}
                        value={pass}
                        onChangeText={(txt) => setPass(txt)}
                    />
                    {/* <ClickableText
                        title={"Forgot Password?"}
                        extraStyle={styles.forgot}
                        onPress={handleForget}
                        containerStyle={{borderBottomWidth:1,borderBottomColor:"white"}}
                    /> */}
                    <Link
                        onPress={handleForget}
                        _text={{
                            color: colors.greyText,
                        }}
                        style={{
                            alignSelf: "flex-end"
                        }}
                    >
                        Forgot Password?
                    </Link>
                    <MyButton
                        title={"Login"}
                        containerStyle={styles.btn}
                        onPress={handleLogin}
                        loading={loading}
                    />
                    <View style={styles.borderViewContainer}>
                        <View style={styles.borderView}></View>
                        <Text style={styles.or}>Or Register Using</Text>
                        <View style={styles.borderView}></View>
                    </View>
                    {/* <View style={styles.socialView}>
                        {
                            Platform.OS == "ios"
                            &&
                            <IconButton
                                icon={images.apple}
                                containerStyle={styles.btnContainer}
                                onPress={appleLogin}
                            />
                        }
                        <IconButton
                            icon={images.google}
                            containerStyle={styles.btnContainer}
                            onPress={googleLogIn}
                        />
                        <IconButton
                            icon={images.facebook}
                            containerStyle={styles.btnContainer}
                            onPress={fbLogin}
                        />
                       
                    </View> */}
                    <Stack direction={"row"} justifyContent="space-evenly" space={2}>
                        <Button
                            _pressed={{backgroundColor:"gray.800"}}
                            onPress={googleLogIn}
                            leftIcon={
                                <Image source={images.google} style={styles.icon} />
                            }
                            bg={"gray.700"}
                            flex={1}
                            //style={styles.socialBtn}
                        >Google</Button>
                        <Button
                            _pressed={{backgroundColor:"gray.800"}}
                            flex={1}
                            bg={"gray.700"}
                            onPress={fbLogin}
                            leftIcon={
                                <Image source={images.facebook} style={styles.icon} />
                            }
                            //style={styles.socialBtn}
                        >Facebook</Button>
                        <Button
                            _pressed={{backgroundColor:"gray.800"}}
                            flex={1}
                            bg={"gray.700"}
                            onPress={appleLogin}
                            leftIcon={
                                <Image source={images.apple} style={[styles.icon, { tintColor: colors.borderColor }]} />
                            }
                            // backgroundColor: colors.darkGreyBtn, flex: 1 }}
                        >Apple</Button>
                    </Stack>
                    <View style={{ flexDirection: "row", justifyContent: 'center',alignItems:"center" }}>
                        <Text style={styles.register}>Register a new account?</Text>
                        {/* <ClickableText
                            title={"Sign Up"}
                            extraStyle={[styles.or, { color: colors.appPrimaryDark }]}
                            onPress={() => navigation.navigate("UserRegister", { tab })}
                        /> */}
                         <Link
                             onPress={() => navigation.navigate("UserRegister", { tab })}
                            _text={{
                                color: "white",
                                fontWeight:800
                            }}
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
export default UserLogin