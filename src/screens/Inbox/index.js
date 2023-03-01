import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { Avatar, Center } from "native-base";
import Header from "../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AvatarIcon from "../../components/AvatarIcon";
const Inbox = (props) => {
    const {navigation} = props
    const [lastChats, setLastChats] = useState([])
    const uid = auth().currentUser.uid
    const insets = useSafeAreaInsets()
    useEffect(() => {
        // const q = query(collection(db, "Chats",uid,"LastMessage"), orderBy("date","desc"));
        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const lastChats = [];
        // querySnapshot.forEach((doc) => {
        //     lastChats.push({...doc.data(),id:doc.id});
        // });
        // dispatch({
        //     type:SET_LAST_MESSAGES,
        //     data:lastChats
        // })
        // });
        // return unsubscribe
        firestore()
            .collection("Chats")
            .doc(uid)
            .collection("LastMessage")
            .orderBy("date", "desc")
            .onSnapshot(querySnapshot => {
                const temp = []
                querySnapshot.forEach((doc) => {
                    temp.push({ ...doc.data(), id: doc.id });
                });
                setLastChats(temp)
            })
    }, [])
    const renderChats = ({ item }) => {
       const lastMessage = item
        console.log(item)
        return (
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate("ChatScreen",{lastMessage})}>
                <View style={styles.rightBox}>
                    <View style={styles.profile}>
                        <AvatarIcon
                            uri={item.senderImage}
                        />
                    </View>
                    <View style={styles.chatBox}>

                        <Text style={styles.title}>{item.senderName}</Text>

                        <Text style={styles.text}>{item.message}</Text>
                    </View>
                </View>
                <Text style={styles.smallTxt}>02.30 PM</Text>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item) => {
        return item.id
    }
    return (
        <View style={[styles.container]}>
            <Header title="Inbox"/>
            {
                lastChats.length > 0 ?
                    <FlatList
                        renderItem={renderChats}
                        data={lastChats}
                        keyExtractor={keyExtractor}
                    />
                    :
                    <Center flex={1} ><Text style={styles.noData}>No Chats</Text></Center>
            }
        </View>
    )
}
export default Inbox