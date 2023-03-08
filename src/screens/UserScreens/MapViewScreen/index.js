import { Alert, Dimensions, PermissionsAndroid, Platform, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import MapView, { Marker } from "react-native-maps"
import Geolocation from 'react-native-geolocation-service';
import { mapStyles } from "../../../config/appConfig";
import { Icon, ScrollView } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { distanceBetween, geohashQueryBounds } from "geofire-common"
import { firebase } from "@react-native-firebase/firestore";
import { uniqBy } from "lodash";
import TrainerCard from "../UserHome/components/TrainerCard";
const { width, height } = Dimensions.get('window');
const radius = 10 * 1000
const ASPECT_RATIO = width / height;
// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const MapViewScreen = (props) => {
    const { navigation } = props
    const [trainers, setTrainers] = useState([])
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
    })
    useEffect(() => {
        if (Platform.OS == "ios") {
            handleLocationPermissionIos()
        }
        else {
            requestLocationPermissionAndroid()
        }
    }, [])
    const handleLocationRejection = () => {

    }
    const handleLocationAcceptance = () => {
        console.log("here")
        Geolocation.getCurrentPosition((value) => {
            getData(value.coords.latitude, value.coords.longitude)
            setRegion({
                longitude: value.coords.longitude,
                latitude: value.coords.latitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
            })
        })
    }
    const getData = (latitude, longitude) => {
        const bounds = geohashQueryBounds([latitude, longitude], radius)
        const promises = [];
        // const collectionRef = collection(db, 'PupsForSale')
        // console.log(bounds.length)
        for (const b of bounds) {

            const query = firebase
                .firestore()
                .collection('Users')
                .where("trainingType","==","offline")
                .where("status","==","approved")
                .where("accountStatus", "==", true)
                .orderBy('geohash')
                .startAt(b[0])
                .endAt(b[1]);
            promises.push(query.get())
        }
        Promise.all(promises).then((snapshots) => {
            const matchingDocs = [];

            for (const snap of snapshots) {
                for (const doc of snap.docs) {
                    const lat = doc.get('address.lat');
                    const lng = doc.get('address.lng');
                    console.log("lat", lat)
                    // We have to filter out a few false positives due to GeoHash
                    // accuracy, but most will match
                    const distanceInKm = distanceBetween([lat, lng], [latitude, longitude]);
                    const distanceInM = distanceInKm * 1000;
                    if (distanceInM <= radius) {
                        matchingDocs.push(doc);
                    }
                }
            }
            return matchingDocs;
        }).then((matchingDocs) => {
            const newArray = uniqBy(matchingDocs.map((doc) => ({ ...doc.data() })), (item) => item.id)
            console.log(newArray, "item")
            setTrainers(newArray)
        }).finally(() => {
        })

    }
    const requestLocationPermissionAndroid = async () => {
        try {
            const result = await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                ],
                {
                    title: 'Ktr Fitness App Location Permission',
                    message:
                        'Ktr Fitness App needs access to your location ' +
                        'so we can show you nearby trainer profiles.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED ||
                result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED) {
                handleLocationAcceptance()
            } else {
                handleLocationRejection()
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const handleLocationPermissionIos = () => {
        Geolocation.requestAuthorization("whenInUse")
            .then((value) => {
                if (value == "granted") {
                    handleLocationAcceptance()
                }
                else {
                    handleLocationRejection()
                }
            })
    }
    return (
        <View style={styles.container}>
            <MapView
                key={"AIzaSyDiDhePfa6TjIO53RDsCYguUekMQPuJBYU"}
                style={{ flex: 1}}
                customMapStyle={mapStyles}
                //tintColor="black"
                userInterfaceStyle="dark"
                //region={region}
                region={region}
            >
                <Marker
                    key={0}
                    title="Your Location"
                    coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                >
                    <Icon as={Ionicons}
                        name="location"
                        size={"lg"}
                        color="red.700"
                    >
                    </Icon>
                </Marker>
                {
                    trainers.map(marker=>{
                        return(
                            <Marker
                                key={0}
                                title={marker.name}
                                coordinate={{ latitude: marker.address.lat, longitude: marker.address.lng }}
                            >
                                <Icon as={Ionicons}
                                    name="barbell"
                                    size={"lg"}
                                    color="white"
                                >
                                </Icon>
                            </Marker>
                        )
                    })
                }
            </MapView>
            <View style={{ position: "absolute", bottom: 10, left: 0, right: 0,padding:5 }}>
                <ScrollView horizontal>
                    {
                        trainers.map((item,index)=>{
                            return(
                                <TrainerCard data={item} navigation={navigation} key={index} isMap={true}/>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )
}
export default MapViewScreen