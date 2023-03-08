import auth from '@react-native-firebase/auth'
import { Icon } from 'native-base'
import React, { useEffect, useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import images from "../../assets/images"
import Header from "../../components/Header"
import { navigateAndReset } from "../../navigators/RootNavigation"
import styles from "./styles"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyButton from '../../components/MyButton'
import NoResults from '../../components/NoResults'
import { spacing } from '../../common/variables'
import firestore from '@react-native-firebase/firestore'
import Util from '../../common/util'
import axios from 'axios'
import { NOTIFY_CALL } from '../../config/Networksettings'
const AdminScreen = (props) => {
    const {navigation} = props
    const [title,setTitle] = useState("")
    const [message,setMessage] = useState("")
    const [data,setData] = useState([])
    const [loader,setLoader] = useState(false)
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            await firestore()
                .collection("Users")
                .where("status", "==", "pending")
                .where("isUser", "==", false)
                .orderBy("createdAt", "desc")
                .get()
                .then(querySnapshot => {
                    console.log(querySnapshot.size)
                    const temp = []
                    querySnapshot.forEach(docSnap => {
                        //console.log(docSnap.data())
                        temp.push(docSnap.data())
                    })
                    setData(temp)
                    //console.log(temp)
                })
        } catch (error) {
            console.log(error)
            Util.showMessage("error", "Error", error.message)
        }
        finally{
            //setLoader(false)
        }
    }
    const sendNotification = async() =>{
        if(!title.trim()){
            Util.showMessage("error","Please Enter Title","")
            return
        }
        if(!message.trim()){
            Util.showMessage("error","Please Enter Message","")
            return
        }
        try {
            setTitle("")
            setMessage("")
            await axios({
                method:"post",
                url:NOTIFY_CALL,
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data:{
                    title:title,
                    message:message,
                    //topic:"all"
                }
            })
            Util.showMessage("success","Notification Sent","")
        } catch (error) {
            console.log(error)
        }   
    }
    const logout = async () => {
        try {
            auth()
                .signOut()
                .then(() => navigateAndReset("UserSelectScreen"));
        } catch (error) {
            console.log(error)
        }
    }
    const updateStatus = async (uid, status,name,email) => {
        try {
            await firestore()
                .collection("Users")
                .doc(uid)
                .update({
                    status
                })
            Util.showMessage("success",status=="approved"?"Profile Verified!":"Profile Rejected!")
            getData()
            sendUnderReviewEmail(name,email,status == "approved"?true:false)
        } catch (error) {
            console.log(error)
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <View style={styles.btnView}>
                    <MyButton
                        title={"Approve"}
                        containerStyle={styles.approve}
                        txtStyle={{color:"white"}}
                        onPress={() => updateStatus(item.uid, "approved",item.name,item.email)}
                    />
                    <MyButton
                        title={"Reject"}
                        containerStyle={styles.reject}
                        txtStyle={{color:"white"}}
                        onPress={() => updateStatus(item.uid, "rejected",item.name,item.email)}
                    />
                </View>
            </View>
        )
    }
    const sendUnderReviewEmail = async(name,email,isApprove) => {
        try {
            var body = new FormData()
            body.append('name',name)
            body.append('email',email)
            if(isApprove){
                body.append('subject',"Ktr Fitness account approved")
                body.append('body',`<h1>Hey ${name}</h1><p>We are delighted to let you know that we have succesfully verified your account, you can now continue using our app.</p>`)
            }
            else{
                body.append('subject',"Ktr Fitness account rejected")
                body.append('body',`<h1>Hey ${name}</h1><p>Sorry, we are unable to verify your account at this moment.</p>`)
            }
            await axios({
                method:"post",
                url:"https://softment.in/universal/mailer/sendmail.php",
                data:body
               
            })
        } catch (error) {
            console.log(error)
        }
    }
    const keyExtractor = (item) => {
        return item.uid
    }
    return (
        <View style={styles.container}>
            <Header title="Ktr Fitness"/>
            <View style={styles.titleView}>
                <Text style={styles.logoutText}>{`Hello, \nAdmin`}</Text>
                <TouchableOpacity style={styles.logContainer} onPress={logout}>
                    <Icon
                        name="logout"
                        size={"lg"}
                        as={MaterialCommunityIcons}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.heading}>Send Notification</Text>
            <TextInput
                value={title}
                onChangeText={(txt)=>setTitle(txt)}
                placeholder="Title"
                style={styles.title}
                placeholderTextColor="white"
            />
            <TextInput
                value={message}
                onChangeText={(txt)=>setMessage(txt)}
                placeholder="Message"
                style={styles.message}
                multiline
                numberOfLines={3}
                placeholderTextColor="white"
            />
            <MyButton
                title="Send Notification"
                containerStyle={{marginVertical:10}}
                onPress={sendNotification}
            />
            <Text style={[styles.heading,{marginTop:5}]}>Verification List</Text>
            <View style={{flex:1}}>
            {
                data ? (
                    data.length == 0 ?
                        <NoResults title="No new request" />
                        :
                        <FlatList
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            data={data ? data : []}
                            bounces={false}
                            style={{ flex: 1, marginBottom: spacing.medium }}
                        />
                ) :
                    <CenteredLoader />
            }
            </View>
        </View>
    )
}
export default AdminScreen