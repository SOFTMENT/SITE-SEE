import React, { useState } from 'react';
import { Platform, Text, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import images from "../../assets/images";
import { spacing } from "../../common/variables";
import ClickableText from "../../components/ClickableText";
import { IconButton } from "../../components/ExportedComponents";
import Header from "../../components/Header";
import MyButton from "../../components/MyButton";
import MyTextInput from "../../components/MyTextInput";
import colors from "../../theme/colors";
import styles from "./styles";
import auth, { firebase } from '@react-native-firebase/auth';
import Util from '../../common/util';
import { navigateAndReset } from '../../navigators/RootNavigation';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import axios from 'axios';
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
            .then(async() => {
                const user = auth().currentUser
                await firestore()
                .collection("Users")
                .doc(user.uid)
                .get()
                .then(doc=>{
                    const userDoc = doc.data()
                    if(userDoc.isDeleted){
                        auth().signOut().then(()=>{
                            Util.showMessage("This account has been marked as deleted, please register with new email.")
                        })
                    }
                    else if(userDoc.isAdmin){
                        navigateAndReset("AdminScreen")
                        return
                    }
                    else{
                        if (!user.emailVerified && (user.providerData[0].providerId == "password" || (user.providerData[1]?.providerId == "password" ?? false))) {
                            Util.showMessage("btnToast","Email Verification Required","A verification link has been sent to your email.(Check your spam in case the email is not in your inbox",sendEmailVerificationLink)
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
    const sendNewProEmailAdmin = async(name,email) => {
        try {
            var body = new FormData()
            body.append('name',name)
            body.append('email','cyril@boquillon.com')
            body.append('subject',"A New Professional has just Signed Up")
            body.append('body',`<h1>Hello Admin</h1><p>A New Professional ${name}(${email}) has just registered with us.</p>`)
            await axios({
                method:"post",
                url:"https://softment.in/universal/mailer/sendmail.php",
                data:body
               
            })
            console.log("sent")
    
        } catch (error) {
            console.log(error)
        }
    }
    const sendUnderReviewEmail = async(name,email) => {
        sendNewProEmailAdmin(name,email)
        try {
            var body = new FormData()
            body.append('name',name)
            body.append('email',email)
            body.append('subject',"Welcome to Now Show")
            body.append('body',`<h1>Hey ${name}</h1><p>Your account is under review, we will let you know once it is approved.</p>`)
            await axios({
                method:"post",
                url:"https://softment.in/universal/mailer/sendmail.php",
                data:body
               
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
                    if(user.data().isDeleted){
                        auth().signOut().then(()=>{
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
                    name: fullName?fullName:user.displayName,
                    email: user.providerData[0].email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
                    isUser: tab == 1,
                    phoneVerified: false,
                    uid: user.uid,
                    ...(tab == 1 && { uniqueCode: Util.genRandomId(), rating: 5, ratingCount: 3 }),
                    status:"pending"
                })
                if(tab != 1)
                sendUnderReviewEmail(fullName?fullName:user.displayName,user.email?user.email:user.providerData[0].email)
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
            handleUser(fullName.givenName?fullName.givenName:"User")
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
                <Header navigation={navigation} back />
                <Text style={styles.areYou}>Hello Again!</Text>
                <Text style={styles.subText}>Welcome back you've been missed!</Text>
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    icon={images.mail}
                    placeholder="Email"
                    //value={}
                    value={email}
                    onChangeText={(txt) => setEmail(txt)}
                />
                <MyTextInput
                    containerStyle={{ marginVertical: spacing.small }}
                    icon={images.password}
                    isPass
                    placeholder={"Password"}
                    value={pass}
                    onChangeText={(txt) => setPass(txt)}
                />
                <ClickableText
                    title={"Forgot Password?"}
                    extraStyle={styles.forgot}
                    onPress={handleForget}
                />
                <MyButton
                    title={"LOG IN"}
                    containerStyle={styles.btn}
                    onPress={handleLogin}
                    loading={loading}
                />
                <Text style={styles.or}>-----------  Or continue with  -----------</Text>
                <View style={styles.socialView}>
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
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                    <Text style={styles.or}>Not a member ?</Text>
                    <ClickableText
                        title={"  Register"}
                        extraStyle={[styles.or, { color: colors.appPrimaryDark }]}
                        onPress={() => navigation.navigate("UserRegister", { tab })}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
export default UserLogin