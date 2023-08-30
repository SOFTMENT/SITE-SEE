import { startCase } from 'lodash'
import { AlertDialog, Button, Card, Center, HStack, Icon, Input } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Purchases, { LOG_LEVEL } from 'react-native-purchases'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import images from '../../../assets/images'
import { spacing } from '../../../common/variables'
import AvatarIcon from '../../../components/AvatarIcon'
import MyButton from '../../../components/MyButton'
import colors from '../../../theme/colors'
import styles from './styles'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MyTextInput from '../../../components/MyTextInput'
import firestore from '@react-native-firebase/firestore'
import { setUserData } from '../../../store/userSlice'
import Util from '../../../common/util'
export default function ServiceHome(props) {
    const { navigation } = props
    const { userData } = useSelector(state => state.user)
    const { name, profilePic, uid, membershipActive, service, portfolioLink } = userData
    const [serviceVal,setServiceVal] = useState(service)
    const [portfolioLinkVal,setPortfolioLinkVal] = useState(portfolioLink)
    const inset = useSafeAreaInsets()
    const dispatch  = useDispatch()
    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
    // useEffect(()=>{
    //     checkSubscription()
    // },[])
    // const checkSubscription = async() => {
    //     try {
    //         const customerInfo = await Purchases.getCustomerInfo();
    //         // access latest customerInfo
    //         if(typeof customerInfo.entitlements.active["Pro"] !== "undefined") {
    //             // Grant user "pro" access
    //           }
    //           else{

    //           }
    //       } catch (e) {
    //        // Error fetching customer info
    //       }    
    // }
    const cancelRef = React.useRef(null);
    const handleUpdate = () => {
        firestore()
            .collection("Users")
            .doc(uid)
            .update({
                service:serviceVal,
                portfolioLink:portfolioLinkVal
            })
            .then(() => {
                onClose()
                Util.showMessage("success", "Success", "Profile updated!")
                getUserData()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getUserData = () => {
        firestore()
            .collection("Users")
            .doc(uid)
            .get()
            .then(res => {
                dispatch(setUserData(res.data()))
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <View style={[styles.container, { paddingTop: Platform.OS == 'ios' ? inset.top : inset.top + spacing.small }]}>
            <View style={styles.topView}>
                <View>
                    <Text style={styles.hello}>Hello,</Text>
                    <Text style={styles.name}>{startCase(name)}</Text>
                </View>
                <AvatarIcon
                    size={60}
                    uri={profilePic}
                    style={{ borderColor: "gray" }}
                    defaultSource={images.defaultUser}
                    pressable={true}
                    onPress={() => { navigation.navigate("ServiceProfile") }}
                //borderWidth={1}   
                />
                {/* {Util.getNameInitial(name)}
                    </Avatar> */}
            </View>
            {
                !membershipActive && 
                <Center bg={colors.appPrimary} borderRadius={10} p={5}>
                    <Text style={[styles.msg]}>
                        Your don't have an active membership, please buy our plan to activate your account.
                     </Text>
                     <MyButton
                        title={"Subscribe"}
                        containerStyle={{backgroundColor:"white"}}
                        txtStyle={{color:colors.appPrimary}}
                        onPress={()=>navigation.navigate("BuyMembership")}
                     />
                </Center>
            }
            <Card style={{ flex: 1, backgroundColor: "white" }}>
                <HStack mt={10} justifyContent={"space-between"}>
                    <Text style={[styles.title,{marginTop:0}]}>Service</Text>
                    <TouchableOpacity onPress={()=>{
                        setIsOpen(true)
                    }}>
                        <Icon
                            name="pencil"
                            as={MaterialCommunityIcons}
                            size={"md"}
                            color={colors.appPrimary}
                        />
                    </TouchableOpacity>
                </HStack>
                <Text style={styles.subtitle}>{service}</Text>
                <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>Update Details</AlertDialog.Header>
                    <AlertDialog.Body bgColor={"white"}>
                        <MyTextInput
                            value={serviceVal}
                            style={styles.subtitle}
                            onChangeText={(txt)=>setServiceVal(txt)}
                            placeholder={"Service"}
                            containerStyle={{marginTop:10}}
                            //my={4}
                        />
                        <MyTextInput
                            value={portfolioLinkVal}
                            style={styles.subtitle}
                            onChangeText={(txt)=>setPortfolioLinkVal(txt)}
                            placeholder={"Portfolio Link"}
                            containerStyle={{marginTop:20}}
                        />
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group space={2}>
                        <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                            Cancel
                        </Button>
                        <Button colorScheme="success" onPress={handleUpdate}>
                            Update
                        </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                    </AlertDialog.Content>
                </AlertDialog>
                <Text style={styles.title}>Portfolio Link</Text>
                <Text style={styles.subtitle}>{portfolioLink}</Text>
            </Card>
        </View>
    )
}