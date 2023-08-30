import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'
import { distanceBetween, geohashQueryBounds } from "geofire-common"
import { startCase, uniqBy } from 'lodash'
import { Center, HStack, Icon, Link, ScrollView, Skeleton, useDisclose } from 'native-base'
import React, { useEffect, useState } from 'react'
import { AppState, FlatList, Linking, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Geolocation from 'react-native-geolocation-service'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux'
import images from '../../../assets/images'
import { handleLocation } from '../../../common/LocationHelper'
import Util from '../../../common/util'
import { spacing } from '../../../common/variables'
import AvatarIcon from '../../../components/AvatarIcon'
import LocationRequiredModal from '../../../components/LocationRequiredModal'
import { propertyCategories } from '../../../config/appConfig'
import { setCurrentPosition, setFavorites } from '../../../store/userSlice'
import colors from '../../../theme/colors'
import NearbyHome from './NearbyHome'
import styles from './styles'
const radius = 10 * 1000
export default function AdvertiserHome(props) {
    const { navigation } = props
    const { latitude, longitude } = useSelector(state => state.user.currentPosition) ?? {}
    // const {data:favData,error,isLoading} = getFavorites()
    const [data, setData] = useState([])
    const [nearbyData,setNearByData] = useState([])
    const [noData,setNoData] = useState(false)
    const [topDataLoading, setTopDataLoading] = useState(false)
    const [nearLoading, setNearLoading] = useState(false)
    useEffect(() => {
        getFavorites()
        handleLocation(handleLocationAcceptance, handleLocationRejection)
        const sub = AppState.addEventListener('change', ()=>{
            handleLocation(handleLocationAcceptance, handleLocationRejection)
        });
        // focusListener = props.navigation.addListener('didFocus', () => {
        //     handlePermissionCheck();
        //     });
            
            return (() => {
            //focusListener.remove();
            sub.remove()
            })
    }, [])
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
    const getTopData = async () => {
        try {
            const uid = auth().currentUser.uid
            setTopDataLoading(true)
            await firestore()
                .collection("Space")
                .orderBy("createTime", "desc")
                .limit(10)
                .get()
                .then(snapshot => {
                    let localData = []
                    snapshot.docs.map(doc => {
                        localData.push(doc.data())
                    })
                    console.log(localData)
                    setData(localData)
                })
            setTopDataLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const [loading, setLoading] = useState(true)
    const [locationModal, setLocationModal] = useState(false)
    const inset = useSafeAreaInsets()
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const { name, profilePic } = userData
    const handleLocationRejection = () => {
        setLoading(false)
        setLocationModal(true)
    }
    const handleNotNow = () => {
        setLocationModal(false)
        getTopData()
    }
    const handleLocationAcceptance = () => {
        setLocationModal(false)
        Geolocation.getCurrentPosition(
            (value) => {
                const location = {
                    latitude: value.coords.latitude,
                    longitude: value.coords.longitude
                }
                dispatch(setCurrentPosition(location))
                getAllData(location)
            },
            (error) => {

            },
            {
                enableHighAccuracy: true
            }
        )
    }
    const getNearbyData = async(location) => {
        const bounds = geohashQueryBounds([location.latitude, location.longitude], radius)
        const promises = [];
        // const collectionRef = collection(db, 'PupsForSale')
        // console.log(bounds.length)
        for (const b of bounds) {
            const query =
                firestore()
                    .collection('Space')
                    .orderBy('geohash')
                    .startAt(b[0])
                    .endAt(b[1])
                    .limit(3)
            promises.push(query.get())
        }
        setNearLoading(true)
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];
            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('location.lat');
                    const lng = doc.get('location.lng');
                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = distanceBetween([lat, lng], [location.latitude, location.longitude]);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radius) {
                        matchingDocs.push(doc);
                    }
                }
            }
            return matchingDocs;
        }).then((matchingDocs) => {
            const newArray = uniqBy(matchingDocs.map((doc) => ({ ...doc.data() })), (item) => item.id)
            setNearByData(newArray)
            if (newArray.length == 0) setNoData(true)
            else setNoData(false)
        }).finally(() => {
            setNearLoading(false)
        })
    }
    const getAllData = (location) => {
        getTopData()
        getNearbyData(location)
    }
    const renderHighlight = ({ item }) => {
        // return(
        //     <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" />
        // )
       // const {latitude,longitude} = useSelector(state=>state.user.currentPosition)
        const {lat,lng} = item.location
        const distance = latitude? distanceBetween([latitude,longitude],[lat,lng]):0
        return (
            <TouchableOpacity onPress={() => navigation.navigate("AdDetail", { item })}>
                    <FastImage
                        source={{ uri: item.spaceImages[0] }}
                        style={styles.imageStyle}
                        defaultSource={images.imagePlaceholder}
                    >
                        <View style={styles.detailsView}>
                            <Text style={styles.spaceTitle}>{item.title}</Text>
                            <HStack mt={2}>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='map-marker-outline'
                                    mr={1}
                                    color={colors.appPrimary}
                                />
                                <Text style={styles.subtitle}>{distance.toFixed(1)} km away</Text>
                                <Icon
                                    as={MaterialCommunityIcons}
                                    size="sm"
                                    name='image-outline'
                                    mr={1}
                                    ml={5}
                                    color={colors.appPrimary}
                                />
                                <Text style={styles.subtitle}>{`${item.height}f high  &  ${item.width}f wide`}</Text>
                            </HStack>
                        </View>
                    </FastImage>
            </TouchableOpacity>
        )
    }
    const keyExtractor = (item) => item.id
    const renderNearby = ({ item }) => {
        return (
            <NearbyHome item={item} navigation={navigation}/>
        )
    }
    return (
        <ScrollView style={[styles.container, {paddingTop:Platform.OS == 'ios'?inset.top:inset.top+spacing.small}]}>
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
                //borderWidth={1}   
                />
                {/* {Util.getNameInitial(name)}
                </Avatar> */}
            </View>
            <HStack alignItems={"center"} space={2}>
                <Pressable style={styles.searchBox} backgroundColor={"gray.800"} onPress={() => navigation.navigate("SearchScreen")}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='magnify'
                        mr={5}
                    />
                    <Text style={styles.placeholder}>Search Spaces</Text>
                </Pressable>
                {/* <Pressable style={styles.filterView} backgroundColor={"gray.800"} onPress={onOpen}>
                    <Icon
                        as={MaterialCommunityIcons}
                        size="lg"
                        name='filter-variant'
                    />
                </Pressable>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>

                    </Actionsheet.Content>
                </Actionsheet> */}
            </HStack>
            <Skeleton 
                borderWidth={1} 
                borderColor="coolGray.200" 
                endColor="warmGray.300" 
                width={Util.getWidth(100)-(2*spacing.medium)}
                h={200}
                borderRadius={10}
                isLoaded={!topDataLoading}
            >
                {/* <Skeleton.Text></Skeleton.Text> */}
                <FlatList
                    horizontal
                    data={data}
                    keyExtractor={keyExtractor}
                    renderItem={renderHighlight}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                />
            </Skeleton>
            <Text style={[styles.name, { marginTop: 20 }]}>
                Categories
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 10 }}
                bounces={false}
            >
                {
                    propertyCategories.map(item => {
                        return (
                            <TouchableOpacity 
                                key={item.id} 
                                style={styles.categoryView}
                                onPress={()=>{
                                    navigation.navigate("CategoryScreen",{title:item.label,isNearby:false})
                                }}
                            >
                                <Text style={styles.category}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <HStack alignItems={"center"} justifyContent={"space-between"} my={5}>
                <Text style={[styles.name]}>
                    Nearby You
                </Text>
                <Link
                    //mt={5}
                    //onPress={()=>navigation.navigate("ServiceProviderProfiles")}
                    onPress={()=>navigation.navigate("CategoryScreen",{isNearby:true})}
                    mr={5}
                    _text={{
                        color: "black",
                        textDecoration: "none"
                    }}
                    style={{
                        alignSelf: "center",
                    }}
                >
                    View All
                </Link>
            </HStack>
            {
                noData?
                <Center h={100}>
                    <Text style={styles.noSpaces}>No spaces near you</Text>
                </Center>
                :
                <Skeleton 
                borderWidth={1} 
                borderColor="coolGray.200" 
                endColor="warmGray.300" 
                width={Util.getWidth(50)-(2*spacing.medium)}
                h={100}
                borderRadius={10}
                isLoaded={!nearLoading}
                >
                    <FlatList
                        renderItem={renderNearby}
                        keyExtractor={item => item.id}
                        data={nearbyData}
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        style={{paddingBottom:10}}
                    />
                </Skeleton>
            }
            <LocationRequiredModal
                handleNotNow={handleNotNow}
                visible={locationModal}
                closeModal={() => setLocationModal(false)}
                handleLocation={() => handleLocation(handleLocationAcceptance, handleLocationRejection,true)}
            />
        </ScrollView>
    )
}