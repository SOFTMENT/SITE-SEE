import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import Header from "../../../components/Header"
import TrainerCard from "../../ProScreens/ProHome/components/TrainerCard"
import { spacing } from "../../../common/variables"
import { Button, HStack, Icon } from "native-base"
import Util from "../../../common/util"
import DatePicker from "react-native-date-picker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { addDays, format, parse } from "date-fns"
import { hours } from "../../../config/appConfig"
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MyButton from "../../../components/MyButton"
import { PAYMENT_INTENT } from "../../../config/Networksettings"
import AppConstant from "../../../config/Constants"
import axios from "axios"
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useSelector } from "react-redux"
import PopupMessage from "../../../components/PopupMessage"
import { navigateAndReset } from "../../../navigators/RootNavigation"
let index = 0
const AppointmentScreen = (props) => {
    const { navigation, route } = props
    const userData = useSelector(state => state.user.userData)
    const { data } = route.params
    const {workingTime,uid} = data
    const [show, setShow] = useState(false)
    const [appointmentDate, setAppointmentDate] = useState(new Date())
    const [appointmentTime, setAppointmentTime] = useState(null)
    const [cardFilled, setCardFilled] = useState(false)
    const { confirmPayment, loading } = useConfirmPayment()
    const [loaderVisibility, setLoaderVisibility] = useState(false)
    const [successPopup, setSuccessPopup] = useState(false)
    const [bookingData,setBookingData] = useState([])
    const [isFetching,setFetching] = useState(false)
    useEffect(()=>{
        getPreviosBooking()
        //checkActiveBooking()
    },[])
    const getPreviosBooking = () => {
        try {
            setFetching(true)
            firestore()
            .collection("bookings")
            .where("status","==","Active")
            .where("trainerId","==",uid)
            .get()
            .then((sanpShot)=>{
                const localData = []
                sanpShot.forEach(docSnap=>{
                    localData.push(docSnap.data())
                })
                setBookingData(localData)
                setFetching(false)
                console.log(localData)
            })
            
        } catch (error) {
            setFetching(false)
        }
    }
    const payPressed = async () => {
        if(appointmentTime == null){
            Util.showMessage("error","Please select a appointment hour")
            return
        }
        if (cardFilled) {
            setLoaderVisibility(true)
            var response
            try {
                var response = await axios({
                    method: AppConstant.POST,
                    url: PAYMENT_INTENT,
                    data: {
                        amount: data.trainingFee,
                        currency: "usd",
                        description: "booking payment"
                    },

                })
            } catch (error) {
                console.log(error)
                Util.showMessage("error", "Error", "Something went wrong")
            }
            const { clientSecret } = response.data
            console.log(clientSecret)
            const { error, paymentIntent } = await confirmPayment(clientSecret, {
                paymentMethodType: "Card",
                billingDetails: {
                    name: userData.name,
                    email: userData.email
                }
            })
            if (error) {
                Util.showMessage("error", error.code, error.message)
                //showTopPopup(error.code,error.message,"danger")
            }
            else if (paymentIntent) {
                //  console.log(paymentIntent)
                await createBooking(paymentIntent.id)
                setSuccessPopup(true)
                // showPopupAlert("")
                // navigation.navigate()
            }
            setLoaderVisibility(false)
        }
        else {
            Util.showMessage("error", "Error", "Please fill correct card details")
        }
    }
    const createBooking = async (paymentIntent) => {
        try {
            const bookingId = firestore().collection("bookings").doc().id
            const obj = {
                paymentIntent,
                status: "Active",
                userId: auth().currentUser.uid,
                trainerId: data.uid,
                amount: data.trainingFee,
                createTime: firebase.firestore.FieldValue.serverTimestamp(),
                trainingType: data.trainingType,
                appointmentDate: format(appointmentDate, "dd/MM/yyyy"),
                appointmentTime,
                trainerPic: data.profilePic,
                bookingId,
                trainerName:data.name,
                reviewDone:false
            }
            await firestore().collection("bookings").doc(bookingId).set(obj)

        } catch (error) {
            console.log(error)
            Util.showMessage("error", "Error", "Something went wrong")
        }
    }
    const toggleDateFilter = () => {
        setShow(true)
    }
    const renderHours = (item) => {
        //console.log(format("12 AM","H"))
        console.log(workingTime.map(cur=>{console.log(format(parse(cur.startTime,"p",appointmentDate),"H"))}))
        let selectedDate = format(appointmentDate, "dd/MM/yyyy")
        let selectedDay = format(appointmentDate,"EEEE")
        console.log(selectedDay)
        const isDisabled =  
        bookingData.find(bData=>bData.appointmentTime == item.key && selectedDate == bData.appointmentDate) 
        || (format(appointmentDate,"dd/MM/yyyy") == format(new Date(),"dd/MM/yyyy") && item.key <= format(new Date(),"H"))
        || !(workingTime.find((cur)=>cur.day == selectedDay && (format(parse(cur.startTime,"p",appointmentDate),"H") <= item.key && format(parse(cur.endTime,"p",appointmentDate),"H") > item.key)))
        const isSelected = item == appointmentTime
        return (
            <TouchableOpacity
                key={item.key}
                style={[styles.hour, isDisabled && { opacity: 0.3,}, isSelected && { borderColor: "#90EE90" }]}
                disabled={!!isDisabled}
                onPress={() => setAppointmentTime(item.key)}
            >
                <Text style={[styles.txt, isSelected && { color: "#90EE90" }]}>{item.label}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <KeyboardAwareScrollView style={styles.container} nestedScrollEnabled={false} bounces={false}>
            <Header title="Appointment" back navigation={navigation} />
            <View style={styles.mainView}>
                <TrainerCard data={data} disabled />
                <Text style={[styles.title, { marginTop: spacing.large }]}>Appointment Date</Text>
                <TouchableOpacity style={styles.datePicker} onPress={toggleDateFilter}>
                    <Text style={styles.txt}>{Util.getFormattedDate(appointmentDate)}</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        name="calendar-range-outline"
                        size={"md"}
                    />
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={show}
                    date={appointmentDate}
                    onConfirm={(date) => {
                        setShow(false)
                        setAppointmentDate(date)
                    }}
                    onCancel={() => {
                        setShow(false)
                    }}
                    minimumDate={new Date()}
                    maximumDate={addDays(new Date(), 90)}
                    mode="date"
                />
                <Text style={[styles.title, { marginTop: spacing.large }]}>Appointment Time</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {
                        hours.slice(0, 6).map((item) => {
                            return renderHours(item)
                        })
                    }
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {
                        hours.slice(6, 12).map((item) => {
                            return renderHours(item)
                        })
                    }
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {
                        hours.slice(12, 18).map((item) => {
                            return renderHours(item)
                        })
                    }
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                    {
                        hours.slice(18).map((item) => {
                            return renderHours(item)
                        })
                    }
                </View>
                <Text style={[styles.title, { marginTop: spacing.large }]}>Card Details</Text>
                <CardField
                    postalCodeEnabled={true}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={styles.cardInner}
                    style={styles.cardView}
                    //autofocus={true}
                    onCardChange={(data) => { if (data.complete) setCardFilled(true) }}
                />
                <HStack justifyContent={"space-between"} m={1} mt={5}>
                    <Text style={styles.amount}>Training Fee</Text>
                    <Text style={styles.amount}>$ {data.trainingFee}</Text>
                </HStack>
                <MyButton
                    title={"Pay"}
                    txtStyle={{ color: "black" }}
                    loading={loaderVisibility}
                    //loading
                    containerStyle={{ marginTop: spacing.extraLarge }}
                    icon={<Icon
                        as={MaterialCommunityIcons}
                        name="lock"
                        color="black"
                        marginLeft={2}
                        size={"sm"}
                    />}
                    onPress={() => payPressed()}
                />
            </View>
            <PopupMessage visible={successPopup} onPress={() => {
                setSuccessPopup(false)
                navigateAndReset("UserBookings")
            }}
                title={"Booking Successful"}
                subtitle={"Great"}
            />
        </KeyboardAwareScrollView>
    )
}
export default AppointmentScreen