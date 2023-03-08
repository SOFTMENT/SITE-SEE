import { FlatList, View } from "react-native"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import Header from "../../../components/Header"
import TopTabComponent from "../../../components/TopTabComponent"
import { proBookingFilter } from "../../../config/appConfig"
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux"
import BookingCard from "./components/BookingCard"
import { spacing } from "../../../common/variables"
import NoResults from "../../../components/NoResults"
const ProBookings = (props) => {
    const { navigation } = props
    const [selected, setSelected] = useState(proBookingFilter[0].label);
    const [allBookingData,setAllBookingData] = useState([])
    const [bookingData,setBookingData] = useState([])
    const userData = useSelector(state => state.user.userData)
    useEffect(() => {
        const subscriber =
            firestore().collection("bookings")
                .where('trainerId', "==", userData.uid)
                .orderBy("createTime", "desc")
                .onSnapshot((querySnapshot) => {
                    const localData = []
                    querySnapshot.forEach(documentSnapshot => {
                        var data = documentSnapshot.data()
                        data.bookingId = documentSnapshot.id
                        localData.push(data)
                    })
                    console.log(localData)
                    setBookingData(localData.filter((item)=>item.status==selected))
                    setAllBookingData(localData)
                }, (error) => console.log(error))
        return () => subscriber()
    }, []);
    const renderItem = ({item}) => {
        console.log(item)
        return(
            <BookingCard item={item} navigation={navigation} disabled/>
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
            <Header title="Appointments" navigation={navigation} />
            <TopTabComponent
                selected={selected}
                setSelected={filterChanged}
                tabList={proBookingFilter}
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
export default ProBookings