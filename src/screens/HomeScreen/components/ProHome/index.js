import { Alert, Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import styles from "./styles"
import auth, { firebase } from '@react-native-firebase/auth';
import { navigateAndReset } from "../../../../navigators/RootNavigation";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import firestore from '@react-native-firebase/firestore'
import Util from "../../../../common/util";
import CenteredLoader from "../../../../components/CenteredLoader";
import MyButton from "../../../../components/MyButton";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Menu, MenuItem } from "react-native-material-menu";
import MyTextInput from "../../../../components/MyTextInput";
import { spacing } from "../../../../common/variables";
import PhoneInput from "react-native-phone-number-input";
const ProHome = (props) => {
    const {  navigation } = props
    //console.log(auth().currentUser,user)
    const [user,setUser] = useState(props.user)
    const [searchValue, setSearchValue] = useState("")
    const [phone,setPhone] = useState("")
    const [countryCode,setCountryCode] = useState("+41")
    const phoneInput = useRef();
    const [userDoc, setUserDoc] = useState(null)
    const [loading, setLoading] = useState(false)
    const ratingArray = [1,2,3,4,5]
    const [rating,setRating] = useState(0)
    useEffect(() => {
        if (searchValue.length == 7) {
            getSearchData(searchValue)
        }
        else{
            setUserDoc(null)
        }
    }, [searchValue])
    const getSearchData = (value) => {
        setLoading(true)
        firestore()
            .collection("Users")
            .where("uniqueCode", "==", value)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                    checkInHistory(value)
                    //Util.showMessage("error", "No Results Found", "")
                }
                else {
                    setUserDoc(querySnapshot.docs[0].data())
                    updateSubCollection(querySnapshot.docs[0].data())
                }
            })
            .catch((error) => {
                Util.showMessage("error", "Error", error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const checkInHistory = (value) => {
        firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .collection("history")
            .where("uniqueCode", "==", value)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                    Util.showMessage("error", "No Results Found", "")
                }
                else {
                    getUserData(querySnapshot.docs[0].data().uid,value)
                    //updateSubCollection(querySnapshot.docs[0].data())
                }
            })
            .catch((error) => {
                Util.showMessage("error", "Error", error.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    const getUserData = async(uid,value) => {
        setLoading(true)
        await firestore()
        .collection("Users")
        .doc(uid)
        .get()
        .then((doc)=>{
            if(doc.exists)
            setUserDoc({
                ...doc.data(),
                uniqueCode:value
            })
            else{
                // Util.showMessage("error", "No Results Found", "")
            }
        })
        .catch(()=>{

        })
        .finally(()=>{
            setLoading(false)
        })
    }
    const updateSubCollection = async(userData) => {
        try {
            await firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .collection("history")
            .add(
                {
                    name:userData.name,
                    email:userData.email,
                    phoneNumber:userData.phoneNumber,
                    viewedAt:firebase.firestore.FieldValue.serverTimestamp(),
                    uid:userData.uid,
                    uniqueCode:userData.uniqueCode,
                }
            )
            resetCode(userData.uid)
        } catch (error) {
            
        }
    }
    const resetCode = async(uid) => {
        try {
            const uniqueCode =  Util.genRandomId()
            await firestore()
            .collection('Users')
            .doc(uid)
            .update({
                uniqueCode
            })
        } catch (error) {
           // Util.showMessage("error","Error",error.message)
        }
    }
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
    const handleRating = (value) => {
        console.log("here")
        //const ratedBy = userDoc.ratedBy
        // if(ratedBy.includes(user.uid)){
        //     Util.showMessage("error","You have already rated this user.")
        // }
        // else{
            setLoading(true)
            firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .collection("history")
            .where("uniqueCode", "==", searchValue)
            .get()
            .then( async querySnapshot => {
                if (querySnapshot.size == 0) {
                    Util.showMessage("error", "something went wrong", "")
                }
                else {
                    const id = querySnapshot.docs[0].id
                    const data = querySnapshot.docs[0].data()
                    if(!data.isRated){
                       const ref = firestore().collection("Users").doc(userDoc.uid)
                       await firestore().runTransaction(async(transaction)=>{
                         const refSnap = await transaction.get(ref)
                         if(refSnap.exists){
                            transaction.update(ref,{
                                rating: ((refSnap.data().rating * refSnap.data().ratingCount)+value) / (refSnap.data().ratingCount+1),
                                ratingCount:firebase.firestore.FieldValue.increment(1)
                            })
                            const historyRef = firestore().collection("Users").doc(auth().currentUser.uid).collection("history").doc(id)
                            transaction.update(historyRef,{
                                isRated:true
                            })
                         }
                       })
                       .then(()=>{
                            Util.showMessage("success","Rating submitted!")
                            getSearchData(userDoc.uniqueCode)
                       })
                       .catch(()=>{
                            Util.showMessage("error","Something Went Wrong")
                       })
                    // firestore()
                    // .collection("Users")
                    // .doc(auth().currentUser.uid)
                    // .collection("history")
                    // .doc(id)
                    // .update({
                    //     isRated:true
                    // })
                    // .then(()=>{
                    //     firestore()
                    //     .collection("Users")
                    //     .doc(userDoc.uid)
                    //     .update({
                    //         rating: 5,
                    //         ratingCount:firebase.firestore.FieldValue.increment(1)
                    //     })
                    //     .then(()=>{
                    //         Util.showMessage("success","Rating submitted!")
                    //         getSearchData(userDoc.uniqueCode)
                    //     })
                    // })
                    }
                    else{
                        Util.showMessage("error","Rating already given for this code.")
                    }
                }
            })
            .catch((error) => {
                Util.showMessage("error", "Error", error.message)
            })
            .finally(() => {
                setLoading(false)
            })
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
    const updatePhone = () => {
        if(phone.length == 0){
            Util.showMessage("error","Oops!","Please enter phone number")
        }
        else{
            firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .update({
                phoneNumber:`+${countryCode}${phone}`
            })
            .then(()=>{
                setUser({...user,phoneNumber:`+${countryCode}${phone}`})
            })
        }
    }
    if(user.phoneNumber == null){
        return(
            <View style={styles.container}>
                <Header/>
                <Text style={styles.bold}>{"Phone Number Required"}</Text>
                <PhoneInput
                      ref={phoneInput}
                      defaultCode="CH"
                      containerStyle={{marginVertical:spacing.medium,width:"100%"}}
                      textInputStyle={{ color: '#333' }}
                      codeTextStyle={{ color: 'rgba(256,256,256,0.3)' }}
                      textContainerStyle={[
                        styles.inputContainer,
                        {
                          borderBottomColor: 'rgba(256,256,256,0.3)',
                          borderBottomWidth: 0.3,
                        },
                      ]}
                      onChangeText={txt => {
                        const newtxt = txt.replace(/[^0-9]/g, '');
                        setPhone(newtxt)
                      }}
                      onChangeCountry={obj =>
                        setCountryCode(obj.callingCode[0],)
                      }
                      textInputProps={{
                        keyboardType: 'phone-pad',
                        value: phone,
                        maxLength: 12,
                        placeholderTextColor: 'grey',
                      }}
                    />
                <MyButton
                    title={"Update"}
                    onPress={()=>{
                        updatePhone()
                    }}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleView}>
                <Text style={styles.logoutText}>{user.name ? `Hello, \n${user.name}` : ""}</Text>
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
                        onRequestClose={()=>hideMenu()}
                    >
                        <MenuItem style={{maxWidth:"auto"}} textStyle={{color:"#333"}} onPress={()=>hideMenu("account")}>My Account</MenuItem>
                        <MenuItem  textStyle={{color:"#333"}} onPress={()=>hideMenu("logout")}>Logout</MenuItem>
                    </Menu>
            </View>
            {
                user.status == "approved" ? 
                <View style={styles.inputView}>
                    <Image
                        source={images.search}
                        resizeMode="contain"
                        style={styles.search}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Search by Unique-Id"}
                        placeholderTextColor={"grey"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(txt) => setSearchValue(txt.trim())}
                    />
                </View>:
                (
                    user.status == "rejected"?
                    <View style={[styles.inputView,{flexDirection:"column",alignItems:"flex-start"}]}>
                        <Text style={styles.bold}>Account disabled</Text>
                        <Text style={styles.subText}>Sorry, we could not verify your account at this moment.</Text>
                    </View>:
                    <View style={[styles.inputView,{flexDirection:"column",alignItems:"flex-start"}]}>
                        <Text style={styles.bold}>Need admin approval </Text>
                        <Text style={styles.subText}>Your account verification is under process.</Text>
                     </View>
                )
            }
            {loading ? <CenteredLoader />
                :
                (
                    userDoc ?
                        <View style={styles.mainView}>
                            <Text style={styles.uniqText}>{userDoc.uniqueCode}</Text>
                            {
                                // userDoc.ratedBy.length == 0 ?
                                //     <View style={styles.ratingView}>
                                //         <Text style={styles.totalRatingText}>No ratings yet</Text> 
                                //     </View>:
                                    <View style={styles.ratingView}>
                                        <Image
                                            style={styles.ratingStar}
                                            source={images.star}
                                            resizeMode="contain"
                                        />
                                        
                                        <Text style={styles.ratingText}>{userDoc.rating > 5?"5 🔥":Math.round(userDoc.rating * 10) / 10}</Text>
                                        <Text style={styles.totalRatingText}>{` (${userDoc.ratingCount})`}</Text>
                                    </View>
                            }
                            <View style={styles.encolseView}>
                                <Text style={styles.howWould}>How would you rate this user?</Text>
                                <View style={styles.giveRatingView}>
                                    {/* {
                                        ratingArray.map((item,index)=>{
                                            return(
                                                <TouchableOpacity key={index} onPress={()=>setRating(item)}>
                                                    <Image
                                                        source={item<=rating?images.star:images.unfillStar}
                                                        style={styles.star}
                                                        resizeMode="contain"
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })
                                    } */}
                                    <MyButton 
                                        title={"Super"}
                                        containerStyle={{flex:0.3,backgroundColor:"green"}}
                                        onPress={()=>handleRating(10)}
                                    />
                                    <MyButton 
                                        title={"Ok"}
                                        containerStyle={{flex:0.3,backgroundColor:"white"}}
                                        txtStyle={{color:"grey"}}
                                        onPress={()=>handleRating(5)}
                                    />
                                    <MyButton 
                                        title={"No Show"}
                                        containerStyle={{flex:0.3,backgroundColor:"red"}}
                                        onPress={()=>handleRating(0)}
                                    />
                                </View>
                            </View>
                            {/* <MyButton
                                title={"Give Rating"}
                                onPress={handleRating}
                                loading={loading}
                            /> */}
                        </View>
                        :
                        null
                )
            }
        </View>
    )
}
export default ProHome