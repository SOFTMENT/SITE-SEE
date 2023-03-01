import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import Header from '../../../components/Header'
import { spacing } from '../../../common/variables'
import { Center, Icon, Progress, TextArea } from 'native-base'
import MyButton from '../../../components/MyButton'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Util from '../../../common/util'
const ratingArray = [1,2,3,4,5]
export default function WriteReview(props) {
    const { navigation, route } = props
    const { bookingData } = route.params
    const { bookingId, trainerPic, amount, appointmentDate, appointmentTime, createTime, status, trainerId, trainingType, userId, trainerName, reviewDone } = bookingData
    const userData = useSelector(state => state.user.userData)
    const [review, setReview] = useState("")
    const [rating,setRating] = useState(1)
    const [loader,setLoader] = useState(false)
    const handleReview = () => {
        if(review.trim().length <20){
            Util.showMessage("error","Please write atleast 20 letters")
            return
        }
            //const batch = firestore().batch()
            const bookingRef = firestore().collection("bookings").doc(bookingId)
            const trainerRef = firestore().collection("Users").doc(trainerId).collection("Reviews").doc()
            // batch.update(bookingRef, {
            //     reviewDone: true
            // })
            // batch.set(trainerRef, {
            //     userPic: userData.profilePic,
            //     id: trainerRef.id,
            //     reviewerId: userData.uid,
            //     trainerId,
            //     review,
            //     rating
            // })
            setLoader(true)
            const trainerDocRef = firestore().collection("Users").doc(trainerId)
            firestore().runTransaction(async transaction => {
                const trainerSnap = await transaction.get(trainerDocRef)
                if(trainerSnap.exists){
                    const trainerData = trainerSnap.data()
                    const ratingCount = trainerData.ratingCount
                    const ratingObj = trainerData.ratingObj
                    transaction.update(bookingRef,{
                        reviewDone:true
                    })
                    transaction.set(trainerRef,{
                        userPic: userData.profilePic,
                        id: trainerRef.id,
                        reviewerId: userData.uid,
                        trainerId,
                        review:review.trim(),
                        rating,
                        bookingId,
                        createTime:firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    transaction.update(trainerDocRef,{
                        ratingCount : ratingCount + 1,
                        ratingObj : {
                            [rating]:ratingObj[rating] ++,
                            ...ratingObj
                        }
                    })
                }
            })
            .then(()=>{
                setLoader(false)
                Util.showMessage("success","Hurray","Thanks for your review!")
                navigation.goBack()
            })
            .catch((error)=>{
                setLoader(false)
                console.log(error)
                Util.showMessage("error","Something went wrong")
            })
    }
    return (
        <View style={styles.container}>
            <Header navigation={navigation} back title="Write Review" />
            <View style={{ padding: spacing.medium,paddingTop:5 }}>
                <View style={styles.ratingView}>
                {/* <View style={styles.ratingCon}>
                    <Text style={styles.ratingText}>{rating}</Text>
                </View> */}
                {
                    ratingArray.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => setRating(item)}>
                                <Icon as={MaterialCommunityIcons}
                                    name={item<=rating?"star":"star-outline"}
                                    color={"yellow.500"}
                                    size={"2xl"}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
                </View>
                <TextInput
                    style={styles.textArea}
                    numberOfLines={5}
                    multiline={true}
                    placeholder="Write Review"
                    placeholderTextColor={"gray"}
                    value={review}
                    onChangeText={(txt) => setReview(txt)}
                />
                <MyButton
                    title={"Send"}
                    onPress={handleReview}
                    loading={loader}
                //containerStyle={styles.btn}
                //onPress={handleNav}
                //onPress={handleRegister}
                //loading={loading}
                />
            </View>
        </View>
    )
}
