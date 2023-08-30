import firestore from '@react-native-firebase/firestore'
import React, { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { spacing } from "../../../common/variables"
import Header from "../../../components/Header"
import NoResults from "../../../components/NoResults"
import TopTabComponent from "../../../components/TopTabComponent"
import { userBookingFilter } from "../../../config/appConfig"
import OrderCard from './OrderCard'
import styles from "./styles"
const VendorOrders = (props) => {
    const { navigation } = props
    const [selected, setSelected] = useState(userBookingFilter[0].label);
    const [allBookingData,setAllBookingData] = useState([])
    const [bookingData,setBookingData] = useState([])
    const userData = useSelector(state => state.user.userData)
    //console.log("hereeeee")
    useEffect(() => {
        console.log(userData.uid)
        const subscriber =
                firestore().collection("Bookings")
                .where('vendorId', "==", userData.uid)
                .orderBy("bookingTime", "desc")
                .onSnapshot( async(querySnapshot) => {
                    const localData = []
                    for(const documentSnapshot of querySnapshot.docs){
                        var data = documentSnapshot.data()
                        //console.log("---",data)
                        data.bookingId = documentSnapshot.id
                        const spaceData = await firestore().collection("Space").doc(data.spaceId).get()
                        //const spaceData = await firestore().collection("Space").doc(data.spaceId).get()
                        localData.push({...data,...spaceData.data()})
                    }
                    setBookingData(localData.filter((item)=>item.status==selected))
                    setAllBookingData(localData)
                }, (error) => console.log(error))
        return () => subscriber()
    }, []);
    const renderItem = ({item}) => {
        return(
            <OrderCard data={item} navigation={navigation}/>
        )
    }
    const keyExtractor = (item) => {
        return item.bookingId
    }
    const filterChanged = (label)=>{
        if(label==="All")
            setBookingData(allBookingData)
        else
            setBookingData(allBookingData.filter((item)=>item.status==label))
        setSelected(label)
    }
    return (
        <View style={styles.container}>
            <Header title="Orders" navigation={navigation} />
            <TopTabComponent
                selected={selected}
                setSelected={filterChanged}
                tabList={userBookingFilter}
            //navigation={navigation}
            />
            <View style={{padding:spacing.medium,flex:1}}>
                {
                    bookingData.length > 0 ?
                    <FlatList
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        data={bookingData}
                        style={{flex:1}}
                    />:
                    <NoResults/>
                }
            </View>
        </View>
    )
}
export default VendorOrders