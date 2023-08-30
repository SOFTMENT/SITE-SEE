import { HStack, Icon } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Carousel from 'react-native-reanimated-carousel'
import Util from '../../../common/util'
import Header from '../../../components/Header'
import colors from '../../../theme/colors'
import styles from './styles'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { spacing } from '../../../common/variables'
import MyButton from '../../../components/MyButton'
import { useDispatch, useSelector } from 'react-redux'
import { distanceBetween } from "geofire-common"
import firestore, { firebase } from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { setFavorites } from '../../../store/userSlice'
import AvatarIcon from '../../../components/AvatarIcon'
export default function AdvertiserDetail(props) {
    const { route , navigation} = props
    const { item } = route.params
    const {latitude,longitude} = useSelector(state=>state.user.currentPosition)
    const {favorites} = useSelector(state=>state.user)
    const {lat,lng} = item.location
    const distance = distanceBetween([latitude,longitude],[lat,lng])
    const uid = auth().currentUser.uid
    const isSelected = favorites.find(fav=>fav.id == item.id)
    const [vendorData,setVendorData] = useState(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        firestore()
        .collection("Users")
        .doc(item.vendorId)
        .get()
        .then(doc=>{
            setVendorData(doc.data())
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
    const renderCarousel = ({ item }) => {
        console.log(item)
        return (
            <FastImage
                source={{ uri: item }}
                style={styles.image}
            />
        )
    }
    return (
        <View style={styles.container}>
            <Header
                title={item.title}
                back
                rightIcon={isSelected?"heart":"heart-outline"}
                onRightIconPress={handleFav}
                navigation={navigation}
                rightIconColor={isSelected?colors.appPrimary:"rgba(0,0,0,0.8)"}
            />
            <Carousel
                style={{marginTop:-20}}
                width={Util.getWidth(100)}
                height={Util.getHeight(25)}
                //autoPlay={true}
                data={item.spaceImages}
                renderItem={renderCarousel}
                scrollAnimationDuration={1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
            />
            <View style={{padding:spacing.large,paddingTop:0,flex:1}}>
                <HStack mt={2} ml={-2} alignItems={"center"} >
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='map-marker-outline'
                        mr={1}
                        color={colors.appPrimary}
                    />
                    <Text style={styles.subtitle}>{distance.toFixed(1)} km away</Text>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='image-outline'
                        mr={1}
                        ml={5}
                        color={colors.appPrimary}
                    />
                    <Text style={styles.subtitle}>{`${item.height}f high  &  ${item.width}f wide`}</Text>
                </HStack>
                {
                    vendorData &&
                    <HStack mt={3} alignItems={"center"}>
                    <AvatarIcon
                        uri={vendorData.profilePic}
                        size={40}
                    />
                    <Text style={[styles.subtitle,{marginLeft:6}]}>{vendorData.name}</Text>
                </HStack>
                }
                <Text style={styles.des}>Description</Text>
                <Text style={styles.about}>{item.about}</Text>
                <MyButton
                    title={"Book Now"}
                    containerStyle={styles.btn}
                    onPress={()=>navigation.navigate("PaymentScreen",{data:item})}
                />
            </View>
            
        </View>
    )
}