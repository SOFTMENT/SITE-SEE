import { FlatList, ImageBackground, Text, TextInput, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { Center, HStack, Icon, IconButton } from "native-base";
import Header from "../../components/Header";
import AvatarHeader from "../../components/AvatarHeader";
import images from "../../assets/images";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "react-redux";
import Util from "../../common/util";
const Chat = (props) => {
    const { userData, navigation, route } = props
    const { params } = route
    const { lastMessage } = params
    const [chats, setChats] = useState([])
    const uid = auth().currentUser.uid
    const [chatText, setChatText] = useState("")
    const [chatActive,setChatActive] = useState(false)
    const { profilePic, name } = userData
    const checkForBooking = () => {
        if(userData.isUser){
            firestore()
            .collection("bookings")
            .where("status","==","Active")
            .where("trainerId","==",lastMessage.senderUid)
            .where("userId","==",auth().currentUser.uid)    
            .get()
            .then((sanpShot)=>{
                if(sanpShot.size>0){
                    setChatActive(true)
                }
            })
        }
        else{
            firestore()
            .collection("bookings")
            .where("status","==","Active")
            .where("trainerId","==",uid)
            .where("userId","==",lastMessage.senderUid)
            .get()
            .then((sanpShot)=>{
                if(sanpShot.size>0){
                    setChatActive(true)
                }
            })
        }
    }
    useEffect(() => {
        checkForBooking()
        if (lastMessage) {
            const { senderUid } = lastMessage
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
    const renderChats = ({ item }) => {
        if (item.senderUid == uid)
            return (
                <View style={styles.rightMsg}>
                    <Text style={styles.txt}>{item.message}</Text>
                </View>
            )
        return (
            <View style={styles.leftMsg}>
                <Text style={styles.txt}>{item.message}</Text>
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
    const handleSubmit = () => {
        setChatText(chatText.trim())
        if (chatText.trim().length > 0) {
            try {
                let docId = firestore().collection("Chats").doc().id
                const messageObj = {
                    message: chatText.trim(),
                    senderUid: uid,
                    messageId: docId,
                    senderImage:profilePic,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                    senderName: name
                }
                setMessage(docId, uid, lastMessage.senderUid, messageObj)
                setMessage(docId, lastMessage.senderUid, uid, messageObj)
                setMessage(lastMessage.senderUid, uid, "LastMessage", {
                    message: chatText.trim(),
                    senderUid: lastMessage.senderUid,
                    isRead: true,
                    senderImage:lastMessage.senderImage,
                    senderName: lastMessage.senderName,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                setMessage(uid, lastMessage.senderUid, "LastMessage", {
                    message: chatText.trim(),
                    senderUid: uid,
                    isRead: false,
                    senderImage:profilePic,
                    senderName: name,
                    date: firebase.firestore.FieldValue.serverTimestamp(),
                })
                setChatText("")
            } catch (error) {
                console.log(error)
            }
        }
    }
    console.log(lastMessage)
    return (
        <ImageBackground style={styles.container} source={images.chatsBack}>
            <AvatarHeader back title={lastMessage.senderName} navigation={navigation} icon={lastMessage.senderImage} />
            {
                chats.length > 0 ?
                    <FlatList
                        renderItem={renderChats}
                        data={chats}
                        keyExtractor={keyExtractor}
                        contentContainerStyle={styles.flatList}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                    />
                    :
                    <Center flex={1} ><Text style={styles.noData}>No Chats</Text></Center>
            }
            <HStack style={styles.inputBox}>
                <TextInput
                    style={{ flex: 1 }}
                    value={chatText}
                    onSubmitEditing={handleSubmit}
                    onChangeText={(txt) => setChatText(txt)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder={"Type Here"}
                    returnKeyType="send"
                    placeholderTextColor={"gray"}
                    editable={chatActive}
                />
                <IconButton
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="send-circle"
                        size={"2xl"}
                        color="black"
                    />}
                    onPress={handleSubmit}
                />
            </HStack>
        </ImageBackground>
    )
}
const mapStateToProps = (state) => {
    return {
        userData: state.user.userData
    }
}
export default connect(mapStateToProps)(Chat)