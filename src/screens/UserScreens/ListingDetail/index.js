import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore'
import { Center, HStack, Icon, Link, ScrollView } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import branch from 'react-native-branch'
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
export default function ListingDetail(props) {
    const { route , navigation} = props
    const { item } = route.params
    const {favorites} = useSelector(state=>state.user)
    const uid = auth().currentUser.uid
    const isSelected = favorites?.find(fav=>fav.id == item.id)
    const [supplierData,setSupplierData] = useState(null)
    const [selectedImage,setSelectedImage] = useState(item.listingImages[0])
    const dispatch = useDispatch()
    useEffect(()=>{
        firestore()
        .collection("Users")
        .doc(item.supplierId)
        .get()
        .then(doc=>{
            setSupplierData(doc.data())
        })
    },[])
    const handleFav = async() => {
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
            const result = await firestore().collection("Users").doc(uid).collection("Favorites").get()
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
            senderUid:item.supplierId
        }
        navigation.navigate("PersonalChat",{lastMessage})
    }
    const handleShare = async() => {
        try {
            let buo = await branch.createBranchUniversalObject(`item/${item.id}`, {
                title: item.title,
                contentDescription: item.about,
                contentMetadata: {
                  customMetadata: {
                    key1: 'value1'
                  }
                }
              })
              let linkProperties = {
                feature: 'sharing',
                channel: 'facebook',
                campaign: 'content 123 launch'  
              }
              
              let controlParams = {
                $desktop_url: 'https://example.com/home',
                custom: 'data'   
              }
              let shareOptions = { 
                messageHeader: 'Check this out', 
                messageBody: 'No really, check this out!' 
              }
              let {url} = await buo.generateShortUrl(linkProperties, controlParams)
              const imageLink = await Helper.imageUrlToBase64(item.listingImages[0])
              Share.open({
                title:item.name,
                message:url,
                url:imageLink
              })
        } catch (error) {
            console.log(error)
        }
          //let {channel, completed, error} = await buo.showShareSheet(shareOptions, linkProperties, controlParams)
    }
    return (
        <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
            <Header
                title={item.title}
                back
                navigation={navigation}
                rightIcon={'dots-vertical'}
                rightIsComponent={true}
            />
            {/* <Carousel
                style={{marginTop:-20}}
                width={Util.getWidth(100)}
                height={Util.getHeight(25)}
                //autoPlay={true}
                data={item.listingImages}
                renderItem={renderCarousel}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            /> */}
           <View style={styles.imageContainer}>
                <FastImage
                    source={{uri:selectedImage}}
                    style={styles.image}
                    resizeMode='contain'
                    defaultSource={images.imagePlaceholder}
                />
                <ScrollView horizontal mt={5} mx={2} width={"100%"} bgColor={"red"} showsHorizontalScrollIndicator={false}>
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
                    <Text style={styles.title}>{item.title}</Text>
                        <HStack mt={2}>
                            <Text style={styles.supplier}>Supplier-</Text>
                            <Link onPress={()=>navigation.navigate("ListingBySupplier",{supplierId:item.supplierId,supplierData})}>
                                <Text style={[styles.supplier,{color:colors.appDefaultColor,fontFamily:fonts.medium,marginLeft:3}]}>{supplierData?.name}</Text>
                            </Link>
                        </HStack>
                   </View>
                   <HStack>
                    <TouchableOpacity onPress={handleShare}>
                        <Center bgColor={"white"} p={1} borderRadius={20} mr={2}>
                            <Icon
                                    as={MaterialCommunityIcons}
                                    name={"share-variant"}
                                    color={colors.appDefaultColor}
                                    size={"lg"}
                            />
                        </Center>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFav}>
                        <Center bgColor={"white"} p={1} borderRadius={20}>
                            <Icon
                                    as={MaterialCommunityIcons}
                                    name={isSelected?"heart":"heart-outline"}
                                    color={isSelected?colors.appDefaultColor:"black"}
                                    size={"lg"}
                            />
                        </Center>
                    </TouchableOpacity>
                   </HStack>
                </HStack>
                <Text style={styles.des}>Description</Text>
                <View style={styles.desView}>
                    <Text style={styles.about}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore "}</Text>
                </View>
                <MyButton
                    title={"Message"}
                    txtStyle={{color:"white"}}
                    containerStyle={{marginTop:20}}
                    onPress={handleChat}
                />
            </View>
            
        </ScrollView>
    )
}