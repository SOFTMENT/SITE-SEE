import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React, { useState } from "react"
import styles from "./styles"
import Header from "../../../components/Header"
import TrainerCard from "../../ProScreens/ProHome/components/TrainerCard"
import { spacing } from "../../../common/variables"
import { Button, HStack, Icon } from "native-base"
import Util from "../../../common/util"
import DatePicker from "react-native-date-picker"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { addDays } from "date-fns"
import { hours } from "../../../config/appConfig"
import { CardField } from "@stripe/stripe-react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import MyButton from "../../../components/MyButton"
const AppointmentScreen = (props) => {
    const { navigation, route } = props
    const { data } = route.params
    const [show, setShow] = useState(false)
    const [appointmentDate,setAppointmentDate] = useState(new Date())
    const [appointmentTime,setAppointmentTime] = useState(null)
    const toggleDateFilter = () => {
        setShow(true)
    }
    const renderHours = (item) => {
        const isDisabled = false
        const isSelected = item == appointmentTime
        return(
            <TouchableOpacity 
                style={[styles.hour,isDisabled&&{opacity:0.3},isSelected&&{borderColor:"#90EE90"}]} 
                disabled={isDisabled}
                onPress={()=>setAppointmentTime(item)}
            >
                <Text style={[styles.txt,isSelected&&{color:"#90EE90"}]}>{item}</Text>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item) => {
        return item
    }
    return(
        <KeyboardAwareScrollView style={styles.container} nestedScrollEnabled={false} bounces={false}>
            <Header title="Appointment" back navigation={navigation}/>
            <View style={styles.mainView}>
                <TrainerCard data={data} disabled/>
                <Text style={[styles.title,{marginTop:spacing.large}]}>Appointment Date</Text>
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
                    maximumDate={addDays(new Date(),90)}
                    mode="date"
                />
                <Text style={[styles.title,{marginTop:spacing.large}]}>Appointment Time</Text>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                {
                    hours.slice(0,6).map((item)=>{
                        return renderHours(item)
                    })
                }
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                {
                    hours.slice(6,12).map((item)=>{
                        return renderHours(item)
                    })
                }
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                {
                    hours.slice(12,18).map((item)=>{
                        return renderHours(item)
                    })
                }
                </View>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                {
                    hours.slice(18).map((item)=>{
                        return renderHours(item)
                    })
                }
                </View>
                 <Text style={[styles.title,{marginTop:spacing.large}]}>Card Details</Text>
                <CardField
                     postalCodeEnabled={true}
                     placeholder={{
                       number: '4242 4242 4242 4242',
                     }}
                     cardStyle={styles.cardInner}
                     style={styles.cardView}
                     // autofocus={true}
                     //onCardChange={(data)=>{if(data.complete)setCardFilled(true)}}
                />
                <HStack justifyContent={"space-between"} m={1} mt={5}>
                    <Text style={styles.amount}>Training Fee</Text>
                    <Text style={styles.amount}>$ {data.trainingFee}</Text>
                </HStack>
                <MyButton
                    title={"Pay"}
                    txtStyle={{color:"black"}}
                    containerStyle={{marginTop:spacing.extraLarge}}
                    icon={<Icon 
                        as={MaterialCommunityIcons} 
                        name="lock" 
                        color="black"  
                        marginLeft={2}
                        size={"sm"}
                    />}
                    onPress={()=>handleNavigation()}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}
export default AppointmentScreen