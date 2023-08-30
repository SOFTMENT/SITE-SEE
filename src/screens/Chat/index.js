import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import TimeAgo from 'javascript-time-ago';
import { HStack, Icon, IconButton, KeyboardAvoidingView, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, Text, TextInput, View } from "react-native";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import Util from "../../common/util";
import AvatarHeader from "../../components/AvatarHeader";
import styles from "./styles";
const Chat = (props) => {
    const { userData, navigation, route } = props
    const { params } = route
    const timeAgo = new TimeAgo("en-US")
    const [lastMessage,setLastMessage] = useState(params.lastMessage)
    const [chats, setChats] = useState([])
    const uid = auth().currentUser.uid
    const [chatActive,setChatActive] = useState(false)
    const { profilePic, name } = userData
    const checkForBooking = () => {
        if(userData.userType == 'Advertiser'){
            firestore()
            .collection("Bookings")
            .where("vendorId","==",lastMessage.senderUid)
            .where("advertiserId","==",auth().currentUser.uid)    
            .get()
            .then((snapShot)=>{
                if(snapShot.size>0){
                    setChatActive(true)
                }
            })
        }
        else{
            firestore()
            .collection("bookings")
            .where("vendorId","==",uid)
            .where("advertiserId","==",lastMessage.senderUid)
            .get()
            .then((snapShot)=>{
                if(snapShot.size>0){
                    setChatActive(true)
                }
            })
        }
    }
    useEffect(() => {
        checkForBooking()
        if (lastMessage) {
            const { senderUid } = lastMessage
            getRecipientData(senderUid)
            const unsubscribe = firestore()
                .collection("Chats")
                .doc(uid)
                .collection(senderUid)
                .orderBy("date", "desc")
                .onSnapshot((querySnapshot) => {
                    const chats = [];
                    querySnapshot.forEach((doc) => {
                        chats.push({ ...doc.data(), id: doc.id });
                    });
                    setChats(chats)
                })
            return unsubscribe
        }
    }, [])
    const getRecipientData = async(senderUid) => {
        const res = await firestore().collection("Users").doc(senderUid).get()
        const data = res.data()
        setLastMessage({
            ...lastMessage,
            senderImage:data.profilePic,
            senderName:data.name
        })
    }
    const renderChats = ({ item }) => {
        console.log(item)
        if (item.senderUid == uid)
            return (
                <View style={styles.rightMsg}>
                    <View style={styles.rightMsgInner}>
                        <Text style={styles.txt}>{item.message}</Text>
                    </View>
                    <Text style={styles.timeAgo}>{item.date?.toDate()?timeAgo.format(item.date?.toDate()):""}</Text>
                </View>
            )
            return (
                <View style={styles.leftMsg}>
                    <View style={styles.leftMsgInner}>
                        <Text style={styles.txt}>{item.message}</Text>
                    </View>
                    <Text style={styles.timeAgo}>{item.date?.toDate()?timeAgo.format(item.date?.toDate()):""}</Text>
                </View>
            )
    }
    const keyExtractor = (item) => {
        return item.id
    }
    const setMessage = (messageId, senderUid, recUid, messageObj) => {
        console.log(messageId, senderUid, recUid, messageObj)
        try {
            firestore()
                .collection("Chats")
                .doc(senderUid)
                .collection(recUid)
                .doc(messageId)
                .set(messageObj)
        } catch (error) {
            console.log(error)
            Util.showMessage("error", "Something went wrong")
        }
    }
    const handleSubmit = (chatText) => {
        //setChatText(chatText.trim())
        if (chatText.trim().length > 0) {
            try {
                let docId = firestore().collection("Chats").doc().id
                const messageObj = {
                    message: chatText.trim(),
                    senderUid: uid,
                    messageId: docId,
                    //senderImage:profilePic,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    //senderName: name
                }
                setMessage(docId, uid, lastMessage.senderUid, messageObj)
                setMessage(docId, lastMessage.senderUid, uid, messageObj)
                setMessage(lastMessage.senderUid, uid, "LastMessage", {
                    message: chatText.trim(),
                    senderUid: lastMessage.senderUid,
                    isRead: true,
                    //senderImage:lastMessage.senderImage,
                    //senderName: lastMessage.senderName,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                setMessage(uid, lastMessage.senderUid, "LastMessage", {
                    message: chatText.trim(),
                    senderUid: uid,
                    isRead: false,
                    //senderImage:profilePic,
                    //senderName: name,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                //setChatText("")
            } catch (error) {
                console.log(error)
            }
        }
    }
    //console.log(lastMessage)
    const RenderHeader = () => {
        const [chatText, setChatText] = useState("")
        return(
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
                <HStack style={styles.inputBox}>
                <TextInput
                    style={{ flex: 1,color:"black"}}
                    value={chatText}
                    onSubmitEditing={()=>{handleSubmit(chatText);setChatText("")}}
                    onChangeText={(txt) => setChatText(txt)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder={"Type Here"}
                    returnKeyType="send"
                    placeholderTextColor={"gray"}
                    multiline={true}
                    //editable={chatActive}
                />
                <IconButton
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="send-circle"
                        size={"2xl"}
                        color="black"
                    />}
                    onPress={()=>{handleSubmit(chatText);setChatText("")}}
                />
            </HStack>
            </KeyboardAvoidingView>
        )
    }
    return (
        <View style={styles.container}>
            <AvatarHeader back title={lastMessage.senderName} navigation={navigation} icon={lastMessage.senderImage} />
                <FlatList
                        inverted
                        renderItem={renderChats}
                        data={chats}
                        //style={{flex:1}}
                        keyExtractor={keyExtractor}
                        style={styles.flatList}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        //ListHeaderComponent={<RenderHeader/>}
                        keyboardShouldPersistTaps={"handled"}
                    />
                <RenderHeader/>
        </View>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(Chat)