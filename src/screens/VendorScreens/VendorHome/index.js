import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { startCase } from 'lodash'
import AvatarIcon from '../../../components/AvatarIcon'
import images from '../../../assets/images'
import { useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { spacing } from '../../../common/variables'
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'native-base'
import NoResults from '../../../components/NoResults'
import CenteredLoader from '../../../components/CenteredLoader'
import RequestCard from './RequestCard'
export default function VendorHome(props) {
    const {navigation} = props
    const { userData } = useSelector(state => state.user)
    const { name, profilePic,uid } = userData
    const [data,setData] = useState([])
    const [noData,setNoData] = useState(false)
    const inset = useSafeAreaInsets()
    useEffect(()=>{
        const unsubscribe = firestore().collection("Bookings")
            .where("status","==","Pending")
            .where("vendorId","==",uid)
            .orderBy("bookingTime", "desc")
            .onSnapshot(async snapshot=>{
                const localData = []
                for(const doc of snapshot.docs){
                    var data = doc.data()
                    const spaceData = await firestore().collection("Space").doc(data.spaceId).get()
                    localData.push({...data,...spaceData.data()})
                }
                if(localData.length == 0){setNoData(true)}
                else setNoData(false)
                setData(localData)
            },
            err => {
                console.log(err)
            }
            )
        return unsubscribe
    },[])
    // const getAdvertiserRequests = async() => {
            
            
    // }
    const renderRequests = ({item}) => {
        return <RequestCard data={item} navigation={navigation}/>
    }
    const keyExtractor = (item) => {
        return item.bookingId
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
                //borderWidth={1}   
                />
                {/* {Util.getNameInitial(name)}
                    </Avatar> */}

            </View>
            <Text style={styles.title}>Advertiser Requests</Text>
            {
                data.length>0?
                <FlatList
                    renderItem={renderRequests}
                    data={data}
                    keyExtractor={keyExtractor}
                    bounces={false}
                />:
                noData?<NoResults/>:<CenteredLoader/>
            }
        </View>
    )
}