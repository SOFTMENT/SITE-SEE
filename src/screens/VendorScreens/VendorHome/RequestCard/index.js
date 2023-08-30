import { AlertDialog, Box, Button, HStack, Icon, VStack } from 'native-base'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyButton from '../../../../components/MyButton'
import colors from '../../../../theme/colors'
import styles from './styles'
import firestore, { firebase } from '@react-native-firebase/firestore'
import Util from '../../../../common/util'
import auth from '@react-native-firebase/auth'
export default function RequestCard({ data, navigation, hideBtn }) {
    //const { latitude, longitude } = useSelector(state => state.user.currentPosition)
    //const { lat, lng } = data.location
    //const distance = distanceBetween([latitude, longitude], [lat, lng])
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef(null);
    const [isRejectOpen, setIsRejectOpen] = React.useState(false);

    const onRejectClose = () => setIsRejectOpen(false);
  
    const cancelRejectRef = React.useRef(null);
    const handleChat = () => {
        const lastMessage={
            senderUid:data.advertiserId
        }
        navigation.navigate("PersonalChat",{lastMessage})
    }
    const handleSelection = async(status) => {
        await firestore()
        .collection("Bookings")
        .doc(data.bookingId)
        .update({
            status
        })
        .then(()=>{
            if(status == "Completed"){
                Util.showMessage("success","Order accepted!","Your payment will be added to your wallet within 2 days.")
            }
            else{
                Util.showMessage("error","Oops!","Order rejected!")
            }
        })
        if(status == "Completed")
        {
            await firestore().collection("Users").doc(auth().currentUser.uid)
            .collection("Transaction")
            .doc(data.bookingId)
            .set({
                bookingId:data.bookingId,
                status:"Pending",
                transactionTime:firebase.firestore.FieldValue.serverTimestamp(),
                amount:data.amount
            })
        }
    }
    return (
        <View style={styles.container}>
        <Pressable  onPress={()=>navigation.navigate("VendorOrderDetails", { item:data })}>
            <View style={styles.mainView}>
                <View style={styles.card}>
                    <HStack alignItems={"center"} height={130}>
                        <FastImage
                            source={{ uri: data.spaceImages[0] }}
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <VStack px={2} py={1}flex={0.6} h={130} justifyContent={"space-between"}>
                            <Text style={styles.title}>
                                {data.title}
                            </Text>
                            {/* <HStack mt={1} ml={1}>
                                <Text style={styles.subtitle}>{data.category}</Text>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='image-outline'
                                    mr={1}
                                    ml={1}
                                    color={colors.appPrimary}
                                />
                                <Text style={styles.subtitle}>{`${data.height}f high  &  ${data.width}f wide`}</Text>
                            </HStack> */}
                            <HStack mt={2} ml={1} justifyContent={"space-between"} alignItems={"center"}>
                                <Box>
                                    <Text style={styles.subtitle}>{data.bookingTime.toDate().toDateString()}</Text>
                                    <Text style={[styles.subtitle,{marginTop:1}]}>${data.price}</Text>
                                </Box>
                                <TouchableOpacity onPress={handleChat}>
                                    <Icon
                                        as={MaterialCommunityIcons}
                                        size="lg"
                                        name='message-text'
                                        color={colors.appPrimary}
                                    />
                                </TouchableOpacity>
                            </HStack>
                            <HStack justifyContent={"space-evenly"} space={2}>
                                <MyButton 
                                    //flex={1} 
                                    title={"Accept"}
                                    containerStyle={styles.btn}
                                    txtStyle={styles.txtStyle}
                                    //bgColor={colors.appPrimary}
                                    onPress={()=>setIsOpen(true)}
                                />
                                <MyButton 
                                    //flex={1} 
                                    containerStyle={[styles.btn,{backgroundColor:"rgba(0, 0, 0, 0.8)"}]}
                                    txtStyle={styles.txtStyle}
                                    title={"Reject"}
                                   // bgColor={"rgba(0, 0, 0, 0.8)"}
                                    onPress={()=>setIsRejectOpen(true)}
                                />
                            </HStack>
                        </VStack>
                    </HStack>
                    {/* <MyButton title={"Contact Seller"}/> */}
                </View>
            </View>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Please confirm</AlertDialog.Header>
                <AlertDialog.Body>
                    Are you sure you want to accept this order?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                        Cancel
                    </Button>
                    <Button colorScheme="success" onPress={()=>handleSelection("Completed")}>
                        Accept
                    </Button>
                    </Button.Group>
                </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <AlertDialog leastDestructiveRef={cancelRejectRef} isOpen={isRejectOpen} onClose={onRejectClose}>
                <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Please confirm</AlertDialog.Header>
                <AlertDialog.Body>
                    Are you sure you want to reject this order?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={onRejectClose} ref={cancelRef}>
                        Cancel
                    </Button>
                    <Button colorScheme="danger" onPress={()=>handleSelection("Rejected")}>
                        Reject
                    </Button>
                    </Button.Group>
                </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Pressable>
        </View>
    )
}