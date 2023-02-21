import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { Button, Checkbox, HStack, Modal, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";
import fonts from "../../assets/fonts";
import Util from "../common/util";
import { fontSizes, spacing } from "../common/variables";
import { workingTime } from "../config/appConfig";
import colors from "../theme/colors";
const WorkingTimeModal = (props) => {
    const { showModal, setShowModal, handleWorkingTime } = props
    const [allState,setAllState] = useState({})
    const updateState = (isSelected,index,data) => {
        if(isSelected)
        {
            setAllState((prev)=>{
                return {...prev,[index]:data}
            })
        }
        else{
           if(allState){
            const data = allState
            delete data[index]
            setAllState(allState)
           }
        }
    }
    const submit = () => {
        handleWorkingTime(allState)
    }
    return (
        <Modal isOpen={showModal} onClose={() => handleWorkingTime({})} size="xl">
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Choose Working Time</Modal.Header>
                <Modal.Body>
                    {/* <Button onPress={()=>setShow(true)}>Click</Button> */}
                    {
                        workingTime.map(item => {
                            return (
                                <TimeComponent item={item} key={item.index} updateState={updateState}/>
                            )
                        })
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button flex={1} onPress={submit}>Confirm</Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}
export default WorkingTimeModal
const TimeComponent = ({ item,updateState}) => {
    const [startShow, setStartShow] = useState(false)
    const [endShow, setEndShow] = useState(false)
    const [startTime, setStartTime] = useState(new Date(new Date().setHours(9,0,0,0)))
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(20,0,0,0))) 
    const handleCheck = (isSelected) => {
        updateState(isSelected,item.index,{
            ...item,
            startTime:format(startTime,"p"),
            endTime:format(endTime,"p")
        })
    }
    return (
        <View>
            <HStack key={item.index} justifyContent={"space-between"} flex={1} alignItems="center" space={4} my={1}>
                <Text style={[styles.day,{flex:2}]}>{item.day}</Text>
                <HStack flex={3} justifyContent={"space-between"} alignItems={"center"} space={3}>
                    <Pressable style={styles.time} onPress={() => setStartShow(true)}>
                        <Text style={styles.timeTxt}>{format(startTime,"p")}</Text>
                    </Pressable>
                    <Text style={styles.day}>To</Text>
                    <Pressable style={styles.time} onPress={() => setEndShow(true)}>
                        <Text style={styles.timeTxt}>{format(endTime,"p")}</Text>
                    </Pressable>
                </HStack>
                <View flex={1} alignItems={"flex-end"}>
                    <Checkbox value="test" accessibilityLabel="This is a dummy checkbox" onChange={handleCheck}/>
                </View>
            </HStack>
            <DatePicker
                modal
                open={startShow}
                date={startTime}
                onConfirm={(date) => {
                    setStartShow(false)
                    setStartTime(date)
                }}
                onCancel={() => {
                    setStartShow(false)
                }}
                maximumDate={new Date()}
                mode="time"
            />
            <DatePicker
                modal
                open={endShow}
                date={endTime}
                onConfirm={(date) => {
                    setEndShow(false)
                    setEndTime(date)
                }}
                onCancel={() => {
                    setEndShow(false)
                }}
                maximumDate={new Date()}
                mode="time"
            />
        </View>
    )
}
const styles = StyleSheet.create({
    time: {
        padding: spacing.extraSmall,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.5)",
        borderRadius: spacing.extraSmall,
        //backgroundColor: 'red'
    },
    timeTxt:{
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.medium
    },
    day:{
        fontSize:fontSizes.extraExtraSmall,
        fontFamily:fonts.semiBold,
    }
})