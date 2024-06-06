import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import axios from 'axios'
import { Center, HStack, Icon, Link, ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Share from 'react-native-share'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux'
import fonts from '../../../../assets/fonts'
import images from '../../../assets/images'
import Helper from '../../../common/Helper'
import { spacing } from '../../../common/variables'
import Header from '../../../components/Header'
import MyButton from '../../../components/MyButton'
import { setFavorites } from '../../../store/userSlice'
import colors from '../../../theme/colors'
import styles from './styles'
import { startCase } from 'lodash'
import linkingUtil from '../../../common/linkingUtil'
export default function ListingDetail(props) {
    const { route , navigation} = props
    const { item } = route.params
    const {favorites} = useSelector(state=>state.user)
    const uid = auth().currentUser.uid
    const isSelected = favorites?.find(fav=>fav.id == item.id)
    const [favIsSelected,setFavIsSelected] = useState(isSelected)
    const [supplierData,setSupplierData] = useState(null)
    const [taggedSupplierData,setTaggedSupplierData] = useState(null)
    const [selectedImage,setSelectedImage] = useState(item.listingImages[0])
    const dispatch = useDispatch()
    useEffect(()=>{
        firestore()
        .collection("Users")
        .doc(item.supplierId)
        .get()
        .then(doc=>{
            notifySupplier(doc.data().fcmToken,doc.data().uid)
            setSupplierData(doc.data())
        })
        if(item?.supplierTag && typeof(item?.supplier) == 'string'){
            firestore()
            .collection("Users")
            .doc(item?.supplierTag)
            .get()
            .then(doc=>{
                console.log("here")
                // notifySupplier(doc.data().fcmToken)
                setTaggedSupplierData(doc.data())
            })
        }
    },[])
    useEffect(()=>{
        setSelectedImage(item.listingImages[0])
    },[item])
    const notifySupplier = async(fcmToken,userId) => {
       if(!fcmToken)return
    //    console.log(fcmToken)
       axios({
        method:"post",
        url:"https://fcm.googleapis.com/fcm/send",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`key=AAAANw3r-Ao:APA91bGVtL8cL1_UBi23cRxICx_EtFlll6cLMgi2tfEv5uYq-1--CdETb4rB63czJ-bxacfoD9y4nTNNP8spT6lg1hGFP5HIOrzE1HEE4tf4t7VFC9NFfymGZ4w9lHsxcsF3c6WTQusr`
        },
        data:{
            to:fcmToken,
                data:{
                    title:"Hey",
                    body:`Someone just viewed your one of the listing(${item.title}).`,
                    uid:userId
                },
                content_available:true,
                priority:"high"
        }
       })
       .then(res=>{
        // console.log(res.data)
       })
       .catch(err=>{
        console.log(err)
       })
    }
    const handleFav = async() => {
        setFavIsSelected(!favIsSelected)
        if(isSelected){
            firestore().collection("Users").doc(uid).collection("Favorites").doc(item.id).delete()
            .then(()=>{
                getFavorites()
                //Util.showMessage("error","Space removed from favourite!","")
            })
        }
        else{
            firestore().collection("Users").doc(uid).collection("Favorites").doc(item.id).set({
                id:item.id,
                favCreated:firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(()=>{
                getFavorites()
                //Util.showMessage("success","Space marked as favourite!","")
            })
        }
    }
    const getFavorites = async() => {
        try {
            const uid = auth().currentUser.uid
            const result = await firestore().collection("Users").doc(uid).collection("Favorites").orderBy("favCreated","desc").get()
            let favs = []
            result.forEach(doc => {
                favs.push({...doc.data(),favCreated:doc.data().favCreated.toDate().toDateString()})
            })
            dispatch(setFavorites(favs))
        } catch (error) {
            
        }
    }
    const handleChat = () => {
        const lastMessage={
            senderUid:item.supplierId,
            regarding:`This conversation is related to your listing named '${item.title}'`,
            imageUri:item.listingImages[0],
            listingId:item.id
        }
        navigation.navigate("PersonalChat",{lastMessage})
    }
    const handleShare = async() => {
        try {
            
              const imageLink = await Helper.imageUrlToBase64(item.listingImages[0])
              Share.open({
                title:item.name,
                message:item.shareUrl,
                url:imageLink
              })
        } catch (error) {
            console.log(error)
        }
          //let {channel, completed, error} = await buo.showShareSheet(shareOptions, linkProperties, controlParams)
    }
    const handlePurchase = ()=> {
        linkingUtil.openBrowser('www.softment.com')
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header
                title={startCase(item.title)}
                back
                navigation={navigation}
                rightIcon={'dots-vertical'}
                rightIsComponent={true}
            />
           <View style={styles.imageContainer}>
                <FastImage
                    source={{uri:selectedImage}}
                    style={styles.image}
                    resizeMode='contain'
                    defaultSource={images.imagePlaceholder}
                >
                    {
                        item?.listingType && item?.listingType == "Temporary" &&
                        <View style={styles.listingBadge}>
                            <Text style={styles.listingBadgeText}>{item?.listingType}</Text>
                        </View>
                    }
                </FastImage>
                <ScrollView horizontal mt={5} alignSelf={"center"} width={"95%"} bgColor={"red"} showsHorizontalScrollIndicator={false}>
                    {
                        item.listingImages.length>1 && item.listingImages.map((img)=>{
                            return(
                                <TouchableOpacity style={styles.imageContainerSmall} onPress={()=>setSelectedImage(img)}>
                                    <FastImage
                                        source={{uri:img}}
                                        style={styles.imageSmall}
                                        resizeMode='contain'
                                        defaultSource={images.imagePlaceholder}
                                    />
                                </TouchableOpacity>
                            )
                        })
                        
                    }
                </ScrollView>
           </View>
            <View style={{padding:spacing.large,paddingTop:0,flex:1}}>
                <HStack justifyContent={"space-between"} alignItems={"center"}>
                   <View>
                    <Text style={styles.title}>{startCase(item.title)}</Text>
                        <HStack mt={2}>
                            <Text style={styles.supplier}>Supplier - </Text>
                            <Link onPress={()=>navigation.navigate("ListingBySupplier",{supplierId:item.supplierId,supplierData})}>
                                <Text style={[styles.supplier,{color:colors.appDefaultColor,fontFamily:fonts.medium,marginLeft:3}]}>{startCase(supplierData?.name)}</Text>
                            </Link>
                        </HStack>
                        {
                            item.supplierTag && typeof(item.supplierTag) == 'string' && 
                            <HStack mt={2}>
                                <Text style={styles.supplier}>Tag - </Text>
                                <Link onPress={()=>navigation.navigate("ListingBySupplier",{supplierId:item.supplierTag,supplierData:taggedSupplierData})}>
                                    <Text style={[styles.supplier,{color:colors.appDefaultColor,fontFamily:fonts.medium,marginLeft:3}]}>{startCase(taggedSupplierData?.name??"")}</Text>
                                </Link>
                            </HStack>
                        }
                   </View>
                   <HStack>
                    <TouchableOpacity onPress={handleShare}>
                        <Center bgColor={"black"} p={2} borderRadius={20} mr={2}>
                            <Icon
                                    as={MaterialCommunityIcons}
                                    name={"share-variant"}
                                    color={colors.white}
                                    size={"lg"}
                            />
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFav}>
                        <Center bgColor={"black"} p={2} borderRadius={20}>
                            <Icon
                                    as={MaterialCommunityIcons}
                                    name={'heart'}
                                    color={favIsSelected?colors.appDefaultColor: colors.white}
                                    size={"lg"}
                            />
                        </Center>
                    </TouchableOpacity>
                   </HStack>
                </HStack>
                <Text style={styles.des}>Description</Text>
                <View style={styles.desView}>
                    <Text style={styles.about}>{item.about}</Text>
                </View>
                <MyButton
                    title={"Message"}
                    txtStyle={{color:"white"}}
                    containerStyle={{marginTop:20,borderRadius:spacing.small,backgroundColor:"black"}}
                    onPress={handleChat}
                />
                {
                    item.purchaseUrl && 
                    <MyButton
                        title={"Purchase Now"}
                        txtStyle={{color:"white"}}
                        containerStyle={{marginTop:10,borderRadius:spacing.small}}
                        onPress={handlePurchase}
                    />
                }
            </View>
            
        </ScrollView>
    )
}